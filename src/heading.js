const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InspectorControls, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody, SelectControl, FontSizePicker, ColorPalette } = wp.components;
const { useState } = wp.element;

registerBlockType( 'custom/heading', {
    title: __('Custom Heading', 'gutenberg-custom-blocks'),
    icon: 'heading',
    category: 'custom-category',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'h2',
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
        color: {
            type: 'string',
            default: '#000',
        },
        fontSize: {
            type: 'number',
            default: 16,
        },
        level: {
            type: 'string',
            default: 'h2',
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { content, alignment, color, fontSize, level } = attributes;

        const onChangeContent = (content) => {
            setAttributes({ content });
        };

        const onChangeAlignment = (alignment) => {
            setAttributes({ alignment });
        };

        const onChangeColor = (color) => {
            setAttributes({ color });
        };

        const onChangeFontSize = (fontSize) => {
            setAttributes({ fontSize });
        };

        const onChangeLevel = (level) => {
            setAttributes({ level });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Text Settings', 'gutenberg-custom-blocks')}>
                        <FontSizePicker
                            value={fontSize}
                            onChange={onChangeFontSize}
                        />
                        <ColorPalette
                            value={color}
                            onChange={onChangeColor}
                        />
                        <SelectControl
                            label={__('Heading Level', 'gutenberg-custom-blocks')}
                            value={level}
                            options={[
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' },
                                { label: 'H5', value: 'h5' },
                                { label: 'H6', value: 'h6' },
                            ]}
                            onChange={onChangeLevel}
                        />
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={onChangeAlignment}
                    />
                </BlockControls>
                <RichText
                    tagName={level}
                    value={content}
                    onChange={onChangeContent}
                    placeholder={__('Enter heading...', 'gutenberg-custom-blocks')}
                    style={{ textAlign: alignment, color: color, fontSize: fontSize }}
                />
            </>
        );
    },
    save: ({ attributes }) => {
        const { content, alignment, color, fontSize, level } = attributes;

        return (
            <RichText.Content
                tagName={level}
                value={content}
                style={{ textAlign: alignment, color: color, fontSize: fontSize }}
            />
        );
    },
});
