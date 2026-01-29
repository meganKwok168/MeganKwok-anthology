function MegaMenuLoader( mobileBreakpoint) {


    const BASE_PATH = "/apps-shared/navigation/mega-menu";
    const desktopCSS = BASE_PATH + '/mega-menu-desktop-core.css';
    const mobileCSS = BASE_PATH + '/mega-menu-mobile-core.css';
     const scriptJS = BASE_PATH + '/megaMenu.js';
    let megaMenuNav = null;
    let megaMenuConfig = null;
    if (window._enNavMobileMenuParams && window._enNavMobileMenuParams.megaMenuConfig) {
        megaMenuConfig = window._enNavMobileMenuParams.megaMenuConfig;
        megaMenuNav = _ennav.enNav;
    }
    if (!megaMenuNav) {
        let navContainer = document.querySelector("[en-nav-mega-menu]");
        if (!navContainer) {
            return;
        }else {
            megaMenuConfig = _enNavMegaMenuConfig;
        }
        if (navContainer.tagName === "HEADER" || navContainer.tagName === "DIV") {
            megaMenuNav = navContainer.querySelector("nav.en-nav");
        } else if (navContainer.tagName === "NAV") {
            megaMenuNav = navContainer;
        }
    }

    if (!megaMenuNav || !megaMenuConfig) {
        return;
    }

    let megaMenuJS = document.createElement(`script`);
    megaMenuJS.src = scriptJS;

    megaMenuJS.onload = () => {
        megaMenuConfig.nav = megaMenuNav;
        window._enNavMegaMenu = new EnMegaMenu(megaMenuConfig);
    };

    document.head.appendChild(megaMenuJS);

    if (mobileBreakpoint) {
        appendCss("not " + mobileBreakpoint, desktopCSS);
        appendCss(mobileBreakpoint, mobileCSS)
    } else {
        appendCss(``, desktopCSS);
    }

    function appendCss(media, href) {
        const style = document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        if (media) {
            style.media = media;
        }
        style.href = href;
        document.head.append(style);
    }

}