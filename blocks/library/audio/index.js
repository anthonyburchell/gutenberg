/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, IconButton, Placeholder, Toolbar, MediaElement } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import MediaUpload from '../../media-upload';
import BlockControls from '../../block-controls';

export const name = 'core/audio';

export const settings = {
	title: __( 'Audio' ),

	description: __( 'The Audio block allows you to embed audio files and play them back using the mediaelement player component.' ),

	icon: 'format-audio',

	category: 'common',

	attributes: {
		src: {
			type: 'string',
			source: 'attribute',
			selector: 'audio',
			attribute: 'src',
		},
		caption: {
			type: 'array',
			source: 'children',
			selector: 'figcaption',
		},
		// id: {
		// 	type: 'number',
		// },
		// album: {
		// 	type: 'string',
		// },
		// artist: {
		// 	type: 'string',
		// },
		// title: {
		// 	type: 'string',
		// },
		// options: {
		// 	type: 'array',
		// },
		// image: {
		// 	type: 'array',
		// },
		mediaItem: {
			type: 'array',
			source: 'children',
			attribute: 'mediaItem',
		},
		playerOptions: {
			type: 'array',
			source: 'children',
			attribute: 'playerOptions',
		},
	},

	supports: {
		align: true,
	},

	edit: class extends Component {
		constructor( { className } ) {
			super( ...arguments );
			// edit component has its own src in the state so it can be edited
			// without setting the actual value outside of the edit UI
			this.state = {
				editing: ! this.props.attributes.src,
				src: this.props.attributes.src,
				className,
			};
		}
		render() {
			const config = {};
			const { id, mediaItem, src, playerOptions } = this.props.attributes;
			const { setAttributes, isSelected } = this.props;
			const { editing, className } = this.state;
			const switchToEditing = () => {
				this.setState( { editing: true } );
			};
			const onSelectAudio = ( media ) => {
				if ( media && media.url ) {
					// sets the block's attribute and updates the edit component from the
					// selected media, then switches off the editing UI
					setAttributes( {
						mediaItem: media,
						playerOptions: config,
						src: media.url,
						id: media.id,
					} );
					//logging atts for debuging purposes
					// console.log( this.props.attributes );
					this.setState( { editing: false } );
				}
			};

			const onSelectUrl = ( event ) => {
				event.preventDefault();
				if ( src ) {
					// set the block's src from the edit component's state, and switch off the editing UI
					setAttributes( { src } );
					this.setState( { editing: false } );
				}
				return false;
			};
			const controls = isSelected && (
				<BlockControls key="controls">
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
						label={ __( 'Audio' ) }
						instructions={ __( 'Select an audio file from your library, or upload a new one' ) }
						className={ className }>
						<form onSubmit={ onSelectUrl }>
							<input
								type="url"
								className="components-placeholder__input"
								placeholder={ __( 'Enter URL of audio file here…' ) }
								onChange={ event => this.setState( { src: event.target.value } ) }
								value={ src || '' } />
							<Button
								isLarge
								type="submit">
								{ __( 'Use URL' ) }
							</Button>
						</form>
						<MediaUpload
							onSelect={ onSelectAudio }
							type="audio"
							value={ id }
							render={ ( { open } ) => (
								<Button isLarge onClick={ open }>
									{ __( 'Add from Media Library' ) }
								</Button>
							) }
						/>
					</Placeholder>,
				];
			}

			/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
			return [
				controls,
				<figure key="audio" className={ [ className, 'mejs-container wp-audio-shortcode mejs-audio' ].join( ' ' ) }>
					<MediaElement
						id="player1"
						mediaType="audio"
						preload="auto"
						controls
						width="640"
						height="360"
						poster=""
						sources={ JSON.stringify( mediaItem ) }
						options={ JSON.stringify( playerOptions ) }
						tracks={ JSON.stringify( mediaItem ) }
					/>
				</figure>,
			];
			/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		}
	},

	save( { attributes } ) {
		const { src, mediaItem, className, playerOptions } = attributes;

		return (
			<figure key="audio" className={ [ className, 'mejs-container wp-audio-shortcode mejs-audio' ].join( ' ' ) }>
				<MediaElement
					id="player1"
					mediaType="audio"
					preload="auto"
					controls
					width="640"
					height="360"
					poster=""
					sources={ JSON.stringify( mediaItem ) }
					options={ JSON.stringify( playerOptions ) }
					tracks={ JSON.stringify( mediaItem ) }
				/>
			</figure>
		);
	},
};
