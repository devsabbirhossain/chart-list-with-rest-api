<?php
/**
 * Plugin Name:       Soft Tech IT
 * Plugin URI:        https://softtech-it.com/
 * Description:       This is a custom chart plugin Develop by softtechit.
 * Version:           1.0.0
 * Author:            jhfahim
 * Author URI:        https://jhfahim.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       softtechit
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Enqueue script
 */
function chart_enqueue_script()
{   
		
    wp_enqueue_script( 'chart-js', plugin_dir_url( __FILE__ ) . 'assets/js/chart.js', array('jquery'), '1.0.0', true );
    wp_enqueue_script( 'my-custom-script', plugin_dir_url( __FILE__ ) . 'assets/js/custom.js',array('jquery'), '1.0.0', true );
    wp_localize_script( 'my-custom-script', 'softvar', array(
       'home_url' => home_url()
    ));
	 
}
add_action('admin_enqueue_scripts', 'chart_enqueue_script');

/**
 * This template for shortcode
 */
require plugin_dir_path( __FILE__ ) . 'inc/shortcode/deshbord-chart.php';



//add chart in deshboard menu
global $wp_meta_boxes;

add_action('wp_dashboard_setup', 'my_custom_dashboard_widgets');
 
function my_custom_dashboard_widgets() {
wp_add_dashboard_widget('all_test_widget', 'All Test', 'particular_test_dashboard_display');
wp_add_dashboard_widget('score_widget', 'Test score', 'chart_score_dashboard_display');
wp_add_dashboard_widget('trend_widget', 'Trends Test', 'trends_score_dashboard_display');
wp_add_dashboard_widget('all_test_score_widget', 'Overall Statics', 'all_test_score_dashboard_display');
}
 
//All test taken by particular account 
function particular_test_dashboard_display() {

   echo do_shortcode( '[particular-test]' );

   global $wpdb, $ipt_fsqm_info;
   $submissions = $wpdb->get_results( "SELECT * FROM `wp_fsq_data` ORDER BY `wp_fsq_data`.`user_id` ASC", ARRAY_A );

   echo "<pre>";
   print_r( $submissions);
   echo "</pre>";
 
}


//All test score by particular account 
function chart_score_dashboard_display() {

   echo do_shortcode( '[score-chart]' );

   

}


//trends of  number of test taker particular account
function trends_score_dashboard_display() {

   echo do_shortcode( '[trend-test-chart]' );

}

//All test taken by all account
function all_test_score_dashboard_display() {

   echo do_shortcode( '[all-test-chart]' );

}


add_action('admin_init', function(){

   setcookie('current_user', wp_get_current_user()->ID, time() + (86400 * 30));

});



add_action('rest_api_init', function(){

   register_rest_route('softtechit/v1', '/tests/', array( 
      'methods' => 'GET',
      'callback' => function(){

         global $wpdb, $ipt_fsqm_info;
         $forms = $wpdb->get_results( "SELECT id, name FROM {$ipt_fsqm_info['form_table']} ORDER BY id ASC", ARRAY_A );

         return $forms;

      }
   ));


   register_rest_route('softtechit/v1', '/submissions/', array( 
      'methods' => 'GET',
      'callback' => function(){

         global $wpdb, $ipt_fsqm_info;
         $submissions = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}fsq_data ORDER BY id ASC", ARRAY_A );

         return $submissions;

      }
   ));

   register_rest_route('softtechit/v1', '/submissions/data/', array( 
      'methods' => 'GET',
      'callback' => function(){

         global $wpdb, $ipt_fsqm_info;
         $submissions = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}fsq_data ORDER BY id ASC", ARRAY_A );
         $particular_data = array();
         foreach($submissions as $submission){
            array_push($particular_data,array(
               'label' => $submission[''],
               'data'  => $submission['id'],
            ));
         }
         return json_encode($particular_data); 

      }
   ));

});




















