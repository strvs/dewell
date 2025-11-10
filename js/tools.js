let timerHeaderFavourite = null;

$(document).ready(function() {

    $('form').each(function() {
        initForm($(this));
    });

    $('.footer-subscribe-form form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                if (!curForm.find('.footer-subscribe-form-submit input').prop('disabled')) {
                    curForm.find('.footer-subscribe-form-submit input').prop('disabled', true);
                    var formData = new FormData(form);
                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('data-action'),
                        processData: false,
                        contentType: false,
                        dataType: 'html',
                        data: formData,
                        cache: false
                    }).done(function(html) {
                        $('.footer-subscribe .container').html(html);
                    });
                }
            }
        });
    });

    let headerTimer = null;

    $('.header-menu-item').mouseenter(function() {
        if ($(window).width() > 1359) {
            const curItem = $(this);
            if (curItem.find('.header-menu-item-submenu').length == 1) {
                window.clearTimeout(headerTimer);
                headerTimer = null;
                $('.header-sub-bg').stop(true, true).fadeIn(200);
                curItem.find('.header-menu-item-submenu').stop(true, true).slideDown(200);
            }
        }
    });

    $('.header-menu-item').mouseleave(function() {
        if ($(window).width() > 1359) {
            const curItem = $(this);
            curItem.find('.header-menu-item-submenu').stop(true, true).slideUp(200);
            headerTimer = window.setTimeout(function() {
                $('.header-sub-bg').stop(true, true).fadeOut(200);
            }, 200);
        }
    });

    $('.header-menu-company-menu-item a').mouseenter(function() {
        const curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.header-menu-company-menu-item.active').removeClass('active');
            curItem.addClass('active');
            const curIndex = $('.header-menu-company-menu-item').index(curItem);
            $('.header-menu-company-right-item.active').removeClass('active');
            $('.header-menu-company-right-item').eq(curIndex).addClass('active');
        }
    });

    $('.header-menu-projects-item[data-img]').each(function() {
        var curItem = $(this);
        curItem.css({'background-image': 'url("' + curItem.attr('data-img') + '")'});
    });

    $('.header-menu-projects-item-link').on('mouseenter', function() {
        $('.header-menu-projects-item-link.hover').removeClass('hover');
        $(this).addClass('hover');
        var curItem = $(this).parent();
        $('.header-menu-projects-info').css({'background-image': 'url("' + curItem.attr('data-img') + '")'});
        $('.header-menu-projects-info-title').html(curItem.find('.header-menu-projects-item-title').html());
        $('.header-menu-projects-info-flats').html('').html(curItem.find('.header-menu-projects-item-flats').html());
        $('.header-menu-projects-info-price').html('').html(curItem.find('.header-menu-projects-item-info strong').html());
    });

    $('.header-menu-realty-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.header-menu-realty-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.header-menu-realty-menu-item').index(curItem);
            $('.header-menu-realty-item.active').removeClass('active')
            $('.header-menu-realty-item').eq(curIndex).addClass('active')
        }
        e.preventDefault();
    });

    $('.header-menu-realty-menu-item a').eq(0).trigger('click');

    $('body').on('click', '.header-menu-link', function(e) {
        if ($('html').hasClass('menu-open')) {
            $('html').removeClass('menu-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-open');
            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);
        }
        e.preventDefault();
    });

    $('body').on('click', '.header-contacts-mobile', function(e) {
        var curScroll = $(window).scrollTop();
        $('html').addClass('mobile-contacts-open');
        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        e.preventDefault();
    });

    $('body').on('click', '.mobile-contacts-close', function(e) {
        $('html').removeClass('mobile-contacts-open');
        $('.wrapper').css({'top': 'auto'});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('mobile-contacts')) {
            $('html').removeClass('mobile-contacts-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }
    });

    $('.mobile-menu-item-parent a').click(function(e) {
        const curItem = $(this).parent().parent();
        if (curItem.find('.mobile-menu-item-sub').length == 1) {
            curItem.toggleClass('open');
            e.preventDefault();
        }
    });

    $('body').on('click', '.window-link', function(e) {
        if ($('html').hasClass('menu-open')) {
            $('html').removeClass('menu-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }
        if ($('html').hasClass('mobile-contacts-open')) {
            $('html').removeClass('mobile-contacts-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }
        var curLink = $(this);
        $('.window-link').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.main-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            speed: 400,
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true,
            },
            autoplay: {
                delay: 4000,
            },
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
        });
    });

    $('body').on('click', '.main-slider-notice-label', function() {
        $(this).parent().toggleClass('open');
    });

    $('.main-select-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.main-select-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.main-select-slider-min').html());
        if (Number(curSlider.find('.main-select-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.main-select-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.main-select-slider-max').html());
        if (Number(curSlider.find('.main-select-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.main-select-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.main-select-slider-min').html()),
                'max': Number(curSlider.find('.main-select-slider-max').html())
            },
            step: Number(curSlider.find('.main-select-slider-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.main-select-slider-from').val(values[handle]);
                curSlider.find('.main-select-slider-text-from span').html(String(values[handle]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;'));
            } else {
                curSlider.find('.main-select-slider-to').val(values[handle]);
                curSlider.find('.main-select-slider-text-to span').html(String(values[handle]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;'));
            }
        });
        curRange.noUiSlider.on('set', function(values, handle) {
            $('.catalogue-filter-form form').each(function() {
                updateSelectList();
            });

            $('.main-select-form form').each(function() {
                updateSelectListMain();
            });

            $('.project-select form').each(function() {
                updateSelectListProject();
            });

            $('.commercial-filter-form form').each(function() {
                updateCommercialList();
            });
        });
    });

    $('body').on('change', '.main-select-rooms input', function() {
        $('.catalogue-filter-form form').each(function() {
            updateSelectList();
        });

        $('.main-select-form form').each(function() {
            updateSelectListMain();
        });

        $('.project-select form').each(function() {
            updateSelectListProject();
        });
    });

    $('body').on('change', '.main-select-props input', function() {
        var curProp = $(this);
        var curValue = $(this).attr('value');
        $('.main-select-props-full input[value="' + curValue + '"]').prop('checked', curProp.prop('checked'));
        $('.catalogue-filter-form form').each(function() {
            updateSelectList();
        });

        $('.main-select-form form').each(function() {
            updateSelectListMain();
        });

        $('.project-select form').each(function() {
            updateSelectListProject();
        });
    });

    $('body').on('change', '.main-select-props-full input', function() {
        var curProp = $(this);
        var curValue = $(this).attr('value');
        $('.main-select-props input[value="' + curValue + '"]').prop('checked', curProp.prop('checked'));
        $('.catalogue-filter-form form').each(function() {
            updateSelectList();
        });

        $('.main-select-form form').each(function() {
            updateSelectListMain();
        });

        $('.project-select form').each(function() {
            updateSelectListProject();
        });
    });

    $('body').on('change', '.main-select-deadlines input', function() {
        $('.catalogue-filter-form form').each(function() {
            updateSelectList();
        });

        $('.main-select-form form').each(function() {
            updateSelectListMain();
        });

        $('.project-select form').each(function() {
            updateSelectListProject();
        });
    });

    $('body').on('change', '.main-select-features input', function() {
        $('.commercial-filter-form form').each(function() {
            updateCommercialList();
        });
    });

    $('body').on('change', '.main-select-dropdown-list input', function() {
        var curInput = $(this);
        var curSelect = curInput.parents().filter('.main-select-dropdown');
        if (curSelect.hasClass('main-select-dropdown-project')) {
            if (curInput.hasClass('main-select-dropdown-projects-item-parent-all')) {
                if (curInput.prop('checked')) {
                    $('.main-select-dropdown-project input:not(.main-select-dropdown-projects-item-parent-all)').prop('checked', false);
                } else {
                    if ($('.main-select-dropdown-project input:not(.main-select-dropdown-projects-item-parent-all):checked').length == 0) {
                        curInput.prop('checked', true);
                    }
                }
            } else {
                if ($('.main-select-dropdown-project input:not(.main-select-dropdown-projects-item-parent-all):checked').length == 0) {
                    $('.main-select-dropdown-project input.main-select-dropdown-projects-item-parent-all').prop('checked', true);
                } else {
                    $('.main-select-dropdown-project input.main-select-dropdown-projects-item-parent-all').prop('checked', false);
                }
            }
        }
        if (curSelect.hasClass('main-select-dropdown-deadline')) {
            curSelect.find('.main-select-dropdown-current span').html(curSelect.find('.main-select-dropdown-list input:checked').parent().find('span').html());
        }
        $('.catalogue-filter-form form').each(function() {
            updateSelectList();
        });

        $('.main-select-form form').each(function() {
            updateSelectListMain();
        });

        $('.commercial-filter-form form').each(function() {
            updateCommercialList();
        });
    });

    $('.main-select-dropdown-current').click(function() {
        var curItem = $(this).parent();
        if (curItem.hasClass('open')) {
            curItem.removeClass('open');
        } else {
            $('.main-select-dropdown.open').removeClass('open');
            curItem.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-select-dropdown').length == 0) {
            $('.main-select-dropdown.open').removeClass('open');
        }
    });

    $('.main-select-reset').click(function(e) {
        $('.main-select-rooms input').prop('checked', false);
        $('.main-select-slider').each(function() {
            var curSlider = $(this);
            curSlider.find('.main-select-slider-range-inner')[0].noUiSlider.set([Number(curSlider.find('.main-select-slider-min').html()), Number(curSlider.find('.main-select-slider-max').html())]);
        });
        $('.main-select-dropdown-deadlines input[value="0"]').prop('checked', true);
        $('.main-select-dropdown-deadline .main-select-dropdown-current span').html($('.main-select-dropdown-deadlines input[value="0"]').parent().find('span').html());
        $('.main-select-deadlines input').prop('checked', false);
        $('.main-select-props input').prop('checked', false);
        $('.main-select-props-full input').prop('checked', false);
        $('.main-select-dropdown-projects-item-parent input').prop('checked', false);
        $('.main-select-dropdown-projects-item-parent-all').prop('checked', true);
        $('.main-select-features input').prop('checked', false);

        $('.catalogue-filter-form form').each(function() {
            updateSelectList();
        });

        $('.main-select-form form').each(function() {
            updateSelectListMain();
        });

        $('.commercial-filter-form form').each(function() {
            updateCommercialList();
        });
        e.preventDefault();
    });

    $('.main-project-photo-images').each(function() {
        const curSlider = $(this);
        const curBlock = curSlider.parent();
        curSlider.find('.main-project-photo-images-item').eq(0).addClass('active');
        const countSlides = curSlider.find('.main-project-photo-images-item').length;
        if (countSlides > 1) {
            let dotsHTML =  '<div class="main-project-photo-dots">';
            for (let i = 0; i < countSlides; i++) {
                dotsHTML +=     '<div class="main-project-photo-dot"></div>'
            }
            dotsHTML +=     '</div>';
            curBlock.append(dotsHTML);
            curBlock.find('.main-project-photo-dot').eq(0).addClass('active');
        }
    });

    $('.main-project-photo').mouseenter(function(e) {
        if ($(window).width() > 1359) {
            const curBlock = $(this);
            const curPosition = Math.floor((e.pageX - curBlock.offset().left) / curBlock.width() * curBlock.find('.main-project-photo-dot').length);
            curBlock.find('.main-project-photo-dot.active').removeClass('active');
            curBlock.find('.main-project-photo-dot').eq(curPosition).addClass('active');
            curBlock.find('.main-project-photo-images-item:lt(' + curPosition + ')').addClass('active');
            curBlock.find('.main-project-photo-images-item:gt(' + curPosition + ')').removeClass('active');
        }
    });

    $('.main-project-photo').mousemove(function(e) {
        if ($(window).width() > 1359) {
            const curBlock = $(this);
            const curPosition = Math.floor((e.pageX - curBlock.offset().left) / curBlock.width() * curBlock.find('.main-project-photo-dot').length);
            curBlock.find('.main-project-photo-dot.active').removeClass('active');
            curBlock.find('.main-project-photo-dot').eq(curPosition).addClass('active');
            curBlock.find('.main-project-photo-images-item:lt(' + (curPosition + 1) + ')').addClass('active');
            curBlock.find('.main-project-photo-images-item:gt(' + curPosition + ')').removeClass('active');
        }
    });

    $('.main-project-photo').mouseleave(function(e) {
        if ($(window).width() > 1359) {
            const curBlock = $(this);
            curBlock.find('.main-project-photo-dot.active').removeClass('active');
            curBlock.find('.main-project-photo-dot').eq(0).addClass('active');
            curBlock.find('.main-project-photo-images-item.active').removeClass('active');
            curBlock.find('.main-project-photo-images-item').eq(0).addClass('active');
        }
    });

    $('.projects-success-item-images').each(function() {
        const curSlider = $(this);
        const curBlock = curSlider.parent();
        curSlider.find('.projects-success-item-images-item').eq(0).addClass('active');
        const countSlides = curSlider.find('.projects-success-item-images-item').length;
        if (countSlides > 1) {
            let dotsHTML =  '<div class="projects-success-item-dots">';
            for (let i = 0; i < countSlides; i++) {
                dotsHTML +=     '<div class="projects-success-item-dot"></div>'
            }
            dotsHTML +=     '</div>';
            curBlock.append(dotsHTML);
            curBlock.find('.projects-success-item-dot').eq(0).addClass('active');
        }
    });

    $('.projects-success-item-preview').mouseenter(function(e) {
        if ($(window).width() > 1359) {
            const curBlock = $(this);
            const curPosition = Math.floor((e.pageX - curBlock.offset().left) / curBlock.width() * curBlock.find('.projects-success-item-dot').length);
            curBlock.find('.projects-success-item-dot.active').removeClass('active');
            curBlock.find('.projects-success-item-dot').eq(curPosition).addClass('active');
            curBlock.find('.projects-success-item-images-item:lt(' + curPosition + ')').addClass('active');
            curBlock.find('.projects-success-item-images-item:gt(' + curPosition + ')').removeClass('active');
        }
    });

    $('.projects-success-item-preview').mousemove(function(e) {
        if ($(window).width() > 1359) {
            const curBlock = $(this);
            const curPosition = Math.floor((e.pageX - curBlock.offset().left) / curBlock.width() * curBlock.find('.projects-success-item-dot').length);
            curBlock.find('.projects-success-item-dot.active').removeClass('active');
            curBlock.find('.projects-success-item-dot').eq(curPosition).addClass('active');
            curBlock.find('.projects-success-item-images-item:lt(' + (curPosition + 1) + ')').addClass('active');
            curBlock.find('.projects-success-item-images-item:gt(' + curPosition + ')').removeClass('active');
        }
    });

    $('.projects-success-item-preview').mouseleave(function(e) {
        if ($(window).width() > 1359) {
            const curBlock = $(this);
            curBlock.find('.projects-success-item-dot.active').removeClass('active');
            curBlock.find('.projects-success-item-dot').eq(0).addClass('active');
            curBlock.find('.projects-success-item-images-item.active').removeClass('active');
            curBlock.find('.projects-success-item-images-item').eq(0).addClass('active');
        }
    });

    $('.main-project-text').mouseenter(function(e) {
        if ($(window).width() > 1359) {
            const curProject = $(this).parents().filter('.main-project');
            curProject.find('.main-project-photo').stop(true, true);
            if (curProject.find('.main-project-detail').length == 1) {
                const textHeight = curProject.find('.main-project-detail').outerHeight();
                curProject.css({'min-height': curProject.outerHeight()});
                curProject.find('.main-project-photo').attr('data-height', curProject.find('.main-project-photo').height());
                curProject.find('.main-project-photo').animate({'height': curProject.find('.main-project-photo').height() - textHeight}, 200);
                curProject.find('.main-project-detail').addClass('visible');
            }
        }
    });

    $('.project-schemes-menu-inner a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.project-schemes-menu-inner a.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.project-schemes-menu-inner a').index(curLink);
            $('.project-schemes-item.active').removeClass('active');
            $('.project-schemes-item').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-project-text').mouseleave(function(e) {
        if ($(window).width() > 1359) {
            const curProject = $(this).parents().filter('.main-project');
            curProject.find('.main-project-photo').stop(true, true);
            curProject.find('.main-project-photo').animate({'height': Number(curProject.find('.main-project-photo').attr('data-height'))}, 200, function() {
                curProject.find('.main-project-photo').removeAttr('style');
                curProject.css({'min-height': 0});
            });
            curProject.find('.main-project-detail').removeClass('visible');
        }
    });

    $('.main-career').each(function() {
        var curSlider = $(this);
        let countView = 4;
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
            breakpoints: {
                1360: {
                    freeMode: false,
                    slidesPerView: countView
                }
            },
        });
    });

    $('.main-news').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
            breakpoints: {
                1360: {
                    freeMode: false,
                    slidesPerView: 4
                }
            },
        });
    });

    $('.catalogue-filter-form form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                updateSelectList();
            }
        });
    });

    $('.commercial-filter-form form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                updateCommercialList();
            }
        });
    });

    $('.main-select-filter').click(function(e) {
        $('.catalogue-filter-form').toggleClass('open');
        e.preventDefault();
    });

    $('.catalogue-results-more a').click(function(e) {
        var htmlList = '';
        for (var i = catalogueView; i < newData.length && i < (catalogueView + catalogueSize); i++) {
            var curFlat = newData[i];

            htmlList += '<div class="catalogue-item">' +
                            '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                                '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                                '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '/' + curFlat.floors + '</div>' +
                                '<div class="catalogue-item-preview">' +
                                    '<div class="catalogue-item-preview-list">' +
                                        '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                                '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                                '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                                '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadline + '</span></div>';
            if (curFlat.features.length > 0) {
                htmlList +=     '<div class="catalogue-item-props">';
                var countFeatures = 0;
                for (var j = 0; j < curFlat.features.length; j++) {
                    var curValues = curFlat.features[j].value.split('/');
                    for (var k = 0; k < curValues.length; k++) {
                        countFeatures++;
                        if (countFeatures < 3) {
                            htmlList += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                        }
                    }
                }
                if (countFeatures > 2) {
                    htmlList +=     '<div class="catalogue-item-prop">+' + (countFeatures - 2) + '</div>';
                }
                htmlList +=     '</div>';
            }
            htmlList +=         '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                            '</a>' +
                            '<a href="#" class="catalogue-item-favourite"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></a>' +
                        '</div>';
        }

        $('.catalogue-list').append(htmlList);
        catalogueView += catalogueSize;
        if (newData.length > catalogueView) {
            var newCount = catalogueSize;
            if (newData.length - catalogueView < catalogueSize) {
                newCount = newData.length - catalogueView;
            }
            $('.catalogue-results-more').addClass('visible');
            $('.catalogue-results-more span').eq(0).html(newCount);
        } else {
            $('.catalogue-results-more').removeClass('visible');
            catalogueView = newData.length;
        }
        e.preventDefault();
    });

    $('.catalogue-results-more-favourite a').click(function(e) {
        var htmlList = '';
        for (var i = catalogueView; i < newData.length && i < (catalogueView + catalogueSize); i++) {
            var curFlat = newData[i];

            htmlList += '<div class="catalogue-item">' +
                            '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                                '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                                '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '/' + curFlat.floors + '</div>' +
                                '<div class="catalogue-item-preview">' +
                                    '<div class="catalogue-item-preview-list">' +
                                        '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                                '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                                '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                                '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadline + '</span></div>';
            if (curFlat.features.length > 0) {
                htmlList +=     '<div class="catalogue-item-props">';
                var countFeatures = 0;
                for (var j = 0; j < curFlat.features.length; j++) {
                    var curValues = curFlat.features[j].value.split('/');
                    for (var k = 0; k < curValues.length; k++) {
                        countFeatures++;
                        if (countFeatures < 3) {
                            htmlList += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                        }
                    }
                }
                if (countFeatures > 2) {
                    htmlList +=     '<div class="catalogue-item-prop">+' + (countFeatures - 2) + '</div>';
                }
                htmlList +=     '</div>';
            }
            htmlList +=         '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                            '</a>' +
                            '<a href="#" class="catalogue-item-favourite"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></a>' +
                        '</div>';
        }

        $('.catalogue-list').append(htmlList);
        catalogueView += catalogueSize;
        if (newData.length > catalogueView) {
            var newCount = catalogueSize;
            if (newData.length - catalogueView < catalogueSize) {
                newCount = newData.length - catalogueView;
            }
            $('.catalogue-results-more-favourite').addClass('visible');
            $('.catalogue-results-more-favourite span').eq(0).html(newCount);
        } else {
            $('.catalogue-results-more-favourite').removeClass('visible');
            catalogueView = newData.length;
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-filter-params-item a', function(e) {
        var curItem = $(this).parent();

        if (curItem.hasClass('catalogue-filter-params-item-projects')) {
            $('.main-select-dropdown-projects-item-parent').each(function() {
                var curProject = $(this);
                if (curProject.find('input').attr('value') == curItem.attr('data-value')) {
                    curProject.find('input').prop('checked', false);
                }
                if ($('.main-select-dropdown-project input:not(.main-select-dropdown-projects-item-parent-all):checked').length == 0) {
                    $('.main-select-dropdown-project input.main-select-dropdown-projects-item-parent-all').prop('checked', true);
                }
            });
        }

        if (curItem.hasClass('catalogue-filter-params-item-rooms')) {
            $('.main-select-rooms input').each(function() {
                var curInput = $(this);
                if (curInput.attr('value') == curItem.attr('data-value')) {
                    curInput.prop('checked', false);
                }
            });
        }

        if (curItem.hasClass('catalogue-filter-params-item-price')) {
            $('.main-select-slider-price').each(function() {
                var curSlider = $(this);
                var curRange = curSlider.find('.main-select-slider-range-inner')[0];
                curRange.noUiSlider.set([Number(curSlider.find('.main-select-slider-min').html()), Number(curSlider.find('.main-select-slider-max').html())]);
            });
        }

        if (curItem.hasClass('catalogue-filter-params-item-size')) {
            $('.main-select-slider-size').each(function() {
                var curSlider = $(this);
                var curRange = curSlider.find('.main-select-slider-range-inner')[0];
                curRange.noUiSlider.set([Number(curSlider.find('.main-select-slider-min').html()), Number(curSlider.find('.main-select-slider-max').html())]);
            });
        }

        if (curItem.hasClass('catalogue-filter-params-item-floors')) {
            $('.main-select-slider-floor').each(function() {
                var curSlider = $(this);
                var curRange = curSlider.find('.main-select-slider-range-inner')[0];
                curRange.noUiSlider.set([Number(curSlider.find('.main-select-slider-min').html()), Number(curSlider.find('.main-select-slider-max').html())]);
            });
        }

        if (curItem.hasClass('catalogue-filter-params-item-deadlines')) {
            $('.main-select-deadlines input').each(function() {
                var curInput = $(this);
                if (curInput.attr('value') == curItem.attr('data-value')) {
                    curInput.prop('checked', false);
                }
            });
        }

        if (curItem.hasClass('catalogue-filter-params-item-props')) {
            $('.main-select-props-full input, .main-select-props input').each(function() {
                var curInput = $(this);
                if (curInput.attr('value') == curItem.attr('data-value')) {
                    curInput.prop('checked', false);
                }
            });
        }

        updateSelectList();

        e.preventDefault();
    });

    $('.catalogue-results-sort-popup-item').click(function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.catalogue-results-sort-popup-item.active').removeClass('active');
            curItem.addClass('active');
            $('.catalogue-results-sort-link span').html(curItem.attr('data-title'));
            if (curItem.hasClass('down')) {
                $('.catalogue-results-sort-link').addClass('down');
            } else {
                $('.catalogue-results-sort-link').removeClass('down');
            }
            updateSelectList();
        }
    });

    $('body').on('click', '.catalogue-item-props', function(e) {
        var curItem = $(this).parents().filter('.catalogue-item');
        if (curItem.find('.catalogue-item-props-popup').length == 1) {
            curItem.toggleClass('open-props');
        }
        return false;
    });

    $('body').on('click', '.catalogue-item-favourite', function(e) {
        var curItem = $(this).parents().filter('.catalogue-item');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $.removeCookie('favourite-' + curItem.attr('data-project') + '-' + curItem.attr('data-build') + '-' + curItem.attr('data-id'), {path: '/'});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + curItem.find('.catalogue-item-preview-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + curItem.find('.catalogue-item-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Удалено из избранного</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        } else {
            $(this).addClass('active');
            $.cookie('favourite-' + curItem.attr('data-project') + '-' + curItem.attr('data-build') + '-' + curItem.attr('data-id'), 'true', {path:'/', expires: 365});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + curItem.find('.catalogue-item-preview-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + curItem.find('.catalogue-item-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status active"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Добавлено в избранное</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        }
        e.preventDefault();
    });

    $('.detail-favourite').each(function() {
        var curLink = $(this);
        if (typeof $.cookie('favourite-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id')) != 'undefined' && $.cookie('favourite-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id'))) {
            curLink.addClass('active');
        }
    });

    $('.detail-favourite').click(function(e) {
        var curLink = $(this);
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $.removeCookie('favourite-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id'), {path: '/'});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + $('.detail-media-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + $('.detail-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Удалено из избранного</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        } else {
            $(this).addClass('active');
            $.cookie('favourite-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id'), 'true', {path:'/', expires: 365});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + $('.detail-media-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + $('.detail-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status active"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Добавлено в избранное</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        }
        e.preventDefault();
    });

    var detailMediaSlider;
    $('.detail-media-container').each(function() {
        var curSlider = $(this);
        detailMediaSlider = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 1,
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true,
            },
            on: {
                afterInit: function () {
                    $('.detail-media-menu-item.active').removeClass('active');
                    $('.detail-media-menu-item').eq(0).addClass('active');
                    $('.detail-zoom').attr('href', $('.detail-media-item').eq(0).find('a').attr('href'));
                    $('.detail-download').attr('href', $('.detail-media-item').eq(0).find('a').attr('href'));
                },
                slideChange: function () {
                    $('.detail-media-menu-item.active').removeClass('active');
                    $('.detail-media-menu-item').eq(detailMediaSlider.activeIndex).addClass('active');
                    $('.detail-zoom').attr('href', $('.detail-media-item').eq(detailMediaSlider.activeIndex).find('a').attr('href'));
                    $('.detail-download').attr('href', $('.detail-media-item').eq(detailMediaSlider.activeIndex).find('a').attr('href'));
                },
            },
        });
    });

    $('.detail-media-menu-item').click(function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            var curIndex = $('.detail-media-menu-item').index(curItem);
            detailMediaSlider.slideTo(curIndex);
        }
    });

    $('.detail-buy-menu-item').click(function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.detail-buy-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.detail-buy-menu-item').index(curItem);
            $('.detail-buy-content.active').removeClass('active');
            $('.detail-buy-content').eq(curIndex).addClass('active');
            $(window).trigger('scroll');
        }
    });

    $('.detail-features-title').click(function() {
        $('.detail-features').toggleClass('open');
        $(window).trigger('scroll');
    });

    $('.detail-compass').each(function() {
        var curIMG = $(this).find('img');
        curIMG.css({'transform': 'rotate(' + curIMG.attr('attr-angle') + 'deg)'});
    });

    $('.news-filter-current').click(function() {
        var curItem = $(this).parent();
        curItem.toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.news-filter').length == 0) {
            $('.news-filter.open').removeClass('open');
        }
    });

    $('body').on('click', '.news-filter-item a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.news-filter-item.active').removeClass('active');
            curItem.addClass('active');
            $('.news-filter-current span').html(curItem.find('a').html());
            updateNewsList();
        }
        $('.news-filter.open').removeClass('open');
        e.preventDefault();
    });

    $('.news').each(function() {
        let newsTypes = [];
        let newsProjects = []
        $('.news-item').each(function() {
            let curItem = $(this);

            let curType = curItem.attr('attr-section-name');
            if (curType) {
                let isTypeHas = false;
                for (let i = 0; i < newsTypes.length; i++) {
                    if (newsTypes[i].title == curType) {
                        isTypeHas = true;
                        newsTypes[i].count++;
                    }
                }
                if (!isTypeHas) {
                    newsTypes.push({'title': curType, 'count': 1});
                }
            }

            let curProject = curItem.attr('attr-prj-name');
            if (curProject) {
                let isProjectHas = false;
                for (let i = 0; i < newsProjects.length; i++) {
                    if (newsProjects[i] == curProject) {
                        isProjectHas = true;
                    }
                }
                if (!isProjectHas) {
                    newsProjects.push(curProject);
                }
            }
        });
        for (let i = 0; i < newsTypes.length; i++) {
            $('.news-menu').append('<div class="news-menu-item" attr-section-name="' + newsTypes[i].title + '"><a href="#">' + newsTypes[i].title + ' (<span>' + newsTypes[i].count + '</span>)</a></div>');
        }
        for (let i = 0; i < newsProjects.length; i++) {
            $('.news-filter-list').append('<div class="news-filter-item" attr-prj-name="' + newsProjects[i] + '"><a href="#">' + newsProjects[i] + '</a></div>');
        }
        updateNewsList();
    });

    function updateNewsList() {
        const curType = $('.news-menu-item.active').attr('attr-section-name');
        const curProject = $('.news-filter-item.active').attr('attr-prj-name');
        $('.news-item.visible').removeClass('visible');
        $('.news-more').removeClass('visible');
        let countNews = 0;
        $('.news-item').each(function() {
            const curItem = $(this);

            let isTypeCorrect = false;
            const itemType = curItem.attr('attr-section-name');
            if (!curType || curType == itemType) {
                isTypeCorrect = true;
            }

            let isProjectCorrect = false;
            const itemProject = curItem.attr('attr-prj-name');
            if (!curProject || curProject == itemProject) {
                isProjectCorrect = true;
            }

            if (isTypeCorrect && isProjectCorrect) {
                countNews++;
                if (countNews <= 9) {
                    curItem.addClass('visible');
                }
            }
        });
        if (countNews > 9) {
            $('.news-more').addClass('visible');
            $('.news-more').attr('data-count', 9);
        }
    }

    $('.news-more a').click(function(e) {
        let curCount = Number($('.news-more').attr('data-count'));
        curCount += 9;
        const curType = $('.news-menu-item.active').attr('attr-section-name');
        const curProject = $('.news-filter-item.active').attr('attr-prj-name');
        let countNews = 0;
        $('.news-item').each(function() {
            const curItem = $(this);

            let isTypeCorrect = false;
            const itemType = curItem.attr('attr-section-name');
            if (!curType || curType == itemType) {
                isTypeCorrect = true;
            }

            let isProjectCorrect = false;
            const itemProject = curItem.attr('attr-prj-name');
            if (!curProject || curProject == itemProject) {
                isProjectCorrect = true;
            }

            if (isTypeCorrect && isProjectCorrect) {
                countNews++;
                if (countNews <= curCount) {
                    curItem.addClass('visible');
                }
            }
        });
        if (countNews > curCount) {
            $('.news-more').addClass('visible');
            $('.news-more').attr('data-count', curCount);
        } else {
            $('.news-more').removeClass('visible');
        }
        e.preventDefault();
    });

    $('body').on('click', '.news-menu-item a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.news-menu-item.active').removeClass('active');
            curItem.addClass('active');
            updateNewsList();
        }
        e.preventDefault();
    });

    $('.projects-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.projects-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.projects-menu-item').index(curItem);
            $('.projects-content.active').removeClass('active');
            $('.projects-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.project-header-gallery').each(function() {
        var curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 1,
            speed: 400,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true,
            },
            scrollbar: {
                el: curSlider.find('.swiper-scrollbar')[0],
                snapOnRelease: false,
                dragSize: 'auto',
                draggable: true,
            }
        });
    });

    $('.project-tabs-menu').each(function() {
        const curSlider = $(this);
        const curSwiper = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
            speed: 400,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            on: {
                init: function() {
                    if (curSlider.find('.swiper-button-next').hasClass('swiper-button-disabled')) {
                        curSlider.addClass('without-ctrl');
                    }
                },
                sliderMove: function() {
                    if (curSwiper.progress > 0) {
                        curSlider.addClass('with-left');
                    } else {
                        curSlider.removeClass('with-left');
                    }
                },
                transitionEnd: function() {
                    if (curSwiper.progress > 0) {
                        curSlider.addClass('with-left');
                    } else {
                        curSlider.removeClass('with-left');
                    }
                }
            }
        });
    });

    $('.project-tabs-menu-item a').click(function(e) {
        const curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            const curTabs = curItem.parents().filter('.project-tabs');
            curTabs.find('.project-tabs-menu-item.active').removeClass('active');
            curItem.addClass('active');
            const curIndex = curTabs.find('.project-tabs-menu-item').index(curItem);
            curTabs.find('.project-tabs-content.active').removeClass('active');
            curTabs.find('.project-tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.project-gallery').each(function() {
        var curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            speed: 400,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true,
            }
        });
    });

    $('body').on('click', '.project-gallery-item-hint-icon', function() {
        $(this).parent().toggleClass('open');
    });

    $('.project-features-item').mouseenter(function(e) {
        if ($(window).width() > 1359) {
            const curItem = $(this);
            curItem.find('.project-features-item-photo').stop(true, true);
            if (curItem.find('.project-features-item-text').length == 1) {
                const textHeight = curItem.find('.project-features-item-text').outerHeight();
                curItem.css({'min-height': curItem.outerHeight()});
                curItem.find('.project-features-item-photo').attr('data-height', curItem.find('.project-features-item-photo').height());
                curItem.find('.project-features-item-photo').animate({'height': curItem.find('.project-features-item-photo').height() - textHeight}, 200);
                curItem.find('.project-features-item-text').addClass('visible');
            }
        }
    });

    $('.project-features-item').mouseleave(function(e) {
        if ($(window).width() > 1359) {
            const curItem = $(this);
            curItem.find('.project-features-item-photo').stop(true, true);
            curItem.find('.project-features-item-photo').animate({'height': Number(curItem.find('.project-features-item-photo').attr('data-height'))}, 200, function() {
                curItem.find('.project-features-item-photo').removeAttr('style');
                curItem.css({'min-height': 0});
            });
            curItem.find('.project-features-item-text').removeClass('visible');
        }
    });

    $('.project-progress-filter-current').click(function() {
        var curItem = $(this).parent();
        curItem.toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.project-progress-filter').length == 0) {
            $('.project-progress-filter.open').removeClass('open');
        }
    });

    let projectProgress;

    $('.project-progress-filter-item a').click(function(e) {
        const curLink = $(this);
        const curItem = curLink.parent();
        if (!curItem.hasClass('active')) {
            $('.project-progress-filter-item.active').removeClass('active');
            curItem.addClass('active');
            $('.project-progress-filter-current span').html(curLink.html());
            $('.project-progress-filter.open').removeClass('open');
            $('.project-progress .swiper-slide').removeClass('hidden');
            if (curItem.attr('attr-id')) {
                const curYear = curItem.attr('attr-id');
                $('.project-progress .swiper-slide').each(function() {
                    const curSlide = $(this);
                    if (curSlide.find('.project-progress-item').attr('attr-year-id') !== curYear) {
                        curSlide.addClass('hidden');
                    }
                });
            }
            if (projectProgress) {
                projectProgress.update();
            }
        }
        e.preventDefault();
    });

    $('.project-progress').each(function() {
        var curSlider = $(this);
        projectProgress = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
            breakpoints: {
                1360: {
                    slidesPerView: 4,
                    speed: 400,
                    freeMode: false,
                }
            },
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
        });
    });

    $('.project-progress-item').click(function(e) {
        const curItem = $(this);
        const curImages = JSON.parse(curItem.attr('attr-json-imgs'));
        const curDescrs = JSON.parse(curItem.attr('attr-json-descr'));
        const fancyData = [];
        for (let i = 0; i < curImages.length; i++) {
            if (curDescrs[i].indexOf('http') == -1) {
                fancyData.push({
                    src: curImages[i],
                    opts: {
                        caption : curDescrs[i],
                    }
                });
            } else {
                fancyData.push({
                    src: curDescrs[i]
                });
            }
        }
        $.fancybox.open(fancyData);
        e.preventDefault();
    });

    $('.about-success-text-more a').click(function(e) {
        $('.about-success-text').toggleClass('open');
        e.preventDefault();
    });

    $('.about-team-list').each(function() {
        var curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
            speed: 400,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            breakpoints: {
                1360: {
                    freeMode: false,
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                }
            },
            scrollbar: {
                el: curSlider.find('.swiper-scrollbar')[0],
                snapOnRelease: false,
                dragSize: 'auto',
                draggable: true,
            }
        });
    });

    $('.faq-menu-item a').click(function(e) {
        const curLink = $(this);
        const curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.faq-menu-item.active').removeClass('active');
            const curIndex = $('faq-menu-item').index(curItem);
            curItem.addClass('active');
            const curType = curLink.attr('attr-sectionid');
            if (curType) {
                $('.faq-item').each(function() {
                    const faqItem = $(this);
                    const faqType = faqItem.attr('attr-sectionid');
                    if (faqType && faqType === curType) {
                        faqItem.removeClass('hidden');
                    } else {
                        faqItem.addClass('hidden');
                    }
                });
            } else {
                $('.faq-item').removeClass('hidden');
            }
        }
        e.preventDefault();
    });

    $('.buy-menu-item a').click(function(e) {
        const curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.buy-menu-item.active').removeClass('active');
            const curIndex = $('.buy-menu-item').index(curItem);
            curItem.addClass('active');
            $('.buy-content.active').removeClass('active');
            $('.buy-content').eq(curIndex).addClass('active');
             window.location.hash = $(this).attr('href');
        }
        e.preventDefault();
    });

    $('.buy-mortgage-menu-item a').click(function(e) {
        const curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.buy-mortgage-menu-item.active').removeClass('active');
            const curIndex = $('.buy-mortgage-menu-item').index(curItem);
            curItem.addClass('active');
            $('.buy-mortgage-content.active').removeClass('active');
            $('.buy-mortgage-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.faq-item-header').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.docs').each(function() {
        if ($('.docs a').length > 12) {
            $('.docs-more').addClass('visible');
        }
    });

    $('.docs-more a').click(function(e) {
        $('.docs').addClass('open');
        $('.docs-more').remove();
        e.preventDefault();
    });

    $('.career-balance-item').mouseenter(function(e) {
        if ($(window).width() > 1359) {
            const curItem = $(this);
            curItem.find('.career-balance-item-photo').stop(true, true);
            if (curItem.find('.career-balance-item-text').length == 1) {
                const textHeight = curItem.find('.career-balance-item-text').outerHeight();
                curItem.css({'min-height': curItem.outerHeight()});
                curItem.find('.career-balance-item-photo').attr('data-height', curItem.find('.career-balance-item-photo').height());
                curItem.find('.career-balance-item-photo').animate({'height': curItem.find('.career-balance-item-photo').height() - textHeight}, 200);
                curItem.find('.career-balance-item-text').addClass('visible');
            }
        }
    });

    $('.career-balance-item').mouseleave(function(e) {
        if ($(window).width() > 1359) {
            const curItem = $(this);
            curItem.find('.career-balance-item-photo').stop(true, true);
            curItem.find('.career-balance-item-photo').animate({'height': Number(curItem.find('.career-balance-item-photo').attr('data-height'))}, 200, function() {
                curItem.find('.career-balance-item-photo').removeAttr('style');
                curItem.css({'min-height': 0});
            });
            curItem.find('.career-balance-item-text').removeClass('visible');
        }
    });

});

