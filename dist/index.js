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
/***/ (function() {

eval("var __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar _this = this;\nvar defineFetchMethod = function (hosting) {\n    switch (hosting) {\n        case \"Netlify\":\n            return \"POST\";\n        case \"Vercel\":\n            return \"GET\";\n        default:\n            return \"POST\";\n    }\n};\nvar fetchWebhooks = function (webhook, method) { return __awaiter(_this, void 0, void 0, function () {\n    var response;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, fetch(webhook, {\n                    method: method,\n                    headers: {\n                        \"Content-Type\": \"application/json\",\n                    },\n                })\n                    .then(function (res) { return res.json(); })\n                    .then(function (data) {\n                    if (data.error) {\n                        return __assign({}, data);\n                    }\n                    return {\n                        success: true,\n                    };\n                })\n                    .catch(function (error) {\n                    console.log(\"⛔️ \", error);\n                    return {\n                        error: \"Unknow error, please check your console\",\n                    };\n                })];\n            case 1:\n                response = _a.sent();\n                return [2 /*return*/, response];\n        }\n    });\n}); };\nwindow.addEventListener(\"load\", function () { return __awaiter(_this, void 0, void 0, function () {\n    var triggerDeploy;\n    var _this = this;\n    return __generator(this, function (_a) {\n        triggerDeploy = document.getElementById(\"trigger-deploy\");\n        if (!triggerDeploy) {\n            return [2 /*return*/];\n        }\n        triggerDeploy.addEventListener(\"click\", function () { return __awaiter(_this, void 0, void 0, function () {\n            var webhookResponse;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, fetchWebhooks(triggerDeploy.dataset.deployWebhook, defineFetchMethod(triggerDeploy.dataset.deployHosting))];\n                    case 1:\n                        webhookResponse = _a.sent();\n                        if (webhookResponse.error) {\n                            alert(\"⛔️ \" + triggerDeploy.dataset.deployError);\n                        }\n                        if (webhookResponse.success) {\n                            alert(\"✅ \" + triggerDeploy.dataset.deploySuccess);\n                        }\n                        return [2 /*return*/];\n                }\n            });\n        }); });\n        return [2 /*return*/];\n    });\n}); });\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/deploy/index.ts?");

/***/ }),

/***/ "./assets/scripts/index.ts":
/*!*********************************!*\
  !*** ./assets/scripts/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.scss */ \"./assets/styles/main.scss\");\n/* harmony import */ var _tabs___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs/ */ \"./assets/scripts/tabs/index.ts\");\n/* harmony import */ var _tabs___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tabs___WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _notices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notices */ \"./assets/scripts/notices/index.ts\");\n/* harmony import */ var _notices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_notices__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _deploy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deploy */ \"./assets/scripts/deploy/index.ts\");\n/* harmony import */ var _deploy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_deploy__WEBPACK_IMPORTED_MODULE_3__);\n// Styles\n\n// Scripts\n\n\n\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/index.ts?");

/***/ }),

/***/ "./assets/scripts/notices/index.ts":
/*!*****************************************!*\
  !*** ./assets/scripts/notices/index.ts ***!
  \*****************************************/
/***/ (() => {

eval("window.addEventListener(\"load\", function () {\n    var notices = document.querySelectorAll(\".mkd-notice\");\n    notices === null || notices === void 0 ? void 0 : notices.forEach(function (notice) {\n        var noticeClose = notice.querySelector(\".mkd-notice__close\");\n        noticeClose.addEventListener(\"click\", function () {\n            notice.remove();\n        });\n    });\n});\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/notices/index.ts?");

/***/ }),

/***/ "./assets/scripts/tabs/index.ts":
/*!**************************************!*\
  !*** ./assets/scripts/tabs/index.ts ***!
  \**************************************/
/***/ (() => {

eval("window.addEventListener(\"load\", function () {\n    var tabsTrigger = document.querySelectorAll(\"button[data-mkd-trigger-tabs-id]\");\n    tabsTrigger === null || tabsTrigger === void 0 ? void 0 : tabsTrigger.forEach(function (tabTrigger) {\n        var tab = document.querySelector(\"[data-mkd-tabs-id=\\\"\".concat(tabTrigger.dataset.mkdTriggerTabsId, \"\\\"]\"));\n        if (tab) {\n            tabTrigger.addEventListener(\"click\", function () {\n                if (tab.classList.contains(\"hidden\")) {\n                    tab.classList.remove(\"hidden\");\n                    tabTrigger.classList.add(\"border-blue\", \"text-blue\");\n                    tabTrigger.classList.remove(\"text-gray-500\", \"hover:text-gray-700\", \"hover:border-gray-300\", \"border-transparent\");\n                    // Close all other tabs\n                    var otherTabs = document.querySelectorAll(\"[data-mkd-tabs-id]:not([data-mkd-tabs-id=\\\"\".concat(tabTrigger.dataset.mkdTriggerTabsId, \"\\\"])\"));\n                    otherTabs === null || otherTabs === void 0 ? void 0 : otherTabs.forEach(function (otherTab) {\n                        otherTab.classList.add(\"hidden\");\n                    });\n                    // Remove active effect on other tabs\n                    var otherTabsTrigger = document.querySelectorAll(\"button[data-mkd-trigger-tabs-id]:not([data-mkd-trigger-tabs-id=\\\"\".concat(tabTrigger.dataset.mkdTriggerTabsId, \"\\\"])\"));\n                    otherTabsTrigger === null || otherTabsTrigger === void 0 ? void 0 : otherTabsTrigger.forEach(function (otherTabTrigger) {\n                        otherTabTrigger.classList.remove(\"border-blue\", \"text-blue\");\n                        otherTabTrigger.classList.add(\"text-gray-500\", \"hover:text-gray-700\", \"hover:border-gray-300\", \"border-transparent\");\n                    });\n                }\n            });\n        }\n    });\n});\n\n\n//# sourceURL=webpack://mk-deployeur/./assets/scripts/tabs/index.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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