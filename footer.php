</div><!-- .page-wrapper end-->

<footer class="footer js-footer">
    <div class="container">
        <div class="footer-container">
            <div class="logo-container">
                <?php echo get_default_logo_link('logo-colored.svg'); ?>
            </div>
            <div class="copyright-container">
                <span>Сайт разработан <a href="https://brainworks.com.ua" target="_blank">“Brain Works”</a></span>
            </div>
            <div class="social-list-container">
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
            <div class="callback-container">
                <button class="button-medium button-inverse callback-footer">
                    Бесплатная консультация
                </button>
            </div>
        </div>
    </div>
</footer>

</div><!-- .wrapper end-->

<?php scroll_top(); ?>

<?php if (is_customize_preview()) { ?>
    <button class="button-small customizer-edit" data-control='{ "name":"bw_scroll_top_display" }'>
        <?php esc_html_e('Edit Scroll Top', 'brainworks'); ?>
    </button>
    <button class="button-small customizer-edit" data-control='{ "name":"bw_analytics_google_placed" }'>
        <?php esc_html_e('Edit Analytics Tracking Code', 'brainworks'); ?>
    </button>
    <button class="button-small customizer-edit" data-control='{ "name":"bw_login_logo" }'>
        <?php esc_html_e('Edit Login Logo', 'brainworks'); ?>
    </button>
<?php } ?>

<div class="is-hide"><?php svg_sprite(); ?></div>

<?php wp_footer(); ?>

</body>
</html>