function initForm(curForm) {
    curForm.append('<input type="hidden" name="url_ref" value="' + window.location.href + '">');
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });
    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
        if (e.originalEvent !== undefined && $(e.originalEvent.relatedTarget).hasClass('form-input-clear')) {
            $(this).parent().find('.form-input-clear').trigger('click');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (!curForm.find('.form-submit button').prop('disabled')) {
                if (curForm.hasClass('window-form')) {
                    curForm.find('.form-submit button').prop('disabled', true);
                    var formData = new FormData(form);
                    windowOpen(curForm.attr('data-action'), formData);
                } else {
                    form.submit();
                }
            }
        }
    });
}

var searchParams = new URLSearchParams(window.location.search);

var catalogueData = null;

var newData = [];
var catalogueSize = 24;
var catalogueView = 0;

$(window).on('load', function() {
    var curURL = $('.wrapper').attr('data-flatdata');
    if (curURL != undefined) {
        $.ajax({
            type: 'POST',
            url: curURL,
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('Сервис временно недоступен, попробуйте позже.');
        }).done(function(data) {
            catalogueData = data;
            $('.catalogue-filter-form form').each(function() {
                updateSelectParams();
            });

            $('.main-select-form form').each(function() {
                updateSelectParamsMain();
            });

            $('.project-select form').each(function() {
                updateSelectParamsProject();
            });

            $('.catalogue-favourites').each(function() {
                updateFavouritesList();
            });

            let countFlatsAll = 0;

            for (var i = 0; i < catalogueData.projects.length; i++) {
                var curProject = catalogueData.projects[i];
                var headerBlock = $('.header-menu-projects-item[data-id="' + curProject.id + '"]');
                if (headerBlock.length == 1) {
                    var minPrice = 999999999;
                    var flatsCount = 0;
                    let projectFlats = [];
                    for (var j = 0; j < curProject.builds.length; j++) {
                        var curBuild = curProject.builds[j];
                        for (var k = 0; k < curBuild.flats.length; k++) {
                            var curFlat = curBuild.flats[k];
                            flatsCount++;

                            var curPrice = Number(curFlat.price);
                            if (curPrice < minPrice) {
                                minPrice = curPrice;
                            }

                            const curRooms = Number(curFlat.rooms);
                            const curSize = Number(curFlat.size.replace(',', '.'));
                            let isRoomsHas = false;
                            for (var x = 0; x < projectFlats.length; x++) {
                                if (projectFlats[x].id == curRooms) {
                                    isRoomsHas = true;
                                    if (projectFlats[x].price > curPrice) {
                                        projectFlats[x].price = curPrice;
                                    }
                                    if (projectFlats[x].size > curSize) {
                                        projectFlats[x].size = curSize;
                                    }
                                }
                            }
                            if (!isRoomsHas) {
                                projectFlats.push({'id': curRooms, 'size': curSize, 'price': curPrice});
                            }

                            var curSpecial = curFlat.features;
                            if (curSpecial.length > 0) {
                                for (var m = 0; m < curSpecial.length; m++) {
                                    var curSpecialValues = curSpecial[m].value.split('/');
                                    for (var t = 0; t < curSpecialValues.length; t++) {
                                        $('.header-menu-realty-item-flats a').each(function() {
                                            const curLink = $(this);
                                            if (curLink.find('span').html() === curSpecialValues[t]) {
                                                let curLinkMin = Number(curLink.find('strong').html()) * 1000000;
                                                if (curPrice < curLinkMin) {
                                                    curLink.find('strong').html((curPrice / 1000000).toFixed(1));
                                                }
                                            }
                                        });
                                    }
                                }
                            }

                        }
                    }
                    minPrice = (minPrice / 1000000).toFixed(1);
                    headerBlock.find('.header-menu-projects-item-info em').html(minPrice);
                    headerBlock.find('.header-menu-projects-item-flats span').html(flatsCount + ' ' + getFlatsText(flatsCount));
                    $('.main-project[data-id="' + curProject.id + '"]').find('.main-project-info-flats').html('<span>' + flatsCount + '</span><span>' + getFlatsText(flatsCount) + '</span>');
                    $('.main-project[data-id="' + curProject.id + '"]').find('.main-project-info-price span').eq(1).html(minPrice);

                    let htmlProjectDetails = '';
                    for (let x = 0; x < projectFlats.length; x++) {
                        htmlProjectDetails +=   '<div class="main-project-detail-item">' +
                                                    '<div class="main-project-detail-item-title">' + projectFlats[x].id + '-комн.</div>' +
                                                    '<div class="main-project-detail-item-size">от ' + projectFlats[x].size + ' м<sup>3</sup></div>' +
                                                    '<div class="main-project-detail-item-price">от ' + (projectFlats[x].price / 1000000).toFixed(1) + ' млн ₽</div>' +
                                                '</div>';
                    }
                    $('.main-project[data-id="' + curProject.id + '"]').find('.main-project-detail').html(htmlProjectDetails);
                    countFlatsAll += flatsCount;
                }
            }

            $('.header-menu-projects-item-link').eq(0).each(function() {
                var curItem = $(this).parent();
                curItem.find('.header-menu-projects-item-link').addClass('hover');
                $('.header-menu-projects-info').css({'background-image': 'url("' + curItem.attr('data-img') + '")'});
                $('.header-menu-projects-info-title').html(curItem.find('.header-menu-projects-item-title').html());
                $('.header-menu-projects-info-flats').html(curItem.find('.header-menu-projects-item-flats').html());
                $('.header-menu-projects-info-price').html(curItem.find('.header-menu-projects-item-info strong').html());
            });

            updateFavouriteHeader();

            $('.mobile-menu-flats-count').html(countFlatsAll);
            $('.header-menu-realty-item-flats-all').html(countFlatsAll + ' ' + getFlatsText(countFlatsAll));
        });
    }
});

