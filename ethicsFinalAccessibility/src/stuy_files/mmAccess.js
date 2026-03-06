/* Educational Networks Main Menu Keyboard Access
 *
 * FOCUS STYLING
 * It is important to add styling for the :focus event as is done for the :hover event.
 * - Top level items:
 *
 *		#nav_items_0 li a:focus, #nav_items_0 li.over a { ... top level hover styling }
 *		 	- in order to maintain top level hover effect the 'over' class is added to the top level li when
 *			  a user is within a sub menu.
 *
 * - Sub level items:
 * 		#nav_items_0 li ul li a:focus { ...sub level item styling }
 *
 */

function MainMenu() {

	var mm = this;
	var current_focus, current_elem, previous_focus, latest_menu, disabled_id, disabled_item, focus_fired = null;
	var keys_down = new Array(),
		open_menus = new Array();

	var browser = {
		isChrome 	: navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
		isFirefox 	: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
		isMac 		: navigator.platform.toUpperCase().indexOf('MAC') > -1
	}

	var keys = {
		TAB: 	9,
		ENTER: 	13,
		SPACE: 	32,
		ESCAPE: 27,
		UP: 	38,
		DOWN: 	40,
		LEFT: 	37,
		RIGHT: 	39
	}

	this.setFocus 		= function( obj, elem ) { current_focus = obj; current_elem = elem; }
	this.setPrevFocus 	= function( obj ) { previous_focus = obj; }
	this.setLatestMenu 	= function( menu ) { latest_menu = menu; }

	this.getFocus 		= function() { return current_focus; }
	this.getElement 	= function() { return current_elem; }
	this.getBrowser 	= function() { return browser; }
	this.getKeys 		= function() { return keys; }
	this.getKeysDown 	= function() { return keys_down; }
	this.getOpenMenus 	= function() { return open_menus; }
	this.getLatestMenu 	= function() { return latest_menu; }
	this.getPrevFocus	= function() { return previous_focus; }

	/* init runs the setup function and sets all needed event listeners
	 * assumes id="menu" */
	this.init = function() {

		jAria("#menu").delegate( "a", "focusin", function(e) {
			e.stopImmediatePropagation();
			/* - Parent Items With Links
			 * 	 - disables the link by replacing href with javascript:;
			 * 	 - original href is stored in another attribute [ data-href="*" ]
			 * 	 - menu correction detects and closes menus that should have closed
			 *     but didn't because the focus left undetected.  Voiceover problem.
			 *   - 5/6/2020 menus now open on focusin
			 * - Parents With No Link, Normal Links
			 *	 - does nothing */
			mm.unsetParentHref(this);
			mm.menuCorrection( jAria(this).closest("ul").attr("id") );
			mm.setFocus( jAria(this), document.activeElement );
			//mm.openMenu();
		});

		jAria("#menu > ul ul a").delegate( "a", "focus focusin", function(e) {
			/* ensures top level li maintains '.over' class while within sub menu */
			e.stopImmediatePropagation();
			mm.unsetParentHref(this);
			jAria( this ).closest('ul').addClass('over');
		});

		jAria("#menu > ul ul a").delegate( "a", "blur", function(e) {
			/* removes '.over' class top the top level each time a sub link blurs
			 * it will be added again if the next focusable item is within the same menu
			 * maintaining the hover effect for the top level item. */
			e.stopImmediatePropagation();
			mm.setParentHref(this);
			jAria(this).closest('ul').removeClass('over');
		});

		jAria("#menu").delegate( "a", "blur", function() {
			/* - Parent Items With Links
			 * 	 - re-enables the link by replacing href with data-href attribute
			 * 	 - data-href="*"  attribute is removed
			 * - Parents With No Link, and Normal Links
			 *	 - does nothing */
			mm.setPrevFocus(jAria(this));
			mm.setParentHref(this);
		});

		jAria("#menu").delegate( "a", "mouseenter", function() {
			/* - Parent Items With Links
			 *   - sets the *made up* en-mouseover attribute on the item preventing the link from being disabled as we would do for a keyboard user
			 * - Parents With No Link, and Normal Links
			 *	 - does nothing */
			mm.setParentHref(this);
			jAria(this).attr("en-mouseover", "yes");
		});

		jAria("#menu").delegate( "a", "mouseleave", function() {
			/* - Parent Items With Links
			 * 	 - clears the *made up* en-mouseover attribute on the item preventing the link from being disabled as we would do for a keyboard user
			 * - Parents With No Link, and Normal Links
			 *	 - does nothing */
			jAria(this).attr("en-mouseover", "no");
		});

		jAria("#menu").delegate( "a", "click", function() {
			/* - Parent Items:  TODO - redo notes
			 *   - ignore links on first press, open the sub level
			 *   - keep focus on the parent item
			 *   	-* THIS SHOULD MAYBE CHANGE TO FOCUS THE FIRST ITEM FOR PARENTS WHICH ARE NON LINKS *-
			 *   - link will become active, a following press will open the link
			 * - Normal Links:
			 *   - activates href */
			mm.openMenu();
		});

		jAria("#menu").bind("keyup", function(e) {
			/*  when a key is released, remove it from the keys_down array
			 *  keys_down keeps track of any key pressed which allows us
			 *  to avoid multiple events from firing if a key is held down. */
			var key = e.keyCode ? e.keyCode : e.which;
			if(key != keys.SPACE && key != keys.ENTER) e.preventDefault();
			var key_index = jAria.inArray( key, keys_down );
			if(key_index != -1) {
				keys_down.splice(key_index, 1);
			}
		});

		jAria("#menu").bind('keydown', function(e) {
			/*  when a key is pressed, log it in the keys_down.
			 *  keys_down array keeps track of any key pressed which allows us
			 *  to avoid multiple events from firing if a key is held down.
			 *  if a key is already down return immediately
			 *  else continue to the main key switch */
			var key = e.keyCode ? e.keyCode : e.which;
			
			// Allow select elements to handle their own keyboard events
			if (e.target && e.target.tagName === 'SELECT') {
				return;
			}
			
			if( key == keys.UP || key == keys.DOWN  || key == keys.LEFT || key == keys.RIGHT || key == keys.SPACE )
				e.preventDefault();

			// the following prevents multiple event fires when a key is held down
			if(jAria.inArray( key, keys_down ) > -1) {
				return;
			}

			// logs a key to prevent multiple event fires
			keys_down.push(key);

			var active_elem = document.activeElement;
			mm.setFocus( jAria(this), active_elem );

			// main menu switch
			switch(key) {
				case keys.SPACE:
				case keys.ENTER:
					/* - Parent Items:
					 *   - if parent item contains href the value is changed to javascript:; and a new menu item is created at the first position of the menu
					 *   - focus moves to the first child menu item
					 * - Normal Links:
					 *   - activates href */
					if( mm.isParent() ) {
						e.preventDefault();
						mm.openMenu();
					} else if (active_elem.onclick) {
						e.preventDefault();
						active_elem.click();
					}
					break;

				case keys.ESCAPE:
					/* - Top Level:
					 *   - Exit menu, land in main content area
					 * - Sub Level:
					 *   - close current menu
					 *   - focus on the parent item of the menu closed */
					mm.close( key );
					break;

				case keys.TAB:
					/*
					 *  - Top Level:
					 *    - go to next item or previous item if shift is held down
					 *  - Sub Level:
					 *    - close current menu simulating right press,
					 *    - if shift is down simulate left press
					 */
					if(open_menus.length > 0) {
						e.preventDefault();
						if(e.shiftKey) {
							mm.close( keys.LEFT );
						} else {
							mm.close( keys.RIGHT );
						}
					}
					break;
					case keys.UP:
						/* - Top Level:
                         *   - does nothing
                         * - Sub Level:
                         *   - go to prev item in current list
                         *   - if at the bottom item jump back to the top item */
						if(open_menus.length < 1) {
							var top_level_item = jAria(document.activeElement);
							if(top_level_item.parent().is(':first-child')) {
								top_level_item = top_level_item.parent().parent().find('> li').last().children('a');
							} else {
								var prevItem = mm.searchPrevElement(top_level_item.parent().get(0));
								top_level_item = jAria(prevItem).children('a');
							}
							top_level_item.focus();
							if(mm.isParent(top_level_item)) {
								mm.openMenu(top_level_item);
								var lastMenu = open_menus[open_menus.length-1];
								var lastItem = lastMenu.menu_elem.children('li').last().children('a');
								lastItem.focus();
								lastMenu.active_item = lastItem;
								lastMenu.has_focus = true;
							}
						} else {
							mm.closestItem( key );
						}
						break;
				case keys.DOWN:
					/* - Top Level:
					 *   - if parent, open menu
					 *   - else do nothing
					 * - Sub Level:
					 *   - go to next item in the current list
					 *   - if at the bottom item jump back to the top item */
					if(open_menus.length < 1) {
						mm.openMenu();
					} else {
						mm.closestItem( key );
					}
					break;

				case keys.LEFT:
					/* - Top Level
					 * 	 - go left to the closest item, parent or not
					 * - Sub Level
					 * 	 - close the current menu and:
					 * 		- if parent level is top level focus the previous top level item
					 * 		- else if parent level is a sub menu item focus on that parent item
					 */
					if(open_menus.length < 1) {
						mm.closestItem( key );
					} else {
						//mm.closestMenu( keys.LEFT );
						mm.close( key );
					}
					break;

				case keys.RIGHT:
					/* - Top Level
					 * 	 - go right to the closest item, parent or not
					 * - Sub Level
					 * 	 - if current item is a parent open child menu
					 * 	 - if current item is not a parent close all sub menu levels and focus on the next top level item */
					if(open_menus.length < 1) {
						mm.closestItem( key );
					} else {
						//mm.closestMenu( keys.RIGHT );
						if( mm.isParent() ) {
							mm.openMenu();
						} else {
							mm.close( key );
						}
					}
					break;

				default:
					/* - Top Level
					 *   - Does nothing
					 * - Sub Level
					 *   - increases the size of items beginning with any alphabetical key
					 *   - case insensitive
					 * 	 - toggle through items on following key presses of the same alphabetical key
					 * 	 - next item, next menu, and close functions will reset the font size and list of items to toggle */
					try {
						mm.filterAlphabetKeys( key );
					} catch (e) {
						console.debug(e);
					}

					break;
			}

		});
	}

	this.clearFilterKey = function( current_menu ) {
		if(current_menu.filter_key != null) {
			current_menu.filter_key = null;
			current_menu.menu_items.each(function(){
				if(jAria(this).hasClass("at-focus")) {
					jAria(this).removeClass("at-focus");
				}
			});
		}
	}

	this.isParent = function ( active_elem ) {
		var active_elem = (typeof active_elem !== typeof undefined) ? active_elem : mm.getElement();
		var check = jAria( active_elem ).attr('aria-haspopup');
		return typeof check !== typeof undefined && check !== false;
	}

	this.unsetParentHref = function( active_elem ) {
		if(jAria(active_elem).attr('en-mouseover') == "yes") return;
		if(mm.isParent(active_elem)) {
			jAria(active_elem).attr("data-href", jAria(active_elem).attr("href"));
			jAria(active_elem).attr("href", "javascript:;");
			if (!jAria("#menu").hasClass("en-mobnav-show") || (active_elem && active_elem.href && active_elem.href.contains("http"))) {
				mm.prependParentLink(active_elem);
			}
		}
	}

	this.setParentHref = function( active_elem ) {
		if(mm.isParent(active_elem)) {
			jAria(active_elem).attr("href", jAria(active_elem).attr("data-href"));
		}
	}

	this.prependParentLink = function( active_elem ) {
		if(jAria(active_elem).attr("en-header-appended") !== "yes") {
			jAria(active_elem).attr("en-header-appended", "yes");
			var dataHref = jAria(active_elem).attr("data-href");
			var sub_ul = jAria("#" + jAria(active_elem).attr("aria-controls"));
			var newAnchor = jAria("<a/>", {
				"href": dataHref,
				"text": jAria(active_elem).text().replace("\u2192", "")
			});
			jAria("<li/>", {
				"style":"display:none;",
				"class": "nav_item_first keyboard-only"
			}).prepend(newAnchor).prependTo(sub_ul);
		}
	}

	this.openMenu = function ( active_elem ) {
		var active_elem = (typeof active_elem !== typeof undefined) ? active_elem : mm.getElement();
		var active_obj = jAria( active_elem );
		var is_parent = mm.isParent( active_elem );
		var is_link = (active_obj.attr('href') != "javascript:;" && active_obj.attr("href") != "#");
		var mouse_over = active_obj.attr("en-mouseover") == "yes";
		if ( is_parent ) {
			open_menus.push({
				locked_in 	: true,
				has_focus	: false,
				menu_id		: jAria("#" + active_obj.attr('aria-controls')).attr("id"),
				menu_parent	: jAria(active_elem),
				menu_elem	: jAria("#" + active_obj.attr('aria-controls')),
				menu_items 	: null,
				filtered_items: [],
				filter_iter : 0,
				filter_key 	: null,
				active_item : null,
				active_item_id: null,
				sub_level: open_menus.length
			});

			var menu_index = open_menus.length-1;
			open_menus[menu_index].menu_items = open_menus[menu_index].menu_elem.children('li').children('a');
			open_menus[menu_index].menu_parent.parent().addClass('over');
			open_menus[menu_index].menu_parent.attr('aria-expanded', 'true');
			open_menus[menu_index].menu_elem.attr('aria-expanded', 'true');
			open_menus[menu_index].menu_elem.attr('aria-hidden', 'false');
			open_menus[menu_index].menu_elem.css('opacity', '1');
			open_menus[menu_index].menu_elem.css('visibility', 'visible');
			open_menus[menu_index].menu_elem.css('display', 'block');

			if(!mouse_over) {
				jAria(open_menus[menu_index].menu_items[0]).parent().show();
			}

			mm.setLatestMenu( open_menus[menu_index].menu_elem );
			mm.closestItem( keys.DOWN );
		}
	}

	this.closestItem = function ( key ) {
		var current_menu = open_menus[open_menus.length-1];
		var top_level_item = null;
		if(current_menu != null) {
			mm.clearFilterKey( current_menu );
			if(key == keys.DOWN ) {
				if(!current_menu.has_focus) {
					current_menu.active_item = current_menu.menu_elem.children('li').first().children('a');
					current_menu.active_item.focus();
					current_menu.has_focus = true;
				} else {
					if(current_menu.active_item.parent().is(':last-child')) {
						// Check if there's a next menu by looking at the parent's next sibling
						var parentLi = current_menu.menu_parent.parent();
						if (!parentLi.is(':last-child')) {
							mm.close(keys.RIGHT); // Move right only if there's a next menu
						}
					} else {
						current_menu.active_item = current_menu.active_item.parent().next().children('a');
						current_menu.active_item.focus();
					}
				}
			} else if ( key == keys.UP) {
				if(current_menu.active_item.parent().is(':first-child')) {
					mm.close(keys.UP);
				} else {
					current_menu.active_item = current_menu.active_item.parent().prev().children('a');
					current_menu.active_item.focus();
				}
			}
		} else {
			top_level_item = jAria(document.activeElement);
			if( key == keys.RIGHT ) {
				if(top_level_item.parent().is(':last-child')) {
					top_level_item = top_level_item.parent().parent().find('> li').first().children('a')
				} else {
					var nextItem = mm.searchNextElement(top_level_item.parent().get(0));
					top_level_item = nextItem.getElementsByTagName('a')[0];
				}
				top_level_item.focus();
			} else if ( key == keys.LEFT ) {
				if(top_level_item.parent().is(':first-child')) {
					top_level_item = top_level_item.parent().parent().find('> li').last().children('a');
				} else {
					var prevItem = mm.searchPrevElement(top_level_item.parent().get(0));
					top_level_item = prevItem.getElementsByTagName('a')[0];
				}
				top_level_item.focus();
			}
		}
	}

	this.searchNextElement = function(startingPoint) {
		var foundNode = false;
		var nextNode = null;
		var maxAttempts = 25;
		var attempts = 0;
		while(!foundNode) {
			attempts++;
			nextNode = (nextNode == null) ? startingPoint.nextSibling : nextNode.nextSibling;
			try {
				if(nextNode.hasAttribute("en-replacable")) {
					continue;
				}
			} catch(e) {}
			if(attempts > maxAttempts) {
				break;
			}
			return nextNode;
		}
	}

	this.searchPrevElement = function(startingPoint) {
		var foundNode = false;
		var nextNode = null;
		var maxAttempts = 25;
		var attempts = 0;
		while(!foundNode) {
			attempts++;
			nextNode = (nextNode == null) ? startingPoint.previousSibling : nextNode.previousSibling;
			try {
				if(nextNode.hasAttribute("en-replacable")) {
					continue
				}
			} catch(e) { }
			if(attempts > maxAttempts) {
				break;
			}
			return nextNode;
		}
	}

	this.closestMenu = function ( key ) {
		var current_menu = open_menus[open_menus.length-1];
		mm.clearFilterKey( current_menu );
		var item_check = null;
		var menu_length = current_menu.menu_elem.children('li').length-1;
		for(var i = 0; i <= menu_length; i++) {
			if(key == keys.RIGHT) {
				if(document.activeElement == current_menu.menu_elem.children('li').last().children('a').get(0)) {
					if(current_menu.active_item.parent().is(':last-child')) {
						item_check = current_menu.active_item;
					}
				} else {
					item_check = (item_check == null)
						? 	((!current_menu.has_focus)
							? current_menu.menu_elem.children('li').first().children('a')
							: current_menu.active_item.parent().next().children('a'))
						: item_check.parent().next().children('a');
				}
			} else if(key == keys.LEFT) {
				if(document.activeElement == current_menu.menu_elem.children('li').first().children('a').get(0)) {
					if(current_menu.active_item.parent().is(':first-child')) {
						item_check = current_menu.active_item;
						mm.close( keys.LEFT );
						break;
					}
				} else {
					item_check = (item_check == null)
						? 	((!current_menu.has_focus)
							? current_menu.menu_elem.children('li').last().children('a')
							: current_menu.active_item.parent().prev().children('a'))
						: item_check.parent().prev().children('a');
				}
			}
			current_menu.has_focus = true;
			if(item_check.attr('aria-haspopup')) {
				current_menu.active_item = item_check;
				current_menu.active_item.focus();
				break;
			}
			if( item_check.parent().is(':last-child') && key == keys.RIGHT ) {
				mm.close( key );
				break;
			} else if ( item_check.parent().is(':first-child') && key == keys.LEFT ) {
				mm.close( key );
				break;
			}
		}
	}

	this.closeMenu = function( menu_id ) {
		var menu = open_menus[ menu_id ];
		var parent_li = menu.menu_parent.parent();
		parent_li.removeClass('over');
		menu.menu_parent.attr('aria-expanded', 'false');
		menu.menu_elem.attr('aria-expanded', 'false');
		menu.menu_elem.attr('aria-hidden', 'true');
		menu.menu_elem.css("visibility", "");
		menu.menu_elem.css("display", "");

		menu.menu_elem.find(".keyboard-only").hide();
		mm.setParentHref(menu.menu_parent);
		if(menu.menu_items != null) {
			menu.menu_items.each(function() {
				if(jAria(this).hasClass("at-focus")) {
					jAria(this).removeClass('at-focus');
				}
			});
		}

		open_menus.pop();
	}

	this.close = function( key ) {
		if(open_menus.length < 1) {
			var next = jAria("#content-shortcut-target");
			next.attr("tabindex", "-1").focus().attr("tabindex", "0");
			return;
		}
		var key = (typeof key === "undefined") ? null : key;
		var num_to_close = (key == keys.ESCAPE || key == keys.LEFT) ? 1 : open_menus.length;
		var top_level = open_menus[0].menu_parent;
		var prev_level = open_menus[open_menus.length - 1].menu_parent;
		for ( var i = open_menus.length; i > 0; --i ) {
			mm.closeMenu(i-1);
			num_to_close--;
			if( num_to_close < 1 ) break;
		}
		if( open_menus.length < 1 ) {
			if( key == keys.LEFT) {
				if(prev_level == top_level) {
					var isFirstTopLevel = top_level.parent().is(':first-child');
					var parentElement = top_level.parent().get(0);
					top_level = (isFirstTopLevel) ? parentElement : mm.searchPrevElement(parentElement);
					top_level_item = top_level.getElementsByTagName('a')[0];
					top_level_item.focus();
				} else {
					prev_level.focus();
				}
			} else if( key == keys.RIGHT ) {
				var isLastTopLevel = top_level.parent().is(':last-child');
				var parentElement = top_level.parent().get(0);
				top_level = (isLastTopLevel) ? parentElement : mm.searchNextElement(parentElement);
				top_level_item = top_level.getElementsByTagName('a')[0];
				top_level_item.focus();
			} else {
				top_level.focus();
			}
		} else {
			prev_level.focus();
		}
	}

	this.menuCorrection = function ( menu_id ) {
		if(open_menus.length < 1) return;
		var num_to_close = open_menus.length;
		var corrected = false;
		for ( var i = open_menus.length; i > 0; --i ) {
			if(open_menus[i-1].menu_id != menu_id) {
				mm.closeMenu(i-1);
				num_to_close--;
				corrected = true;
			} else if ( (num_to_close < 1) || (open_menus[i-1].menu_id == menu_id) ) {
				if(corrected || open_menus[open_menus.length-1].active_item != jAria(document.activeElement)) {
					open_menus[open_menus.length-1].has_focus = true;
					open_menus[open_menus.length-1].active_item = jAria(document.activeElement);
					open_menus[open_menus.length-1].active_item.focus();
				}
				break;
			}
		}
	}

	this.filterAlphabetKeys = function ( key ) {
		if (( key >= 48 && key <= 57 )
			|| ( key >= 65 && key <= 90 )
			|| ( key >= 97 && key <= 122 ) ) {
			var current_menu = open_menus[open_menus.length-1];
			if(current_menu.menu_items != null) {
				if(current_menu.filter_key != key) {
					current_menu.filtered_items = [];
					current_menu.filter_key = key;
					current_menu.filter_iter = 0;
					current_menu.menu_items.each(function() {
						if(jAria(this).text().charCodeAt(0) == key || jAria(this).text().charCodeAt(0) == key+32) {
							jAria(this).addClass("at-focus");
							current_menu.filtered_items.push(jAria(this));
						} else if(jAria(this).hasClass("at-focus")) {
							jAria(this).removeClass("at-focus");
						}
					});
					if(menu.filtered_items.length > 0) {
						current_menu.active_item = menu.filtered_items[0];
						current_menu.filtered_items[0].focus();
					} else {
						menu.filter_key = null;
					}
				} else {
					current_menu.filter_iter = (current_menu.filter_iter + 1) >= current_menu.filtered_items.length ? 0 : current_menu.filter_iter + 1;
					current_menu.filtered_items[current_menu.filter_iter].focus();
					current_menu.active_item = current_menu.filtered_items[current_menu.filter_iter];
				}
			}
		}
	}
}
