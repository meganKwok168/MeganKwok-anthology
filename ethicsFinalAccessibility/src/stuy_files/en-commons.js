function initENAnimateOnScroll() {
    // console.log("Initializing Intersection Observer");
    let observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: [0.2]
    };
    let intersectionObserverCallback = function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let clist = entry.target.classList;
                for (let c = 0; c < clist.length; c++) {
                    let thisClass = clist[c];
                    if (thisClass.startsWith("en-aos-") && !thisClass.startsWith("en-aos-init")  && !thisClass.endsWith("-animate")
                        && !clist.contains(thisClass + "-animate")
                    ) {
                        entry.target.classList.add(thisClass + '-animate');
                        break;
                    }
                }
            }
        });
    };
    let intersectionObserver = new IntersectionObserver(intersectionObserverCallback, observerOptions);
    let aosList = document.querySelectorAll('[class*="en-aos-"]');
    for (let x = 0; x < aosList.length; x++) {
        intersectionObserver.observe(aosList[x]);
    }

}

var createElement = function (type, cssClass, innerHTML) {
    let el = document.createElement(type);
    if (cssClass != null) {
        if (typeof cssClass === "string") {
            el.classList.add(cssClass);
        } else if (Array.isArray(cssClass)) {
            for (let x = 0; x < cssClass.length; x++) {
                if (cssClass[x] != null) {
                    el.classList.add(cssClass[x]);
                }
            }
        }
    }
    if (innerHTML != null) {
        el.innerHTML = innerHTML;
    }
    return el;
}

function initPopupEl() {
    let popWrapper = createElement("div", "en-header-popup-wrapper");
    popWrapper.setAttribute("id", "en-header-popup-wrapper");
    let popupBodyDiv = createElement("div", "en-header-popup-body");
    popupBodyDiv.setAttribute("id", "en-header-popup-body");
    let popDivClose = createElement("a", "en-public-header-popup-close");
    popDivClose.setAttribute("id", "en-public-header-popup-close");
    popDivClose.setAttribute("title", "close");
    popDivClose.setAttribute("href", "javascript:__enSearchPopupHide()");

    let popDivImg = createElement("img", "en-popup-close-img");
    popDivImg.setAttribute("src", "/apps-shared/images/icons/cancel-03.svg");

    let popForm = createElement("form");
    popForm.setAttribute("action", "/apps/search/index.jsp");

    let popFormInput = createElement("input");
    popFormInput.setAttribute("id", "search-field");
    popFormInput.setAttribute("name", "q");
    popFormInput.setAttribute("type", "text");
    popFormInput.setAttribute("aria-label", "Search input");
    popFormInput.setAttribute("placeholder", "Search");
    let q;
    if (location.pathname == popForm.getAttribute("action") && (q = location.search.match(/q=([^&]+)/))) {
        popFormInput.setAttribute("value", decodeURIComponent(q[1]).replaceAll("+", " "));
    }

    let popupBackdrop = createElement("div");
    popupBackdrop.setAttribute("id", "en-header-popup-backdrop");
    popupBackdrop.setAttribute("onClick", "__enSearchPopupHide()")

    popDivClose.appendChild(popDivImg);
    popForm.appendChild(popFormInput);
    //popForm.appendChild(popFormImage);
    popupBodyDiv.appendChild(popForm);
    popupBodyDiv.appendChild(popDivClose);
    popWrapper.appendChild(popupBodyDiv);
    document.getElementsByTagName("body")[0].appendChild(popupBackdrop);
    document.getElementsByTagName("body")[0].appendChild(popWrapper);
}

function checkInitPopEl() {
    var popupWrapperCheck = document.getElementById("en-header-popup-wrapper");
    if (popupWrapperCheck == null) {
        initPopupEl();
    }
}

function isEmpty(val) {
    return val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0);
}

// Display search
function _enSearchPopupToggle() {
    checkInitPopEl();
    var popupWrapper = document.getElementById("en-header-popup-wrapper");
    if (!isEmpty(popupWrapper)) {
        if (popupWrapper.style.display === "block") {
            popupWrapper.style.display = "none";
            document.getElementById("en-header-popup-backdrop").classList.remove("en-header-popup-backdrop");
        } else {
            document.getElementById("en-header-popup-backdrop").classList.add("en-header-popup-backdrop");
            popupWrapper.style.display = "block";
            popupWrapper._searchButton = document.activeElement;
            var searchInput = popupWrapper.querySelector("#search-field");
            if (searchInput) {
                searchInput.focus();
            }
        }
    }
}

//Hide popup
function __enSearchPopupHide() {
    var popupWrapper = document.getElementById("en-header-popup-wrapper");
    if (!isEmpty(popupWrapper)) {
        popupWrapper.style.display = "none";
        if (popupWrapper._searchButton) {
            popupWrapper._searchButton.focus();
        }
    }
    if (document.getElementById("en-header-popup-backdrop") != null) {
        document.getElementById("en-header-popup-backdrop").classList.remove("en-header-popup-backdrop");
    }
    deletePopWrapperElement();
}

function deletePopWrapperElement() {
    var popupWrapper = document.getElementById("en-header-popup-wrapper");
    var popupBackdrop = document.getElementById("en-header-popup-backdrop");
    var mainBody = document.getElementsByTagName("body")[0];
    (!isEmpty(popupWrapper))
    {
        if (popupWrapper != null) {
            mainBody.removeChild(popupWrapper);
        }
        if (popupBackdrop != null) {
            mainBody.removeChild(popupBackdrop);
        }
    }
}

