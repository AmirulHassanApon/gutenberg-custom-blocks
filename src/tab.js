const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

registerBlockType( 'custom/tab', {
    title: 'Custom Tab',
    icon: 'index-card',
    category: 'custom-category',
    edit: () => {
        return (
            <div className="custom-tab-block">
                <InnerBlocks allowedBlocks={ [ 'core/paragraph' ] } />
            </div>
        );
    },
    save: () => {
        return (
            <div className="custom-tab-block">
                <InnerBlocks.Content />
            </div>
        );
    },
} );
