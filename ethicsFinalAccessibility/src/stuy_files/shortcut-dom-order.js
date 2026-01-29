/*  12/27/17 by AGN
 * 
 * -places the main content and main menu skip link shortcuts at the 
 *  top of the DOM. 
 * 
 * -Also removes tabindex=1 to avoid an unlikely but possible issue. 
 *  It's no longer needed once the links are in correct DOM position.
 * 
 * This function is called immediately from header_desktop.jsp using the 
 * onload attribute of the external <script> tag which gives us access to 
 * the DOM elements before the document has loaded and even before 
 * document.readystate="interactive"  (Genius idea by Lev)
 *  
 */
function ada_dom_order_correction() {
	var shortcut_wrap = document.getElementById("shortcut-wrapper");
	document.body.insertBefore(shortcut_wrap, document.body.firstChild);
	ada_keyboard.clearSpecialIndex();
	
	setTimeout(function() {
        ada_keyboard.correctPageTitleId();
		ada_keyboard.correctMenuShortcut();
		ada_keyboard.createAdditionalShortcuts();
		ada_keyboard.addEvents();
		ada_keyboard.scanZindex();
		
		if (ada_keyboard.config.skipLinkToMainNav) {
			main_menu.init();
		}
	}, 1);
}