var GoogleTranslate = {

    includedLanguageKeys: ['en'],

    includedLanguageNames: ['English'],

    excludedLanguageKeys: [],

    excludedLanguageNames: [],

    PLACEHOLDER_ELEMENT_ID: "googleTranslate",

    WRAPPER_ELEMENT_ID: "googleTranslateElementWrapper",

    init: function () {

        let aContainer = document.getElementById("en-public-header-translate");
        if (aContainer == null) {
            return;
        }
        let selEl = document.createElement("select");
        selEl.setAttribute("id", GoogleTranslate.PLACEHOLDER_ELEMENT_ID);
        selEl.setAttribute("aria-label", "Select translation language");
        aContainer.appendChild(selEl);

        let languages = aContainer.getAttribute("en-google-translate");
        if (languages == null || languages === "") {
            console.log("en-google-translate property can not be empty or null for translate wrapper");
            return;
        }
        if (languages.startsWith('incl:')) {
            GoogleTranslate.extractInclude(languages);
        } else if (languages.startsWith('all')) {
            GoogleTranslate.includedLanguageKeys = [];
        } else if (languages.startsWith('excl:')) {
            languages = languages.substring(5);
            let langArr = languages.split(",");
            for (let i = 0; i < langArr.length; i++) {
                let langCodeNameArr = langArr[i].split("/");
                if (langCodeNameArr.length > 1) {
                    let key = langCodeNameArr[0].trim();
                    let val = langCodeNameArr[1].trim();
                    GoogleTranslate.excludedLanguageKeys.push(key);
                    GoogleTranslate.excludedLanguageNames.push(val);
                } else if (langCodeNameArr.length === 1) {
                    let key = langCodeNameArr[0].trim();
                    GoogleTranslate.excludedLanguageKeys.push(key);
                }

            }
        } else {
            GoogleTranslate.extractInclude("incl:".concat(languages));
        }

        let placeHolderEle = document.getElementById(GoogleTranslate.PLACEHOLDER_ELEMENT_ID);
        if (placeHolderEle == null) {
            return;
        }
        placeHolderEle.onchange = function () {
            window.open("http://translate.google.com/translate?u=" + escape(location.href) + "&langpair=en%7C" + this.value + "&hl=en&ie=UTF-8&oe=UTF-8&prev=%2Flanguage_tools");
        };

        for (var i = 0; i < GoogleTranslate.includedLanguageNames.length; i++) {
            var option = document.createElement("option");
            option.value = GoogleTranslate.includedLanguageKeys[i];
            option.innerText = unescape(GoogleTranslate.includedLanguageNames[i].replace(/[+]/g, " "));
            placeHolderEle.appendChild(option);
        }

        var wrapperEle = document.createElement("div");
        wrapperEle.setAttribute("id", GoogleTranslate.WRAPPER_ELEMENT_ID);
        // select element= placeholder
        placeHolderEle.parentNode.insertBefore(wrapperEle, placeHolderEle);

        var googleTranslateScriptEle = document.createElement("script");
        try {
            googleTranslateScriptEle.src = "//translate.google.com/translate_a/element.js?cb=GoogleTranslate.onGoogleTranslateElementInit";
        } catch (e) {
            console.log(e);
        }
        document.getElementsByTagName("head")[0].appendChild(googleTranslateScriptEle);
    },
    extractInclude: function (languages) {
        languages = languages.substring(5);
        let langArr = languages.split(",");
        for (let i = 0; i < langArr.length; i++) {
            let langCodeNameArr = langArr[i].split("/");
            if (langCodeNameArr.length > 1) {
                let key = langCodeNameArr[0].trim();
                let val = langCodeNameArr[1].trim();
                GoogleTranslate.includedLanguageKeys.push(key);
                GoogleTranslate.includedLanguageNames.push(val);
            } else if (langCodeNameArr.length === 1) {
                let key = langCodeNameArr[0].trim();
                GoogleTranslate.includedLanguageKeys.push(key);
            }
        }
    },


    onGoogleTranslateElementInit: function googleTranslateElementInit() {
        var placeHolderEle = document.getElementById(GoogleTranslate.PLACEHOLDER_ELEMENT_ID);
        var wrapperEle = document.getElementById(GoogleTranslate.WRAPPER_ELEMENT_ID);

        var origHtmlEleStyle = document.documentElement.getAttribute("style");
        var origBodyEleStyle = document.body.getAttribute("style");

        placeHolderEle.onchange = null;
        if (GoogleTranslate.excludedLanguageKeys.length !== 0) {
            new google.translate.TranslateElement({
                excludedLanguages: GoogleTranslate.excludedLanguageKeys.join(","),
                autoDisplay: false
            }, GoogleTranslate.WRAPPER_ELEMENT_ID);
        } else if (GoogleTranslate.includedLanguageKeys.length !== 0) {
            new google.translate.TranslateElement({
                includedLanguages: GoogleTranslate.includedLanguageKeys.join(","),
                autoDisplay: false
            }, GoogleTranslate.WRAPPER_ELEMENT_ID);
        } else {
            new google.translate.TranslateElement({
                autoDisplay: false
            }, GoogleTranslate.WRAPPER_ELEMENT_ID);
        }

        setTimeout(function () {
            document.documentElement.setAttribute("style", origHtmlEleStyle ? origHtmlEleStyle : "");
            document.body.setAttribute("style", origBodyEleStyle ? origBodyEleStyle : "");
            var votingForm = document.getElementById("goog-gt-votingForm");
            if (votingForm) {
                votingForm.setAttribute("aria-hidden", "true");
                votingForm.querySelectorAll("input").forEach(function (input) {
                    input.setAttribute("type", "hidden");
                });
            }
        }, 1);

        var selectEle = wrapperEle.getElementsByTagName("select")[0];
        placeHolderEle.parentNode.insertBefore(selectEle, placeHolderEle);

        selectEle.setAttribute("id", "googleTranslate");
        selectEle.className = " skiptranslate ";
        selectEle.setAttribute("aria-label", "Select translation language");
        selectEle.setAttribute("onfocus", "GoogleTranslate.focused(this)");
        selectEle.setAttribute("onblur", "GoogleTranslate.blurred(this)");
        selectEle.setAttribute("tabindex", "0");

        wrapperEle.parentNode.removeChild(document.getElementById(GoogleTranslate.WRAPPER_ELEMENT_ID));

        placeHolderEle.parentNode.removeChild(placeHolderEle);
    },

    focused: function (gSelect) {
        var parent = gSelect.parentNode;
        if (parent.id != "preGoogle") return;
        parent.setAttribute("class", "aria-focus");
        parent.setAttribute("style", "outline: 3px solid #3091ff!important;outline: 5px auto -webkit-focus-ring-color!important;outline: 5px auto -moz-focus-ring-color!important;");
    },

    blurred: function (gSelect) {
        var parent = gSelect.parentNode;
        if (parent.id != "preGoogle") return;
        parent.setAttribute("class", "");
        parent.setAttribute("style", "");
    },

    onReady: function (timeout) {
        setTimeout(function () {
            var selectEle = document.getElementById(GoogleTranslate.PLACEHOLDER_ELEMENT_ID);
            if (selectEle.options.length > 0 && !selectEle.options[0].value) {
                selectEle.options[0].innerText = "Google Translate";
            }
        }, timeout);
    },

    isLoaded: function () {
        return true;
    }
}
var Search = {
    initSearchInputComponent: function () {
        let inputTextSearch = document.getElementsByClassName("en-public-header-search-Inpt")[0];
        if (inputTextSearch == null) {
            return;
        }
        inputTextSearch.setAttribute("value", "Search")
        inputTextSearch.setAttribute("onClick", "if (this.value=='Search') this.value='';");
        inputTextSearch.setAttribute("onBlur", "if (this.value=='') this.value='Search';");
        inputTextSearch.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                Search.initForm(inputTextSearch.value);
            }
        });

        let inputTextSearchImg = document.getElementsByClassName("en-search-wrapper-input-type")[0].querySelector('img');
        if (inputTextSearchImg == null) {
            return;
        }
        inputTextSearchImg.setAttribute("onclick", "Search.inputTextSearchImg()");

    },
    initForm: function (val) {
        let inputTextDiv = createElement("div");
        let inputForm = createElement("form");
        inputForm.setAttribute("action", "/apps/search/index.jsp");

        let inputTextForm = createElement("input");
        inputTextForm.value = val;
        inputTextForm.setAttribute("id", "search-field");
        inputTextForm.setAttribute("name", "q");
        inputTextForm.setAttribute("type", "text");
        inputTextForm.setAttribute("aria-label", "Search input");
        inputTextForm.setAttribute("placeholder", "Search");
        inputForm.appendChild(inputTextForm);
        inputTextDiv.appendChild(inputForm);
        document.getElementsByTagName("body")[0].appendChild(inputTextDiv);
        inputForm.submit();
        document.getElementsByTagName("body")[0].removeChild(inputTextDiv);
    },
    inputTextSearchImg: function () {
        let inputTextSearch = document.getElementsByClassName("en-public-header-search-Inpt")[0];
        if (inputTextSearch == null) {
            return;
        }
        Search.initForm(inputTextSearch.value);
    }
}


