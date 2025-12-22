$(document).ready(function() {
    // ========== Header Moving Function ==========
    const headerMoving = () => {
        const $header = $('header');
        const $headerContainer = $('.header-container');
        const $mainHeader = $('.header-back');
        const $downHeader = $('.header-down');
        const $advertise = $('.advertise');
        const $resSearch = $('.res-search');
        
        const resSearchHeight = $resSearch.outerHeight() || 0;
        const downHeaderHeight = $downHeader.outerHeight() || 0;
        const mainHeaderHeight = $mainHeader.outerHeight() || 0;
        const adHeaderHeight = $advertise.outerHeight() || 0;
    
        let lastScrollTop = 0;
        let isHeaderVisible = true;
        
        $mainHeader.removeClass('lg-header-up');
        $downHeader.removeClass('header-hidden');
        $resSearch.removeClass('header-hidden');
        
        if (window.innerWidth > 992) {
            const headerHeight = mainHeaderHeight + downHeaderHeight;
            const totalHeight = headerHeight + adHeaderHeight;
            
            $headerContainer.css('height', headerHeight);
            $('body').css('padding-top', totalHeight);
            
            $(window).off('scroll.headerDesktop').on('scroll.headerDesktop', function() {
                const currentScroll = $(this).scrollTop();
                
                if (currentScroll > 50) {
                    if (currentScroll > lastScrollTop && isHeaderVisible) {
                        $mainHeader.addClass('lg-header-up');
                        $downHeader.addClass('header-hidden');
                        $headerContainer.css('height', mainHeaderHeight);
                        isHeaderVisible = false;
                    } else if (currentScroll < lastScrollTop && !isHeaderVisible) {
                        $mainHeader.removeClass('lg-header-up');
                        $downHeader.removeClass('header-hidden');
                        $headerContainer.css('height', headerHeight);
                        isHeaderVisible = true;
                    }
                } else {
                    $mainHeader.removeClass('lg-header-up');
                    $downHeader.removeClass('header-hidden');
                    $headerContainer.css('height', headerHeight);
                    isHeaderVisible = true;
                }
                
                lastScrollTop = currentScroll;
            });
        } else {
            const headerHeight = mainHeaderHeight + resSearchHeight;
            const totalHeight = headerHeight + adHeaderHeight;
            
            $headerContainer.css('height', headerHeight);
            $('body').css('padding-top', totalHeight);
            
            $(window).off('scroll.headerMobile').on('scroll.headerMobile', function() {
                const currentScroll = $(this).scrollTop();
                
                if (currentScroll > 50) {
                    if (currentScroll > lastScrollTop && isHeaderVisible) {
                        $mainHeader.addClass('lg-header-up');
                        $resSearch.addClass('header-hidden');
                        $headerContainer.css('height', mainHeaderHeight);
                        isHeaderVisible = false;
                    } else if (currentScroll < lastScrollTop && !isHeaderVisible) {
                        $mainHeader.removeClass('lg-header-up');
                        $resSearch.removeClass('header-hidden');
                        $headerContainer.css('height', headerHeight);
                        isHeaderVisible = true;
                    }
                } else {
                    $mainHeader.removeClass('lg-header-up');
                    $resSearch.removeClass('header-hidden');
                    $headerContainer.css('height', headerHeight);
                    isHeaderVisible = true;
                }
                
                lastScrollTop = currentScroll;
            });
        }
    };

    headerMoving();
    
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            headerMoving();
        }, 250);
    });
     // ========== MEGAMENU با HOVER و OVERLAY ==========
    
    // اضافه کردن overlay به body
    if ($('.megamenu-overlay').length === 0) {
        $('body').append('<div class="megamenu-overlay"></div>');
    }

    const $categoryBtn = $('#categoryBtn');
    const $megamenuDropdown = $('#megamenuDropdown');
    const $megamenuOverlay = $('.megamenu-overlay');
    const $closeBtn = $('#closeBtn');
    const $categoryItems = $('.category-item');
    const $subcategoriesContents = $('.subcategories-content');

    let hoverTimeout;

    $categoryBtn.on('mouseenter', function() {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(function() {
            $megamenuDropdown.addClass('active');
            $categoryBtn.addClass('active');
            $megamenuOverlay.addClass('active');
        }, 200); 
    });

    $categoryBtn.add($megamenuDropdown).on('mouseleave', function(e) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(function() {
            if (!$categoryBtn.is(':hover') && !$megamenuDropdown.is(':hover')) {
                closeMegamenu();
            }
        }, 300);
    });

    $megamenuDropdown.on('mouseenter', function() {
        clearTimeout(hoverTimeout);
    });


    function closeMegamenu() {
        $megamenuDropdown.removeClass('active');
        $categoryBtn.removeClass('active');
        $megamenuOverlay.removeClass('active');
    }

    $categoryItems.each(function() {
        $(this).on('mouseenter', function() {
            $categoryItems.removeClass('active');
            
            $(this).addClass('active');
            
            const category = $(this).data('category');
            
            $subcategoriesContents.removeClass('active');
            
            $('[data-content="' + category + '"]').addClass('active');
        });
    });

    
    $megamenuDropdown.on('click', function(event) {
        event.stopPropagation();
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.category, #megamenuDropdown').length) {
            closeMegamenu();
        }
    });

   
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMegamenu();
        }
    });

})

