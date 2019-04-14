'use strict';

((w, d, $, ajax) => {

    $(() => {
        console.info('The site developed by BRAIN WORKS digital agency');
        console.info('Сайт разработан маркетинговым агентством BRAIN WORKS');

        const w = $(w);
        const d = $(d);
        const html = $('html');
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            html.addClass('is-mobile');
        }

        html.removeClass('no-js').addClass('js');

        scrollToElement();
        sidebarAccordion();
        reviews('.js-reviews');
        scrollTop('.js-scroll-top');
        wrapHighlightedElements('.highlighted');
        if (ajax) {
            ajaxLoadMorePosts('.js-load-more', '.js-ajax-posts');
        }
        stickFooter('.js-footer', '.js-container');
        // hamburgerMenu('.js-menu', '.js-hamburger', '.js-menu-close');
        anotherHamburgerMenu('.js-menu', '.js-hamburger', '.js-menu-close');
        buyOneClick('.one-click', '[data-field-id="field7"]', 'h1.page-name');
        // On Copy
        d.on('copy', addLink);
        paymentTriggers('.payment-trigger')();

        w.on('resize', () => {
            if (w.innerWidth >= 630) {
                removeAllStyles($('.js-menu'));
            }
        });

        $('.price-card')
            .each((i, el) => {
                $(el)
                    .parent()
                    .addClass('price-card-wrapper');
            });
    });

    /**
     * Stick Footer
     *
     * @example
     * stickFooter('.js-footer', '.js-wrapper');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} footer - footer element
     * @param {(string|Object)} container - container element
     * @returns {void}
     */
    const stickFooter = (footer, container) => {
        const el = $(footer);
        const height = (el.outerHeight() + 20) + 'px';

        $(container).css('paddingBottom', height);
    };

    /**
     * Reviews - Slick Slider
     *
     * @example
     * reviews('.js-reviews');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} container - reviews container
     * @returns {void}
     */
    const reviews = (container) => {
        const element = $(container);

        if (element.children().length > 1 && typeof $.fn.slick === 'function') {
            element.slick({
                adaptiveHeight: false,
                autoplay: false,
                autoplaySpeed: 3000,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">&lsaquo;</button>',
                nextArrow: '<button type="button" class="slick-next">&rsaquo;</button>',
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                fade: false,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ],
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: true,
                zIndex: 10,
            });

            /*element.on('swipe', (slick, direction) => {
                console.log(slick, direction);
            });

            element.on('afterChange', (slick, currentSlide) => {
                console.log(slick, currentSlide);
            });

            element.on('beforeChange', (slick, currentSlide, nextSlide) => {
                console.log(slick, currentSlide, nextSlide);
            });*/
        }
    };

    /**
     * Hamburger Menu
     *
     * @example
     * hamburgerMenu('.js-menu', '.js-hamburger', '.js-menu-close');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} menuElement - Selected menu
     * @param {(string|Object)} hamburgerElement - Trigger element for open/close menu
     * @param {(string|Object)} closeTrigger - Trigger element for close opened menu
     * @returns {void}
     */
    /*const hamburgerMenu = (menuElement, hamburgerElement, closeTrigger) => {
        const menu = $(menuElement),
            close = $(closeTrigger),
            hamburger = $(hamburgerElement),
            menuAll = hamburger.add(menu);

        hamburger.add(close).on('click', () => {
            menu.toggleClass('is-active');
        });

        $(window).on('load', (event) => {
            if (document.location.hash !== '') {
                scrollToElement(document.location.hash);
            }
        });

        $(window).on('click', (e) => {
            if (!$(e.target).closest(menuAll).length) {
                menu.removeClass('is-active');
            }
        });
    };*/

    /**
     * Scroll to element
     *
     * @param {(string|Object)} elements Elements to add to handler
     * @returns {void}
     */
    /*const scrollHandlerForButton = (elements) => {
        elements = $(elements);

        let i, el;

        for (i = 0; i < elements.length; i++) {

            el = elements.eq(i);

            el.on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                scrollToElement($(e.target.hash), () => {
                    document.location.hash = e.target.hash;
                });
            });

        }
    };*/


    /**
     * Another Hamburger Menu
     *
     * @param {string} menuElement Selector or element
     * @param {string} hamburgerElement Selector or element
     * @param {string} closeTrigger Also selector or element
     * @returns {void}
     */
    const anotherHamburgerMenu = (menuElement, hamburgerElement, closeTrigger) => {
        const Elements = {
            menu: $(menuElement),
            button: $(hamburgerElement),
            close: $(closeTrigger),
        };

        Elements.button.add(Elements.close).on('click', () => {
            Elements.menu.toggleClass('is-active');
        });

        Elements.menu.find('a').on('click', () => {
            Elements.menu.removeClass('is-active');
        });

        /**
         * Arrow Opener
         *
         * @param {Object} parent Selector or element
         * @returns {(Object)} jQuery element
         */
        const arrowOpener = function (parent) {
            const activeArrowClass = 'menu-item-has-children-arrow-active';

            return $('<button />')
                .addClass('menu-item-has-children-arrow')
                .on('click', function () {
                    parent.children('.sub-menu').eq(0).slideToggle(300);
                    if ($(this).hasClass(activeArrowClass)) {
                        $(this).removeClass(activeArrowClass);
                    } else {
                        $(this).addClass(activeArrowClass);
                    }

                });
        };

        const items = Elements.menu.find('.menu-item-has-children, .sub-menu-item-has-children');

        for (let i = 0; i < items.length; i++) {
            items.eq(i).append(arrowOpener(items.eq(i)));
        }
    };

    /**
     * Remove All Styles from sub menu element
     *
     * @param {Object} elementParent selector or element
     * @returns {void}
     */
    const removeAllStyles = (elementParent) => {
        elementParent.find('.sub-menu').removeAttr('style');
    };

    /**
     * Wrap all highlighted elements in container
     *
     * @param {(string|Object)} elements selector or elements
     * @returns {void}
     */
    const wrapHighlightedElements = (elements) => {
        elements = $(elements);

        let i, highlightedHeader;

        for (i = 0; i < elements.length; i++) {
            highlightedHeader = elements.eq(i);

            highlightedHeader.wrap('<div style="display: block;"></div>');
        }
    };

    /**
     * Buy in one click
     *
     * @example
     * buyOneClick('.one-click', '[data-field-id="field7"]', 'h1.page-name');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} button - The selected button when clicking on which the form of purchase pops up
     * @param {(string|Object)} field - The selected field for writing the value (disabled field)
     * @param {(string|Object)} headline - The element from which we get the value to write to the field
     * @returns {void}
     */
    const buyOneClick = (button, field, headline) => {
        const btn = $(button);

        if (btn.length) {
            btn.on('click', () => {
                $(field).prop('disabled', true).val($(headline).text());
            });
        }
    };

    /**
     * Scroll Top
     *
     * @example
     * scrollTop('.js-scroll-top');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} element - Selected element
     * @returns {void}
     */
    const scrollTop = (element) => {
        const el = $(element);

        el.on('click touchend', () => {
            $('html, body').animate({scrollTop: 0}, 'slow');
            return false;
        });

        let scrollPosition;

        $(window).on('scroll', function () {
            scrollPosition = $(this).scrollTop();

            if (scrollPosition > 200) {
                if (!el.hasClass('is-visible')) {
                    el.addClass('is-visible');
                }
            } else {
                el.removeClass('is-visible');
            }
        });
    };

    /**
     * Adding link to the site resource at copying
     *
     * @example
     * document.oncopy = addLink; or $(document).on('copy', addLink);
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @returns {void}
     */
    const addLink = () => {
        const body = document.body || document.getElementsByTagName('body')[0];
        const selection = window.getSelection();
        const page_link = '\n Источник: ' + document.location.href;
        const copy_text = selection + page_link;
        const div = document.createElement('div');

        div.style.position = 'absolute';
        div.style.left = '-9999px';

        body.appendChild(div);
        div.innerText = copy_text;

        selection.selectAllChildren(div);

        window.setTimeout(() => {
            body.removeChild(div);
        }, 0);
    };


    /**
     * Function to add scroll handler for all links with hash as first symbol of href
     *
     * @param {number} [animationSpeed=400] speed of animation
     * @returns {void}
     */
    const scrollToElement = (animationSpeed = 400) => {
        const links = $('a');

        links.each((index, element) => {
            const $element = $(element), href = $element.attr('href');

            if (href[0] === '#') {
                $element.on('click', (e) => {
                    e.preventDefault();

                    const el = $(href);

                    if (el.length) {
                        $('html, body').animate({
                            scrollTop: $(href).offset().top
                        }, animationSpeed);
                    }
                });
            }
        });
    };

    /**
     * Sidebar Accordion
     *
     * @example
     * sidebarAccordion();
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @returns {void}
     */
    const sidebarAccordion = () => {
        const sidebarMenu = $('.sidebar .widget_nav_menu');
        const items = sidebarMenu.find('li');
        const subMenu = items.find('.sub-menu');

        if (subMenu.length) {
            subMenu.each(function (index, value) {
                $(value).parent().first().append('<i class="trigger"></i>');
            });
        }

        const classAction = 'is-opened';
        const trigger = items.find('.trigger');

        trigger.on('click', function () {
            const el = $(this), parent = el.parent();

            if (parent.hasClass(classAction)) {
                parent.removeClass(classAction);
            } else {
                parent.addClass(classAction);
            }
        });
    };

    /**
     * Ajax Load More Posts Handler
     *
     * @example
     * ajaxLoadMorePosts('.js-load-more', '.js-ajax-posts');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {string} selector - Element for event handler (send ajax)
     * @param {string} container - The container to which the html markup will be added
     * @returns {void}
     */
    const ajaxLoadMorePosts = (selector, container) => {
        const btn = $(selector);
        const storage = $(container);

        if (!btn.length && !storage.length) return;

        let data, ajaxStart;

        data = {
            'action': ajax.action,
            'nonce': ajax.nonce,
            'paged': 1,
        };

        btn.on('click', () => {
            if (ajaxStart) return;

            ajaxStart = true;

            btn.addClass('is-loading');

            $.ajax({
                'url': ajax.url,
                'method': 'POST',
                'dataType': 'json',
                'data': data,
            })
                .done((response) => {
                    const posts = response.data;
                    storage.append(response.data);

                    data.paged += 1;

                    ajaxStart = false;

                    btn.removeClass('is-loading');

                    if (posts === '') {
                        btn.remove();
                    }
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    ajaxStart = false;
                    throw new Error(`Handling Ajax request loading posts has caused an ${textStatus} - ${errorThrown}`);
                });

        });
    };

    /**
     * Redirect to the payment page
     * @param {string} selector Triggers
     * @returns {Function} Function that handle payment triggers
     */
    const paymentTriggers = (selector) => {
        // Local variables
        const $select = $('<select />'),
            $button   = $('<button />').addClass('button-medium button-inverse').text('Подтвердить'),
            $span     = $('<span />'),
            $div      = $('<div />'),
            $option   = $('<option />'),
            steps     = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        return () => {
            const elements = $(selector),
                errorPopup = new CustomPopup('.error-popup');
            elements.on('click', (e) => {
                e.preventDefault();
                const $el = $(e.target),
                    product = {
                        name: '' + $el.data('name'),
                        price: '' + $el.data('price'),
                        partsCount: steps[0]
                    },
                    url = new URL(`${location.origin}/wp-json/brainworks/payment`);
                $el.parent().html('')
                    .append(
                        $div.clone()
                            .append(
                                $span.clone().text('Выберите удобное количество платежей:'),
                                $select.clone()
                                    .append(
                                        steps.map(i => $option.clone().val(i).text(i))
                                    )
                                    .on('change', e => {
                                        product.partsCount = e.target.value;
                                    })
                            )
                            .append(
                                $button.clone()
                                    .on('click', e => {
                                        e.preventDefault(); 
                                        if (product.partsCount < steps[0] || product.partsCount > steps[steps.length - 1]) return false;
                                        for (let key in product) {
                                            url.searchParams.append(key, product[key]);
                                        }   
                                        fetch(url) 
                                            .then(data => data.json())
                                            .then(response => {
                                                if (response.type === 'SUCCESS') {
                                                    location.href = response.message;
                                                } else {
                                                    callErrorPopup(errorPopup, response.message);
                                                }
                                            });
                                    })
                            )
                    );
            });
        };
    };

    /**
     * Call popup and display image
     * @param {CustomPopup} popup Selector of popup to call
     * @param {string} message Message to display
     * @returns {void}
     */
    const callErrorPopup = (popup, message) => {
        popup.updateMessageBox(message);
        popup.toggle();
    };

    /**
     * Popup class with public methods
     */
    class CustomPopup {
        /**
         * Initialize popup
         * @param {string} popupSelector Selector of popup to control
         */
        constructor(popupSelector) {
            this.root = document.querySelector(popupSelector);

            if (this.root) {
                const triggers = this.root.querySelectorAll('.popup-trigger');
                if (!triggers.length) {
                    return false;
                }
                triggers.forEach(trigger => trigger.addEventListener('click', this.toggle.bind(this), false));
            }
        }

        /**
         * Toggle popup
         * @returns {void}
         */
        toggle() {
            this.root.classList.toggle('is-active');
        }

        /**
         * get content block of popup
         * @returns {HTMLElement} An element that displays content
         */
        getMessageBox() {
            const content = this.root.querySelector('.message-box');
            if (content) {
                return content;
            }
            const customContentBox = document.createElement('div');
            customContentBox.classList.add('message-box');
            this.root.appendChild(customContentBox);
            return customContentBox;
        }


        /**
         * Update message box of popup
         * @param {string} html HTML Content
         * @returns {void} 
         */
        updateMessageBox(html) {
            const element = this.getMessageBox();
            element.innerHTML = html;
        }
    }

})(window, document, jQuery, window.jpAjax);
