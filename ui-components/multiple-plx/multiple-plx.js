window.addEventListener('load', () => {
    
    class MultiplePlxBanner {
        /**
         * 
         * @param { string } bannerSelector css selector for wrapping parallax element
         * @param { string } backgroundElementSelector css selector for element wrapping background image
         * @param { string } backgroundImageSelector css selector for background image
         * @param { number } scrollRatio proportion of how many pixels to shift background to pixels scrolled
         */
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
         * Calculate total vertical space above the banner element
         * Bind event listeners to pertinent DOM elements
         */
        init() {
            this.$bannerBg.style.top = this.initialBannerTop + 'px';
            this.getHeightAboveBanner();
            this.bindEvents();
        }

        bindEvents() {
            window.addEventListener( 'scroll', this.parallax );
        }

        /**
         * Get the total vertical space above the banner element by adding height of
         * sibling elements before it. This is to determine at what scroll point to start
         * the parallax effect
         */
        getHeightAboveBanner() {
            // all sibling elements, including current element
            const $bannerSiblings = [...this.$banner.parentElement.children];
            // index of parallax element in siblings array
            const bannerIndex = $bannerSiblings.indexOf( this.$banner );

            this.heightAboveBanner = 0;
            // add the height of every sibling element before the parallax element
            for ( let i = bannerIndex - 2; i >= 0; i-- ) {
                this.heightAboveBanner += $bannerSiblings[i].offsetHeight;
            }
        }
        
        /**
         * Calculate and set new `top` value for banner image based on window scroll position
         */
        parallax() {
            // if the user has scrolled the parallax element into view
            if ( (this.heightAboveBanner + (this.bannerHt*2)) >= window.scrollY 
                    && window.scrollY >= this.heightAboveBanner ) {
                    
                    // amount of pixels to shift background, based on element's vertical position on the page
                    const plxScroll = (window.scrollY - this.heightAboveBanner) * this.scrollRatio;
                    // set new `top` value on background
                    this.$bannerBg.style.top = this.initialBannerTop - plxScroll + 'px';
            }
        }
    }

    // initiate the component
    const plxBanner = new MultiplePlxBanner( '#banner-1', '.plx-background', '.plx-background-img');
    const plxBanner2 = new MultiplePlxBanner( '#banner-3', '.plx-background', '.plx-background-img', 0.25);

});