let ENMarqueeModule = {
    _config: {
        getUniqueClassName: function () {
            return "en-" + Math.floor(Math.random() * 1000) + "-marquee-module";
        },
        defaultContent: `{"text":"Marquee's content is missing.","delay":50}`,
        speed: 18,
        speedUnit: 'ms',
    },

    init: function () {
        let marqueeList = document.querySelectorAll(".en-marquee-module");
        marqueeList.forEach(marquee => {
            this.createMarquee(marquee);
        })
    },


    cleanInnerHtml: function (text) {
        // Remove leading and trailing line breaks and tabs
        if (text) return text.replace(/^\s+|\s+$/g, '');
        return text;
    },

    resolveMarqueeJson: function (marquee) {
        let props;
        try {
            const hiddenMarquee = marquee.querySelector('enmarquee');
            if (hiddenMarquee) {
                props = JSON.parse(hiddenMarquee.innerHTML);
                hiddenMarquee.remove();
            } else {
                props = JSON.parse(marquee.innerHTML);
            }
            if (typeof props === 'string') {
                return {text: this.cleanInnerHtml(props), speed: this._config.speed, speedUnit: this._config.speedUnit};
            }
            try {
                props.speed = Number(props.delay);
            } catch (e) {
                props.speed = 18;
            }
            props.speedUnit = this._config.speedUnit;
        } catch (e) {
            // console.error(e);
            props = {
                text: marquee.innerHTML.trim(),
                speed: this._config.speed,
                speedUnit: this._config.speedUnit,
            };
            let speed = marquee.getAttribute("speed");
            if (speed && /^\d+$/.test(speed)) {
                props.speed = speed;
                props.speedUnit = 's';
            }
        }
        return props;
    },

    createMarquee: function (marquee) {
        if (!marquee) return;
        if (!marquee.innerHTML || marquee.innerHTML.trim().length === 0) {
            marquee.innerHTML = ENMarqueeModule._config.defaultContent;
        }
        let props = this.resolveMarqueeJson(marquee);
        if (!props || !props.text || props.text.trim().length === 0){
            console.error("Marquee Content is empty. Marquee will be hidden. ");
            return;
        }
        marquee.innerText = "";
        marquee.style.display = "block";

        let uniqueClassName = ENMarqueeModule._config.getUniqueClassName();
        marquee.classList.add(uniqueClassName);

        let textWrapper = document.createElement("div");
        textWrapper.classList.add("en-marquee-module-content-wrapper");
        let textP = document.createElement("p");
        textP.classList.add("en-marquee-module-content");
        this.log(props)
        textP.innerHTML = props.text.trim();
        textP.setAttribute("speed", props.speed);
        textP.setAttribute("speed-unit", props.speedUnit);
        textWrapper.appendChild(textP);
        marquee.appendChild(textWrapper);

        this.createPopup(marquee, uniqueClassName, props);
        this.setMarqueeSpeed(textWrapper, textP);
    },

    modifySpeed: function () {
        let marqueeContentList = document.querySelectorAll(".en-marquee-module-content");
        marqueeContentList.forEach(marqueeContent => {
            this.setMarqueeSpeed(marqueeContent.parentElement, marqueeContent)
        })
    },

    setMarqueeSpeed: function (wrapper, textP) {
        let contentWidth = textP.clientWidth;
        let boxWidth = wrapper.offsetWidth + contentWidth;
        let speed = textP.getAttribute("speed");
        let speedUnit = textP.getAttribute("speed-unit");
        if (!speed) {
            speed = this._config.speed;
        }
        if (this._config.speedUnit === speedUnit) {
            let duration = boxWidth * speed;
            textP.style.cssText += " animation-duration: " + duration + "ms";
        } else {
            let duration = boxWidth / speed;
            textP.style.cssText += " animation-duration: " + duration + "s";
        }
    },

    replacePopUp: function () {
        let marqueeWrapperList = document.querySelectorAll(".en-marquee-module");
        marqueeWrapperList.forEach(wrapper => {
            wrapper.classList.remove("popup-top");
            wrapper.classList.remove("popup-bottom");
            let innerHeight = window.innerHeight;
            let bottom = wrapper.getBoundingClientRect().bottom;
            let popUpHeight = 0;
            for (let child of wrapper.children) {
                if (child.classList.contains('en-marquee-popup-wrapper')) {
                    popUpHeight = child.offsetHeight;
                    break;
                }
            }
            let wrapperHeight = bottom + popUpHeight + 15;
            if (wrapperHeight > innerHeight) {
                wrapper.classList.add("popup-top");
            } else {
                wrapper.classList.add("popup-bottom");
            }
        })

    },

    createPopup: function (marquee, uniqueClassName, props) {
        let targetParent = uniqueClassName;
        let popupWrapper = document.createElement("div");
        popupWrapper.classList.add("en-marquee-popup-wrapper");

        let popupIcon = document.createElement("span");
        popupIcon.classList.add("en-marquee-popup-icon");
        popupWrapper.appendChild(popupIcon);

        let popupIconBorders = document.createElement("span");
        popupIconBorders.classList.add("en-marquee-popup-icon-borders");
        popupWrapper.appendChild(popupIconBorders);

        let marqueePopup = document.createElement("div");
        marqueePopup.classList.add("en-marquee-popup");

        let buttonsWrapper = document.createElement("div");
        buttonsWrapper.classList.add("en-marquee-tooltip-buttons");

        let pauseButton = document.createElement("button");
        pauseButton.tabIndex = 0;
        pauseButton.title = "Pause Scrolling Marquee";
        pauseButton.onclick = function (e) {
            ENMarqueeModule.toggleMarqueePopup(e, targetParent);
        };
        pauseButton.setAttribute('aria-pressed', 'false');
        pauseButton.setAttribute('aria-label', 'Pause Scrolling Marquee');
        pauseButton.classList.add("en-marquee-tooltip-pause-button");
        pauseButton.innerText = "Pause";
        buttonsWrapper.appendChild(pauseButton);

        let playButton = document.createElement("button");
        playButton.tabIndex = 0;
        playButton.title = "Resume Scrolling Marquee";
        playButton.onclick = function (e) {
            ENMarqueeModule.toggleMarqueePopup(e, targetParent);
        };
        playButton.setAttribute('aria-pressed', 'true');
        playButton.setAttribute('aria-label', 'Resume Scrolling Marquee');
        playButton.classList.add("en-marquee-tooltip-play-button");
        playButton.innerText = "Play";
        buttonsWrapper.appendChild(playButton);

        marqueePopup.appendChild(buttonsWrapper);

        let popUpText = document.createElement("div");
        popUpText.classList.add("en-marquee-popup-text");
        popUpText.setAttribute('aria-hidden', 'true');
        popUpText.innerHTML = props.text;
        marqueePopup.appendChild(popUpText);
        popupWrapper.appendChild(marqueePopup);
        marquee.appendChild(popupWrapper);

        ENMarqueeModule.modifySpeed();
        ENMarqueeModule.replacePopUp();
    },

    toggleMarqueePopup: function (e, uniqueClassName) {
        let animationCssClass = "pause-animation";
        let marqueeContent = document.querySelector('.' + uniqueClassName + ' .en-marquee-module-content');
        const marquee = document.querySelector("." + uniqueClassName);
        if (marqueeContent) {
            if (e.target.classList.contains('en-marquee-tooltip-pause-button')) {
                marqueeContent.classList.add(animationCssClass);
                marquee.classList.add("animation-paused");
            } else {
                marqueeContent.classList.remove(animationCssClass);
                marquee.classList.remove("animation-paused");
            }
        }
        ENMarqueeModule.removePressedAttribute(uniqueClassName);
        e.target.setAttribute('aria-pressed', true)
    },

    removePressedAttribute: function (uniqueClassName) {
        let buttons = document.querySelectorAll('.' + uniqueClassName + ' .en-marquee-tooltip-buttons button');
        buttons.forEach(button => {
            button.setAttribute('aria-pressed', false)
        });
    },

    log: function (e) {
        if (this.isDebugMode()) {
            console.error(e);
        }
    },

    isDebugMode: function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const debugAttr = urlParams.get('debug');
        return debugAttr && debugAttr.trim() && (debugAttr.trim().toUpperCase() === 'TRUE' || debugAttr === "1");
    }
}


