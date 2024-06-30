<?php
/**
 * Plugin Name: Gutenberg Custom Blocks
 * Description: Custom Gutenberg blocks for heading, image, tab, and accordion.
 * Version: 1.0.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function gutenberg_custom_blocks_category( $categories ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'custom-category',
                'title' => __( 'Custom Blocks', 'gutenberg-custom-blocks' ),
                'icon'  => 'star-filled',
            ),
        )
    );
}
add_filter( 'block_categories_all', 'gutenberg_custom_blocks_category', 10, 1 );

function gutenberg_custom_blocks_register() {
    wp_register_script(
        'gutenberg-custom-blocks-editor-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );

    wp_register_style(
        'gutenberg-custom-blocks-editor-style',
        plugins_url( 'build/index.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
    );

    wp_register_style(
        'gutenberg-custom-blocks-style',
        plugins_url( 'build/index.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
    );

    register_block_type( 'custom/heading', array(
        'editor_script' => 'gutenberg-custom-blocks-editor-script',
        'editor_style'  => 'gutenberg-custom-blocks-editor-style',
        'style'         => 'gutenberg-custom-blocks-style',
    ) );

    register_block_type( 'custom/image', array(
        'editor_script' => 'gutenberg-custom-blocks-editor-script',
        'editor_style'  => 'gutenberg-custom-blocks-editor-style',
        'style'         => 'gutenberg-custom-blocks-style',
    ) );

    register_block_type( 'custom/tab', array(
        'editor_script' => 'gutenberg-custom-blocks-editor-script',
        'editor_style'  => 'gutenberg-custom-blocks-editor-style',
        'style'         => 'gutenberg-custom-blocks-style',
    ) );

    register_block_type( 'custom/accordion', array(
        'editor_script' => 'gutenberg-custom-blocks-editor-script',
        'editor_style'  => 'gutenberg-custom-blocks-editor-style',
        'style'         => 'gutenberg-custom-blocks-style',
    ) );
}
add_action( 'init', 'gutenberg_custom_blocks_register' );
