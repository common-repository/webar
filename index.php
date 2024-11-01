<?php
/**
 * @package WebAR
 * @version 0.0.1
 */
/*
Plugin Name: WebAR
Plugin URI: https://wordpress.org/plugins/WebAR/
Description: This plugin will help user to display the Apple AR (usdz) content to any WordPress Website. You can assign placeholder image and specify image dimensions. It also allows to upload the USDZ file to media section.
Author: Futurescape
Version: 0.0.1
Author URI: https://www.futurescape.in
License:     GPL2
 
WebAR is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
WebAR is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with WebAR. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
*/

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'webar_load_textdomain' );

function webar_load_textdomain() {
	load_plugin_textdomain( 'webar', false, basename( __DIR__ ) . '/languages' );
}




/**
 * Allow USDZ mime type to the wordpress website
 * This feature will be server dependent, may not work with media upload. In this case manually upload media and use the URL
*/
function webar_filter_fix_wp_check_filetype_and_ext( $data, $file, $filename, $mimes ) {
	if ( ! empty( $data['ext'] ) && ! empty( $data['type'] ) ) {
		return $data;
	}
	$registered_file_types = ['usdz' => 'model/vnd.usdz+zip|application/octet-stream|model/x-vnd.usdz+zip'];
	$filetype = wp_check_filetype( $filename, $mimes );
	if ( ! isset( $registered_file_types[ $filetype['ext'] ] ) ) {
		return $data;
	}
	return [
		'ext' => $filetype['ext'],
		'type' => $filetype['type'],
		'proper_filename' => $data['proper_filename'],
	];
}

function webar_allow_usdz( $mime_types ) {
	if ( ! in_array( 'usdz', $mime_types ) ) { 
		$mime_types['usdz'] = 'model/vnd.usdz+zip|application/octet-stream|model/x-vnd.usdz+zip';
	}
	return $mime_types;
}
add_filter( 'wp_check_filetype_and_ext', 'webar_filter_fix_wp_check_filetype_and_ext', 10, 4 );
add_filter( 'upload_mimes', 'webar_allow_usdz' );




/**
 * Convert the shortcode to Apple AR tag
*/
function do_webar_function($atts = array()){

    // set up default parameters
    extract(shortcode_atts(array(
        'url'=> '',
        'src' => 'https://www.futurescape.in/wordpress-webar-plugin/',
        'width'=>'400px',
        'height'=>'400px'
       ), $atts));

    return  '<div><a rel="ar" href="'.$atts['url'].'"><img width="'.$atts['width'].'" height="'.$atts['height'].'" src="'.$atts['src'].'" /></a></div>';
}
add_shortcode('webar', 'do_webar_function');




/**
 * Load WebAR Block
*/
function load_webar_block() {
    wp_enqueue_script(
      'webar-block',
      plugin_dir_url(__FILE__) . 'block.js',
      array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
      true
    );
}  
add_action('enqueue_block_editor_assets', 'load_webar_block');



/**
* Create WebAR Block Categories
* This will allow to add more of webar embed/scripts within a single category
*/
function webar_block_categories( $categories, $post ) {
    if ( $post->post_type !== 'post' ) {
        return $categories;
    }
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'WebAR',
                'title' => __( 'WebAR', 'webar-plugin' ),
                // 'icon'  => 'wordpress',
            ),
        )
    );
}
add_filter( 'block_categories', 'webar_block_categories', 10, 2 );