let ENInfiniteCarousel = {

    _default: {
        slideWidth: 300,
        duration: 20,
        getUniqueClassName: function () {
            return Math.floor(Math.random() * 1000);
        },
        contentFormat: 'html',
    },

    allowLog: false,

    log: function (data) {
        if (ENInfiniteCarousel.allowLog || this.isDebugMode()) {
            console.error(data);
        }
    },

    init: function () {
        let carouselList = document.querySelectorAll('.en-infinite-carousel');
        carouselList.forEach(carousel => {
            this.createCarousel(carousel);
        });
    },

    createCarousel: function (carousel) {
        let uniqueID = this._default.getUniqueClassName();
        carousel.classList.add("en-" + uniqueID + "-infinite-carousel");

        let track = this.initCarouselTrack(carousel);
        carousel.setAttribute("uniqueID", uniqueID);

        this.locateTrackInCarousel(carousel, track);

        this.listenCarouselTrackDimension(carousel, track);

        this.appendAnimationToggleButton(carousel, uniqueID);
    },

    initCarouselTrack: function (carousel) {
        let track = document.createElement("div");
        track.classList.add("en-infinite-carousel-track");

        let duration = carousel.getAttribute('duration');
        if (!duration) {
            duration = this._default.duration;
        }
        track.style.animationDuration = duration + 's';

        let contentFormat = carousel.getAttribute('content-format');
        if (!contentFormat) {
            contentFormat = this._default.contentFormat;
        }
        if (contentFormat === 'html') {
            this.initCarouselTrackFromHTML(carousel, track);
        } else if (contentFormat === 'json') {
            this.initCarouselTrackFromJSON(carousel, track);
        } else {
            console.error("Unknown/Not Implemented  Carousel contentFormat!!");
        }

        return track;
    },

    initCarouselTrackFromJSON: function (carousel, track) {
        let elements = JSON.parse(carousel.innerText);
        elements.forEach(json => {
            let image = document.createElement("img");
            image.src = json.src;
            image.alt = json.alt;
            let slideItem;
            if (json.href) {
                slideItem = document.createElement("a");
                slideItem.href = json.href;
                slideItem.target = "_blank";
            } else {
                slideItem = document.createElement("div");
            }

            if (!json.slideWidth) {
                json.slideWidth = this._default.slideWidth;
            }
            slideItem.style.width = json.slideWidth;
            slideItem.classList.add("en-infinite-carousel-slide-item");
            if (json.slideClass) {
                slideItem.classList.add(json.slideClass);
            }
            slideItem.appendChild(image);
            track.appendChild(slideItem);
        });
    },

    initCarouselTrackFromHTML: function (carousel, track) {
        let carouselContent = carousel.innerHTML;

        carouselContent = carouselContent.replace((/ |\r\n|\n|\r/gm), "");
        if (carouselContent) {
            track.innerHTML = carousel.innerHTML;
            return;
        }

        if (this.isDebugMode()) {
            track.innerHTML = this.getDebugContent();
            carousel.setAttribute('debug-mode', '')
        }
    },

    appendAnimationToggleButton: function (carousel, uniqueID) {
        try {
            const toggleButtonAttr = carousel.getAttribute("animation-toggle-button");
            if (toggleButtonAttr === undefined || toggleButtonAttr === null) {
                return;
            }

            let animationToggleButton;
            if (toggleButtonAttr.trim().length !== 0) {
                const b = document.getElementById(toggleButtonAttr);
                if (b) {
                    animationToggleButton = b;
                } else {
                    console.error("Infinite Carousel Toggle Button Id is wrong. Fix animation-toggle-button value. " + toggleButtonAttr)
                }
            } else {
                const controlButtons = document.createElement('div');
                controlButtons.classList.add("en-ic-control-buttons")
                animationToggleButton = document.createElement("button");
                animationToggleButton.classList.add("default-style");
                animationToggleButton.classList.add("en-ic-toggle-button");
                animationToggleButton.title = "Toggle Carousel Animation";
                animationToggleButton.setAttribute("aria-label", "Toggle Carousel Animation");
                animationToggleButton.setAttribute("aria-hidden", "false");
                controlButtons.appendChild(animationToggleButton);
                carousel.insertAdjacentElement('afterend', controlButtons);
            }

            if (animationToggleButton) {
                animationToggleButton.setAttribute("data-ic-id", uniqueID);
                animationToggleButton.addEventListener('click', function (e) {
                    carousel.classList.toggle("paused");
                    e.currentTarget.classList.toggle("paused");
                });
            }

            if (carousel.hasAttribute("stop-animation-on-hover")) {
                const icId = carousel.getAttribute("uniqueID");
                const carouselToggleButtons = document.querySelectorAll("[data-ic-id='" + icId + "']");

                carousel.addEventListener('mouseenter', function (e) {
                    carouselToggleButtons.forEach(carouselToggleButton => {
                        carouselToggleButton.classList.add("carousel-paused");
                    })
                });

                carousel.addEventListener('mouseleave', function (e) {
                    carouselToggleButtons.forEach(carouselToggleButton => {
                        carouselToggleButton.classList.remove("carousel-paused");
                    })
                })
            }
        } catch (e) {
            console.error(e);
        }
    },

    isDebugMode: function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const debugAttr = urlParams.get('debug');
        return debugAttr && ( "1" === debugAttr || "true" === debugAttr.trim().toLowerCase());
    },

    getDebugContent: function () {
        return `
          <span>Icon PlaceHolder</span>  
          <a href="#">Link Placeholder</a>
          <a href="#">
            <img src="/" alt="Image Placeholder">
          </a>
          <div class="coloured-box"><span>Div PlaceHolder</span>   </div> 
          <span>Span PlaceHolder</span>
        `
    },

    locateTrackInCarousel: function (carousel, track) {
        this.log("Carousel-" + carousel.getAttribute("uniqueID") + " is located.")
        carousel.innerHTML = "";
        carousel.appendChild(track);
        if (track.offsetWidth === 0) {
            console.error("Carousel content is empty. It should be checked!! ");
            return;
        }
        let limit = Math.ceil(carousel.offsetWidth / track.offsetWidth);
        this.log("Number of infinite carousel is: " + limit)
        for (let index = 0; index < limit; index++) {
            carousel.appendChild(track.cloneNode(true));
        }
    },

    listenCarouselTrackDimension: function (carousel, track) {
        var enInfiniteCarouselWindowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            // iOS triggers resize event when scrolling.
            if (window.innerWidth === enInfiniteCarouselWindowWidth) {
                return;
            }

            let resizeTimeOut = carousel.getAttribute("resizeTimeOut");
            if (resizeTimeOut) {
                clearTimeout(resizeTimeOut);
                carousel.removeAttribute("resizeTimeOut");
                this.log("Carousel-" + carousel.getAttribute("uniqueID") + " timeout cleared." + resizeTimeOut);
            }

            let timeOutID = setTimeout(() => {
                this.log(`window.innerWidth: ${window.innerWidth} - CarouselWindowWidth: ${enInfiniteCarouselWindowWidth}`)
                enInfiniteCarouselWindowWidth = window.innerWidth;
                ENInfiniteCarousel.locateTrackInCarousel(carousel, track);
            }, 100);
            carousel.setAttribute("resizeTimeOut", timeOutID);
            this.log("Carousel-" + carousel.getAttribute("uniqueID") + " timeout ID: " + timeOutID);
        });
    },
}

