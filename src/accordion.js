const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;

registerBlockType( 'custom/accordion', {
    title: 'Custom Accordion',
    icon: 'list-view',
    category: 'custom-category',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: '.accordion-title',
        },
    },
    edit: ( { attributes, setAttributes } ) => {
        const { title } = attributes;

        return (
            <div className="custom-accordion-block">
                <RichText
                    tagName="div"
                    className="accordion-title"
                    value={ title }
                    onChange={ ( title ) => setAttributes( { title } ) }
                    placeholder="Enter title..."
                />
                <div className="accordion-content">
                    <InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/image' ] } />
                </div>
            </div>
        );
    },
    save: ( { attributes } ) => {
        const { title } = attributes;

        return (
            <div className="custom-accordion-block">
                <div className="accordion-title">
                    <RichText.Content tagName="div" value={ title } />
                </div>
                <div className="accordion-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
} );
