/**
 * Depends on TweenMax.min.js: https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js
 */

window.addEventListener('load', () => {

    class FadeInOnscroll {
        constructor( options ) {
            this.$element = document.querySelector( options.contentSelector );
            this.duration = options.animationDuration || 1;
            this.positionShift = options.positionShift || 50;

            this.elementHt = this.$element.offsetHeight;
            this.contentDisplayed = false;

            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.fadeIn = this.fadeIn.bind( this );

            this.init();
        }

        init() {
            this.$element.style.opacity = 0;
            this.bindEvents();
        }

        bindEvents() {
            this.getHeightAboveElement();
            window.addEventListener('scroll', this.fadeIn );
        }

        fadeIn() {
            if ( this.contentDisplayed ) return false;

            if ( this.heightAboveElement - window.innerHeight + (this.elementHt * 0.5) <= window.scrollY ) {
                this.contentDisplayed = true;

                TweenMax.fromTo(
                    this.$element,
                    this.duration,
                    { y: this.positionShift, opacity: 0 },
                    { y: 0, opacity: 1, ease: Power1.easeOut }
                );
            }
        }

        getHeightAboveElement() {
            const siblings = [...this.$element.parentElement.children];
            const elementIndex = siblings.indexOf( this.$element );

            this.heightAboveElement = 0;
            for ( let i = elementIndex - 1; i >= 0; i-- ) {
                this.heightAboveElement += siblings[i].offsetHeight;
            }
        }
    }

    const fadeInContent = new FadeInOnscroll({
        contentSelector: '.fade-in-wrap',
        animationDuration: 1, // seconds; defaults to 1
        positionShift: 50 // number of pixels the content should slide; defaults to 50
    });

});