let ENPoweredBy = {

    init: function () {
        let containerList = document.getElementsByClassName("en-powered-by");
        if (!containerList || containerList.length === 0)
            return;

        ENPoweredBy.addBoomBoxFont();

        for (let container of containerList) {
            let link = document.createElement("a");
            link.setAttribute("href", "https://www.educationalnetworks.net/");
            link.setAttribute("target", "_blank");
            link.innerHTML = '<span>powered by</span><br><span>Educational Networks</span>';

            container.appendChild(link);
        }
    },

    addBoomBoxFont: function () {
        let boomBoxFont = document.createElement('style');
        boomBoxFont.appendChild(document.createTextNode("\
            @font-face {\
                font-family: " + 'BoomBox2' + ";\
                src: url('" + '/apps-shared/fonts/boombox2.ttf' + "') format('truetype');\
            }\
        "));

        document.head.appendChild(boomBoxFont);
    }
}


function ENParallax() {
    const parallaxElements = [];

    const initialize = () => {
        const nodes = document.querySelectorAll('[en-parallax], .en-parallax');

        nodes.forEach(el => {
            parallaxElements.push({
                el,
                startSliding: el.getAttribute('start-sliding') || 'full-visible',
                finishSliding: el.getAttribute('finish-sliding') || 'partial-invisible',
                current: 0,
                target: 0,
            });
        });

        return parallaxElements.length !== 0;
    };

    const updateTargets = () => {
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(parallax => {
            const rect = parallax.el.getBoundingClientRect();
            const parallaxHeight = rect.height;

            const start = parallax.startSliding === 'partial-visible'
                ? windowHeight
                : windowHeight - parallaxHeight;

            const finish = parallax.finishSliding === 'full-invisible'
                ? 0
                : -parallaxHeight;

            if (rect.top > start) {
                parallax.target = 0;
            } else if (rect.bottom < 0) {
                parallax.target = 100;
            } else {
                const progress = ((start - rect.top) / (start - finish)) * 100;
                parallax.target = Math.min(100, Math.max(0, progress));
            }
        });
    };

    const animate = () => {
        let needsUpdate = false;

        parallaxElements.forEach(item => {
            const diff = item.target - item.current;

            if (Math.abs(diff) > 0.1) {
                item.current += diff * 0.1; // lerp
                needsUpdate = true;
            } else if (item.current !== item.target) {
                item.current = item.target; // snap to target
                needsUpdate = true;
            }

            const value = item.current;
            item.el.style.setProperty('--en-parallax-background-positionY', `${value}%`);
            item.el.style.backgroundPositionY = `${value}%`;
        });

        if (needsUpdate) {
            requestAnimationFrame(animate);
        }
    };

    const onScrollOrResize = () => {
        updateTargets();
        requestAnimationFrame(animate);
    };

    const tryInit = () => {
        const hasParallax = initialize();
        if (!hasParallax) return;

        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);
        window.addEventListener('load', onScrollOrResize);
        onScrollOrResize();
    };

    document.addEventListener('DOMContentLoaded', tryInit);
}

