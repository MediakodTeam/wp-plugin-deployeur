/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/styles/main.scss":
/*!*********************************!*\
  !*** ./assets/styles/main.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/styles/main.scss?");

/***/ }),

/***/ "./assets/scripts/deploy/index.ts":
/*!****************************************!*\
  !*** ./assets/scripts/deploy/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/i18n */ \"./assets/scripts/helpers/i18n.ts\");\n/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/modal */ \"./assets/scripts/modules/modal/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\nvar defineFetchMethod = function (hosting) {\n    switch (hosting) {\n        case \"Netlify\":\n            return \"POST\";\n        case \"Vercel\":\n            return \"GET\";\n        default:\n            return \"POST\";\n    }\n};\nvar fetchWebhooks = function (webhook, method) { return __awaiter(void 0, void 0, void 0, function () {\n    var response;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, fetch(webhook, {\n                    method: method,\n                    headers: {\n                        \"Content-Type\": \"application/json\",\n                    },\n                })\n                    .then(function (res) { return res.json(); })\n                    .then(function (data) {\n                    if (data.error) {\n                        return __assign({}, data);\n                    }\n                    return {\n                        success: true,\n                    };\n                })\n                    .catch(function (error) {\n                    console.log(\"⛔️ \", error);\n                    return {\n                        error: \"Unknow error, please check your console\",\n                    };\n                })];\n            case 1:\n                response = _a.sent();\n                return [2 /*return*/, response];\n        }\n    });\n}); };\nwindow.addEventListener(\"load\", function () { return __awaiter(void 0, void 0, void 0, function () {\n    var triggerDeploy, modalSuccess, modalError;\n    return __generator(this, function (_a) {\n        triggerDeploy = document.getElementById(\"trigger-deploy\");\n        if (!triggerDeploy) {\n            return [2 /*return*/];\n        }\n        modalSuccess = new _modules_modal__WEBPACK_IMPORTED_MODULE_1__.Modal({\n            title: (0,_helpers_i18n__WEBPACK_IMPORTED_MODULE_0__.getTranslations)(\"mkd-deploy-success-title\"),\n            content: (0,_helpers_i18n__WEBPACK_IMPORTED_MODULE_0__.getTranslations)(\"mkd-deploy-success\"),\n            type: \"success\",\n        });\n        modalError = new _modules_modal__WEBPACK_IMPORTED_MODULE_1__.Modal({\n            title: (0,_helpers_i18n__WEBPACK_IMPORTED_MODULE_0__.getTranslations)(\"mkd-deploy-error-title\"),\n            content: (0,_helpers_i18n__WEBPACK_IMPORTED_MODULE_0__.getTranslations)(\"mkd-deploy-error\"),\n            type: \"error\",\n        });\n        triggerDeploy.addEventListener(\"click\", function () { return __awaiter(void 0, void 0, void 0, function () {\n            var webhookResponse;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, fetchWebhooks(triggerDeploy.dataset.deployWebhook, defineFetchMethod(triggerDeploy.dataset.deployHosting))];\n                    case 1:\n                        webhookResponse = _a.sent();\n                        if (webhookResponse.error) {\n                            modalError.showModal();\n                        }\n                        if (webhookResponse.success) {\n                            modalSuccess.showModal();\n                        }\n                        return [2 /*return*/];\n                }\n            });\n        }); });\n        return [2 /*return*/];\n    });\n}); });\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/deploy/index.ts?");

/***/ }),

/***/ "./assets/scripts/helpers/i18n.ts":
/*!****************************************!*\
  !*** ./assets/scripts/helpers/i18n.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getTranslations\": () => (/* binding */ getTranslations)\n/* harmony export */ });\nvar getTranslations = function (key) {\n    var _a;\n    var translationsContainer = document.getElementById(\"mkd-translations\");\n    if (!translationsContainer) {\n        return \"\";\n    }\n    return (((_a = translationsContainer.querySelector(\"#\".concat(key))) === null || _a === void 0 ? void 0 : _a.innerHTML) ||\n        \"missing translation for \".concat(key));\n};\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/helpers/i18n.ts?");

/***/ }),

