<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="<?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>">
    <meta property="og:image" content="https://oplata-academy.pro/wp-content/uploads/oplata-academy-cover.jpg">
    <meta property="og:image:secure_url" content="https://oplata-academy.pro/wp-content/uploads/oplata-academy-cover.jpg">
    <meta property="og:description" content="Научись создавать товарный бизнес и зарабатывать от 5000$">
    
    <link rel="shortcut icon" href="<?php echo esc_url(get_template_directory_uri() . '/assets/img/favicon.ico'); ?>"
          type="image/x-icon">
    <link rel="icon" href="<?php echo esc_url(get_template_directory_uri() . '/assets/img/favicon.ico'); ?>"
          type="image/x-icon">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?> id="top">

<?php wp_body(); ?>

<div class="wrapper">
    <header class="page-header">
        <div class="container">
            <div class="page-header-container">
                <div class="page-header-logo-container">
                    <?php get_default_logo_link(); ?>
                </div>
                <div class="page-header-menu-container">
                    <nav class="nav">
                        <?php wp_nav_menu(array(
                            'theme_location' => 'main-nav',
                            'container' => false,
                            'menu_class' => 'menu-container',
                            'menu_id' => '',
                            'fallback_cb' => 'wp_page_menu',
                            'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            'depth' => 3
                        )); ?>
                    </nav>
                </div>
                <div class="page-header-social-list-container">
                    <ul class="social-list">
                        <?php foreach (get_social() as $social): ?>
                        <li>
                            <a href="<?php echo $social['url'] ?>" target="_blank">
                                <?php echo $social['icon-html']; ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="page-header-callback-container">
                    <button type="button" class="button-medium button-inverse call-back">Бесплатная консультация</button>
                </div>
            </div>
        </div>
    </header>

    <div class="container js-container">

        <div class="nav-mobile-header">
            <button class="hamburger js-hamburger" type="button" tabindex="0">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
            </button>
            <div class="logo"><?php get_default_logo_link(); ?></div>
        </div>
