/**
 * External Dependencies
 */
//import 'mediaelement';
//import { mediaElement } from '@wordpress/components';
import { Component } from '@wordpress/element';

<<<<<<< HEAD
=======

>>>>>>> 8d0ec65a40dbc9a7795645ec72a7ce5ad8d6a1c8
// Import stylesheet and shims
//import 'mediaelement/build/mediaelementplayer.min.css';
//may not need to import the swf file
//import 'mediaelement/build/mediaelement-flash-video.swf';

export default class MediaElement extends Component {
<<<<<<< HEAD
	constructor() {
		super();
		this.state = {};
	}

	success( media, node, instance ) {
		// Your action when media was successfully loaded
	}

	error( media ) {
=======

	//state = {}

	constructor() {
		super();
		// edit component has its own src in the state so it can be edited
		// without setting the actual value outside of the edit UI
		this.state = {};
	}



	success(media, node, instance) {
		// Your action when media was successfully loaded
	}

	error(media) {
>>>>>>> 8d0ec65a40dbc9a7795645ec72a7ce5ad8d6a1c8
		// Your action when media had an error loading
	}

	render() {
<<<<<<< HEAD
		const
			props = this.props,
			sources = JSON.parse( props.sources ),
			tracks = JSON.parse( props.tracks ),
=======

		const
			props = this.props,
			sources = JSON.parse(props.sources),
			tracks = JSON.parse(props.tracks),
>>>>>>> 8d0ec65a40dbc9a7795645ec72a7ce5ad8d6a1c8
			sourceTags = [],
			tracksTags = [],
			trackListing = []
		;

<<<<<<< HEAD
		sourceTags.push( `<source src="${ sources.url }" type="${ sources.type }">` );

		tracksTags.push( `<track src="${ tracks.url }" kind="${ tracks.kind }" srclang="${ tracks.lang }"${ ( tracks.label ? ` label=${ track.label }` : '' ) }>` );

		const
			mediaBody = `${ sourceTags.join( '\n' ) }
				${ tracksTags.join( '\n' ) }`,
			mediaHtml = props.mediaType === 'video' ?
				`<video id="${ props.id }" width="${ props.width }" height="${ props.height }"${ ( props.poster ? ` poster=${ props.poster }` : '' ) }
					${ ( props.controls ? ' controls' : '' ) }${ ( props.preload ? ` preload="${ props.preload }"` : '' ) }>
					${ mediaBody }
				</video>` :
				`<audio id="${ props.id }" width="${ props.width }" src="${ props.src }" controls>
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

		const options = Object.assign( {}, JSON.parse( this.props.options ), {
			// Read the Notes below for more explanation about how to set up the path for shims
			pluginPath: './static/media/',
			success: ( media, node, instance ) => this.success( media, node, instance ),
			error: ( media, node ) => this.error( media, node ),
		} );

		this.setState( { player: new MediaElementPlayer( this.props.id, options ) } );
	}

	componentWillUnmount() {
		if ( this.state.player ) {
			this.state.player.remove();
			this.setState( { player: null } );
=======
		for (let i = 0, total = sources.length; i < total; i++) {
			const source = sources[i];
			sourceTags.push(`<source src="${source.src}" type="${source.type}">`);
		}

		for (let i = 0, total = sources.length; i < total; i++) {
			const source = sources[i];
			trackListing.push(`<li>${source.title}</li>`);
		}

		for (let i = 0, total = tracks.length; i < total; i++) {
			const track = tracks[i];
			tracksTags.push(`<track src="${track.src}" kind="${track.kind}" srclang="${track.lang}"${(track.label ? ` label=${track.label}` : '')}>`);
		}

		const
			mediaPlaylist = `${trackListing.join("\n")}`,
			mediaBody = `${sourceTags.join("\n")}
				${tracksTags.join("\n")}`,
			mediaHtml = props.mediaType === 'video' ?
				`<video id="${props.id}" width="${props.width}" height="${props.height}"${(props.poster ? ` poster=${props.poster}` : '')}
					${(props.controls ? ' controls' : '')}${(props.preload ? ` preload="${props.preload}"` : '')}>
					${mediaBody}
				</video>` :
				`<audio id="${props.id}" width="${props.width}" src="${props.src}" controls>
					${mediaBody}
				</audio>
				${mediaPlaylist}`
		;

		return (<div dangerouslySetInnerHTML={{__html: mediaHtml}}></div>);

	}

	componentDidMount() {

		const {MediaElementPlayer} = global;

		if (!MediaElementPlayer) {
			return;
		}

		const options = Object.assign({}, JSON.parse(this.props.options), {
			// Read the Notes below for more explanation about how to set up the path for shims
			pluginPath: './static/media/',
			success: (media, node, instance) => this.success(media, node, instance),
			error: (media, node) => this.error(media, node)
		});

		this.setState({player: new MediaElementPlayer(this.props.id, options)});
	}

	componentWillUnmount() {
		if (this.state.player) {
			this.state.player.remove();
			this.setState({player: null});
>>>>>>> 8d0ec65a40dbc9a7795645ec72a7ce5ad8d6a1c8
		}
	}
}
