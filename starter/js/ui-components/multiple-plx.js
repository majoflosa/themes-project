window.onload = function() {
    
    class MultiplePlxBanner {
        constructor(bannerSelector, backgroundElementSelector, backgroundImageSelector, scrollRatio = 0.15) {
            // the element that wraps content and parallaxed background
            this.$banner = document.querySelector( bannerSelector );
            // the element containing the image to use as background for the banner
            this.$bannerBg = this.$banner.querySelector( backgroundElementSelector );

            // the height of the wrapper element
            this.bannerHt = this.$banner.offsetHeight;
            // the height of the image used as background
            this.bannerBgHt = this.$bannerBg.querySelector( backgroundImageSelector ).offsetHeight;

            // value to use for `top` css property on image used as background;
            // if the banner is full-screen height, set to 0; else, center vertically
            this.initialBannerTop = this.$banner.classList.contains('full-screen') 
                ? 0 
                : -(this.bannerBgHt - this.bannerHt) / 2;

            this.scrollRatio = scrollRatio;
            
            // bind context of all class methods to the created instance object
            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.parallax = this.parallax.bind( this );

            // run all initial class functionality
            this.init();
        }

        /**
         * Set initial `top` position of image being used as background,
         * Bind event listeners to pertinent DOM elements
         */
        init() {
            this.$bannerBg.style.top = this.initialBannerTop + 'px';
            this.getHeightAboveBanner();
            this.bindEvents();
        }

        bindEvents() {
            window.addEventListener( 'scroll', this.parallax.bind(this) );
        }

        /**
         * Calculate and set new `top` value for banner image based on window scroll position
         */
        getHeightAboveBanner() {
            const $bannerSiblings = [...this.$banner.parentElement.children];
            const bannerIndex = $bannerSiblings.indexOf( this.$banner );

            this.heightAboveBanner = 0;
            for ( let i = bannerIndex - 2; i >= 0; i-- ) {
                this.heightAboveBanner += $bannerSiblings[i].offsetHeight;
            }
        }
        
        parallax() {
            if ( (this.heightAboveBanner + (this.bannerHt*2)) >= window.scrollY 
                    && window.scrollY >= this.heightAboveBanner ) {

                    const plxScroll = (window.scrollY - this.heightAboveBanner) * this.scrollRatio;
                    this.$bannerBg.style.top = this.initialBannerTop - plxScroll + 'px';
            }
        }
    }

    // initiate the component
    const plxBanner = new MultiplePlxBanner( '#banner-1', '.plx-background', '.plx-background-img');
    const plxBanner2 = new MultiplePlxBanner( '#banner-3', '.plx-background', '.plx-background-img', 0.1);

};

