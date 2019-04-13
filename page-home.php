<?php
/**
 * Template Name: Home Page
 **/
?>

<?php get_header(); ?>

<?php get_template_part('loops/content', 'home'); ?>

<div class="popup-window error-popup">
    <div class="popup-overlay popup-trigger"></div>
    <div class="popup-block">
        <button class="popup-close popup-trigger">&times;</button>
        <div class="message-box"></div>
    </div>
</div>

<?php get_footer(); ?>
