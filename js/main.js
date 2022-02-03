'use strict';

(function () {

  var cbForm = document.querySelector('form');
  var cbPhone = cbForm.querySelector('#phone');
  var cbName = cbForm.querySelector('#username');
  var MIN_NAME_LENGTH = 4;
  var MAX_NAME_LENGTH = 30;
  var numbers = /^[\d\+ ]*$/;

  var onPhoneInput = function (evt) {
    var valueLength = evt.target.value.length;
    if (!evt.target.value.match(numbers)) {
      evt.target.setCustomValidity('Только числовые значения');
    } else if (evt.target.validity.patternMismatch) {
      evt.target.setCustomValidity('Пример ввода:  8 925 333 22 22');
    } else if (valueLength < 1) {
      evt.target.setCustomValidity('Это поле обязательно для заполнения');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var onNameInput = function (evt) {
    var valueLength = evt.target.value.length;
    if (valueLength < 1) {
      evt.target.setCustomValidity('Это поле обязательно для заполнения');
    } else if (valueLength < MIN_NAME_LENGTH) {
      evt.target.setCustomValidity('Минимальная длина ввода: 4 символов. Введите ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      evt.target.setCustomValidity('Максимальная длина ввода: 30 символов. Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      evt.target.setCustomValidity('');
    }
  };


  cbPhone.addEventListener('input', onPhoneInput);
  cbName.addEventListener('input', onNameInput);

})();

'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapContainer = document.querySelector('.map__container');

  if (mapContainer) {
    mapBlock.classList.remove('map--no-js');

    var myMap = document.createElement('script');
    myMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBk6uBmJpjAaLIfkYjehWvMqWQktKwuESw&language=ru&callback=initMap';
    myMap.defer = true;
    myMap.async = true;
    myMap.type = 'text/javascript';

    window.initMap = function () {
      var map = new window.google.maps.Map(mapContainer, {
        center: {lat: 59.938635, lng: 30.323118},
        zoom: 15.5,
        disableDefaultUI: true,
      });
      return map;
    };
    document.head.appendChild(myMap);
  }


})();

'use strict';

(function () {

  var page = document.querySelector('.page');
  var pageContainer = page.querySelector('.page-header');
  var navBar = page.querySelector('.menu-bar');
  var navBtn = page.querySelector('.menu-bar__toggle');
  var navLogo = page.querySelector('.menu-bar__logo');
  var siteList = page.querySelector('.main-nav__list');
  var navLinks = page.querySelectorAll('.main-nav__link');

  var onMenuOpen = function () {
    pageContainer.classList.remove('page-header--js');
    navBar.classList.remove('menu-bar--closed');
    navLogo.classList.add('menu-bar__logo--hidden');
    navBtn.classList.add('menu-bar__toggle--open');
    siteList.classList.add('main-nav__list--js');
    navBar.classList.add('menu-bar--open');
    page.classList.add('page--lock');
  };


  var onMenuClose = function () {
    navLogo.classList.remove('menu-bar__logo--hidden');
    page.classList.remove('page--lock');
    navBtn.classList.remove('menu-bar__toggle--open');
    siteList.classList.remove('main-nav__list--js');
    navBar.classList.remove('menu-bar--open');
    pageContainer.classList.add('page-header--js');
    navBar.classList.add('menu-bar--closed');

    for (var j = 0; j < navLinks.length; j++) {
      navLinks[j].removeEventListener('click', onMenuClose);
    }
  };

  var setMainNavActive = function () {
    if (pageContainer) {
      pageContainer.classList.add('page-header--js');
    }

    if (navBtn) {
      navBtn.classList.remove('menu-bar__toggle--hidden');
      navBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (navBtn.classList.contains('menu-bar__toggle--open')) {
          onMenuClose();
        } else {
          onMenuOpen();
          if (siteList.classList.contains('main-nav__list--js') && navLinks.length > 0) {
            for (var i = 0; i < navLinks.length; i++) {
              navLinks[i].addEventListener('click', onMenuClose);
            }
          }
        }
      });
    }
  };

  setMainNavActive();
})();
