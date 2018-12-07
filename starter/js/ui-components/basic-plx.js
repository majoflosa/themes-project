window.onload = function() {
    
    class BasicPlxBanner {
        constructor(bannerSelector, backgroundElementSelector, backgroundImageSelector) {
            this.$banner = document.querySelector( bannerSelector );
            this.$bannerBg = this.$banner.querySelector( backgroundElementSelector );
            this.bannerBgHt = this.$bannerBg.querySelector( backgroundImageSelector ).offsetHeight;
            this.bannerHt = this.$banner.offsetHeight;
            this.initialBannerTop = this.$banner.classList.contains('full-screen') 
                ? 0 
                : -(this.bannerBgHt - this.bannerHt) / 2;
        
            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.parallax = this.parallax.bind( this );

            this.init();
        }

        init() {
            this.$bannerBg.style.top = this.initialBannerTop + 'px';
            this.bindEvents();
        }

        bindEvents() {
            window.addEventListener( 'scroll', this.parallax.bind(this) );
        }

        parallax() {
            this.$bannerBg.style.top = this.initialBannerTop - (window.scrollY * 0.15) + 'px';
        }
    }

    // initiate parallax effect
    const plxBanner = new BasicPlxBanner( '.hero-banner', '.plx-background', '.plx-background-img');

};