try {
    ENParallax();
} catch (e) {
    console.error(e);
}

class EnWideScreenVideoBuilder {

    constructor() {
        let sectionList = document.querySelectorAll('.en-widescreen-video');
        if (sectionList.length === 0) return;
        sectionList.forEach(section => new EnWideScreenVideo(section));
        this.importCSS();
    }

    importCSS() {
        const cssId = 'widescreen_video';
        if (!document.getElementById(cssId)) {
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '/apps-shared/video/css/widescreen_video.css';
            head.appendChild(link);
        }
    }
}

class EnWideScreenVideo {

    section;
    source;
    debug = false;

    settings = {
        playsInline: true,
        autoplay: true,
        loop: true,
        muted: true,
        preload: "metadata",
        controls: false,
        poster: null,
        ariaLabel: null,
        'en-pauseable': true,
        'en-onplay-pause-others': false
    }

    constructor(section) {
        this.section = section;
        this.debug = 'true' === section.getAttribute("debug");
        this.source = section.getAttribute("source");
        if (!this.source && !this.debug) {
            console.error("Video Source is empty/null");
            return
        } else if (this.debug) {
            this.source = '/apps-shared/video/testing/video.mp4';
        }

        if (window.MediaSource &&
            MediaSource.isTypeSupported(`video/mp4; codecs="avc1.4D401E, mp4a.40.2"`)
        ) {
            fetch(this.source, {
                method: 'HEAD',
                headers: {
                    accept: 'application/dash+xml'
                }
            })
                .then(function (response) {
                    const finalDestination = response.url;
                    this.source = finalDestination;
                    this.init();
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/dash+xml') != -1) {
                        var dashJsScriptEle = document.createElement('script');
                        dashJsScriptEle.src = '/apps-shared/js/dashjs/dash.all.min.js';
                        dashJsScriptEle.onload = function () {
                            var player = dashjs.MediaPlayer().create();
                            if (this.video.loop) {
                                this.video.loop = false;
                                player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
                                    this.play();
                                }.bind(this.video));
                            }
                            player.initialize(this.video, this.source, this.settings.autoplay);
                            dashJsScriptEle.remove();
                        }.bind(this);
                        document.head.insertAdjacentElement('afterend', dashJsScriptEle);
                    }
                }.bind(this))
                .catch(function (error) {
                    console.error(error);
                    this.init();
                }.bind(this));
        } else {
            this.init();
        }
        section.removeAttribute("source");
    }

    init() {
        this.loadSettings();
        this.createVideo();
        this.createButtons();
    }

    overrideConfig(key) {
        const value = this.section.getAttribute(key);
        if ('true'.toLowerCase() === value || 'false'.toLowerCase() === value) {
            this.settings[key] = 'true'.toLowerCase() === value;
        }
    }

    loadSettings() {
        const autoplay = this.section.getAttribute("autoplay");
        this.settings.autoplay =  autoplay === undefined || autoplay === null || autoplay === '' || autoplay === 'true';

        if (this.settings.autoplay) {
            this.section.classList.remove("paused");
        } else {
            this.section.classList.add("paused");
        }

        this.overrideConfig("loop");
        this.overrideConfig("muted");
        if (this.settings.muted) {
            this.section.classList.add("muted");
        } else {
            this.section.classList.remove("muted");
        }
        this.overrideConfig("controls")
        this.overrideConfig("en-pauseable")
        this.overrideConfig("en-onplay-pause-others")

        const poster = this.section.getAttribute("poster");
        if (poster) {
            this.settings.poster = poster;
        }

        const preload = this.section.preload;
        if (preload && (preload === 'metadata' || preload === 'auto' || preload === 'none' )){
            this.settings.preload = preload;
        }

        const ariaLabel = this.section.getAttribute("aria-label");
        if (ariaLabel) {
            this.settings.ariaLabel = ariaLabel;
        }
    }

    createVideo() {
        const video = document.createElement("video");
        Object.keys(this.settings)
            .filter(key => this.settings[key] !== null)
            .forEach(key => video[key] = this.settings[key]);
        video.setAttribute("en-pauseable", this.settings["en-pauseable"]);
        video.setAttribute("en-onplay-pause-others", this.settings["en-onplay-pause-others"]);

        if (this.settings.poster) {
            video.setAttribute("poster", this.settings.poster);
        }

        if (this.source.indexOf("mpd") == -1) {
            video.append(this.createSourceElement());
        }

        const p = document.createElement("p");
        p.innerHTML = 'Your browser does not support the video tag';
        video.append(p);
        this.section.append(video);
        this.video = video;
    }

    createSourceElement() {
        const el = document.createElement("source");
        el.src = this.source;
        return el;
    }

    createButtons() {
        if (this.settings.controls) {
            this.log("IF controls option is enabled, Extra buttons are disabled.");
            return;
        }
        const btnWrapper = document.createElement("div");
        btnWrapper.classList.add("en-video-controls");
        this.createPlayButton(btnWrapper);
        this.createMuteButton(btnWrapper);
        this.section.append(btnWrapper);
    }

    createPlayButton(wrapper) {
        const btnOption = this.section.getAttribute("play-button");
        if (!btnOption || btnOption === "0")
            return;
        const btn = document.createElement("button");
        btn.title = "Toggle video play & pause";
        btn.setAttribute("aria-label", "Toggle video play & pause");
        btn.setAttribute("aria-pressed", "true");

        btn.classList.add("play-btn");
        btn.classList.add("play-btn-" + btnOption);

        btn.addEventListener("click", () => {
            if (this.video.paused) {
                this.video.play();
                this.log("Video is played");
            } else {
                this.video.pause();
                this.log("Video is paused.");
            }
        });
        this.video.addEventListener('play', (event) => {
            let p = event.target.closest('.en-widescreen-video');
            if (p) p.classList.remove('paused')
        });
        this.video.addEventListener('pause', (event) => {
            let p = event.target.closest('.en-widescreen-video');
            if (p) p.classList.add('paused')
        });

        wrapper.append(btn);
    }


    createMuteButton(wrapper) {
        const btnOption = this.section.getAttribute("mute-button");
        if (!btnOption || btnOption === "0")
            return;
        const btn = document.createElement("button");
        btn.title = "Toggle video mute & unmute";
        btn.setAttribute("aria-label", "Toggle video mute & unmute");
        btn.setAttribute("aria-pressed", "true");

        btn.classList.add("mute-btn");

        btn.addEventListener("click", (e) => {
            this.video.muted = !this.video.muted;
        });
        this.video.addEventListener('volumechange', (event) => {
            let p = event.target.closest('.en-widescreen-video');
            if (event.target.muted) {
                p.classList.add('muted')
            } else {
                p.classList.remove('muted')
            }
        });


        wrapper.append(btn);
    }
    
    isDebugMPDMode() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const debugAttr = urlParams.get('debugMPD');
        return debugAttr && debugAttr.trim() && debugAttr.trim().toUpperCase() === 'TRUE';
    }
    
    log(e) {
        if (this.debug) {
            console.error(e);
        }
    }


}

