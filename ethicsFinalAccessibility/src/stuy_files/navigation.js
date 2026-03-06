function ENResponsiveNavigation(enNav, params) {

    this.init = function(enNav, params) {
        let me  = this;
        this.params = params ? params : {};
        if (enNav.tagName == "HEADER" || enNav.tagName == "DIV") {
            this.container = enNav;
            this.enNav = this.container.querySelector("nav.en-nav");
        } else if (enNav.tagName == "NAV") {
            this.enNav = enNav;
        } else {
            throw("Invalid navigation. Tag name is '" + enNav.tagName + "' (expected: 'NAV', 'HEADER' or 'DIV')");
        }
        if (this.enNav == null) {
            throw ("Navigation is null.");
        }
        if (this.enNav.tagName != "NAV") {
            throw("Invalid navigation. Tag name is '" + this.enNav.tagName + "' (expected: 'NAV')");
        }

        for (let c = 0; c < this.enNav.childNodes.length; c++) {
            if (this.enNav.childNodes[c].tagName == "UL" && this.menu == null) {
                this.menu = this.enNav.childNodes[c];
            }
        }
        if (this.menu == null) {
            throw ("Menu list (UL) could not be found.");
        }

        if (!this.params.expandAtStart || (this.params.expandAtStart !== "all" && this.params.expandAtStart !== "first-level-only" && this.params.expandAtStart !== "no")) {
            let expandAtStart = this.enNav.getAttribute("mobnav-expand-at-start");
            if (expandAtStart === "all" || expandAtStart === "first-level-only" || expandAtStart === "no") {
                this.params.expandAtStart = expandAtStart;
            } else {
                this.params.expandAtStart = "first-level-only";
            }
        }

        if (this.params.appearFrom != null) {
            if (this.params.appearFrom.trim().toLowerCase() === "left") {
                this.enNav.classList.add("en-mobnav-slide-from-left");
            } else if (this.params.appearFrom.trim().toLowerCase() === "right") {
                this.enNav.classList.remove("en-mobnav-slide-from-left");
            }
        }

        this.initClickEventListeners(this.menu);
        document.addEventListener("keydown", function(e) {
            if (e.keyCode == 27) {
                me.hideMenu();
            }
        });
        this.mobileMenuBackground = document.createElement("div");
        this.mobileMenuBackground.classList.add("en-mobnav-bg");
        let enButtons;
        if (this.container) {
            enButtons = this.container.querySelectorAll("button");
        } else {
            enButtons = this.enNav.querySelectorAll("button");
        }
        enButtons.forEach((thisButton) => {
            if(!thisButton.getAttribute("onclick")) {
                if (thisButton.getAttribute("en-action") == "mobnav-toggle") {
                    thisButton.addEventListener("click", function(e) {
                        me.toggleMenu();
                    });
                }
                if (thisButton.getAttribute("en-action") == "mobnav-hide") {
                    thisButton.addEventListener("click", function(e) {
                        me.hideMenu();
                    });
                }
            }
        });
    }

    this.showMenu = function() {
        document.body.appendChild(this.mobileMenuBackground);
        this.mobileMenuBackground.classList.add("en-mobnav-bg-blur");
        this.enNav.classList.remove("en-mobnav-hide");
        this.enNav.classList.add("en-mobnav-show");
        document.body.classList.add("disable-overflow");
        document.body.classList.add("en-mobnav-active");
        document.documentElement.classList.add("disable-overflow");
        document.documentElement.classList.add("en-mobnav-active");
        this.enNav.querySelector("a").focus();
    }

    this.hideMenu = function() {
        this.enNav.classList.remove("en-mobnav-show");
        this.enNav.classList.add("en-mobnav-hide");

        this.mobileMenuBackground.classList.remove("en-mobile-nav-background-blur");
        this.mobileMenuBackground.remove();
        document.documentElement.classList.remove("disable-overflow");
        document.documentElement.classList.remove("en-mobnav-active");
        document.body.classList.remove("disable-overflow");
        document.body.classList.remove("en-mobnav-active");
    }

    this.toggleMenu = function() {
        if (this.enNav.classList.contains("en-mobnav-show")) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    this.initClickEventListeners = function(parent, level) {
        if (level == null || level < 0) {
            level = 0;
        }
        let curStyle = parent.getAttribute("style") || "";
        parent.style = curStyle + (!curStyle.endsWith(";") ? ";" : "") + " --en-menu-level: " + level + ";";
        for (let c = 0; c < parent.childNodes.length; c++) {
            let thisEl = parent.childNodes[c];
            if (thisEl.tagName != "LI") {
                continue;
            }
            let thisSubmenuLink;
            for (let x = 0; x < thisEl.childNodes.length; x++) {
                if (thisEl.childNodes[x].tagName == "A") {
                    thisSubmenuLink = thisEl.childNodes[x];
                    continue;
                }
                if (thisEl.childNodes[x].tagName == "UL" && thisSubmenuLink != null) {
                    let thisMenu = thisEl.childNodes[x];
                    if (this.params.expandAtStart === "all" || (this.params.expandAtStart === "first-level-only" && level == 0)) {
                        thisMenu.classList.add("en-mobile-submenu-open");
                        thisEl.classList.add("en-mobile-submenu-opened");
                    }
                    thisSubmenuLink.onclick = function(e) {
                        if (thisEl.classList.contains("en-mobile-submenu-opened")) {
                            thisMenu.classList.add("en-mobile-submenu-close");
                            thisEl.classList.remove("en-mobile-submenu-opened");
                        } else {
                            thisMenu.classList.remove("en-mobile-submenu-close");
                            thisMenu.classList.add("en-mobile-submenu-open");
                            thisEl.classList.add("en-mobile-submenu-opened");
                        }
                        e.stopPropagation();
                    }
                    thisEl.classList.add("en-has-submenu");
                    this.initClickEventListeners(thisMenu, level + 1);
                    break;
                }
            }
        }
    }

    this.init(enNav, params);
}

document.addEventListener('readystatechange', () => {
    if ("complete" === document.readyState) {
        let navContainers = document.querySelectorAll("[en-init-nav]");
        navContainers.forEach((thisCont) => {
            if (thisCont.getAttribute("en-init-nav").toLowerCase() == "true") {
                thisCont.removeAttribute("en-init-nav");
                new ENResponsiveNavigation(thisCont, null);
            }
        });
        if (navContainers.length == 0) {
            let globalMenuParams = null;
            try {
                globalMenuParams = _enNavMobileMenuParams;
            } catch (e) {}

            if (globalMenuParams) {
                window._ennav = new ENResponsiveNavigation(document.querySelector(".en-nav"), globalMenuParams);
            }

        }
    }
});