function updateSelectParams() {
    var projects = [];
    var rooms = [];
    var deadlines = [];

    var minSize = 999;
    var maxSize = 0;
    var minPrice = 999999999;
    var maxPrice = 0;
    var minFloor = 99;
    var maxFloor = 0;

    for (var i = 0; i < catalogueData.projects.length; i++) {
        var curProject = catalogueData.projects[i];

        var isProjectHas = false;
        for (var x = 0; x < projects.length; x++) {
            if (projects[x].id == curProject.id) {
                isProjectHas = true;
            }
        }
        if (!isProjectHas) {
            projects.push({'id': curProject.id, 'title': curProject.title, 'avatar': curProject.avatar});
        }

        for (var j = 0; j < curProject.builds.length; j++) {
            var curBuild = curProject.builds[j];
            for (var k = 0; k < curBuild.flats.length; k++) {
                var curFlat = curBuild.flats[k];

                var curSize = Number(curFlat.size.replace(',', '.'));
                if (curSize < minSize) {
                    minSize = curSize;
                }
                if (curSize > maxSize) {
                    maxSize = curSize;
                }
                var curPrice = Number(curFlat.price);
                if (curPrice < minPrice) {
                    minPrice = curPrice;
                }
                if (curPrice > maxPrice) {
                    maxPrice = curPrice;
                }
                var curFloor = Number(curFlat.floor);
                if (curFloor < minFloor) {
                    minFloor = curFloor;
                }
                if (curFloor > maxFloor) {
                    maxFloor = curFloor;
                }

                var curRooms = curFlat.rooms;
                var isRoomsHas = false;
                for (var m = 0; m < rooms.length; m++) {
                    if (rooms[m].title == curRooms) {
                        isRoomsHas = true;
                    }
                }
                if (!isRoomsHas) {
                    rooms.push({'title': curRooms});
                }

                var curDeadline = -1;
                if (curFlat.deadline != '') {
                    curDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(curFlat.deadline)[2]);
                }
                var isDeadlineHas = false;
                for (var m = 0; m < deadlines.length; m++) {
                    if (deadlines[m] == curDeadline) {
                        isDeadlineHas = true;
                    }
                }
                if (!isDeadlineHas) {
                    deadlines.push(curDeadline);
                }
            }
        }
    }

    rooms.sort(function(a, b) {
        if (Number(String(a.title)) < Number(String(b.title))) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    });
    for (var i = 0; i < projects.length; i++) {
        var checked = '';
        if (searchParams.get('projects[' + projects[i].id + ']') != null) {
            checked = ' checked';
        }
        $('.main-select-dropdown-projects').append( '<div class="main-select-dropdown-projects-item">' +
                                                        '<div class="main-select-dropdown-projects-item-parent"><label><input type="checkbox" name="projects[' + projects[i].id + ']" value="' + projects[i].id + '"' + checked + '><span><img src="' + projects[i].avatar + '" alt=""><strong>' + projects[i].title + '</strong></span></label></div>' +
                                                    '</div>');
        if (checked) {
            $('.main-select-dropdown-projects input:last').trigger('change');
        }
    }
    $('.main-select-rooms').html('');
    for (var i = 0; i < rooms.length; i++) {
        var checked = '';
        if (searchParams.get('rooms[' + rooms[i].title + ']') != null) {
            checked = ' checked';
        }
        $('.main-select-rooms').append('<label><input type="checkbox" name="rooms[' + rooms[i].title + ']" value="' + rooms[i].title + '"' + checked + '><span>' + rooms[i].title + '</span></label>');
    }

    minSize = Math.floor(minSize);
    maxSize = Math.ceil(maxSize);
    $('.main-select-slider-size .main-select-slider-from').val(minSize);
    $('.main-select-slider-size .main-select-slider-to').val(maxSize);
    var sizeSlider = $('.main-select-slider-size');
    sizeSlider.find('.main-select-slider-min').html(minSize);
    sizeSlider.find('.main-select-slider-max').html(maxSize);
    var sizeRange = sizeSlider.find('.main-select-slider-range-inner')[0];
    sizeRange.noUiSlider.updateOptions({
        range: {
            'min': minSize,
            'max': maxSize
        }
    });
    var sizeFrom = minSize;
    var sizeTo = maxSize;
    if (searchParams.get('sizeFrom') != null) {
        sizeFrom = searchParams.get('sizeFrom');
    }
    if (searchParams.get('sizeTo') != null) {
        sizeTo = searchParams.get('sizeTo');
    }
    sizeRange.noUiSlider.set([sizeFrom, sizeTo]);

    minPrice = Math.floor(minPrice);
    maxPrice = Math.ceil(maxPrice);
    $('.main-select-slider-price .main-select-slider-from').val(minPrice);
    $('.main-select-slider-price .main-select-slider-to').val(maxPrice);
    var priceSlider = $('.main-select-slider-price');
    priceSlider.find('.main-select-slider-min').html(minPrice);
    priceSlider.find('.main-select-slider-max').html(maxPrice);
    var priceRange = priceSlider.find('.main-select-slider-range-inner')[0];
    priceRange.noUiSlider.updateOptions({
        range: {
            'min': minPrice,
            'max': maxPrice
        }
    });
    var priceFrom = minPrice;
    var priceTo = maxPrice;
    if (searchParams.get('priceFrom') != null) {
        priceFrom = searchParams.get('priceFrom');
    }
    if (searchParams.get('priceTo') != null) {
        priceTo = searchParams.get('priceTo');
    }
    priceRange.noUiSlider.set([priceFrom, priceTo]);

    minFloor = Math.floor(minFloor);
    maxFloor = Math.ceil(maxFloor);
    $('.main-select-slider-floor .main-select-slider-from').val(minFloor);
    $('.main-select-slider-floor .main-select-slider-to').val(maxFloor);
    var floorSlider = $('.main-select-slider-floor');
    floorSlider.find('.main-select-slider-min').html(minFloor);
    floorSlider.find('.main-select-slider-max').html(maxFloor);
    var floorRange = floorSlider.find('.main-select-slider-range-inner')[0];
    floorRange.noUiSlider.updateOptions({
        range: {
            'min': minFloor,
            'max': maxFloor
        }
    });
    floorRange.noUiSlider.set([minFloor, maxFloor]);

    deadlines.sort(function(a, b) {
        if (Number(a) < Number(b)) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    });
    for (var i = 0; i < deadlines.length; i++) {
        var checked = '';
        if (searchParams.get('deadlines[' + deadlines[i] + ']') != null) {
            checked = ' checked';
        }
        if (deadlines[i] == '-1') {
            $('.main-select-deadlines').append('<label><input type="checkbox" name="deadlines[' + deadlines[i] + ']" value="' + deadlines[i] + '"' + checked + '><span>Готовые</span></label>');
        } else {
            $('.main-select-deadlines').append('<label><input type="checkbox" name="deadlines[' + deadlines[i] + ']" value="' + deadlines[i] + '"' + checked + '><span>' + deadlines[i] + '</span></label>');
        }
    }

    $('.main-select-props input').each(function() {
        const curProp = $(this);
        const curValue = $(this).attr('value');
        if (searchParams.get('props[' + curValue + ']') != null) {
            curProp.prop('checked', true);
            $('.main-select-props-full input[value="' + curValue + '"]').prop('checked', true);
        }
    });

    updateSelectList();
    $('.catalogue-filter-form, .catalogue-filter-ctrl').addClass('visible');
}