class VideoPlayOrderManager {

    paths = ['', '/', '/index.jsp']

    videoElements = [];

    enableUI = false;
    VPOM_ID = 'vpom-id';

    constructor() {

        this.findVideos();

        this.loadUriParams();

        this.createUI();
        this.loadHandlers();
    }

    loadUriParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const ui = urlParams.get('vpom');
        if (ui && ('true' === ui.toLowerCase() || '1' === ui)) {
            this.enableUI = true;
        }
    }

    createUI() {
        if (!this.enableUI) return;
        const ui = document.createElement('div');
        ui.id = 'en-vpom';
        ui.classList.add("vpom")
        ui.style.display = 'flex';
        ui.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.classList.add('videos');

        wrapper.innerHTML += `<div class="videos-header video-row">
                                  <span>VPOM ID</span>
                                  <span>Paused</span>
                                  <span>Muted</span>
                                  <span>Pauseable</span>
                                  <span>Pause Others</span>    
                              </div>`
        for (let i = 0; i < this.videoElements.length; i++) {
            const video = this.videoElements[i];
            const vpomId = video.getAttribute(this.VPOM_ID);
            wrapper.innerHTML += `
                    <div class="video-row video-${vpomId}">
                      <span>${vpomId}</span>
                      <span class="play-toggle">${video.paused ? '&#9208;' : '&#9654;'}</span>
                      <span class="mute-toggle">${video.muted ? '&#128263;' : '&#128264;'}</span>
                      <span>${video.getAttribute('en-pauseable')}</span>
                      <span >${video.getAttribute('en-onplay-pause-others')}</span>
                    </div>
              `;
        }

        ui.append(wrapper);


        document.getElementsByTagName('body')[0].append(ui);

        const cssId = 'vpom-css';
        if (!document.getElementById(cssId)) {

            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '/shared/js/en-vpom.css';
            link.media = 'all';

            const head = document.getElementsByTagName('head')[0];
            head.appendChild(link);
        }
    }


    loadHandlers() {
        this.videoElements.forEach(video => {
            video.addEventListener('volumechange', (event) => {
                this.createUI();
            });
            video.addEventListener('play', (event) => {
                const id = event.target.getAttribute('vpom-id');
                const pauseOthers = event.target.getAttribute('en-onplay-pause-others');
                if (('false' !== pauseOthers.toLowerCase())) {
                    this.pauseOtherVideos(id);
                }
                this.createUI();
            });
            video.addEventListener('pause', (event) => {
                this.createUI();
            });
        })
    }

    pauseOtherVideos(vpomId) {
        this.videoElements
            .filter(video => vpomId !== video.getAttribute('vpom-id'))
            .filter(video => {
                const pauseable = video.getAttribute('en-pauseable');
                return !(pauseable && ('false' === pauseable.toLowerCase() || '0' === pauseable));

            })
            .filter(video => !video.paused)
            .forEach(video => video.pause());
    }

    findVideos() {
        const videos = document.getElementsByTagName('video');
        this.videoElements = [...videos];
        this.videoElements.forEach(video => video.setAttribute('vpom-id', Math.floor(Math.random() * 1000)))

        this.appendTags(`en-onplay-pause-others`)
        this.appendTags(`en-pauseable`)
    }

    appendTags(tag) {
        const wrapperList = document.querySelectorAll(`[${tag}]`)

        wrapperList.forEach(wrapper => {
            const videoList = wrapper.getElementsByTagName('video')
            const tagValue = wrapper.getAttribute(tag);
            Array.from(videoList).forEach(video => {
                if (video.hasAttribute('vpom-id') && !video.hasAttribute(`${tag}`)) {
                    video.setAttribute(`${tag}`, tagValue);
                }
            })
        })
    }


}

