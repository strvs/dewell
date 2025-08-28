$(document).ready(function() {

    $('form').each(function() {
        initForm($(this));
    });

    $('.header-menu-projects-item-link').eq(0).each(function() {
        var curItem = $(this).parent();
        curItem.find('.header-menu-projects-item-link').addClass('hover');
        $('.header-menu-projects-info').css({'background-image': 'url("' + curItem.attr('data-img') + '")'});
        $('.header-menu-projects-info-title').html(curItem.find('.header-menu-projects-item-title').html());
        $('.header-menu-projects-info-flats').html(curItem.attr('data-flats'));
        $('.header-menu-projects-info-price').html(curItem.attr('data-price'));
    });

    $('.header-menu-projects-item-link').on('mouseenter', function() {
        $('.header-menu-projects-item-link.hover').removeClass('hover');
        $(this).addClass('hover');
        var curItem = $(this).parent();
        $('.header-menu-projects-info').css({'background-image': 'url("' + curItem.attr('data-img') + '")'});
        $('.header-menu-projects-info-title').html(curItem.find('.header-menu-projects-item-title').html());
        $('.header-menu-projects-info-flats').html(curItem.attr('data-flats'));
        $('.header-menu-projects-info-price').html(curItem.attr('data-price'));
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

    $('.main-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
        });
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

    $('.main-career').each(function() {
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
        updateSelectParams();
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

    var detailMediaSlider;
    $('.detail-media-container').each(function() {
        var curSlider = $(this);
        detailMediaSlider = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 1,
            on: {
                slideChange: function () {
                    $('.detail-media-menu-item.active').removeClass('active');
                    $('.detail-media-menu-item').eq(detailMediaSlider.activeIndex).addClass('active');
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
        }
    });

    $('.detail-features-title').click(function() {
        $('.detail-features').toggleClass('open');
    });

});

function initForm(curForm) {
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
}

var dataSelect = null;

function updateSelectParams() {
    var curForm = $('.catalogue-filter-form form');
    $.ajax({
        type: 'POST',
        url: curForm.attr('data-action'),
        processData: false,
        contentType: false,
        dataType: 'json',
        cache: false
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert('Сервис временно недоступен, попробуйте позже.');
    }).done(function(data) {
        dataSelect = data;
        updateSelectList();
    });
}

function updateSelectList() {
    var newData = [];
    if (typeof(dataSelect) != 'undefined') {
        for (var i = 0; i < dataSelect.projects.length; i++) {
            var curProject = dataSelect.projects[i];
            for (var j = 0; j < curProject.builds.length; j++) {
                var curBuild = curProject.builds[j];
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.project = curProject.title;
                    curFlat.build = curBuild.title;
                    curFlat.deadlineq = curBuild.deadlineq;
                    curFlat.deadliney = curBuild.deadliney;
                    newData.push(curFlat);
                }
            }
        }
    }

    var htmlList = '';
    for (var i = 0; i < newData.length; i++) {
        var curFlat = newData[i];

        htmlList += '<div class="catalogue-item">' +
                        '<a href="' + curFlat.url + '" class="catalogue-item-link">' +
                            '<div class="catalogue-item-project">' + curFlat.project + '</div>' +
                            '<div class="catalogue-item-build">Корп. ' + curFlat.build + ', этаж ' + curFlat.floor + '/' + curFlat.floors + '</div>' +
                            '<div class="catalogue-item-preview">' +
                                '<div class="catalogue-item-preview-list">' +
                                    '<div class="catalogue-item-preview-item"><img src="' + curFlat.preview + '" alt=""></div>' +
                                '</div>' +
                                '<div class="catalogue-item-preview-dots">' +
                                    '<div class="catalogue-item-preview-dots-item active"></div>' +
                                    '<div class="catalogue-item-preview-dots-item"></div>' +
                                    '<div class="catalogue-item-preview-dots-item"></div>' +
                                    '<div class="catalogue-item-preview-dots-item"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="catalogue-item-title">' + curFlat.title + '</div>' +
                            '<div class="catalogue-item-price">' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽</div>' +
                            '<div class="catalogue-item-installment">В <span>рассрочку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + ' ₽ / мес.</div>' +
                            '<div class="catalogue-item-deadline"><span>Сдача ' + curFlat.deadlineq + ' кв. ' + curFlat.deadliney + '</span></div>' +
                            '<div class="catalogue-item-props">' +
                                '<div class="catalogue-item-prop">Без отделки</div>' +
                                '<div class="catalogue-item-prop">Гардеробная</div>' +
                                '<div class="catalogue-item-prop">+1</div>' +
                            '</div>' +
                            '<div class="catalogue-item-number">' + curFlat.number + '</div>' +
                        '</a>' +
                        '<a href="#" class="catalogue-item-favourite"><svg><use xlink:href="images/sprite.svg#icon-favourite"></use></svg></a>' +
                    '</div>';
    }

    $('.catalogue-list').html(htmlList);
}