/***/ "./assets/scripts/index.ts":
/*!*********************************!*\
  !*** ./assets/scripts/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.scss */ \"./assets/styles/main.scss\");\n/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ \"./assets/scripts/modules/modal/index.ts\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ \"./assets/scripts/modules/tabs/index.ts\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_tabs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _modules_notices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/notices */ \"./assets/scripts/modules/notices/index.ts\");\n/* harmony import */ var _deploy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deploy */ \"./assets/scripts/deploy/index.ts\");\n// Styles\n\n// Scripts\n\n\n\n\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/index.ts?");

/***/ }),

/***/ "./assets/scripts/modules/modal/index.ts":
/*!***********************************************!*\
  !*** ./assets/scripts/modules/modal/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Modal\": () => (/* binding */ Modal)\n/* harmony export */ });\n/* harmony import */ var _helpers_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/i18n */ \"./assets/scripts/helpers/i18n.ts\");\n\nvar Modal = /** @class */ (function () {\n    function Modal(_a, onConfirm) {\n        var title = _a.title, content = _a.content, type = _a.type, confirmLabelKey = _a.confirmLabelKey;\n        if (onConfirm === void 0) { onConfirm = function () { }; }\n        this.options = {\n            title: title,\n            content: content,\n            type: type,\n            confirmLabelKey: confirmLabelKey,\n        };\n        this.onConfirm = onConfirm;\n        this.modalId = \"mkd-modal-\".concat(Math.floor(Math.random() * 1000));\n        this.createModal();\n    }\n    Modal.prototype.createModal = function () {\n        var _a;\n        var modal = document.createElement(\"div\");\n        modal.id = this.modalId;\n        modal.classList.add(\"fixed\", \"inset-0\", \"z-[112000]\", \"opacity-0\", \"pointer-events-none\", \"flex\", \"items-center\", \"justify-center\", \"transition\");\n        modal.setAttribute(\"role\", \"dialog\");\n        modal.setAttribute(\"aria-modal\", \"true\");\n        var modalOverlay = document.createElement(\"span\");\n        modalOverlay.classList.add(\"absolute\", \"inset-0\", \"bg-black\", \"opacity-50\");\n        var modalWrapper = document.createElement(\"div\");\n        modalWrapper.classList.add(\"relative\", \"overflow-hidden\", \"bg-white\", \"px-4\", \"pt-5\", \"pb-4\", \"text-left\", \"shadow-xl\", \"transition-all\", \"sm:my-8\", \"sm:w-full\", \"sm:max-w-sm\", \"sm:p-6\");\n        modalWrapper.innerHTML = \"\\n\\t\\t<div>\\n      <i class=\\\"mx-auto flex h-12 w-12 items-center justify-center rounded-full \".concat(this.options.type == \"success\"\n            ? \"bg-green-100\"\n            : this.options.type == \"error\"\n                ? \"bg-red-100\"\n                : \"bg-blue-50\", \"\\\">\\n\\n\\t\\t\\t\").concat(this.options.type == \"success\"\n            ? \"<svg class=\\\"h-6 w-6 text-green-600\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"none\\\" viewBox=\\\"0 0 24 24\\\" stroke-width=\\\"1.5\\\" stroke=\\\"currentColor\\\" aria-hidden=\\\"true\\\">\\n\\t\\t\\t\\t<path stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" d=\\\"M4.5 12.75l6 6 9-13.5\\\" />\\n\\t\\t\\t\\t</svg>\"\n            : \"\", \"\\n\\n\\t\\t\\t\").concat(this.options.type == \"error\"\n            ? \"<svg class=\\\"h-6 w-6 text-red-600\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"none\\\" viewBox=\\\"0 0 24 24\\\" stroke-width=\\\"1.5\\\" stroke=\\\"currentColor\\\" class=\\\"w-6 h-6\\\">\\n\\t\\t\\t\\t<path stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" d=\\\"M6 18L18 6M6 6l12 12\\\" />\\n\\t\\t\\t </svg>\\n\\t\\t\\t \"\n            : \"\", \"\\n      </i>\\n\\n      <div class=\\\"mt-3 text-center sm:mt-5\\\">\\n        <h3 class=\\\"text-lg font-medium leading-6 text-gray-900\\\" id=\\\"modal-title\\\">\").concat(this.options.title, \"</h3>\\n        <div class=\\\"mt-2\\\">\\n          <p class=\\\"text-sm text-gray-500\\\">\").concat(this.options.content, \"</p>\\n        </div>\\n      </div>\\n    </div>\");\n        //  mt-5 inline-flex w-full justify-center !bg-blue-500 !px-4 !py-2 !text-base !text-white hover:!bg-blue-600 hover:!text-white\n        this.confirmButton = document.createElement(\"button\");\n        this.confirmButton.classList.add(\"mt-5\", \"inline-flex\", \"w-full\", \"justify-center\", \"!border-none\", \"!bg-blue-500\", \"!px-4\", \"!py-2\", \"!text-base\", \"!text-white\", \"hover:!bg-blue-600\", \"hover:!text-white\", \"!cursor-pointer\");\n        this.confirmButton.innerHTML = (0,_helpers_i18n__WEBPACK_IMPORTED_MODULE_0__.getTranslations)((_a = this.options.confirmLabelKey) !== null && _a !== void 0 ? _a : \"confirm\");\n        this.handleConfirm();\n        modalWrapper.appendChild(this.confirmButton);\n        modal.appendChild(modalOverlay);\n        modal.appendChild(modalWrapper);\n        this.modal = modal;\n        // Append to body\n        document.body.appendChild(this.modal);\n    };\n    Modal.prototype.handleConfirm = function () {\n        var _this = this;\n        this.confirmButton.addEventListener(\"click\", function () {\n            _this.onConfirm();\n            _this.hideModal();\n        });\n    };\n    Modal.prototype.hideModal = function () {\n        this.modal.classList.add(\"opacity-0\");\n        this.modal.classList.add(\"pointer-events-none\");\n    };\n    Modal.prototype.showModal = function () {\n        this.modal.classList.remove(\"opacity-0\");\n        this.modal.classList.remove(\"pointer-events-none\");\n    };\n    return Modal;\n}());\n\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/modules/modal/index.ts?");