document.addEventListener("DOMContentLoaded", function () {
    try {
        ENPoweredBy.init();
    } catch (err) {
        console.log("ENInfiniteCarousel unexcepted error .", err);
    }

    try {
        ENInfiniteCarousel.init();
    } catch (err) {
        console.log("ENInfiniteCarousel unexcepted error .", err);
    }

    try {
        ENMarqueeModule.init();
    } catch (err) {
        console.error("MarqueeModule has an unexpected error.", err);
    }

    try {
        GoogleTranslate.init();
    } catch (err) {
        console.log("GoogleTranslate unexcepted error .", err);
    }
    try {
        initENAnimateOnScroll();
    } catch (err) {
        console.log("InitAnimations unexcepted error .", err);
    }
    try {
        Search.initSearchInputComponent();
    } catch (err) {
        console.log("SearchInput type unexcepted error.", err);
    }

    try {
        new EnWideScreenVideoBuilder();
    } catch (err) {
        console.log("EnWideScreenVideo throw an error.", err);
    }

    try {
        new VideoPlayOrderManager();
    } catch (err) {
        console.log("VideoPlayOrderManager throw an error.", err);
    }

});

["DOMContentLoaded", "resize"].forEach(event => {
    window.addEventListener(event, function () {
        try {
            setTimeout(function () {
                ENMarqueeModule.modifySpeed();
                ENMarqueeModule.replacePopUp();
            }, 0);
        } catch (err) {
            console.log("ENMarqueeModule.modifySpeed unexcepted error .", err);
        }
    })
});

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