function updateSelectParamsMain() {
    var rooms = [];
    var deadlines = [];

    var minSize = 999;
    var maxSize = 0;
    var minPrice = 999999999;
    var maxPrice = 0;

    for (var i = 0; i < catalogueData.projects.length; i++) {
        var curProject = catalogueData.projects[i];

        for (var j = 0; j < curProject.builds.length; j++) {
            var curBuild = curProject.builds[j];
            for (var k = 0; k < curBuild.flats.length; k++) {
                var curFlat = curBuild.flats[k];

                var curSize = Number(curFlat.size.replace(',', '.'));
                if (curSize < minSize) {
                    minSize = curSize;
                }
                if (curSize > maxSize) {
                    maxSize = curSize;
                }
                var curPrice = Number(curFlat.price);
                if (curPrice < minPrice) {
                    minPrice = curPrice;
                }
                if (curPrice > maxPrice) {
                    maxPrice = curPrice;
                }

                var curRooms = curFlat.rooms;
                var isRoomsHas = false;
                for (var m = 0; m < rooms.length; m++) {
                    if (rooms[m].title == curRooms) {
                        isRoomsHas = true;
                    }
                }
                if (!isRoomsHas) {
                    rooms.push({'title': curRooms});
                }

                var curDeadline = -1;
                if (curFlat.deadline != '') {
                    curDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(curFlat.deadline)[2]);
                }
                var isDeadlineHas = false;
                for (var m = 0; m < deadlines.length; m++) {
                    if (deadlines[m] == curDeadline) {
                        isDeadlineHas = true;
                    }
                }
                if (!isDeadlineHas) {
                    deadlines.push(curDeadline);
                }
            }
        }
    }

    rooms.sort(function(a, b) {
        if (Number(String(a.title)) < Number(String(b.title))) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    });
    $('.main-select-rooms').html('');
    for (var i = 0; i < rooms.length; i++) {
        $('.main-select-rooms').append('<label><input type="checkbox" name="rooms[' + rooms[i].title + ']" value="' + rooms[i].title + '"><span>' + rooms[i].title + '</span></label>');
    }

    minSize = Math.floor(minSize);
    maxSize = Math.ceil(maxSize);
    $('.main-select-slider-size .main-select-slider-from').val(minSize);
    $('.main-select-slider-size .main-select-slider-to').val(maxSize);
    var sizeSlider = $('.main-select-slider-size');
    sizeSlider.find('.main-select-slider-min').html(minSize);
    sizeSlider.find('.main-select-slider-max').html(maxSize);
    var sizeRange = sizeSlider.find('.main-select-slider-range-inner')[0];
    sizeRange.noUiSlider.updateOptions({
        range: {
            'min': minSize,
            'max': maxSize
        }
    });
    sizeRange.noUiSlider.set([minSize, maxSize]);

    minPrice = Math.floor(minPrice);
    maxPrice = Math.ceil(maxPrice);
    $('.main-select-slider-price .main-select-slider-from').val(minPrice);
    $('.main-select-slider-price .main-select-slider-to').val(maxPrice);
    var priceSlider = $('.main-select-slider-price');
    priceSlider.find('.main-select-slider-min').html(minPrice);
    priceSlider.find('.main-select-slider-max').html(maxPrice);
    var priceRange = priceSlider.find('.main-select-slider-range-inner')[0];
    priceRange.noUiSlider.updateOptions({
        range: {
            'min': minPrice,
            'max': maxPrice
        }
    });
    priceRange.noUiSlider.set([minPrice, maxPrice]);

    deadlines.sort(function(a, b) {
        if (Number(a) < Number(b)) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    });
    for (var i = 0; i < deadlines.length; i++) {
        if (deadlines[i] == '-1') {
            $('.main-select-dropdown-deadlines').append('<div class="main-select-dropdown-deadlines-item"><label><input type="radio" name="deadlines" value="' + deadlines[i] + '"><span>Дом сдан</span></label></div>');
        } else {
            $('.main-select-dropdown-deadlines').append('<div class="main-select-dropdown-deadlines-item"><label><input type="radio" name="deadlines" value="' + deadlines[i] + '"><span>' + deadlines[i] + ' включительно</span></label></div>');
        }

    }

    updateSelectListMain();
}

