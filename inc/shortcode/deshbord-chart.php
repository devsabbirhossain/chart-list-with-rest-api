<?php
/*********************************************
 *        This template for shortcode
 *********************************************/


 /**
 * Overall Test taken by a particular account 
 *
 */
function particular_test(){
      ob_start();
          ?>
           <canvas id="testChart"></canvas>
          <?php         
return ob_get_clean();
 
}
add_shortcode('particular-test', 'particular_test');


/**
 * Test score taken by a particular account 
 *
 */
function score_chart(){
    ob_start();
        ?>
          <canvas id="scoreChart"></canvas>   
        <?php         
return ob_get_clean();

}
add_shortcode('score-chart', 'score_chart');


/**
 * Trend test chart 
 *
 */
function trend_test_chart(){
    ob_start();
        ?>
         <canvas id="trendTestChart"></canvas>
        <?php         
return ob_get_clean();

}
add_shortcode('trend-test-chart', 'trend_test_chart');

/**
 * All test chart from all account
 *
 */
function all_test_chart(){
    ob_start();
        ?>
         <canvas id="allTestChart"></canvas>   
        <?php         
return ob_get_clean();

}
add_shortcode('all-test-chart', 'all_test_chart');


