var $en = {

    createDiv: function(cssClass, innerHTML) {
        return this.createElement("div", cssClass, innerHTML);
    },

    createElement: function(type, cssClass, innerHTML) {
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
    },

    ajax: function(xhrdata) {
        let xhr = new XMLHttpRequest();
        try {
            xhr.timeout = xhrdata.timeout;
        } catch (e) {
        }
        xhr.addEventListener("load", function(event) {
            if (xhr.status == 200) {
                if (xhrdata.callback != null) {
                    xhrdata.callback(xhr.responseText);
                }
            } else {
                if (xhrdata.onbadstatus != null) {
                    xhrdata.onbadstatus(xhr);
                }
            }
        });


        if (xhrdata.ontimeout != null) {
            xhr.addEventListener("timeout", function(event) { xhrdata.ontimeout(event); });
        } else {
            if (xhrdata.onerror != null) {
                xhr.addEventListener("timeout", function(event) { xhrdata.onerror(event); });
            }
        }

        if (xhrdata.onerror != null) {
            xhr.addEventListener("error", function(event) {
                xhrdata.onerror(event);
            });
        }

        if (xhrdata.uploadPanel != null) {
            let eventTypes = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];
            xhrdata.uploadPanel.bindHttpRequest(xhr);
            for (let x = 0; x < eventTypes.length; x++) {
                xhr.upload.addEventListener(eventTypes[x], function(e) { xhrdata.uploadPanel.eventHandler(e); } );
            }
        }

        xhr.open("POST", xhrdata.url);
        if (xhrdata.file != null) {
            xhr.timeout = 0;
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
            xhr.enctype = "multipart/form-data";
            let formData = new FormData();
            for (let f = 0; f < xhrdata.file.length; f++) {
                formData.append("fileToUpload_" + f, xhrdata.file[f]);
            }
            for (let [key, value] of xhrdata.params.entries()) {
                formData.append(key, value);
            }
            xhr.send(formData);
        } else {
            xhr.timeout = Math.max(2000, xhr.timeout);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(this.getEncodedURI(xhrdata.params));
        }
    },

    getEncodedURI: function(params) {
        let encodedData = [];
        let encodedURI = "";
        for ( let [key, value] of params.entries() ) {
            encodedData.push( encodeURIComponent(key) + "=" + encodeURIComponent(value) );
        }
        return encodedData.join("&").replace( /%20/g, "+" );
    },

    isInsideOf: function(parent, child) {
        let p = child.parentNode;
        while (p != null) {
            if (p == parent) {
                return true;
            }
            p = p.parentNode;
        }
        return false;
    },

    getParentByClassName: function(className, el) {
        do {
            if (el.classList && el.classList.contains(className)) {
                return el;
            }
            el = el.parentNode;
        } while (el);
        return null;
    },

    getCookie: function (name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=')
            return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, '');
    },

    setCookie: function (name, value, days = 30, path = '/') {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;
    },

    deleteCookie: function (name, path = '/') {
        this.setCookie(name, '', -1, path);
    },

    isPageEditorEnabled: function () {
        return !!(typeof window._encms !== 'undefined' && typeof window._encms.pageEditor !== 'undefined'
            && window._encms.editMode && window._encms.pageEditor.activeBlock);
    },

    camelize: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    isHover: (e) => {
        if (e != null) {
            return e.parentElement.querySelector(':hover') === e;
        }
        return false;
    },

    getComputedStyle: function (el, attr, isNum = true) {
        let elemAttr = window.getComputedStyle(el).getPropertyValue(attr);
        return isNum ? parseFloat(elemAttr.replace("px", "")) : elemAttr;
    },

    getOS: function() {
        let os = "unknown";
        let navApp = navigator.userAgent.toLowerCase();

        switch (true) {
            case (navApp.indexOf("win") !== -1):
                os = "win";
                break;
            case /ipad|iphone/.test(navApp) && !window.MSStream:
                os = "iphone";
                break;
            case (navApp.indexOf("mac") !== -1):
                os = "mac";
                break;
            case /android/i.test(navApp):
                os = "android";
                break;
            case (navApp.indexOf("linux") !== -1):
                os = "lin";
                break;
            case (navApp.indexOf("x11") !== -1):
                os = "unix";
                break;
        }
        return os;
    },

    isMobile: function() {
        let os = this.getOS();
        return os !== 'win' && os !== 'mac' && os !== 'lin' && os !== 'unix';
    },

    getBrowser: function() {
        let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        if (isOpera) {
            return "opera";
        }

        let isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) {
            return "firefox";
        }

        let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        if (isSafari) {
            return "safari";
        }

        let isIE = (navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true);
        if (isIE) {
            return "ie";
        }

        let isEdge = navigator.userAgent.indexOf("Edg") !== -1;
        if (isEdge) {
            return "edge";
        }

        let isChrome = !!window.chrome && navigator.userAgent.indexOf("Chrome") != -1;
        if (isChrome) {
            return "chrome";
        }

        let isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
        if (isEdgeChromium) {
            return "edge";
        }

        return undefined;
    }

};