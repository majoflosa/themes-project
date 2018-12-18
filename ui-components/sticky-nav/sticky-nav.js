class StickyNav {
    constructor( options ) {
        this.$nav = document.querySelector( options.navSelector );
        this.$mainWrap = document.querySelector( options.mainWrapSelector );

        this.newStylesAssigned = false;

        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.stick = this.stick.bind( this );

        this.init();
    }

    init() {
        this.$mainWrap.style.marginTop = this.$nav.offsetHeight + 'px';
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener( 'scroll', this.stick );
    }

    stick() {
        if ( window.scrollY > 0 && this.newStylesAssigned ) {
            return;
        } else if ( window.scrollY > 0 && !this.newStylesAssigned ) {
            this.$nav.classList.add( 'sticky' );
            this.newStylesAssigned = true;
        } else {
            this.$nav.classList.remove( 'sticky' );
            this.newStylesAssigned = false;
        }
    }
}

const stickyNav = new StickyNav({
    navSelector: '#sticky-nav',
    mainWrapSelector: '.sections-wrap'
});
