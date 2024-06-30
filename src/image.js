const { registerBlockType } = wp.blocks;
const { MediaUpload, MediaUploadCheck, InspectorControls, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { Button, PanelBody, TextControl } = wp.components;

registerBlockType( 'custom/image', {
    title: 'Custom Image',
    icon: 'format-image',
    category: 'custom-category',
    attributes: {
        url: {
            type: 'string',
        },
        alt: {
            type: 'string',
            default: '',
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
        caption: {
            type: 'string',
            default: '',
        },
    },
    edit: ( { attributes, setAttributes } ) => {
        const { url, alt, alignment, caption } = attributes;

        const onChangeAlt = ( newAlt ) => {
            setAttributes( { alt: newAlt } );
        };

        const onChangeAlignment = ( newAlignment ) => {
            setAttributes( { alignment: newAlignment } );
        };

        const onChangeCaption = ( newCaption ) => {
            setAttributes( { caption: newCaption } );
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Image Settings">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) => setAttributes( { url: media.url } ) }
                                allowedTypes={ [ 'image' ] }
                                value={ url }
                                render={ ( { open } ) => (
                                    <Button onClick={ open } isPrimary>
                                        { ! url ? 'Upload Image' : 'Change Image' }
                                    </Button>
                                ) }
                            />
                        </MediaUploadCheck>
                        { url && (
                            <>
                                <TextControl
                                    label="Alt Text"
                                    value={ alt }
                                    onChange={ onChangeAlt }
                                />
                                <TextControl
                                    label="Caption"
                                    value={ caption }
                                    onChange={ onChangeCaption }
                                />
                            </>
                        ) }
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    <AlignmentToolbar
                        value={ alignment }
                        onChange={ onChangeAlignment }
                    />
                </BlockControls>
                <div className={ `custom-image-block align${ alignment }` }>
                    { url ? (
                        <figure>
                            <img src={ url } alt={ alt } />
                            { caption && <figcaption>{ caption }</figcaption> }
                        </figure>
                    ) : (
                        <Button isPrimary onClick={ open }>
                            Upload Image
                        </Button>
                    ) }
                </div>
            </>
        );
    },
    save: ( { attributes } ) => {
        const { url, alt, alignment, caption } = attributes;

        return (
            <figure className={ `align${ alignment }` }>
                <img src={ url } alt={ alt } />
                { caption && <figcaption>{ caption }</figcaption> }
            </figure>
        );
    },
} );
