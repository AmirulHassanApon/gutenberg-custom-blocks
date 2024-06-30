const { registerBlockType } = wp.blocks;
const { MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Button, PanelBody } = wp.components;

registerBlockType( 'custom/image', {
    title: 'Custom Image',
    icon: 'format-image',
    category: 'custom-category',
    attributes: {
        url: {
            type: 'string',
        },
    },
    edit: ( { attributes, setAttributes } ) => {
        const { url } = attributes;

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
                    </PanelBody>
                </InspectorControls>
                <div className="custom-image-block">
                    { url ? (
                        <img src={ url } alt="Custom Image" />
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
        const { url } = attributes;

        return url ? <img src={ url } alt="Custom Image" /> : null;
    },
} );