// ========== Mobile Off-Canvas Menu ==========
$(document).ready(function() {
    const $offcanvas = $('.mobile-offcanvas');
    const $overlay = $('.mobile-offcanvas-overlay');
    const $barMenu = $('.bar-menu');
    const $closeBtn = $('.offcanvas-close');
    const $body = $('body');
    
    $barMenu.on('click', function() {
        $offcanvas.addClass('active');
        $overlay.addClass('active');
        $body.addClass('offcanvas-open');
    });
    
    function closeOffcanvas() {
        $offcanvas.removeClass('active');
        $overlay.removeClass('active');
        $body.removeClass('offcanvas-open');
    }
    
    $closeBtn.on('click', closeOffcanvas);
    $overlay.on('click', closeOffcanvas);
    
    $('.offcanvas-has-submenu > .offcanvas-submenu-toggle').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        const $submenu = $this.next('.offcanvas-submenu');
        
        $this.toggleClass('active');
        $submenu.toggleClass('active');
        
        $('.offcanvas-has-submenu > .offcanvas-submenu-toggle').not($this).removeClass('active');
        $('.offcanvas-submenu').not($submenu).removeClass('active');
    });
    
    $('.offcanvas-megamenu-trigger > .offcanvas-submenu-toggle').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        const $megamenu = $this.next('.offcanvas-megamenu');
        
        $this.toggleClass('active');
        $megamenu.toggleClass('active');
    });
    
    $('.offcanvas-category-toggle').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        const $subcategory = $this.next('.offcanvas-subcategory');
        
        // Toggle active class
        $this.toggleClass('active');
        $subcategory.toggleClass('active');
        
        $('.offcanvas-category-toggle').not($this).removeClass('active');
        $('.offcanvas-subcategory').not($subcategory).removeClass('active');
    });
    
  
});

 // ========== Banner Carousel ==========
 $(document).ready(function(){
            var articlesCarousel = $('.baner-owl').owlCarousel({
                rtl: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: false,
                // center: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
        //          animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
               
                responsive: {
                    0: {
                        items: 1,
                        
                    },
                    
                  
                }
            });
            
            
            $('.baner-right').click(function() {
                articlesCarousel.trigger('prev.owl.carousel');
            });
            
            $('.baner-nav-left').click(function() {
                articlesCarousel.trigger('next.owl.carousel');
            });
        });


 // ========== CATEGORY Carousel ==========
 $(document).ready(function(){
            var articlesCarousel = $('.cat-owl').owlCarousel({
                rtl: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: false,
            
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
        //          animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
               
                responsive: {
                    0: {
                        items: 1,
                        
                    },
                     1200: {
                        items: 8,
                        
                    },
                    
                  
                }
            });
            
            
            $('.baner-right').click(function() {
                articlesCarousel.trigger('prev.owl.carousel');
            });
            
            $('.baner-nav-left').click(function() {
                articlesCarousel.trigger('next.owl.carousel');
            });
        });


         // ========== CATEGORY Carousel ==========
 $(document).ready(function(){
            var articlesCarousel = $('.sale-owl').owlCarousel({
                rtl: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: false,
            
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
        //          animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
               
                responsive: {
                    0: {
                        items: 1,
                        
                    },
                     1200: {
                        items: 5.3,
                        
                    },
                    
                  
                }
            });
            
            
            $('.baner-right').click(function() {
                articlesCarousel.trigger('prev.owl.carousel');
            });
            
            $('.baner-nav-left').click(function() {
                articlesCarousel.trigger('next.owl.carousel');
            });
        });

        
   $(document).ready(function(){

        const owlOptions = {
            loop: true,
            // margin: 30,
            nav: true, 
            dots: false, 
            rtl: true, 
            responsive:{
                0:{
                    items:1.5
                },
                600:{
                    items:2
                },
                768:{
                    items:3
                },
                1024:{
                    items:6 
                }
            }
        };

        $('.tab-link').on('click', function(){
            const tabId = $(this).data('tab');

            $('.tab-link').removeClass('active');
            $('.tab-pane').removeClass('active');

            $(this).addClass('active');
            $('#' + tabId).addClass('active');

            const activeCarousel = $('#' + tabId).find('.owl-carousel');
            
           
            if (!activeCarousel.hasClass('owl-loaded')) {
                activeCarousel.owlCarousel(owlOptions);
            }
        });

        $('.tab-pane.active .owl-carousel').owlCarousel(owlOptions);

    });