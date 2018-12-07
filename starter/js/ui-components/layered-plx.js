window.onload = function() {

    class LayeredPlxBanner {
        constructor(elements) {
            this.elements = elements;
            this.$banner = document.querySelector( elements.banner );
            this.$bannerBg = this.$banner.querySelector( elements.plxBackground );

            this.bannerBgHt = this.$bannerBg.querySelector( elements.plxBackgroundImg ).offsetHeight;
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
            this.elements.layers.forEach( layer => {
                layer.element.style.top = layer.initialTop - (window.scrollY * layer.scrollRatio ) + 'px';
            });
        }
    }

    // get layers
    const layerElements = [...document.querySelectorAll( '.plx-layer' )];
    const layers = layerElements.map( (layerElement, index) => {
        let layerObj = {
            element: layerElement,
            initialTop: 500,
            scrollRatio: 0.5
        };

        return layerObj;
    });

    // manually override individual initial position and scroll speed ratio
    layers[1].initialTop = 700;
    layers[1].scrollRatio = 0.95;
    layers[2].initialTop = 1000;
    layers[2].scrollRatio = 1.5;

    // initiate parallax effect
    const layeredPlxBanner = new LayeredPlxBanner({
        banner: '.hero-banner', 
        layers: layers,
        plxBackground: '.plx-background', 
        plxBackgroundImg: '.plx-background-img'
    });

}