function updateSelectParamsProject() {
    var rooms = [];
    var deadlines = [];

    var minPrice = 999999999;
    var maxPrice = 0;

    var curID = $('.project-header').attr('data-id');
    $('.project-select-form form').append('<input type="hidden" name="projects[' + curID + ']" value="' + curID +'">');
    for (var i = 0; i < catalogueData.projects.length; i++) {
        var curProject = catalogueData.projects[i];

        if (curID == curProject.id) {
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];

                    var curPrice = Number(curFlat.price);
                    if (curPrice < minPrice) {
                        minPrice = curPrice;
                    }
                    if (curPrice > maxPrice) {
                        maxPrice = curPrice;
                    }

                    var curRooms = curFlat.rooms;
                    var isRoomsHas = false;
                    for (var m = 0; m < rooms.length; m++) {
                        if (rooms[m].title == curRooms) {
                            isRoomsHas = true;
                        }
                    }
                    if (!isRoomsHas) {
                        rooms.push({'title': curRooms});
                    }

                    var curDeadline = -1;
                    if (curFlat.deadline != '') {
                        curDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(curFlat.deadline)[2]);
                    }
                    var isDeadlineHas = false;
                    for (var m = 0; m < deadlines.length; m++) {
                        if (deadlines[m] == curDeadline) {
                            isDeadlineHas = true;
                        }
                    }
                    if (!isDeadlineHas) {
                        deadlines.push(curDeadline);
                    }
                }
            }
        }
    }

    rooms.sort(function(a, b) {
        if (Number(String(a.title)) < Number(String(b.title))) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    });
    for (var i = 0; i < rooms.length; i++) {
        $('.main-select-rooms').append('<label><input type="checkbox" name="rooms[' + rooms[i].title + ']" value="' + rooms[i].title + '"><span>' + rooms[i].title + '</span></label>');
    }

    minPrice = Math.floor(minPrice);
    maxPrice = Math.ceil(maxPrice);
    $('.main-select-slider-price .main-select-slider-from').val(minPrice);
    $('.main-select-slider-price .main-select-slider-to').val(maxPrice);
    var priceSlider = $('.main-select-slider-price');
    priceSlider.find('.main-select-slider-min').html(minPrice);
    priceSlider.find('.main-select-slider-max').html(maxPrice);
    var priceRange = priceSlider.find('.main-select-slider-range-inner')[0];
    priceRange.noUiSlider.updateOptions({
        range: {
            'min': minPrice,
            'max': maxPrice
        }
    });
    priceRange.noUiSlider.set([minPrice, maxPrice]);

    deadlines.sort(function(a, b) {
        if (Number(a) < Number(b)) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    });
    for (var i = 0; i < deadlines.length; i++) {
        var checked = '';
        if (searchParams.get('deadlines[' + deadlines[i] + ']') != null) {
            checked = ' checked';
        }
        if (deadlines[i] == '-1') {
            $('.main-select-deadlines').append('<label><input type="checkbox" name="deadlines[' + deadlines[i] + ']" value="' + deadlines[i] + '"' + checked + '><span>Готовые</span></label>');
        } else {
            $('.main-select-deadlines').append('<label><input type="checkbox" name="deadlines[' + deadlines[i] + ']" value="' + deadlines[i] + '"' + checked + '><span>' + deadlines[i] + '</span></label>');
        }
    }

    updateSelectListProject();
}

function updateSelectList() {
    var isClear = false;
    if ($('.main-select-rooms input:checked').length > 0) {
        isClear = true;
    }
    if (!(($('.main-select-slider-size .main-select-slider-from').val() == $('.main-select-slider-size .main-select-slider-min').html()) && ($('.main-select-slider-size .main-select-slider-to').val() == $('.main-select-slider-size .main-select-slider-max').html()))) {
        isClear = true;
    }
    if (!(($('.main-select-slider-price .main-select-slider-from').val() == $('.main-select-slider-price .main-select-slider-min').html()) && ($('.main-select-slider-price .main-select-slider-to').val() == $('.main-select-slider-price .main-select-slider-max').html()))) {
        isClear = true;
    }
    if (!(($('.main-select-slider-floor .main-select-slider-from').val() == $('.main-select-slider-floor .main-select-slider-min').html()) && ($('.main-select-slider-floor .main-select-slider-to').val() == $('.main-select-slider-floor .main-select-slider-max').html()))) {
        isClear = true;
    }
    if ($('.main-select-props input:checked').length > 0) {
        isClear = true;
    }
    if ($('.main-select-props-full input:checked').length > 0) {
        isClear = true;
    }
    if ($('.main-select-deadlines input:checked').length > 0) {
        isClear = true;
    }
    if (isClear) {
        $('.main-select-reset').addClass('visible');
    } else {
        $('.main-select-reset').removeClass('visible');
    }

    newData = [];
    catalogueView = 0;
    if (typeof(catalogueData) != 'undefined') {
        for (var i = 0; i < catalogueData.projects.length; i++) {
            var curProject = catalogueData.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.project = curProject.title;
                    curFlat.projectID = curProject.id;
                    curFlat.build = curBuild.title;
                    curFlat.buildID = curBuild.id;

                    var projectsCorrect = false;
                    if ($('.main-select-dropdown-projects input:checked').length == 0) {
                        projectsCorrect = true;
                    } else {
                        $('.main-select-dropdown-projects input:checked').each(function() {
                            var curID = $(this).attr('value');
                            if (curID == '0' || curID == curProject.id) {
                                projectsCorrect = true;
                            }
                        });
                    }

                    var roomsCorrect = false;
                    if ($('.main-select-rooms input:checked').length == 0 || $('.main-select-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                        roomsCorrect = true;
                    }

                    var flatSize = Number(String(curFlat.size).replace(',', '.'));
                    var sizeCorrect = false;
                    var minSize = Number($('.main-select-slider-size .main-select-slider-from').val());
                    var maxSize = Number($('.main-select-slider-size .main-select-slider-to').val());
                    if (flatSize >= minSize && flatSize <= maxSize) {
                        sizeCorrect = true;
                    }

                    var flatPrice = Number(String(curFlat.price).replace(',', '.'));
                    var priceCorrect = false;
                    var minPrice = Number($('.main-select-slider-price .main-select-slider-from').val());
                    var maxPrice = Number($('.main-select-slider-price .main-select-slider-to').val());
                    if (flatPrice >= minPrice && flatPrice <= maxPrice) {
                        priceCorrect = true;
                    }

                    var flatFloor = Number(String(curFlat.floor));
                    var floorCorrect = false;
                    var minFloor = Number($('.main-select-slider-floor .main-select-slider-from').val());
                    var maxFloor = Number($('.main-select-slider-floor .main-select-slider-to').val());
                    if (flatFloor >= minFloor && flatFloor <= maxFloor) {
                        floorCorrect = true;
                    }

                    var deadlineCorrect = false;
                    var curDeadline = -1;
                    if (curFlat.deadline != '') {
                        curDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(curFlat.deadline)[2]);
                    }
                    if ($('.main-select-deadlines input:checked').length == 0) {
                        deadlineCorrect = true;
                    } else {
                        $('.main-select-deadlines input:checked').each(function() {
                            if (Number($(this).attr('value')) >= curDeadline) {
                                deadlineCorrect = true;
                            }
                        });
                    }

                    var specialCorrect = false;
                    if ($('.main-select-props-full input:checked').length == 0) {
                        specialCorrect = true;
                    } else {
                        var curEqual = 0;
                        var curSpecial = curFlat.features;
                        if (curSpecial.length > 0) {
                            for (var m = 0; m < curSpecial.length; m++) {
                                var curSpecialValues = curSpecial[m].value.split('/');
                                for (var t = 0; t < curSpecialValues.length; t++) {
                                    if ($('.main-select-props-full input[value="' + curSpecialValues[t] + '"]:checked').length == 1) {
                                        curEqual++;
                                    }
                                }
                            }
                        }
                        if ($('.main-select-props-full input:checked').length == curEqual) {
                            specialCorrect = true;
                        }
                    }

                    if (projectsCorrect && roomsCorrect && sizeCorrect && priceCorrect && floorCorrect && deadlineCorrect && specialCorrect) {
                        newData.push(curFlat);
                    }
                }
            }
        }
    }

    var typeSort = $('.catalogue-results-sort-popup-item.active').attr('data-value');
    var isReverse = $('.catalogue-results-sort-popup-item.active').hasClass('down');
    if (typeSort == 'price') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.price).replace(',', '.')) < Number(String(b.price).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.price).replace(',', '.')) > Number(String(b.price).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'size') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) < Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) > Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'deadline') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                var aDeadline = -1;
                if (a.deadline != '') {
                    aDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(a.deadline)[2]);
                }
                var bDeadline = -1;
                if (b.deadline != '') {
                    bDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(b.deadline)[2]);
                }
                if (aDeadline < bDeadline) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                var aDeadline = -1;
                if (a.deadline != '') {
                    aDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(a.deadline)[2]);
                }
                var bDeadline = -1;
                if (b.deadline != '') {
                    bDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(b.deadline)[2]);
                }
                if (aDeadline > bDeadline) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }

    $('.catalogue-filter-params-title span').html(newData.length + ' ' + getFlatsText(newData.length));

    $('.catalogue-filter-params-item').remove();
    var selectedHTML = '';
    $('.main-select-dropdown-projects-item-parent input[value!="0"]:checked').each(function() {
        selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-projects" data-value="' + $(this).attr('value') + '">' + $(this).parent().find('span strong').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
    });
    $('.main-select-rooms input:checked').each(function() {
        selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-rooms" data-value="' + $(this).attr('value') + '">' + $(this).parent().find('span').html() + '-комн.<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
    });
    $('.main-select-slider-price').each(function() {
        var curSlider = $(this);
        if ((curSlider.find('.main-select-slider-from').attr('value') != curSlider.find('.main-select-slider-min').html()) || (curSlider.find('.main-select-slider-to').attr('value') != curSlider.find('.main-select-slider-max').html())) {
            selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-price">от ' + curSlider.find('.main-select-slider-text-from span').html() + ' до ' + curSlider.find('.main-select-slider-text-to span').html() + ' руб<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
        }
    });
    $('.main-select-slider-size').each(function() {
        var curSlider = $(this);
        if ((curSlider.find('.main-select-slider-from').attr('value') != curSlider.find('.main-select-slider-min').html()) || (curSlider.find('.main-select-slider-to').attr('value') != curSlider.find('.main-select-slider-max').html())) {
            selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-size">от ' + curSlider.find('.main-select-slider-text-from span').html() + ' до ' + curSlider.find('.main-select-slider-text-to span').html() + ' кв.м<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
        }
    });
    $('.main-select-slider-floor').each(function() {
        var curSlider = $(this);
        if ((curSlider.find('.main-select-slider-from').attr('value') != curSlider.find('.main-select-slider-min').html()) || (curSlider.find('.main-select-slider-to').attr('value') != curSlider.find('.main-select-slider-max').html())) {
            selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-floors">Этаж от ' + curSlider.find('.main-select-slider-text-from span').html() + ' до ' + curSlider.find('.main-select-slider-text-to span').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
        }
    });
    $('.main-select-deadlines input:checked').each(function() {
        selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-deadlines" data-value="' + $(this).attr('value') + '">' + $(this).parent().find('span').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
    });
    $('.main-select-props-full input:checked').each(function() {
        selectedHTML += '<div class="catalogue-filter-params-item catalogue-filter-params-item-props" data-value="' + $(this).attr('value') + '">' + $(this).parent().find('span').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
    });
    $('.catalogue-filter-params-list').append(selectedHTML);
    if (selectedHTML != '') {
        $('.catalogue-filter-params-title em').addClass('visible');
    } else {
        $('.catalogue-filter-params-title em').removeClass('visible');
    }

    var htmlList = '';
    for (var i = 0; i < newData.length && i < catalogueSize; i++) {
        var curFlat = newData[i];

        htmlList += '<div class="catalogue-item" data-project="' + curFlat.projectID + '" data-build="' + curFlat.buildID + '" data-id="' + curFlat.number + '">' +
                        '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                            '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                            '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '/' + curFlat.floors + '</div>' +
                            '<div class="catalogue-item-preview">' +
                                '<div class="catalogue-item-preview-list">' +
                                    '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                            '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                            '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                            '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadline + '</span></div>';
        if (curFlat.features.length > 0) {
            htmlList +=     '<div class="catalogue-item-props">';
            var countFeatures = 0;
            var popupFeatures = '';
            for (var j = 0; j < curFlat.features.length; j++) {
                var curValues = curFlat.features[j].value.split('/');
                for (var k = 0; k < curValues.length; k++) {
                    countFeatures++;
                    if (countFeatures < 3) {
                        htmlList += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                    }
                    popupFeatures += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                }
            }
            if (countFeatures > 2) {
                htmlList +=     '<div class="catalogue-item-prop">+' + (countFeatures - 2) + '</div>';
                htmlList +=     '<div class="catalogue-item-props-popup"><div class="catalogue-item-props-popup-title">Особенности</div><div class="catalogue-item-props-popup-list">' + popupFeatures + '</div></div>';
            }
            htmlList +=     '</div>';
        }
        htmlList +=         '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                        '</a>';
        let classFavouriteActive = '';
        if (typeof $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) != 'undefined' && $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) == 'true') {
            classFavouriteActive = ' active'
        }
        htmlList +=     '<a href="#" class="catalogue-item-favourite' + classFavouriteActive + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></a>' +
                    '</div>';
    }

    $('.catalogue-list').html(htmlList);
    if (newData.length > catalogueSize) {
        catalogueView = catalogueSize;
        $('.catalogue-results-more').addClass('visible');
        var newCount = catalogueSize;
        if (newData.length - catalogueView < catalogueSize) {
            newCount = newData.length - catalogueView;
        }
        $('.catalogue-results-more span').eq(0).html(newCount);
        $('.catalogue-results-more span').eq(1).html(newData.length);
    } else {
        $('.catalogue-results-more').removeClass('visible');
        catalogueView = newData.length;
    }
}

