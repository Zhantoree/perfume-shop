document.addEventListener('DOMContentLoaded', () => {
    let headerMenu = document.querySelector('.header__nav');
    let catalogBlock = document.querySelector('.catalog');
    document.addEventListener('click', ({ target }) => {
        // burger
        if (target.classList.contains('burger')) {
            target.classList.toggle('_opened');
            headerMenu.classList.toggle('active');
        }
        if (target.closest('.js-catalog-show')) {
            catalogBlock.classList.toggle('active');
        }
    });
});

window.onload = () => {
    $('.busket__box-send').click(function(){
        $('.popup-blank').addClass('active');
    });
    $('.blank__close').click(function(){
        $('.popup-blank').removeClass('active');
    });
    $('.thank__block-close').click(function(){
        $('.thank').removeClass('active');
    });
    // $.fn.setCursorPosition = function(pos) {
    //     if ($(this).get(0).setSelectionRange) {
    //         $(this).get(0).setSelectionRange(pos, pos)
    //     } else if ($(this).get(0).createTextRange) {
    //         var range = $(this).get(0).createTextRange()
    //         range.collapse(true)
    //         range.moveEnd('character', pos)
    //         range.moveStart('character', pos)
    //         range.select()
    //     }
    // }
    // $('input[type="tel"]').on('click', function() {
    //     $(this).setCursorPosition(3)
    // }).mask('+7 (999) 999 99 99')

    // $('.way').waypoint({
    //     handler: function() {
    //         $(this.element).addClass("way--active");

    //     },
    //     offset: '88%'
    // });
    let catalogNavigationSwiper = new Swiper('.catalog__navigation-swiper', {
        slidesPerView: 8,
        direction: 'vertical',
        navigation: {
            nextEl: '.catalog__navigation-next'
        },
        mousewheel: {
            enable: true
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 5,
            },
            1240: {
                slidesPerView: 8
            },
        },
    });
    let catalogElementsSwiper = new Swiper('.catalog__products-swiper', {
        slidesPerView: 1,
        effect: 'fade',
        navigation: {
            nextEl: '.catalog__products-arrow.next',
            prevEl: '.catalog__products-arrow.prev',
        }
    });
    $('.swiper-filter-1').on( 'click', '.swiper-slide', function() {
        var filter = $(this).attr('data-filter');
        
        $('.catalog__products-swiper .swiper-slide').css('display', 'none')
        $('.catalog__products-swiper .swiper-slide' + filter).css('display', '')
        $('.catalog__navigation-swiper .swiper-slide').removeClass('active');
        $(this).addClass('active');
        
        updateSlider(catalogElementsSwiper);
        
        return false;
    });

    $('.swiper-filter-2').on( 'click', '.swiper-slide', function() {
        var filter = $(this).attr('data-filter');
        
        $('.catalog__category .swiper-slide').css('display', 'none')
        $('.catalog__category .swiper-slide' + filter).css('display', '')
        $('.catalog__navigation-swiper .swiper-slide').removeClass('active');
        $(this).addClass('active');
        
        updateSlider(catalogCategorySwiper);
        
        return false;
    });

    let catalogCategorySwiper = new Swiper('.catalog__category', {
        slidesPerView: 8,
        direction: 'vertical',
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.catalog__category-next'
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 5,
            },
            1240: {
                slidesPerView: 8
            },
        },
    });
    
    function updateSlider(slider1) {
        slider1.updateSize();
        slider1.updateSlides();
        slider1.updateProgress();
        slider1.updateSlidesClasses();
        slider1.slideTo(0);
    }

    let goodsSlider1 = new Swiper('.goods__slider-1', {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1240: {
                slidesPerView: 4
            },
        },
    });
    let goodsSlider2 = new Swiper('.goods__slider-2', {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1240: {
                slidesPerView: 4
            },
        },
    });

    $('.marquee').marquee({
        direction: 'left',
        speed: 100,
    });

    let productCarouselItems = new Swiper('.product__carousel', {
        slidesPerView: 4,
        spaceBetween: 10,
        direction: 'vertical',
        slideToClickedSlide: true,
        loop: true,
        loopedSlides: 4,
    });

    let productMainItems = new Swiper('.product__main', {
        slidesPerView: 'auto',
        effect: 'fade',
        loop: true,
        loopedSlides: 4,
        noSwiping: true,
        noSwipingClass: '.swiper-slide',
    });
    productMainItems.controller.control = productCarouselItems;
    productCarouselItems.controller.control = productMainItems;

    let stockSlider = new Swiper('.stock__slider', {
        slidesPerView: 'auto',
        effect: 'fade',
        navigation: {
            nextEl: '.stock__arrow.next',
            prevEl: '.stock__arrow.prev'
        }
    });
};

// loader func
function submitForm() {
    $('#form_loader').show();
    const busket = document.querySelector('.busket')
    if (busket) {
        clearLocalStorage();
    }
}

function clearLocalStorage() {
    localStorage.removeItem('fontaneroCart');
}
//Alert form
let alertt = document.querySelector(".alert--fixed");
let alertClose = document.querySelectorAll(".alert--close")
for (let item of alertClose) {
    item.addEventListener('click', function(event) {
        alertt.classList.remove("alert--active")
        alertt.classList.remove("alert--warning")
        alertt.classList.remove("alert--error")
    })
}