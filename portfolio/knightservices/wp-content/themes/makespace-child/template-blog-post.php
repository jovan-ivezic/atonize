<?php
/**
 * Blog post template
 */
?>

<div class="post-slider-item">
    <article class="post <?php if ( has_post_thumbnail() ) { ?>has-post-thumbnail <?php } ?>">
        <a href="javascript:;" class="post-link">
            <div class="post-thumbnail" style="background-image: url('<?php echo esc_url(get_the_post_thumbnail_url()); ?>');">
            </div><!-- /.post-thumbnail -->
            <div class="post-info">
                <?php the_title( '<h3>', '</h3>' ); ?>
                <ul class="post-meta">
                    <li><?php the_time('m.d.y.'); ?></li>
                    <li><?php the_author(); ?></li>
                    <li><?php echo MakespaceFramework::read_time(); ?></li>
                </ul>
            </div><!-- /.post-info -->
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </a>
    </article>
</div><!-- /.post-slider-item -->