function updateSelectListMain() {
    var isClear = false;
    if ($('.main-select-rooms input:checked').length > 0) {
        isClear = true;
    }
    if (!(($('.main-select-slider-size .main-select-slider-from').val() == $('.main-select-slider-size .main-select-slider-min').html()) && ($('.main-select-slider-size .main-select-slider-to').val() == $('.main-select-slider-size .main-select-slider-max').html()))) {
        isClear = true;
    }
    if (!(($('.main-select-slider-price .main-select-slider-from').val() == $('.main-select-slider-price .main-select-slider-min').html()) && ($('.main-select-slider-price .main-select-slider-to').val() == $('.main-select-slider-price .main-select-slider-max').html()))) {
        isClear = true;
    }
    if ($('.main-select-dropdown-deadlines input:checked').attr('value') != '0') {
        isClear = true;
    }
    if ($('.main-select-props input:checked').length > 0) {
        isClear = true;
    }
    if (isClear) {
        $('.main-select-reset').addClass('visible');
    } else {
        $('.main-select-reset').removeClass('visible');
    }

    newData = [];
    if (typeof(catalogueData) != 'undefined') {
        for (var i = 0; i < catalogueData.projects.length; i++) {
            var curProject = catalogueData.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.project = curProject.title;
                    curFlat.build = curBuild.title;

                    var roomsCorrect = false;
                    if ($('.main-select-rooms input:checked').length == 0 || $('.main-select-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                        roomsCorrect = true;
                    }

                    var flatSize = Number(String(curFlat.size).replace(',', '.'));
                    var sizeCorrect = false;
                    var minSize = Number($('.main-select-slider-size .main-select-slider-from').val());
                    var maxSize = Number($('.main-select-slider-size .main-select-slider-to').val());
                    if (flatSize >= minSize && flatSize <= maxSize) {
                        sizeCorrect = true;
                    }

                    var flatPrice = Number(String(curFlat.price).replace(',', '.'));
                    var priceCorrect = false;
                    var minPrice = Number($('.main-select-slider-price .main-select-slider-from').val());
                    var maxPrice = Number($('.main-select-slider-price .main-select-slider-to').val());
                    if (flatPrice >= minPrice && flatPrice <= maxPrice) {
                        priceCorrect = true;
                    }

                    var deadlineCorrect = false;
                    var curDeadline = -1;
                    if (curFlat.deadline != '') {
                        curDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(curFlat.deadline)[2]);
                    }
                    if ($('.main-select-dropdown-deadlines input:checked').length == 0 || $('.main-select-dropdown-deadlines input:checked').attr('value') == '0') {
                        deadlineCorrect = true;
                    } else {
                        $('.main-select-dropdown-deadlines input:checked').each(function() {
                            if (Number($(this).attr('value')) >= curDeadline) {
                                deadlineCorrect = true;
                            }
                        });
                    }

                    var specialCorrect = false;
                    if ($('.main-select-props input:checked').length == 0) {
                        specialCorrect = true;
                    } else {
                        var curEqual = 0;
                        var curSpecial = curFlat.features;
                        if (curSpecial.length > 0) {
                            for (var m = 0; m < curSpecial.length; m++) {
                                var curSpecialValues = curSpecial[m].value.split('/');
                                for (var t = 0; t < curSpecialValues.length; t++) {
                                    if ($('.main-select-props input[value="' + curSpecialValues[t] + '"]:checked').length == 1) {
                                        curEqual++;
                                    }
                                }
                            }
                        }
                        if ($('.main-select-props input:checked').length == curEqual) {
                            specialCorrect = true;
                        }
                    }

                    if (roomsCorrect && sizeCorrect && priceCorrect && deadlineCorrect && specialCorrect) {
                        newData.push(curFlat);
                    }
                }
            }
        }
    }
    $('.main-select-btn span').html(newData.length + ' ' + getFlatsText(newData.length));
}

function updateSelectListProject() {
    newData = [];
    if (typeof(catalogueData) != 'undefined') {
        for (var i = 0; i < catalogueData.projects.length; i++) {
            var curProject = catalogueData.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.project = curProject.title;
                    curFlat.build = curBuild.title;

                    var projectsCorrect = false;
                    var curID = $('.project-header').attr('data-id');
                    if (curID == curProject.id) {
                        projectsCorrect = true;
                    }

                    var roomsCorrect = false;
                    if ($('.main-select-rooms input:checked').length == 0 || $('.main-select-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                        roomsCorrect = true;
                    }

                    var flatPrice = Number(String(curFlat.price).replace(',', '.'));
                    var priceCorrect = false;
                    var minPrice = Number($('.main-select-slider-price .main-select-slider-from').val());
                    var maxPrice = Number($('.main-select-slider-price .main-select-slider-to').val());
                    if (flatPrice >= minPrice && flatPrice <= maxPrice) {
                        priceCorrect = true;
                    }

                    var deadlineCorrect = false;
                    var curDeadline = -1;
                    if (curFlat.deadline != '') {
                        curDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(curFlat.deadline)[2]);
                    }
                    if ($('.main-select-deadlines input:checked').length == 0) {
                        deadlineCorrect = true;
                    } else {
                        $('.main-select-deadlines input:checked').each(function() {
                            if (Number($(this).attr('value')) >= curDeadline) {
                                deadlineCorrect = true;
                            }
                        });
                    }

                    if (projectsCorrect && roomsCorrect && priceCorrect && deadlineCorrect) {
                        newData.push(curFlat);
                    }
                }
            }
        }
    }

    $('.main-select-btn span').html(newData.length + ' ' + getFlatsText2(newData.length));
}

function updateFavouritesList() {
    newData = [];
    catalogueView = 0;
    if (typeof(catalogueData) != 'undefined') {
        for (var i = 0; i < catalogueData.projects.length; i++) {
            var curProject = catalogueData.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.project = curProject.title;
                    curFlat.projectID = curProject.id;
                    curFlat.build = curBuild.title;
                    curFlat.buildID = curBuild.id;

                    if (typeof $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) != 'undefined' && $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) == 'true') {
                        newData.push(curFlat);
                    }
                }
            }
        }
    }

    var typeSort = $('.catalogue-results-sort-popup-item.active').attr('data-value');
    var isReverse = $('.catalogue-results-sort-popup-item.active').hasClass('down');
    if (typeSort == 'price') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.price).replace(',', '.')) < Number(String(b.price).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.price).replace(',', '.')) > Number(String(b.price).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'size') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) < Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) > Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'deadline') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                var aDeadline = -1;
                if (a.deadline != '') {
                    aDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(a.deadline)[2]);
                }
                var bDeadline = -1;
                if (b.deadline != '') {
                    bDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(b.deadline)[2]);
                }
                if (aDeadline < bDeadline) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                var aDeadline = -1;
                if (a.deadline != '') {
                    aDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(a.deadline)[2]);
                }
                var bDeadline = -1;
                if (b.deadline != '') {
                    bDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(b.deadline)[2]);
                }
                if (aDeadline > bDeadline) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }

    var htmlList = '';
    for (var i = 0; i < newData.length && i < catalogueSize; i++) {
        var curFlat = newData[i];

        htmlList += '<div class="catalogue-item" data-project="' + curFlat.projectID + '" data-build="' + curFlat.buildID + '" data-id="' + curFlat.number + '">' +
                        '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                            '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                            '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '/' + curFlat.floors + '</div>' +
                            '<div class="catalogue-item-preview">' +
                                '<div class="catalogue-item-preview-list">' +
                                    '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                            '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                            '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                            '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadline + '</span></div>';
        if (curFlat.features.length > 0) {
            htmlList +=     '<div class="catalogue-item-props">';
            var countFeatures = 0;
            var popupFeatures = '';
            for (var j = 0; j < curFlat.features.length; j++) {
                var curValues = curFlat.features[j].value.split('/');
                for (var k = 0; k < curValues.length; k++) {
                    countFeatures++;
                    if (countFeatures < 3) {
                        htmlList += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                    }
                    popupFeatures += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                }
            }
            if (countFeatures > 2) {
                htmlList +=     '<div class="catalogue-item-prop">+' + (countFeatures - 2) + '</div>';
                htmlList +=     '<div class="catalogue-item-props-popup"><div class="catalogue-item-props-popup-title">Особенности</div><div class="catalogue-item-props-popup-list">' + popupFeatures + '</div></div>';
            }
            htmlList +=     '</div>';
        }
        htmlList +=         '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                        '</a>';
        let classFavouriteActive = '';
        if (typeof $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) != 'undefined' && $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) == 'true') {
            classFavouriteActive = ' active'
        }
        htmlList +=     '<a href="#" class="catalogue-item-favourite' + classFavouriteActive + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></a>' +
                    '</div>';
    }

    $('.catalogue-list').html(htmlList);
    if (newData.length > catalogueSize) {
        catalogueView = catalogueSize;
        $('.catalogue-results-more-favourite').addClass('visible');
        var newCount = catalogueSize;
        if (newData.length - catalogueView < catalogueSize) {
            newCount = newData.length - catalogueView;
        }
        $('.catalogue-results-more-favourite span').eq(0).html(newCount);
        $('.catalogue-results-more-favourite span').eq(1).html(newData.length);
    } else {
        $('.catalogue-results-more-favourite').removeClass('visible');
        catalogueView = newData.length;
    }
}