/***/ }),

/***/ "./assets/scripts/modules/notices/index.ts":
/*!*************************************************!*\
  !*** ./assets/scripts/modules/notices/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Notice\": () => (/* binding */ Notice)\n/* harmony export */ });\nwindow.addEventListener(\"load\", function () {\n    var notices = document.querySelectorAll(\".mkd-notice\");\n    notices === null || notices === void 0 ? void 0 : notices.forEach(function (notice) {\n        var noticeClose = notice.querySelector(\".mkd-notice__close\");\n        noticeClose.addEventListener(\"click\", function () {\n            notice.remove();\n        });\n    });\n});\nvar Notice = /** @class */ (function () {\n    function Notice(message, type) {\n        var _this = this;\n        this.createElement = function () {\n            var notice = document.createElement(\"div\");\n            notice.classList.add(\"mkd-notice\", _this.type == \"success\" ? \"bg-green\" : \"bg-red-200\", \"rounded-lg\");\n            var noticeContent = document.createElement(\"div\");\n            noticeContent.classList.add(\"flex\", \"flex-wrap\", \"items-center\", \"justify-between\", \"px-3\", \"py-2\", \"sm:px-6\", \"lg:px-8\");\n            var noticeMessage = document.createElement(\"p\");\n            noticeMessage.classList.add(\"text-base\", \"font-bold\", \"text-black\", \"truncate\");\n            noticeMessage.textContent = _this.message;\n            _this.noticeClose = document.createElement(\"button\");\n            _this.noticeClose.classList.add(\"-mr-1\", \"!bg-transparent\", \"!p-2\", \"!appearance-none\", \"flex\", \"rounded-md\", \"!cursor-pointer\", \"!transition\", \"hover:!bg-black\", \"hover:!bg-opacity-10\", \"!border-none\", \"!bg-opacity-10\", \"focus:outline-none\", \"focus:ring-2\", \"focus:ring-white\", \"sm:-mr-2\", \"mkd-notice__close\", \"pointer-events-auto\");\n            var noticeCloseIcon = document.createElement(\"div\");\n            noticeCloseIcon.innerHTML = \"<svg class=\\\"w-6 h-6 text-black\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"none\\\" viewBox=\\\"0 0 24 24\\\" stroke-width=\\\"1.5\\\" stroke=\\\"currentColor\\\" aria-hidden=\\\"true\\\">\\n\\t\\t<path stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" d=\\\"M6 18L18 6M6 6l12 12\\\" />\\n\\t</svg>\";\n            _this.noticeClose.appendChild(noticeCloseIcon);\n            noticeContent.appendChild(noticeMessage);\n            noticeContent.appendChild(_this.noticeClose);\n            notice.appendChild(noticeContent);\n            return notice;\n        };\n        this.show = function () {\n            var wrapper = document.querySelector(\".mkd-notification-center\");\n            if (wrapper)\n                wrapper.appendChild(_this.notice);\n            // Set a timeout to automatically close notification\n            var autoRemove = setTimeout(function () {\n                _this.notice.remove();\n            }, 5000);\n            _this.noticeClose.addEventListener(\"click\", function () {\n                _this.notice.remove();\n                // Clear the timeout\n                autoRemove && clearTimeout(autoRemove);\n            });\n        };\n        this.message = message;\n        this.type = type;\n        this.notice = this.createElement();\n        this.show();\n    }\n    return Notice;\n}());\n\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/modules/notices/index.ts?");

