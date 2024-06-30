const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, Button, ColorPalette } = wp.components;
const { Fragment } = wp.element;

registerBlockType('custom/tab', {
    title: 'Custom Tab',
    icon: 'index-card',
    category: 'custom-category',
    attributes: {
        tabs: {
            type: 'array',
            default: [
                { title: 'Tab 1', content: [], backgroundColor: '#ffffff', textColor: '#333333' },
                { title: 'Tab 2', content: [], backgroundColor: '#ffffff', textColor: '#333333' },
            ],
        },
        activeTab: {
            type: 'number',
            default: 0,
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { tabs, activeTab } = attributes;

        const addTab = () => {
            const newTabs = [...tabs, { title: 'New Tab', content: [], backgroundColor: '#ffffff', textColor: '#333333' }];
            setAttributes({ tabs: newTabs });
        };

        const updateTabTitle = (newTitle, index) => {
            const newTabs = [...tabs];
            newTabs[index].title = newTitle;
            setAttributes({ tabs: newTabs });
        };

        const removeTab = (index) => {
            const newTabs = tabs.filter((_, tabIndex) => tabIndex !== index);
            setAttributes({ tabs: newTabs });
        };

        const switchTab = (index) => {
            setAttributes({ activeTab: index });
        };

        const updateBackgroundColor = (color, index) => {
            const newTabs = [...tabs];
            newTabs[index].backgroundColor = color;
            setAttributes({ tabs: newTabs });
        };

        const updateTextColor = (color, index) => {
            const newTabs = [...tabs];
            newTabs[index].textColor = color;
            setAttributes({ tabs: newTabs });
        };

        const onTabMove = (oldIndex, newIndex) => {
            const newTabs = [...tabs];
            const movedTab = newTabs.splice(oldIndex, 1)[0];
            newTabs.splice(newIndex, 0, movedTab);
            setAttributes({ tabs: newTabs });
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Tabs">
                        {tabs.map((tab, index) => (
                            <div key={index}>
                                <TextControl
                                    label={`Tab ${index + 1} Title`}
                                    value={tab.title}
                                    onChange={(newValue) => updateTabTitle(newValue, index)}
                                />
                                <ColorPalette
                                    label="Background Color"
                                    color={tab.backgroundColor}
                                    onChange={(color) => updateBackgroundColor(color, index)}
                                />
                                <ColorPalette
                                    label="Text Color"
                                    color={tab.textColor}
                                    onChange={(color) => updateTextColor(color, index)}
                                />
                                <Button isLink onClick={() => removeTab(index)}>Remove Tab</Button>
                            </div>
                        ))}
                        <Button isPrimary onClick={addTab}>Add Tab</Button>
                    </PanelBody>
                </InspectorControls>
                <div className="custom-tab-block">
                    <ul className="tabs">
                        {tabs.map((tab, index) => (
                            <li
                                key={index}
                                className={`tab-title ${activeTab === index ? 'active' : ''}`}
                                onClick={() => switchTab(index)}
                                style={{ backgroundColor: tab.backgroundColor, color: tab.textColor }}
                            >
                                {tab.title}
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content">
                        {tabs[activeTab].content.length === 0 ? (
                            <p className="placeholder">Click a tab to edit its content.</p>
                        ) : (
                            <InnerBlocks allowedBlocks={['core/paragraph', 'core/image', 'core/heading', 'core/list']} />
                        )}
                    </div>
                </div>
            </Fragment>
        );
    },
    save: ({ attributes }) => {
        const { tabs, activeTab } = attributes;

        return (
            <div className="custom-tab-block">
                <ul className="tabs">
                    {tabs.map((tab, index) => (
                        <li key={index} className={`tab-title ${activeTab === index ? 'active' : ''}`}>
                            {tab.title}
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