function getFlatsText(number) {
    var endings = Array('квартир', 'квартира', 'квартиры');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}

function getFlatsText2(number) {
    var endings = Array('квартир', 'квартиру', 'квартиры');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'padding-right': curPadding});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
        }
        $('.window .window-loading').remove();
        window.setTimeout(function() {
            $('.window-container').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));

            var windowLink = $('.window-link.last-active');
            if (windowLink.length == 1 && typeof windowLink.attr('data-hiddenname') != 'undefined' && typeof windowLink.attr('data-hiddenvalue') != 'undefined') {
                $(this).append('<input type="hidden" name="' + windowLink.attr('data-hiddenname') + '" value="' + windowLink.attr('data-hiddenvalue') + '">');
            }

            $('.window-order-data-row-value-project').html($('.detail-props-item-value-project').html());
            $('.window-order-data-row-value-project-input').val($('.detail-props-item-value-project').text());
            $('.window-order-data-row-value-build').html($('.detail-props-item-value-build').html());
            $('.window-order-data-row-value-build-input').val($('.detail-props-item-value-build').text());
            $('.window-order-data-row-value-floor').html($('.detail-props-item-value-floor').html());
            $('.window-order-data-row-value-floor-input').val($('.detail-props-item-value-floor').text());
            $('.window-order-data-row-value-number').html($('.detail-props-item-value-number').html());
            $('.window-order-data-row-value-number-input').val($('.detail-props-item-value-number').text());
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window-container').addClass('window-container-preload');
        window.setTimeout(function() {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'padding-right': 0});
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }, 300);
    }
}

$(window).on('load resize', function() {

    $('.footer-subscribe .container').css({'min-height': 0});
    $('.footer-subscribe .container').css({'min-height': Math.ceil($('.footer-subscribe .container').height())});

});

function updateFavouriteHeader() {
    var countFavourite = 0;
    if (typeof(catalogueData) != 'undefined') {
        for (var i = 0; i < catalogueData.projects.length; i++) {
            var curProject = catalogueData.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.projectID = curProject.id;
                    curFlat.buildID = curBuild.id;
                    if (typeof $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) != 'undefined' && $.cookie('favourite-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) == 'true') {
                        countFavourite++;
                    }
                }
            }
        }
    }
    if (countFavourite > 0) {
        $('.header-favourite').addClass('active');
    } else {
        $('.header-favourite').removeClass('active');
    }
}

$(document).ready(function(e) {

    $('.cookie-window-btn').click(function(e) {
        document.cookie = 'cookieapply=1'
        $('.cookie-window').fadeOut(500);
        e.preventDefault();
    });

    var isCookie = false;
    var allCookie = document.cookie.split('; ');
    for (var i = 0; i < allCookie.length; i++) {
        var curCookie = allCookie[i].split('=');
        if (curCookie[0] == 'cookieapply' && curCookie[1] == '1') {
            isCookie = true;
        }
    }
    if (!isCookie) {
        $('.cookie-window').addClass('visible');
    }

});

$(window).on('load', function() {
    if (window.location.hash != '') {
        const curID = window.location.hash.replace('#', '');
        let curBlock = $('.main-section[data-id="' + curID +  '"]');
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
        }
        curBlock = $('.buy-content[data-id="' + curID +  '"]');
        if (curBlock.length == 1) {
            $('.buy-menu-item a[href="#' + curID +  '"]').trigger('click');
        }
        curBlock = $('.contacts-map[data-id="' + curID +  '"]');
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
        }
        curBlock = $('.contacts[data-id="' + curID +  '"]');
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
        }
    }
});

$(window).on('load resize', function() {

    $('.detail-media').each(function() {
        $('.detail-media-inner').css({'min-width': 0});
        $('.detail-media-inner').css({'min-width': $('.detail-media').width()});
        $('.detail-media').css({'min-height': 0});
        $('.detail-media').css({'min-height': $('.detail-media-inner').outerHeight()});
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    var windowWidth = $(window).width();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 0) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }

    $('.detail-media').each(function() {
        const headerHeight = $('header').outerHeight();
        if (windowScroll > 0) {
            $('.detail-media').addClass('fixed');
            let curMaxPosition = $('.detail').offset().top + $('.detail').outerHeight();
            if (132 + $('.detail-media-inner').outerHeight() > windowHeight) {
                curMaxPosition -= (132 + $('.detail-media-inner').outerHeight()) - windowHeight;
            }
            if (windowScroll + windowHeight >= curMaxPosition) {
                $('.detail-media-inner').css({'margin-top': (curMaxPosition) - (windowScroll + windowHeight)});
            } else {
                $('.detail-media-inner').css({'margin-top': 0});
            }
        } else {
            $('.detail-media').removeClass('fixed');
        }
    });
});

$(document).ready(function() {

    $('.commercial-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            speed: 400,
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true,
            },
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
        });
    });

    $('body').on('click', '.commercial-slider-item-link-prefs', function(e) {
        let curBlock = $('[data-id="' + $(this).attr('href').replace('#', '') +  '"]');
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
        }
        e.preventDefault();
    });

    $('body').on('click', '.commercial-item-favourite', function(e) {
        var curItem = $(this).parents().filter('.catalogue-item');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $.removeCookie('favourite-commercial-' + curItem.attr('data-project') + '-' + curItem.attr('data-build') + '-' + curItem.attr('data-id'), {path: '/'});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + curItem.find('.catalogue-item-preview-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + curItem.find('.catalogue-item-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Удалено из избранного</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        } else {
            $(this).addClass('active');
            $.cookie('favourite-commercial-' + curItem.attr('data-project') + '-' + curItem.attr('data-build') + '-' + curItem.attr('data-id'), 'true', {path:'/', expires: 365});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + curItem.find('.catalogue-item-preview-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + curItem.find('.catalogue-item-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status active"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Добавлено в избранное</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        }
        e.preventDefault();
    });

    $('.detail-commercial-favourite').each(function() {
        var curLink = $(this);
        if (typeof $.cookie('favourite-commercial-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id')) != 'undefined' && $.cookie('favourite-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id'))) {
            curLink.addClass('active');
        }
    });

    $('.detail-commercial-favourite').click(function(e) {
        var curLink = $(this);
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $.removeCookie('favourite-commercial-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id'), {path: '/'});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + $('.detail-media-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + $('.detail-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Удалено из избранного</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        } else {
            $(this).addClass('active');
            $.cookie('favourite-' + curLink.attr('data-project') + '-' + curLink.attr('data-build') + '-' + curLink.attr('data-id'), 'true', {path:'/', expires: 365});
            $('.header-favourite-popup').remove();
            $('header .container').append(  '<div class="header-favourite-popup">' +
                                                '<div class="header-favourite-popup-content">' +
                                                    '<div class="header-favourite-popup-preview"><img src="' + $('.detail-media-item').eq(0).find('img').attr('src') + '" alt=""></div>' +
                                                    '<div class="header-favourite-popup-text">' +
                                                        '<div class="header-favourite-popup-title">' + $('.detail-title').html() + '</div>' +
                                                        '<div class="header-favourite-popup-status active"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg>Добавлено в избранное</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="header-favourite-popup-link"><a href="' + $('.header-favourite').attr('href') + '" class="btn btn-border">Перейти в избранное</a></div>' +
                                            '</div>');
            window.clearTimeout(timerHeaderFavourite);
            timerHeaderFavourite = null;
            timerHeaderFavourite = window.setTimeout(function() {
                $('.header-favourite-popup').stop(true, true).fadeOut(300, function() {
                    $('.header-favourite-popup').remove();
                });
            }, 2000);
            updateFavouriteHeader();
        }
        e.preventDefault();
    });

    $('.commercial-results-more a').click(function(e) {
        var htmlList = '';
        for (var i = catalogueView; i < newData.length && i < (catalogueView + catalogueSize); i++) {
            var curFlat = newData[i];

            htmlList += '<div class="catalogue-item">' +
                            '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                                '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                                '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '</div>' +
                                '<div class="catalogue-item-preview">' +
                                    '<div class="catalogue-item-preview-list">' +
                                        '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                                '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                                '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                                '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadline + '</span></div>';
            if (curFlat.features.length > 0) {
                htmlList +=     '<div class="catalogue-item-props">';
                var countFeatures = 0;
                for (var j = 0; j < curFlat.features.length; j++) {
                    var curValues = curFlat.features[j].split('/');
                    for (var k = 0; k < curValues.length; k++) {
                        countFeatures++;
                        if (countFeatures < 3) {
                            htmlList += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                        }
                    }
                }
                if (countFeatures > 2) {
                    htmlList +=     '<div class="catalogue-item-prop">+' + (countFeatures - 2) + '</div>';
                }
                htmlList +=     '</div>';
            }
            htmlList +=         '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                            '</a>' +
                            '<a href="#" class="commercial-item-favourite"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></a>' +
                        '</div>';
        }

        $('.catalogue-list').append(htmlList);
        catalogueView += catalogueSize;
        if (newData.length > catalogueView) {
            var newCount = catalogueSize;
            if (newData.length - catalogueView < catalogueSize) {
                newCount = newData.length - catalogueView;
            }
            $('.commercial-results-more').addClass('visible');
            $('.commercial-results-more span').eq(0).html(newCount);
        } else {
            $('.commercial-results-more').removeClass('visible');
            catalogueView = newData.length;
        }
        e.preventDefault();
    });

    $('body').on('click', '.commercial-filter-params-item a', function(e) {
        var curItem = $(this).parent();

        if (curItem.hasClass('commercial-filter-params-item-projects')) {
            $('.main-select-dropdown-projects-item-parent').each(function() {
                var curProject = $(this);
                if (curProject.find('input').attr('value') == curItem.attr('data-value')) {
                    curProject.find('input').prop('checked', false);
                }
                if ($('.main-select-dropdown-project input:not(.main-select-dropdown-projects-item-parent-all):checked').length == 0) {
                    $('.main-select-dropdown-project input.main-select-dropdown-projects-item-parent-all').prop('checked', true);
                }
            });
        }

        if (curItem.hasClass('commercial-filter-params-item-price')) {
            $('.main-select-slider-price').each(function() {
                var curSlider = $(this);
                var curRange = curSlider.find('.main-select-slider-range-inner')[0];
                curRange.noUiSlider.set([Number(curSlider.find('.main-select-slider-min').html()), Number(curSlider.find('.main-select-slider-max').html())]);
            });
        }

        if (curItem.hasClass('commercial-filter-params-item-size')) {
            $('.main-select-slider-size').each(function() {
                var curSlider = $(this);
                var curRange = curSlider.find('.main-select-slider-range-inner')[0];
                curRange.noUiSlider.set([Number(curSlider.find('.main-select-slider-min').html()), Number(curSlider.find('.main-select-slider-max').html())]);
            });
        }

        if (curItem.hasClass('commercial-filter-params-item-features')) {
            $('.main-select-features input').each(function() {
                var curInput = $(this);
                if (curInput.attr('value') == curItem.attr('data-value')) {
                    curInput.prop('checked', false);
                }
            });
        }

        updateCommercialList();

        e.preventDefault();
    });

    $('.commercial-results-sort-popup-item').click(function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.commercial-results-sort-popup-item.active').removeClass('active');
            curItem.addClass('active');
            $('.commercial-results-sort-link span').html(curItem.attr('data-title'));
            if (curItem.hasClass('down')) {
                $('.commercial-results-sort-link').addClass('down');
            } else {
                $('.commercial-results-sort-link').removeClass('down');
            }
            updateCommercialList();
        }
    });

    $('.commercial-prefs-tabs-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.commercial-prefs-tabs-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.commercial-prefs-tabs-menu-item').index(curItem);
            $('.commercial-prefs-tabs-content.active').removeClass('active');
            $('.commercial-prefs-tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

});

var commercialData = null;

