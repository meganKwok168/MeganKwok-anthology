function ENCardSlider(params) {

    this.init = function(params) {
        let me = this;
        this.container = params.container;
        if (params.maxColumnGap >= 0) {
            this.maxColumnGap = params.maxColumnGap;
        } else if (params.maxColumnGap && params.maxColumnGap.endsWith("px") && parseInt(params.maxColumnGap) >= 0) {
            this.maxColumnGap = parseInt(params.maxColumnGap);
        }

        this.slideSingleCard = params.slideSingleCard;

        if (!this.container) {
            throw("The <DIV> element for the container is not provided. (container=null)");
        }

        if (this.container.nodeName != "DIV") {
            throw("ENCardSlider's container must be a DIV element. " + this.container.nodeName + " is invalid.");
        }

        let i = this.container.getElementsByClassName("en-card-slider-inner-container");
        if (i.length == 0) {
            throw("Inner container doesn't exist.");
        } else if (i.length > 1) {
            throw(i.length + " inner containers found. Only 1 is expected.");
        } else if (i[0].parentNode != this.container) {
            throw("Inner container's parentNode is not the main container.");
        }
        this.innerContainer = i[0];

        let contStyles = new Map();
        contStyles.set("overflow-x", "hidden");
        contStyles.set("padding", "0px");

        let innerContStyles = new Map();
        innerContStyles.set("position", "relative");
        innerContStyles.set("display", "flex");
        innerContStyles.set("flex-direction", "row");
        innerContStyles.set("border", "none");
        innerContStyles.set("padding", "0px");
        innerContStyles.set("margin-left", "0px");
        innerContStyles.set("margin-right", "0px");

        let childStyles = new Map();
        childStyles.set("overflow", "hidden");
        childStyles.set("flex-shrink", "0");
        childStyles.set("margin-left", "0px");
        childStyles.set("margin-right", "0px");
        childStyles.set("min-width", "auto");
        childStyles.set("max-width", "none");

        this.enforceStyles(this.container, contStyles);
        this.enforceStyles(this.innerContainer, innerContStyles);

        let innerContCompStyles = window.getComputedStyle(this.innerContainer);

        let gap = innerContCompStyles.getPropertyValue("column-gap");
        if (gap.endsWith("px")) {
            this.minColumnGap = parseInt(gap);
        } else {
            this.minColumnGap = 8;
        }

        let cardWidth;

        if (this.innerContainer.children.length == 0) {
            console.log("ENCardSlider Warning: No child element (card) exists in the inner container.");
        }

        for (let x = 0; x < this.innerContainer.children.length; x++) {
            let c = this.innerContainer.children[x];
            this.enforceStyles(c, childStyles);
            if (x == 0) {
                cardWidth = c.offsetWidth;
                if (cardWidth > this.innerContainer.clientWidth) {
                    throw("First card's width is smaller than the container's width. Container: " + this.innerContainer.clientWidth + "px - Card: " + cardWidth + "px");
                }
            } else {
                if (cardWidth != c.offsetWidth) {
                    console.log("ENCardSlider Warning: All cards must have the equal width. Width of the card #" + x + " is " + c.offsetWidth + "px. Expected: " + cardWidth + "px");
                }
            }

            try {
                let childResizeObserver = new ResizeObserver(entries => { this.adjust(); });
                childResizeObserver.observe(c);
            } catch (e) {
                console.log("ENCardSlider Warning: Resize observer is not available. It's OK.");
            }
        }

        let transition = innerContCompStyles.getPropertyValue("transition");
        if (!transition.includes("transform")) {
            this.innerContainer.style['transition'] = "transform 0.6s ease-out";
        }

        this.innerContainer.style["transform"] = "translateX(0px)";
        this.curIndex = 0;

        try {
            let resizeObserver = new ResizeObserver(entries => { this.adjust(); });
            resizeObserver.observe(this.container);
        } catch (e) {
            console.log("ENCardSlider Warning: Resize observer is not available. It's OK.");
        }


        if (params.prevButton) {
            this.prevButton = params.prevButton;
            this.prevButton.addEventListener("click", () => {
                me.prev();
            });
        }
        if (params.nextButton) {
            this.nextButton = params.nextButton;
            this.nextButton.addEventListener("click", () => {
                me.next();
            });
        }
        this.adjust();
    }

    this.enforceStyles = function(element, styles) {
        let computedStyles = window.getComputedStyle(element);
        for (const [key, value] of styles.entries()) {
            if (computedStyles.getPropertyValue(key) != value) {
                this.setImportantStyle(element, key, value);
            }
        }
    }

    this.setImportantStyle = function(element, attribute, value) {
        element.style[attribute] = value;
        element.setAttribute("style", element.getAttribute("style").replace((attribute + ": " + value + ";"), (attribute + ": " + value + " !important;")));
    }

    this.move = function(index) {
        index = Math.max(0, Math.min(index, this.getMaxIndex()));
        let cardWidth = this.innerContainer.children[0].offsetWidth;
        let curGap = parseInt(window.getComputedStyle(this.innerContainer).getPropertyValue("column-gap"));
        let x = index * (cardWidth + curGap);
        if (!this.paddingOnSides) {
            x += curGap;
        }
        this.innerContainer.style["transform"] = "translateX(-" + x + "px)";
        this.curIndex = index;
        if (this.prevButton) {
            if (this.curIndex == 0) {
                this.prevButton.classList.add("en-card-slider-button-disabled");
            } else {
                this.prevButton.classList.remove("en-card-slider-button-disabled");
            }
        }
        if (this.nextButton) {
            if (this.curIndex >= this.getMaxIndex()) {
                this.nextButton.classList.add("en-card-slider-button-disabled");
            } else {
                this.nextButton.classList.remove("en-card-slider-button-disabled");
            }
        }
    }

    this.prev = function() {
        this.curIndex = Math.max(0, this.curIndex - this.numberCardsToSlide);
        this.move(this.curIndex);
    }

    this.next = function() {
        this.curIndex = Math.min(this.getMaxIndex(), this.curIndex + this.numberCardsToSlide);
        this.move(this.curIndex);
    }

    this.getMaxIndex = function() {
        let availableWidth = this.container.clientWidth;
        let cardWidth = this.innerContainer.children[0].offsetWidth;
        let numberCards = Math.max(1, Math.min(this.innerContainer.children.length, Math.round((availableWidth + this.minColumnGap) / (cardWidth + this.minColumnGap) - 0.5)));
        return Math.max(0, this.innerContainer.children.length - numberCards);
    }

    this.adjust = function() {
        let availableWidth = this.container.clientWidth;
        let cardWidth = this.innerContainer.children[0].offsetWidth;
        let numberCards = Math.max(1, Math.min(this.innerContainer.children.length, Math.round((availableWidth + this.minColumnGap) / (cardWidth + this.minColumnGap) - 0.5)));
        let remaining = availableWidth - numberCards * cardWidth;

        let newGap;
        if (numberCards > 1) {
            newGap = Math.round(remaining / (numberCards - 1) - 0.5);
            if (this.maxColumnGap && newGap > this.maxColumnGap) {
                newGap = Math.round(remaining / (numberCards + 1) - 0.5);
                this.paddingOnSides = true;
            } else {
                this.paddingOnSides = false;
            }
        } else {
            newGap = Math.round(remaining / 2);
            this.paddingOnSides = true;
        }

        this.numberCardsToSlide = this.slideSingleCard ? 1 : numberCards;

        this.setImportantStyle(this.innerContainer, "column-gap", newGap + "px");
        this.setImportantStyle(this.innerContainer.children[0], "margin-left", newGap + "px");
        this.setImportantStyle(this.innerContainer.children[this.innerContainer.children.length - 1], "margin-right", newGap + "px");
        this.move(this.curIndex);
    }

    try {
        this.init(params);
    } catch (e) {
        console.error("Could not initialize ENCardSlider. Error: " + e);
    }
}
