function resizeCardSlider() {
  if (window.innerWidth > 1250) {
    return;
  } else if (window.innerWidth <= 1250) {

    let slider = document.querySelector('.en-card-slider-inner-container');
    if (!slider) return;
    let columnGap = slider.style.getPropertyValue('column-gap').replace('px', '');
    slider.style.removeProperty('column-gap');
    slider.style.setProperty('column-gap', Number(columnGap) + 3 + 'px', 'important');
  }
}

let _debounce = function (ms, fn) {
  let timer;
  return function () {
    clearTimeout(timer);
    let args = Array.prototype.slice.call(arguments);

    args.unshift(this);
    timer = setTimeout(fn.bind.apply(fn, args), ms);
  };
};


document.addEventListener('DOMContentLoaded', () => {

  const observer = new ResizeObserver(_debounce(500, () => resizeCardSlider()));
  let slider = document.querySelector('body');
  observer.observe(slider);
});





document.addEventListener('DOMContentLoaded', () => {
  const observer = new ResizeObserver(_debounce(500, () => resizeCardSlider()));
  let slider = document.querySelector('body');
  observer.observe(slider);
  const newsCard = document.querySelectorAll('.en-news-slider .en-card-slider-inner-container a');
  const newsTitle = document.querySelectorAll('.en-news-slider-title');
  const newsSummary = document.querySelectorAll('.en-news-slider-summary');

  if (newsCard.length >= 1) {
    newsCard.forEach((element, index) => {
      const newsContainer = document.createElement('div');
      newsContainer.classList.add('news-title-wrapper');
      newsContainer.appendChild(newsTitle[index])
      newsContainer.appendChild(newsSummary[index])
      element.appendChild(newsContainer)
    });
  }
});



$(function(){
		$('.top-level:last-child,#quicklinks li:last-child').css({'background': 'none'});
	
		$('#googleTranslate').wrap('<div id="preGoogle" />');

		$(window).bind("load resize scroll",function(e) {
		var y = $(window).scrollTop(); 

		$("#slide-1").filter(function() {
		return $(this).offset().top < (y + $(window).height()) &&
		  $(this).offset().top + $(this).height() > y;
		}).css('background-position', '50% ' + parseInt(-y / 8+180) + 'px');
		});
	
});

//Login Form Pages
if (window.location.href.indexOf('/apps/account/other/my_classes.jsp') > -1) {
  document.querySelector('body').classList.add('login-form');
}
//Login Form Pages

//Sign Up Pages
if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=130763&type=d') > -1) {
  document.querySelector('body').classList.add('login-form');
}
//Sign Up Pages

if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=126892&type=d&termREC_ID=&pREC_ID=487876') > -1) {
  document.querySelector('body').classList.add('responsive-table-page');
}
if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=126892&type=d&termREC_ID=&pREC_ID=1050213') > -1) {
  document.querySelector('body').classList.add('responsive-table-page');
}
if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=126943&type=d') > -1) {
  document.querySelector('body').classList.add('responsive-table-page');
}
if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=126661&type=d&termREC_ID=&pREC_ID=969430') > -1) {
  document.querySelector('body').classList.add('responsive-table-page');
}
if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=126943&type=d') > -1) {
  document.querySelector('body').classList.add('responsive-table-page-c');
}
if (window.location.href.indexOf('/apps/pages/index.jsp?uREC_ID=330259&type=d') > -1) {
  document.querySelector('body').classList.add('information-parents-page');
}


function updateTextContent() {
  const elements = document.querySelectorAll("nav.en-nav > ul > li ul > li.en-has-submenu > a");
  const screenWidth = window.innerWidth;
  
  elements.forEach(el => {
      if (screenWidth <= 768) {
          el.textContent = el.textContent.replace("►", "");
      } else {
          el.textContent = el.dataset.originalText || el.textContent;
      }
  });
}

function storeOriginalText() {
  document.querySelectorAll("nav.en-nav > ul > li ul > li.en-has-submenu > a").forEach(el => {
      if (!el.dataset.originalText) {
          el.dataset.originalText = el.textContent;
      }
  });
}

// Sayfa yüklendiğinde ve ekran boyutu değiştiğinde çalıştır
window.addEventListener("load", () => {
  storeOriginalText();
  updateTextContent();
});
window.addEventListener("resize", updateTextContent);



class ENResponsiveDiv {
  constructor() {
    throw new Error('ENResponsiveDiv class has been disabled.');
  }
}


