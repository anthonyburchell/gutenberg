/**
 * External Dependencies
 */
import { Component } from '@wordpress/element';
export default class MediaElement extends Component {
	constructor() {
		super();
		this.state = {};
	}

	success( media, node, instance ) {
		//  action when media was successfully loaded
	}

	error( media ) {
		//  action when media had an error loading
	}

	render() {
		const
			props = this.props,
			sources = JSON.parse( props.sources ),
			tracks = JSON.parse( props.tracks ),
			sourceTags = [],
			tracksTags = [],
			mediaBody = `${ sourceTags.join( '\n' ) }
				${ tracksTags.join( '\n' ) }`,
			mediaHtml = props.mediaType === 'video' ?
				`<video id="${ props.id }" width="${ props.width }" height="${ props.height }"${ ( props.poster ? ` poster=${ props.poster }` : '' ) }
					${ ( props.controls ? ' controls' : '' ) }${ ( props.preload ? ` preload="${ props.preload }"` : '' ) }>
					${ mediaBody }
				</video>` :
				`<audio id="${ props.id }" width="${ props.width }" src="${ sources.url }" controls>
					${ mediaBody }
				</audio>`
		;

		return ( <div dangerouslySetInnerHTML={ { __html: mediaHtml } }></div> );
	}

	componentDidMount() {
		const { MediaElementPlayer } = global;

		if ( ! MediaElementPlayer ) {
			return;
		}

		if ( typeof this.props.options !== 'undefined' ) {
			const options = Object.assign( {}, JSON.parse( this.props.options ), {
				//pluginPath: './static/media/',
				//success: ( media, node, instance ) => this.success( media, node, instance ),
				//error: ( media, node ) => this.error( media, node ),
			} );
			this.setState( { player: new MediaElementPlayer( this.props.id, options ) } );
			return;
		}
		this.setState( { player: new MediaElementPlayer( this.props.id, this.props.options ) } );
	}

	componentWillUnmount() {
		if ( this.state.player ) {
			this.state.player.remove();
			this.setState( { player: null } );
		}
	}
}
