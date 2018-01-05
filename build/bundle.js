/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MapWrapper = __webpack_require__(1);
const Modal = __webpack_require__(3);
let countryMap;

const app = function() {
  console.log('App started');
  initialize(48.21, 16.37);
  const modal = new Modal({
    title: "Where on Earth?",
    body: "The ultimate Country and Capital's game!",
    buttons: {
      action: {
        label: "Start Game",
        fn: function(){
          loadQuestion();
          modal.hide();
        }

      }
    }
  });
  modal.show();
};

const initialize = function(lat, lng) {
  let center = { lat, lng };
  let mapDiv = document.getElementById('map');
  countryMap = new MapWrapper(mapDiv, center, 5);
};

const loadQuestion =  function() {
  let question = "Where is.....";
  createCard(question)
}

const createCard = function(question) {
  const title = document.querySelector('.title');
  title.innerHTML = question + "China" + "?";

}




document.addEventListener('DOMContentLoaded', app);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const GoogleMapsLoader = __webpack_require__(2);

const MapWrapper = function(container, coordinates, zoom) {
  GoogleMapsLoader.load(
    function(google) {
      this.google = google; //google object.
      this.googleMap = new google.maps.Map(container, {
        center: coordinates,
        zoom: zoom,
        styles: [
          { elementType: 'labels', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'administrative.land_parcel',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [{ visibility: 'off' }],
          },
          { featureType: 'road', stylers: [{ visibility: 'off' }] },
        ],
      });
      this.marker = null;

      google.maps.event.addListener(this.googleMap, 'click', function(event) {
       if (this.marker) {
        this.marker.setPosition(event.latLng);
       } else {
        this.addMarker(event.latLng);
       }
      }.bind(this));

      // this.googleMap.disableDragging();
      // whenmaploaded();
      // //if this line hits, the map is loaded.
    }.bind(this)
  );
};

MapWrapper.prototype.addMarker = function(coords) {
  this.marker = new this.google.maps.Marker({
    position: {lat: coords.lat(), lng: coords.lng()},
    map: this.googleMap
  });
};

module.exports = MapWrapper;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var googleVersion = '3.18';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var GoogleMapsLoader = {};


	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


	GoogleMapsLoader._googleMockApiObject = {};


	GoogleMapsLoader.load = function(fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};


	GoogleMapsLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};


	GoogleMapsLoader.isLoaded = function() {
		return google !== null;
	};


	GoogleMapsLoader.createUrl = function() {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		return url;
	};


	GoogleMapsLoader.release = function(fn) {
		var release = function() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	GoogleMapsLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	GoogleMapsLoader.makeMock = function() {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function() {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};


	return GoogleMapsLoader;

});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Modal = function(options) {
  this.options = options;
  this.visible = false;
};
Modal.prototype.build = function(data) {
  const modal = document.createElement('div');
  let html = '';
  html += `
    <div class="overlay"></div>
    <div class="modal">
      <div class="modal-close">x</div>
      <div class="modal-header">
        <h1>${data.title}</h1>
      </div>
      <hr/>
      <div class="modal-body">
        ${data.body}
      </div>
  `;
  if (this.options.buttons) {
    html += `<div class="modal-buttons">`;
    if (this.options.buttons.close) {
      html += `
        <button class="modal-button btn-close">
          ${this.options.buttons.close.label}
        </button>`;
    }
    if (this.options.buttons.action) {
      html += `
        <button class="modal-button btn-action">
          ${this.options.buttons.action.label}
        </button>`;
    }
    html += `</div>`;
  }
  html += `</div>`;
  modal.classList.add('modal-wrapper');
  modal.innerHTML = html;
  return modal;
};
Modal.prototype.show = function() {
  if (!this.visible) {
    document.querySelector('body').appendChild(this.build(this.options));
    document.querySelector('.modal-close').addEventListener('click', () => {
      if (this.options.onClose) {
        this.options.onClose();
      } else {
        this.hide();
      }
    });
    
    if (this.options.buttons) {
      if (this.options.buttons.close) {
        document
          .querySelector('.btn-close')
          .addEventListener('click', this.options.buttons.close.fn);
      }
      if (this.options.buttons.action) {
        document
          .querySelector('.btn-action')
          .addEventListener('click', this.options.buttons.action.fn);
      }
    }
    this.visible = true;
  }
};
Modal.prototype.hide = function() {
  if (this.visible) {
    const modal = document.querySelector('.modal');
    modal.parentNode.removeChild(modal);
    const overlay = document.querySelector('.overlay');
    overlay.parentNode.removeChild(overlay);
    this.visible = false;
  }
};
Modal.prototype.toggle = function() {
  this.visible ? this.hide() : this.show();
};
Modal.prototype.set = function(options) {
  this.options = Object.assign({}, this.options, options);
};


module.exports = Modal;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map