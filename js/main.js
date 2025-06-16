(function(html) {

    'use strict';


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        let triggerHeight = 100; // Default trigger height

        if (!hdr) return;

        window.addEventListener('scroll', function () {
            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');

            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }
        });

    }; // end ssMoveHeader


   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {
                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    // Only close menu if NOT the Services dropdown toggle
                    if (!link.matches('#services-dropdown-toggle')) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                    }
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


   /* highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll('.target-section');
        if (!sections) return;

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {
            const sections = document.querySelectorAll("section[id]");
            const navItems = document.querySelectorAll(".s-header__nav a");

            if (!sections.length || !navItems.length) return;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute("id");
                const navItem = document.querySelector(`.s-header__nav a[href*="${sectionId}"]`);
                
                if (!navItem) return;

                if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                    navItem.classList.add("current");
                } else {
                    navItem.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* glightbox
    * ------------------------------------------------------ */ 
    const ssGLightbox = function() {

        const lightbox = GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: false,
            autoplayVideos: true,
            svg: {
                close: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>',
                prev: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>',
                next: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>'
            }
        });        

    } // end ssGLightbox


   /* swiper
    * ------------------------------------------------------ */ 
    // const ssSwiper = function() {

    //     const testimonialsSwiper = new Swiper('.s-testimonials__slider', {

    //         slidesPerView: 1,
    //         pagination: {
    //             el: '.swiper-pagination',
    //             clickable: true,
    //         },
    //         breakpoints: {
    //             // when window width is > 400px
    //             401: {
    //                 slidesPerView: 1,
    //                 spaceBetween: 20
    //             },
    //             // when window width is > 800px
    //             801: {
    //                 slidesPerView: 2,
    //                 spaceBetween: 50
    //             },
    //             // when window width is > 1180px
    //             1181: {
    //                 slidesPerView: 3,
    //                 spaceBetween: 48
    //             }
    //         }
    //     });

    // }; 

    const ssSwiper = function() {
        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 15000,
                disableOnInteraction: false,
            },
            breakpoints: {
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                801: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
                1181: {
                    slidesPerView: 3,
                    spaceBetween: 48,
                }
            }
        });
    
        testimonialsSwiper.el.addEventListener('mouseenter', function() {
            testimonialsSwiper.autoplay.stop();
        });
    
        testimonialsSwiper.el.addEventListener('mouseleave', function() {
            testimonialsSwiper.autoplay.start();
        });
    };

   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssGLightbox();
        ssSwiper();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);



// Count Up Projects
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".num");
    const options = { root: null, threshold: 0.5 };

    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute("data-target"));
                const increment = targetValue / 200;
                let currentValue = 0;

                const countUp = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(countUp);
                    }
                    target.textContent = `${Math.floor(currentValue)}+`;
                }, 10);

                observer.unobserve(target);
            }
        });
    };

    const observer = new IntersectionObserver(startCounting, options);
    counters.forEach(counter => observer.observe(counter));
});

document.addEventListener('DOMContentLoaded', function() {
    var servicesToggle = document.getElementById('services-dropdown-toggle');
    if (servicesToggle) {
        servicesToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                var parentLi = servicesToggle.parentElement;
                parentLi.classList.toggle('dropdown-open');
            }
        });
    }
});

// Add Intersection Observer for feature items
const featureItems = document.querySelectorAll('.feature-item');
const observerOptions = {
    root: null,
    // Set rootMargin to focus on center 50% of viewport
    rootMargin: '-30% 0px -30% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Get the element's position relative to viewport
        const rect = entry.target.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        
        // Calculate if element is within center 50% of viewport
        const isInCenter = Math.abs(elementCenter - viewportCenter) < (viewportHeight * 0.25);
        
        if (isInCenter && entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, observerOptions);

featureItems.forEach(item => observer.observe(item));

let inViewOrder = [];

function checkFeatureCardsCenter() {
    const cards = document.querySelectorAll('.feature-card');
    const viewportCenter = window.innerHeight / 2;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        if (Math.abs(cardCenter - viewportCenter) < 24) { // 24px tolerance
            if (!card.classList.contains('in-view')) {
                card.classList.add('in-view');
                inViewOrder.push(card);
            }
        } else {
            if (card.classList.contains('in-view')) {
                card.classList.remove('in-view');
                inViewOrder = inViewOrder.filter(c => c !== card);
            }
        }
    });
    // Ensure only the 3 most recently activated cards have 'in-view'
    while (inViewOrder.length > 3) {
        const oldest = inViewOrder.shift();
        if (oldest.classList.contains('in-view')) {
            oldest.classList.remove('in-view');
        }
    }
}

window.addEventListener('scroll', checkFeatureCardsCenter, { passive: true });
window.addEventListener('resize', checkFeatureCardsCenter);
document.addEventListener('DOMContentLoaded', checkFeatureCardsCenter);