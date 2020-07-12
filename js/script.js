// Оживление слайдера в блоке features

var slides = document.querySelectorAll(".slider-list li");
var sliderNext = document.querySelector(".next-slide");
var sliderPrev = document.querySelector(".prev-slide");
var sliderIndicators = document.querySelectorAll(".slider-indicators button");

var sliderCurrent = 0; // текущий слайд

// Клик на кнопку Следующий слайд
if(sliderNext && sliderPrev) {
	sliderNext.addEventListener("click", function () {
		sliderCurrent ++;
		
		if(sliderCurrent >= slides.length) {
			// при достижении последнего слайда переходим на первый
			sliderCurrent = 0;
		}

		for(var i = 0; i < slides.length; i++) {
			if(i == sliderCurrent) {
				slides[i].classList.add("slider-current");
				sliderIndicators[i].classList.add("current");
			} else {
				slides[i].classList.remove("slider-current");
				sliderIndicators[i].classList.remove("current");
			}
		}
	});

	// Клик на кнопку Предыдущий слайд
	sliderPrev.addEventListener("click", function () {
		sliderCurrent --;
		
		if(sliderCurrent < 0) {
			// при достижении первого слайда переходим на последний
			sliderCurrent = slides.length - 1;
		}

		for(var i = 0 ; i < slides.length ; i++) {
			if(i == sliderCurrent) {
				slides[i].classList.add("slider-current");
				sliderIndicators[i].classList.add("current");
			} else {
				slides[i].classList.remove("slider-current");
				sliderIndicators[i].classList.remove("current");
			}
		}
	});
}


// Оживление слайдера в блоке services

var tabDelivery = document.querySelector(".tab-delivery");
var articleDelivery = document.querySelector(".article-delivery");

var tabWarranty = document.querySelector(".tab-warranty");
var articleWarranty = document.querySelector(".article-warranty");

var tabCredit = document.querySelector(".tab-credit");
var articleCredit = document.querySelector(".article-credit");

if(tabDelivery && tabWarranty && tabCredit) {
	// Клик по вкладке Доставка 
	tabDelivery.addEventListener("click", function () {
		tabDelivery.classList.add("services-tabs-current");
		articleDelivery.classList.add("services-article-current");

		tabWarranty.classList.remove("services-tabs-current");
		articleWarranty.classList.remove("services-article-current");

		tabCredit.classList.remove("services-tabs-current");
		articleCredit.classList.remove("services-article-current");
	});

	// Клик по вкладке Гарантия 
	tabWarranty.addEventListener("click", function () {
		tabWarranty.classList.add("services-tabs-current");
		articleWarranty.classList.add("services-article-current");

		tabDelivery.classList.remove("services-tabs-current");
		articleDelivery.classList.remove("services-article-current");

		tabCredit.classList.remove("services-tabs-current");
		articleCredit.classList.remove("services-article-current");
	});

	// Клик по вкладке Кредит 
	tabCredit.addEventListener("click", function () {
		tabCredit.classList.add("services-tabs-current");
		articleCredit.classList.add("services-article-current");

		tabDelivery.classList.remove("services-tabs-current");
		articleDelivery.classList.remove("services-article-current");

		tabWarranty.classList.remove("services-tabs-current");
		articleWarranty.classList.remove("services-article-current");	
	});
}

// for(var i = 0; i < tabs.length; i++) {
// 	tabs[i].addEventListener("click", function () {
// 		tabs[i].classList.toggle("services-article-current");
// 	});
// }


// Модальное окно с формой обратной связи

var contactButton = document.querySelector(".button-contact");
var contactModal = document.querySelector(".modal-contact");

if(contactModal) {
	var contactClose = contactModal.querySelector(".button-close");
	var contactForm = contactModal.querySelector(".contact-form");
	var contactName = contactModal.querySelector(".input-name");
	var contactEmail = contactModal.querySelector(".input-email");
	var contactMessage = contactModal.querySelector(".input-message");

	// Проверка локального хранилища
	var isStorageSupport = true;
	var storageName = "";
	var storageEmail = "";

	try {
	  storageName = localStorage.getItem("name");
	  storageEmail = localStorage.getItem("email");
	} catch (err) {
	  isStorageSupport = false;
	}

	// Клик на кнопку вызова модального окна
	contactButton.addEventListener("click", function (evt) {
		evt.preventDefault();
		contactModal.classList.add("modal-show");
		if (storageName && storageEmail) {
			contactName.value = storageName;
			contactEmail.value = storageEmail;
			contactMessage.focus();
		} else {
			contactName.focus();
		}
	});

	// Клик на кнопку Закрыть
	contactClose.addEventListener("click", function (evt) {
		evt.preventDefault();
		contactModal.classList.remove("modal-show");
		contactModal.classList.remove("modal-error");
	});

	// Обработка отправки формы
	contactForm.addEventListener("submit", function (evt) {
		if (!contactName.value || !contactEmail.value || !contactMessage.value) {
		    evt.preventDefault();
		    contactModal.classList.remove("modal-error");
		    contactModal.offsetWidth = contactModal.offsetWidth;
		    contactModal.classList.add("modal-error");
		} else {
			if (isStorageSupport) {
				localStorage.setItem("name", contactName.value);
				localStorage.setItem("email", contactEmail.value);
			}
		}
	});

	// Нажатие на клавишу Esc
	window.addEventListener("keydown", function (evt) {
	  if (evt.keyCode === 27) {
	    if (contactModal.classList.contains("modal-show")) {
	      evt.preventDefault();
	      contactModal.classList.remove("modal-show");
	      contactModal.classList.remove("modal-error");
	    }
	  }
	});
}


// Модальное окно с интерактивной картой

var mapLink = document.querySelector(".map");
var mapModal = document.querySelector(".modal-map");

if(mapModal) {
	var mapClose = mapModal.querySelector(".button-close");

	// Клик на кнопку вызова модального окна
	mapLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		mapModal.classList.add("modal-show");
	});

	// Клик на кнопку Закрыть
	mapClose.addEventListener("click", function (evt) {
		evt.preventDefault();
		mapModal.classList.remove("modal-show");
	});

	// Нажатие на клавишу Esc
	window.addEventListener("keydown", function (evt) {
		if (evt.keyCode === 27) {
			if (mapModal.classList.contains("modal-show")) {
				evt.preventDefault();
				mapModal.classList.remove("modal-show");
			}
		}
	});
}


// Модальное окно с сообщением о добавлении товара в корзину

var cartLink = document.querySelectorAll(".button-buy");
var cartModal = document.querySelector(".modal-cart");

if(cartModal) {
	var cartClose = cartModal.querySelector(".button-close");
	var cartContinue = cartModal.querySelector(".button-continue");

	// Клик на кнопку Купить в каждой карточке
	for(var i = 0; i < cartLink.length; i++) {
		cartLink[i].addEventListener("click", function (evt) {
		evt.preventDefault();
		cartModal.classList.add("modal-show");
	});
	}

	// Клик на кнопку Закрыть
	cartClose.addEventListener("click", function (evt) {
		evt.preventDefault();
		cartModal.classList.remove("modal-show");
	});

	// Клик на кнопку Продожить покупки тоже закрывает окно
	cartContinue.addEventListener("click", function (evt) {
		evt.preventDefault();
		cartModal.classList.remove("modal-show");
	});

	// Нажатие на клавишу Esc
	window.addEventListener("keydown", function (evt) {
		if (evt.keyCode === 27) {
			if (cartModal.classList.contains("modal-show")) {
				evt.preventDefault();
				cartModal.classList.remove("modal-show");
			}
		}
	});
}