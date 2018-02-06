/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, IconButton, Placeholder, Toolbar } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { registerBlockType } from '../../api';
import MediaUploadButton from '../../media-upload-button';
import Editable from '../../editable';
import BlockControls from '../../block-controls';
import BlockAlignmentToolbar from '../../block-alignment-toolbar';

registerBlockType( 'core/playlist', {
	title: __( 'Playlist' ),

	description: __( 'The Playlist block allows you to embed media files in a playlist using a simple player.' ),

	icon: 'format-audio',

	category: 'common',

	attributes: {
		src: {
			type: 'string',
			source: 'attribute',
			selector: 'playlist',
			attribute: 'src',
		},
		align: {
			type: 'string',
		},
		caption: {
			type: 'array',
			source: 'children',
			selector: 'figcaption',
		},
		id: {
			type: 'array',
		},
		mediaItems: {
			type: 'array',
		},
		currentItem: {
			type: 'array',
		}
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit: class extends Component {
		constructor( { className } ) {
			super( ...arguments );
			// edit component has its own src in the state so it can be edited
			// without setting the actual value outside of the edit UI
			this.state = {
				editing: ! this.props.attributes.src,
				src: this.props.attributes.src,
				mediaItems: this.props.attributes.mediaItems,
				currentItem: this.props.attributes.currentItem,
				className,
			};
		}


		render() {
			const { align, caption, id, album, artist, image, title, playlistType, mediaItems, currentItem } = this.props.attributes;
			const { setAttributes, focus, setFocus } = this.props;
			const { editing, className, src } = this.state;
			const updateAlignment = ( nextAlign ) => setAttributes( { align: nextAlign } );
			const switchToEditing = () => {
				this.setState( { editing: true } );
			};

			const onSelectAudio = ( media ) => {
				// xItems = [];
				for (var mediaObject of media) {
					mediaObject.src = mediaObject.url;
					mediaObject.playlistType = mediaObject.type;
				}

				if ( media && media[0].url ) {
					// sets the block's attribute and updates the edit component from the
					// selected media, then switches off the editing UI
					setAttributes( {
						mediaItems: media,
						currentItem: media[0]
					} );
					this.setState( { src: media[0].url, editing: false, playlistType: media[0].type } );
				}
			};

			const controls = focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ align }
						onChange={ updateAlignment }
					/>
					<Toolbar>
						<IconButton
							className="components-icon-button components-toolbar__control"
							label={ __( 'Edit audio' ) }
							onClick={ switchToEditing }
							icon="edit"
						/>
					</Toolbar>
				</BlockControls>
			);

			if ( editing ) {
				return [
					controls,
					<Placeholder
						key="placeholder"
						icon="media-audio"
						label={ __( 'Playlist' ) }
						instructions={ __( 'Select video or audio files from your library, or upload a new ones:' ) }
						className={ className }>
						<MediaUploadButton
							buttonProps={ { isLarge: true } }
							onSelect={ onSelectAudio }
							type="audio"
							multiple
							playlist
							value={ id }
						>
							{ __( 'Insert from Media Library' ) }
						</MediaUploadButton>
					</Placeholder>,
				];
			}

			/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
			/* saving this for later { caption && caption.length > 0 && <figcaption>{ caption }</figcaption> } */
			if (currentItem.playlistType == "audio"){
				return [
					controls,
					<figure key="audio" className={ className }>
					<div className="wp-playlist wp-audio-playlist">
					<div className="wp-playlist-current-item">
					{ currentItem.image && <img src={ currentItem.image.src }  alt="" /> }
					<div className="wp-playlist-caption">
					{ currentItem.title &&
							<span className="wp-playlist-item-meta wp-playlist-item-title">
							{ currentItem.title }
							</span>
					}
					{ currentItem.album &&
						<span className="wp-playlist-item-meta wp-playlist-item-album">
							{ currentItem.album }
						</span>
					}
					{ currentItem.artist &&
						<span className="wp-playlist-item-meta wp-playlist-item-artist">
							{ currentItem.artist }
						</span>
					}
						</div>
						</div>
						<audio controls="controls" src={ src } />
						{mediaItems.map(function(mediaItem){
												return <li key={ mediaItem.title }>{ mediaItem.title } </li>;
											})}
						</div>
					</figure>
				];
			}

			if (currentItem.playlistType == "video"){
				return [
					controls,
					<figure key="video" className={ className }>
						<video controls="controls" src={ currentItem.src } />
						{ currentItem.caption && currentItem.caption.length > 0 && <figcaption>{ currentItem.caption }</figcaption> }
					</figure>,
				];
			}

			/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		}
	},

	save( { attributes } ) {
		const { align, src, album, artist, image, title, caption, playlistType, mediaItems, currentItem } = attributes;

		if (currentItem.playlistType == "audio"){
			return (
				<figure className={ align ? `align${ align }` : null }>
				<div className="wp-playlist wp-audio-playlist">
						<div className="wp-playlist-current-item">
						{ currentItem.image && <img src= { currentItem.image.src }  alt="" /> }
						<div className="wp-playlist-caption">
							{ currentItem.title &&
									<span className="wp-playlist-item-meta wp-playlist-item-title">
									{ currentItem.title }
									</span>
							}
							{ currentItem.album &&
								<span className="wp-playlist-item-meta wp-playlist-item-album">
									{ currentItem.album }
								</span>
							}
							{ currentItem.artist &&
								<span className="wp-playlist-item-meta wp-playlist-item-artist">
									{ currentItem.artist }
								</span>
							}
						</div>
				</div>
				<audio controls="controls" src={ currentItem.src } />
				{mediaItems.map(function(mediaItem){
										return <li key={ mediaItem.title }>{ mediaItem.title } </li>;
									})}
				</div>
				</figure>
			);
		}

		if (currentItem.playlistType == "video"){
			return (
				<figure className={ align ? `align${ align }` : null }>
					<video controls="controls" src={ currentItem.src } />
					{ currentItem.caption && currentItem.caption.length > 0 && <figcaption>{ currentItem.caption }</figcaption> }
				</figure>
			);
		}
	},
} );