$(window).on('load', function() {
    var curURL = $('.wrapper').attr('data-commercialdata');
    if (curURL != undefined) {
        $.ajax({
            type: 'POST',
            url: curURL,
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('Сервис временно недоступен, попробуйте позже.');
        }).done(function(data) {
            commercialData = data;
            $('.commercial-filter-form form').each(function() {
                updateCommercialParams();
            });
        });
    }
});

function updateCommercialParams() {
    var projects = [];
    var features = [];

    var minSize = 999;
    var maxSize = 0;
    var minPrice = 999999999;
    var maxPrice = 0;

    for (var i = 0; i < commercialData.projects.length; i++) {
        var curProject = commercialData.projects[i];

        var isProjectHas = false;
        for (var x = 0; x < projects.length; x++) {
            if (projects[x].id == curProject.id) {
                isProjectHas = true;
            }
        }
        if (!isProjectHas) {
            projects.push({'id': curProject.id, 'title': curProject.title, 'avatar': curProject.avatar});
        }

        for (var j = 0; j < curProject.builds.length; j++) {
            var curBuild = curProject.builds[j];
            for (var k = 0; k < curBuild.flats.length; k++) {
                var curFlat = curBuild.flats[k];

                var curSize = Number(curFlat.size.replace(',', '.'));
                if (curSize < minSize) {
                    minSize = curSize;
                }
                if (curSize > maxSize) {
                    maxSize = curSize;
                }
                var curPrice = Number(curFlat.price);
                if (curPrice < minPrice) {
                    minPrice = curPrice;
                }
                if (curPrice > maxPrice) {
                    maxPrice = curPrice;
                }
            }
        }
    }

    for (var i = 0; i < projects.length; i++) {
        var checked = '';
        if (searchParams.get('projects[' + projects[i].id + ']') != null) {
            checked = ' checked';
        }
        $('.main-select-dropdown-projects').append( '<div class="main-select-dropdown-projects-item">' +
                                                        '<div class="main-select-dropdown-projects-item-parent"><label><input type="checkbox" name="projects[' + projects[i].id + ']" value="' + projects[i].id + '"' + checked + '><span><img src="' + projects[i].avatar + '" alt=""><strong>' + projects[i].title + '</strong></span></label></div>' +
                                                    '</div>');
        if (checked) {
            $('.main-select-dropdown-projects input:last').trigger('change');
        }
    }

    minSize = Math.floor(minSize);
    maxSize = Math.ceil(maxSize);
    $('.main-select-slider-size .main-select-slider-from').val(minSize);
    $('.main-select-slider-size .main-select-slider-to').val(maxSize);
    var sizeSlider = $('.main-select-slider-size');
    sizeSlider.find('.main-select-slider-min').html(minSize);
    sizeSlider.find('.main-select-slider-max').html(maxSize);
    var sizeRange = sizeSlider.find('.main-select-slider-range-inner')[0];
    sizeRange.noUiSlider.updateOptions({
        range: {
            'min': minSize,
            'max': maxSize
        }
    });
    var sizeFrom = minSize;
    var sizeTo = maxSize;
    if (searchParams.get('sizeFrom') != null) {
        sizeFrom = searchParams.get('sizeFrom');
    }
    if (searchParams.get('sizeTo') != null) {
        sizeTo = searchParams.get('sizeTo');
    }
    sizeRange.noUiSlider.set([sizeFrom, sizeTo]);

    minPrice = Math.floor(minPrice);
    maxPrice = Math.ceil(maxPrice);
    $('.main-select-slider-price .main-select-slider-from').val(minPrice);
    $('.main-select-slider-price .main-select-slider-to').val(maxPrice);
    var priceSlider = $('.main-select-slider-price');
    priceSlider.find('.main-select-slider-min').html(minPrice);
    priceSlider.find('.main-select-slider-max').html(maxPrice);
    var priceRange = priceSlider.find('.main-select-slider-range-inner')[0];
    priceRange.noUiSlider.updateOptions({
        range: {
            'min': minPrice,
            'max': maxPrice
        }
    });
    var priceFrom = minPrice;
    var priceTo = maxPrice;
    if (searchParams.get('priceFrom') != null) {
        priceFrom = searchParams.get('priceFrom');
    }
    if (searchParams.get('priceTo') != null) {
        priceTo = searchParams.get('priceTo');
    }
    priceRange.noUiSlider.set([priceFrom, priceTo]);

    updateCommercialList();
    $('.commercial-filter-ctrl').addClass('visible');
}

function updateCommercialList() {
    var isClear = false;
    if (!(($('.main-select-slider-size .main-select-slider-from').val() == $('.main-select-slider-size .main-select-slider-min').html()) && ($('.main-select-slider-size .main-select-slider-to').val() == $('.main-select-slider-size .main-select-slider-max').html()))) {
        isClear = true;
    }
    if (!(($('.main-select-slider-price .main-select-slider-from').val() == $('.main-select-slider-price .main-select-slider-min').html()) && ($('.main-select-slider-price .main-select-slider-to').val() == $('.main-select-slider-price .main-select-slider-max').html()))) {
        isClear = true;
    }
    if ($('.main-select-features input:checked').length > 0) {
        isClear = true;
    }
    if (isClear) {
        $('.main-select-reset').addClass('visible');
    } else {
        $('.main-select-reset').removeClass('visible');
    }

    newData = [];
    catalogueView = 0;
    if (typeof(commercialData) != 'undefined') {
        for (var i = 0; i < commercialData.projects.length; i++) {
            var curProject = commercialData.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.project = curProject.title;
                    curFlat.projectID = curProject.id;
                    curFlat.build = curBuild.title;
                    curFlat.buildID = curBuild.id;

                    var projectsCorrect = false;
                    if ($('.main-select-dropdown-projects input:checked').length == 0) {
                        projectsCorrect = true;
                    } else {
                        $('.main-select-dropdown-projects input:checked').each(function() {
                            var curID = $(this).attr('value');
                            if (curID == '0' || curID == curProject.id) {
                                projectsCorrect = true;
                            }
                        });
                    }

                    var flatSize = Number(String(curFlat.size).replace(',', '.'));
                    var sizeCorrect = false;
                    var minSize = Number($('.main-select-slider-size .main-select-slider-from').val());
                    var maxSize = Number($('.main-select-slider-size .main-select-slider-to').val());
                    if (flatSize >= minSize && flatSize <= maxSize) {
                        sizeCorrect = true;
                    }

                    var flatPrice = Number(String(curFlat.price).replace(',', '.'));
                    var priceCorrect = false;
                    var minPrice = Number($('.main-select-slider-price .main-select-slider-from').val());
                    var maxPrice = Number($('.main-select-slider-price .main-select-slider-to').val());
                    if (flatPrice >= minPrice && flatPrice <= maxPrice) {
                        priceCorrect = true;
                    }

                    var specialCorrect = false;
                    if ($('.main-select-features input:checked').length == 0) {
                        specialCorrect = true;
                    } else {
                        var curEqual = 0;
                        var curSpecial = curFlat.features;
                        if (curSpecial.length > 0) {
                            for (var m = 0; m < curSpecial.length; m++) {
                                var curSpecialValues = curSpecial[m].split('/');
                                for (var t = 0; t < curSpecialValues.length; t++) {
                                    if ($('.main-select-features input[value="' + curSpecialValues[t] + '"]:checked').length == 1) {
                                        curEqual++;
                                    }
                                }
                            }
                        }
                        if ($('.main-select-features input:checked').length == curEqual) {
                            specialCorrect = true;
                        }
                    }

                    if (projectsCorrect && sizeCorrect && priceCorrect && specialCorrect) {
                        newData.push(curFlat);
                    }
                }
            }
        }
    }

    var typeSort = $('.commercial-results-sort-popup-item.active').attr('data-value');
    var isReverse = $('.commercial-results-sort-popup-item.active').hasClass('down');
    if (typeSort == 'price') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.price).replace(',', '.')) < Number(String(b.price).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.price).replace(',', '.')) > Number(String(b.price).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'size') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) < Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) > Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'deadline') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                var aDeadline = -1;
                if (a.deadline != '') {
                    aDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(a.deadline)[2]);
                }
                var bDeadline = -1;
                if (b.deadline != '') {
                    bDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(b.deadline)[2]);
                }
                if (aDeadline < bDeadline) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                var aDeadline = -1;
                if (a.deadline != '') {
                    aDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(a.deadline)[2]);
                }
                var bDeadline = -1;
                if (b.deadline != '') {
                    bDeadline = Number(/(^|\s)(\d{4})(\s|$)/.exec(b.deadline)[2]);
                }
                if (aDeadline > bDeadline) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }

    $('.commercial-filter-params-title span').html(newData.length + ' ' + getCommercialText(newData.length));

    $('.commercial-filter-params-item').remove();
    var selectedHTML = '';
    $('.main-select-dropdown-projects-item-parent input[value!="0"]:checked').each(function() {
        selectedHTML += '<div class="commercial-filter-params-item commercial-filter-params-item-projects" data-value="' + $(this).attr('value') + '">' + $(this).parent().find('span strong').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
    });
    $('.main-select-slider-price').each(function() {
        var curSlider = $(this);
        if ((curSlider.find('.main-select-slider-from').attr('value') != curSlider.find('.main-select-slider-min').html()) || (curSlider.find('.main-select-slider-to').attr('value') != curSlider.find('.main-select-slider-max').html())) {
            selectedHTML += '<div class="commercial-filter-params-item commercial-filter-params-item-price">от ' + curSlider.find('.main-select-slider-text-from span').html() + ' до ' + curSlider.find('.main-select-slider-text-to span').html() + ' руб<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
        }
    });
    $('.main-select-slider-size').each(function() {
        var curSlider = $(this);
        if ((curSlider.find('.main-select-slider-from').attr('value') != curSlider.find('.main-select-slider-min').html()) || (curSlider.find('.main-select-slider-to').attr('value') != curSlider.find('.main-select-slider-max').html())) {
            selectedHTML += '<div class="commercial-filter-params-item commercial-filter-params-item-size">от ' + curSlider.find('.main-select-slider-text-from span').html() + ' до ' + curSlider.find('.main-select-slider-text-to span').html() + ' кв.м<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
        }
    });
    $('.main-select-features input:checked').each(function() {
        selectedHTML += '<div class="commercial-filter-params-item commercial-filter-params-item-features" data-value="' + $(this).attr('value') + '">' + $(this).parent().find('span').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filter-params-remove"></use></svg></a></div>';
    });
    $('.commercial-filter-params-list').append(selectedHTML);
    if (selectedHTML != '') {
        $('.commercial-filter-params-title em').addClass('visible');
    } else {
        $('.commercial-filter-params-title em').removeClass('visible');
    }

    var htmlList = '';
    for (var i = 0; i < newData.length && i < catalogueSize; i++) {
        var curFlat = newData[i];

        htmlList += '<div class="catalogue-item" data-project="' + curFlat.projectID + '" data-build="' + curFlat.buildID + '" data-id="' + curFlat.number + '">' +
                        '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                            '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                            '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '</div>' +
                            '<div class="catalogue-item-preview">' +
                                '<div class="catalogue-item-preview-list">' +
                                    '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                            '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                            '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                            '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadline + '</span></div>';
        if (curFlat.features.length > 0) {
            htmlList +=     '<div class="catalogue-item-props">';
            var countFeatures = 0;
            var popupFeatures = '';
            for (var j = 0; j < curFlat.features.length; j++) {
                var curValues = curFlat.features[j].split('/');
                for (var k = 0; k < curValues.length; k++) {
                    countFeatures++;
                    if (countFeatures < 3) {
                        htmlList += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                    }
                    popupFeatures += '<div class="catalogue-item-prop">' + curValues[k] + '</div>';
                }
            }
            if (countFeatures > 2) {
                htmlList +=     '<div class="catalogue-item-prop">+' + (countFeatures - 2) + '</div>';
                htmlList +=     '<div class="catalogue-item-props-popup"><div class="catalogue-item-props-popup-title">Особенности</div><div class="catalogue-item-props-popup-list">' + popupFeatures + '</div></div>';
            }
            htmlList +=     '</div>';
        }
        htmlList +=         '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                        '</a>';
        let classFavouriteActive = '';
        if (typeof $.cookie('favourite-commercial-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) != 'undefined' && $.cookie('favourite-commercial-' + curFlat.projectID + '-' + curFlat.buildID + '-' + curFlat.number) == 'true') {
            classFavouriteActive = ' active'
        }
        htmlList +=     '<a href="#" class="commercial-item-favourite' + classFavouriteActive + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></a>' +
                    '</div>';
    }

    $('.catalogue-list').html(htmlList);
    if (newData.length > catalogueSize) {
        catalogueView = catalogueSize;
        $('.commercial-results-more').addClass('visible');
        var newCount = catalogueSize;
        if (newData.length - catalogueView < catalogueSize) {
            newCount = newData.length - catalogueView;
        }
        $('.commercial-results-more span').eq(0).html(newCount);
        $('.commercial-results-more span').eq(1).html(newData.length);
    } else {
        $('.commercial-results-more').removeClass('visible');
        catalogueView = newData.length;
    }
}

function getCommercialText(number) {
    var endings = Array('помещений', 'помещение', 'помещения');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}