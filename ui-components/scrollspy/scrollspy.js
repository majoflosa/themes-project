class ScrollSpy {
    constructor( options ) {
        this.$navLinks = [...document.querySelectorAll( options.navLinkSelector )];
        this.$sections = [...document.querySelectorAll( options.sectionSelector )];
        this.activeClass = options.activeClass;

        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.spy = this.spy.bind( this );

        this.init();
    }

    init() {
        if ( window.scrollY === 0 ) this.$navLinks[0].classList.add( 'active-link' );
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', this.spy );
    }

    spy() {
        const currentSection = this.$sections.filter( section => {
            return ( window.scrollY >= section.offsetTop 
                && window.scrollY <= section.offsetTop + section.offsetHeight );
        })[0];

        const newActiveLink = document.querySelector( `[href="#${currentSection.id}"]` );
        newActiveLink.classList.add( 'active-link' );

        this.$navLinks.forEach( link => {
            if ( link.attributes.href.value !== `#${currentSection.id}` ) 
                link.classList.remove( 'active-link' );
        });
    }
}

const scrollspy = new ScrollSpy({
    sectionSelector: '.section',
    navLinkSelector: '.scrollspy-link',
    activeClass: 'active-link'
});