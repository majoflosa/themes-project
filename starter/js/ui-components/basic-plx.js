window.onload = function() {
    
    const $banner = document.querySelector('.hero-banner');
    const bannerHt = $banner.offsetHeight;
    const $bannerBg = $banner.querySelector('.plx-background');
    const bannerBgHt = $bannerBg.querySelector('.plx-background-img').offsetHeight;
    const initialBannerTop = -(bannerBgHt - bannerHt) / 2

    $bannerBg.style.top = initialBannerTop + 'px'

    window.addEventListener('scroll', function() {
        $bannerBg.style.top = initialBannerTop - (window.scrollY * 0.15) + 'px';
    });

};