/***/ }),

/***/ "./assets/scripts/modules/tabs/index.ts":
/*!**********************************************!*\
  !*** ./assets/scripts/modules/tabs/index.ts ***!
  \**********************************************/
/***/ (() => {

eval("window.addEventListener(\"load\", function () {\n    var tabsTrigger = document.querySelectorAll(\"button[data-mkd-trigger-tabs-id]\");\n    tabsTrigger === null || tabsTrigger === void 0 ? void 0 : tabsTrigger.forEach(function (tabTrigger) {\n        var tab = document.querySelector(\"[data-mkd-tabs-id=\\\"\".concat(tabTrigger.dataset.mkdTriggerTabsId, \"\\\"]\"));\n        if (tab) {\n            tabTrigger.addEventListener(\"click\", function () {\n                if (tab.classList.contains(\"hidden\")) {\n                    tab.classList.remove(\"hidden\");\n                    tabTrigger.classList.add(\"border-blue\", \"text-blue\");\n                    tabTrigger.classList.remove(\"text-gray-500\", \"hover:text-gray-700\", \"hover:border-gray-300\", \"border-transparent\");\n                    // Close all other tabs\n                    var otherTabs = document.querySelectorAll(\"[data-mkd-tabs-id]:not([data-mkd-tabs-id=\\\"\".concat(tabTrigger.dataset.mkdTriggerTabsId, \"\\\"])\"));\n                    otherTabs === null || otherTabs === void 0 ? void 0 : otherTabs.forEach(function (otherTab) {\n                        otherTab.classList.add(\"hidden\");\n                    });\n                    // Remove active effect on other tabs\n                    var otherTabsTrigger = document.querySelectorAll(\"button[data-mkd-trigger-tabs-id]:not([data-mkd-trigger-tabs-id=\\\"\".concat(tabTrigger.dataset.mkdTriggerTabsId, \"\\\"])\"));\n                    otherTabsTrigger === null || otherTabsTrigger === void 0 ? void 0 : otherTabsTrigger.forEach(function (otherTabTrigger) {\n                        otherTabTrigger.classList.remove(\"border-blue\", \"text-blue\");\n                        otherTabTrigger.classList.add(\"text-gray-500\", \"hover:text-gray-700\", \"hover:border-gray-300\", \"border-transparent\");\n                    });\n                }\n            });\n        }\n    });\n});\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/modules/tabs/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/scripts/index.ts");
/******/ 	
/******/ })()
;