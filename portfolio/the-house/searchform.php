<?php
/**
 * The template for displaying search form
 *
 * @package WordPress
 */
?>
<form role="search" method="get" id="searchform" class="searchform" action="<?php echo home_url( '/' ); ?>">
    <div>
    	<label class="screen-reader-text" for="s"><?php _e( 'Search for:', 'house' ); ?></label>
        <input type="text" value="" name="s" id="s" placeholder="<?php esc_attr_e( 'Search', 'house' ); ?>"  />
        <input type="submit" id="searchsubmit" value="<?php esc_attr_e( 'Search', 'house' ); ?>" />
    </div>
</form>