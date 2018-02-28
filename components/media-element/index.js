/**
 * External Dependencies
 */
import { Component } from '@wordpress/element';

export default class MediaElement extends Component {

	constructor() {
		super();
		this.state = {};
	}

	success(media, node, instance) {
		// Your action when media was successfully loaded
	}

	error(media) {
		// Your action when media had an error loading
	}

	render() {

		const
			props = this.props,
			sources = JSON.parse(props.sources),
			tracks = JSON.parse(props.tracks),
			sourceTags = [],
			tracksTags = [],
			trackListing = []
		;

			sourceTags.push(`<source src="${sources.url}" type="${sources.type}">`);

			tracksTags.push(`<track src="${tracks.url}" kind="${tracks.kind}" srclang="${tracks.lang}"${(tracks.label ? ` label=${track.label}` : '')}>`);

		const
			mediaBody = `${sourceTags.join("\n")}
				${tracksTags.join("\n")}`,
			mediaHtml = props.mediaType === 'video' ?
				`<video id="${props.id}" width="${props.width}" height="${props.height}"${(props.poster ? ` poster=${props.poster}` : '')}
					${(props.controls ? ' controls' : '')}${(props.preload ? ` preload="${props.preload}"` : '')}>
					${mediaBody}
				</video>` :
				`<audio id="${props.id}" width="${props.width}" src="${props.src}" controls>
					${mediaBody}
				</audio>`
		;

		return (<div dangerouslySetInnerHTML={{__html: mediaHtml}}></div>);

	}

	componentDidMount() {

		const {MediaElementPlayer} = global;

		if (!MediaElementPlayer) {
			return;
		}

		// const options = Object.assign({}, JSON.parse(this.props.options), {
		// 	// Read the Notes below for more explanation about how to set up the path for shims
		// 	pluginPath: './static/media/',
		// 	success: (media, node, instance) => this.success(media, node, instance),
		// 	error: (media, node) => this.error(media, node)
		// });

		this.setState({player: new MediaElementPlayer(this.props.id)});
	}

	componentWillUnmount() {
		if (this.state.player) {
			this.state.player.remove();
			this.setState({player: null});
		}
	}
}
