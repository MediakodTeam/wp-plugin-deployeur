/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 536:
/***/ (() => {

window.addEventListener("load", function () {
    var tabsTrigger = document.querySelectorAll("button[data-mkd-trigger-tabs-id]");
    tabsTrigger === null || tabsTrigger === void 0 ? void 0 : tabsTrigger.forEach(function (tabTrigger) {
        var tab = document.querySelector("[data-mkd-tabs-id=\"".concat(tabTrigger.dataset.mkdTriggerTabsId, "\"]"));
        if (tab) {
            tabTrigger.addEventListener("click", function () {
                if (tab.classList.contains("hidden")) {
                    tab.classList.remove("hidden");
                    tabTrigger.classList.add("border-blue", "text-blue");
                    tabTrigger.classList.remove("text-gray-500", "hover:text-gray-700", "hover:border-gray-300", "border-transparent");
                    // Close all other tabs
                    var otherTabs = document.querySelectorAll("[data-mkd-tabs-id]:not([data-mkd-tabs-id=\"".concat(tabTrigger.dataset.mkdTriggerTabsId, "\"])"));
                    otherTabs === null || otherTabs === void 0 ? void 0 : otherTabs.forEach(function (otherTab) {
                        otherTab.classList.add("hidden");
                    });
                    // Remove active effect on other tabs
                    var otherTabsTrigger = document.querySelectorAll("button[data-mkd-trigger-tabs-id]:not([data-mkd-trigger-tabs-id=\"".concat(tabTrigger.dataset.mkdTriggerTabsId, "\"])"));
                    otherTabsTrigger === null || otherTabsTrigger === void 0 ? void 0 : otherTabsTrigger.forEach(function (otherTabTrigger) {
                        otherTabTrigger.classList.remove("border-blue", "text-blue");
                        otherTabTrigger.classList.add("text-gray-500", "hover:text-gray-700", "hover:border-gray-300", "border-transparent");
                    });
                }
            });
        }
    });
});


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./assets/scripts/helpers/i18n.ts
var getTranslations = function (key) {
    var _a;
    var translationsContainer = document.getElementById("mkd-translations");
    if (!translationsContainer) {
        return "";
    }
    return (((_a = translationsContainer.querySelector("#".concat(key))) === null || _a === void 0 ? void 0 : _a.innerHTML) ||
        "missing translation for ".concat(key));
};

;// CONCATENATED MODULE: ./assets/scripts/modules/modal/index.ts

var Modal = /** @class */ (function () {
    function Modal(_a, onConfirm, onCancel) {
        var title = _a.title, content = _a.content, type = _a.type, confirmLabelKey = _a.confirmLabelKey, cancelLabelKey = _a.cancelLabelKey, _b = _a.hideConfirmButton, hideConfirmButton = _b === void 0 ? false : _b;
        if (onConfirm === void 0) { onConfirm = function () { }; }
        this.options = {
            title: title,
            content: content,
            type: type,
            confirmLabelKey: confirmLabelKey,
            cancelLabelKey: cancelLabelKey,
            hideConfirmButton: hideConfirmButton,
        };
        this.onConfirm = onConfirm;
        this.onCancel = onCancel;
        this.modalId = "mkd-modal-".concat(Math.floor(Math.random() * 1000));
        this.createModal();
    }
    Modal.prototype.createModal = function () {
        var _this = this;
        var _a, _b;
        var modal = document.createElement("div");
        modal.id = this.modalId;
        modal.classList.add("fixed", "inset-0", "z-[112000]", "opacity-0", "pointer-events-none", "flex", "items-center", "justify-center", "transition");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        var modalOverlay = document.createElement("span");
        modalOverlay.classList.add("absolute", "inset-0", "bg-black", "opacity-50");
        modalOverlay.addEventListener("click", function () { return _this.hideModal(); });
        var modalWrapper = document.createElement("div");
        modalWrapper.classList.add("relative", "overflow-hidden", "bg-white", "px-4", "pt-5", "pb-4", "text-left", "shadow-xl", "transition-all", "sm:my-8", "sm:w-full", "sm:max-w-sm", "sm:p-6");
        modalWrapper.innerHTML = "\n\t\t<div>\n      <i class=\"mx-auto flex h-12 w-12 items-center justify-center rounded-full ".concat(this.options.type == "success"
            ? "bg-green-100"
            : this.options.type == "error"
                ? "bg-red-100"
                : "bg-blue-50 bg-opacity-50", "\">\n\n\t\t\t").concat(this.options.type == "success"
            ? "<svg class=\"h-6 w-6 text-green-600\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" aria-hidden=\"true\">\n\t\t\t\t<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 12.75l6 6 9-13.5\" />\n\t\t\t\t</svg>"
            : "", "\n\n\t\t\t").concat(this.options.type == "error"
            ? "<svg class=\"h-6 w-6 text-red-600\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\">\n\t\t\t\t<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\" />\n\t\t\t </svg>\n\t\t\t "
            : "", "\n\n\t\t\t").concat(this.options.type == "info"
            ? "<svg class=\"h-6 w-6 text-blue\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\">\n\t\t<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z\" />\n\t </svg>\n\t "
            : "", "\n      </i>\n\n      <div class=\"mt-3 text-center sm:mt-5\">\n        <h3 class=\"text-lg font-medium leading-6 text-gray-900\" id=\"modal-title\">").concat(this.options.title, "</h3>\n        <div class=\"mt-2\">\n          <p class=\"text-sm text-gray-500\">").concat(this.options.content, "</p>\n        </div>\n      </div>\n    </div>");
        if (!this.options.hideConfirmButton) {
            var buttonWrapper = document.createElement("div");
            buttonWrapper.classList.add("mt-5", "sm:mt-6", "flex", "flex-col", "gap-2");
            if (this.onCancel) {
                this.cancelButton = document.createElement("button");
                this.cancelButton.classList.add("flex", "w-full", "justify-center", "!border-none", "!bg-gray-200", "!px-4", "!py-2", "!text-base", "!text-gray-700", "hover:!bg-gray-300", "hover:!text-gray-700", "!cursor-pointer");
                this.cancelButton.innerHTML = getTranslations((_a = this.options.cancelLabelKey) !== null && _a !== void 0 ? _a : "cancel");
                this.handleCancel();
                buttonWrapper.appendChild(this.cancelButton);
            }
            this.confirmButton = document.createElement("button");
            this.confirmButton.classList.add("flex", "w-full", "justify-center", "!border-none", "!bg-blue-500", "!px-4", "!py-2", "!text-base", "!text-white", "hover:!bg-blue-600", "hover:!text-white", "!cursor-pointer");
            this.confirmButton.innerHTML = getTranslations((_b = this.options.confirmLabelKey) !== null && _b !== void 0 ? _b : "confirm");
            this.handleConfirm();
            buttonWrapper.appendChild(this.confirmButton);
            modalWrapper.appendChild(buttonWrapper);
        }
        modal.appendChild(modalOverlay);
        modal.appendChild(modalWrapper);
        this.modal = modal;
        // Append to body
        document.body.appendChild(this.modal);
    };
    Modal.prototype.handleConfirm = function () {
        var _this = this;
        this.confirmButton.addEventListener("click", function () {
            _this.onConfirm();
            _this.hideModal();
        });
    };
    Modal.prototype.handleCancel = function () {
        var _this = this;
        this.cancelButton.addEventListener("click", function () {
            if (_this.onCancel && typeof _this.onCancel === "function") {
                _this.onCancel();
            }
            _this.hideModal();
        });
    };
    Modal.prototype.hideModal = function () {
        this.modal.classList.add("opacity-0");
        this.modal.classList.add("pointer-events-none");
    };
    Modal.prototype.showModal = function () {
        this.modal.classList.remove("opacity-0");
        this.modal.classList.remove("pointer-events-none");
    };
    return Modal;
}());


// EXTERNAL MODULE: ./assets/scripts/modules/tabs/index.ts
var tabs = __webpack_require__(536);
;// CONCATENATED MODULE: ./assets/scripts/modules/notices/index.ts
window.addEventListener("load", function () {
    var notices = document.querySelectorAll(".mkd-notice");
    notices === null || notices === void 0 ? void 0 : notices.forEach(function (notice) {
        var noticeClose = notice.querySelector(".mkd-notice__close");
        noticeClose.addEventListener("click", function () {
            notice.remove();
        });
    });
});
var Notice = /** @class */ (function () {
    function Notice(message, type) {
        var _this = this;
        this.createElement = function () {
            var notice = document.createElement("div");
            notice.classList.add("mkd-notice", _this.type == "success" ? "bg-green" : "bg-red-200", "rounded-lg");
            var noticeContent = document.createElement("div");
            noticeContent.classList.add("flex", "flex-wrap", "items-center", "justify-between", "px-3", "py-2", "sm:px-6", "lg:px-8");
            var noticeMessage = document.createElement("p");
            noticeMessage.classList.add("text-base", "font-bold", "text-black", "truncate");
            noticeMessage.textContent = _this.message;
            _this.noticeClose = document.createElement("button");
            _this.noticeClose.classList.add("-mr-1", "!bg-transparent", "!p-2", "!appearance-none", "flex", "rounded-md", "!cursor-pointer", "!transition", "hover:!bg-black", "hover:!bg-opacity-10", "!border-none", "!bg-opacity-10", "focus:outline-none", "focus:ring-2", "focus:ring-white", "sm:-mr-2", "mkd-notice__close", "pointer-events-auto");
            var noticeCloseIcon = document.createElement("div");
            noticeCloseIcon.innerHTML = "<svg class=\"w-6 h-6 text-black\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" aria-hidden=\"true\">\n\t\t<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\" />\n\t</svg>";
            _this.noticeClose.appendChild(noticeCloseIcon);
            noticeContent.appendChild(noticeMessage);
            noticeContent.appendChild(_this.noticeClose);
            notice.appendChild(noticeContent);
            return notice;
        };
        this.show = function () {
            var wrapper = document.querySelector(".mkd-notification-center");
            if (wrapper)
                wrapper.appendChild(_this.notice);
            // Set a timeout to automatically close notification
            var autoRemove = setTimeout(function () {
                _this.notice.remove();
            }, 5000);
            _this.noticeClose.addEventListener("click", function () {
                _this.notice.remove();
                // Clear the timeout
                autoRemove && clearTimeout(autoRemove);
            });
        };
        this.message = message;
        this.type = type;
        this.notice = this.createElement();
        this.show();
    }
    return Notice;
}());


;// CONCATENATED MODULE: ./assets/scripts/deploy/index.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var defineFetchMethod = function (hosting) {
    switch (hosting) {
        case "Netlify":
            return "POST";
        case "Vercel":
            return "GET";
        default:
            return "POST";
    }
};
var fetchWebhooks = function (webhook, method) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(webhook, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    if (data.error) {
                        return __assign({}, data);
                    }
                    return {
                        success: true,
                    };
                })
                    .catch(function (error) {
                    console.log("⛔️ ", error);
                    return {
                        error: "Unknow error, please check your console",
                    };
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var handleDeployTrigger = function () {
    // Handle deploy button
    var triggerDeploy = document.getElementById("trigger-deploy");
    if (!triggerDeploy) {
        return;
    }
    var modalLoading = new Modal({
        title: getTranslations("loading"),
        content: getTranslations("deploy-loading"),
        type: "info",
        hideConfirmButton: true,
    });
    var modalSuccess = new Modal({
        title: getTranslations("success"),
        content: getTranslations("deploy-success"),
        type: "success",
    });
    var modalError = new Modal({
        title: getTranslations("error"),
        content: getTranslations("deploy-error"),
        type: "error",
    });
    var ajaxURL = triggerDeploy.dataset.ajaxUrl;
    triggerDeploy.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
        var webhookResponse, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modalLoading.showModal();
                    return [4 /*yield*/, fetchWebhooks(triggerDeploy.dataset.deployWebhook, defineFetchMethod(triggerDeploy.dataset.deployHosting))];
                case 1:
                    webhookResponse = _a.sent();
                    data = {
                        action: "mkd_log_history",
                        status: webhookResponse.success ? "success" : "error",
                        webhooks: triggerDeploy.dataset.deployWebhook,
                    };
                    // Log deploy trigger into db
                    return [4 /*yield*/, fetch(ajaxURL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Cache-Control": "no-cache",
                            },
                            body: new URLSearchParams(data),
                        })];
                case 2:
                    // Log deploy trigger into db
                    _a.sent();
                    modalLoading.hideModal();
                    if (webhookResponse.error) {
                        modalError.showModal();
                    }
                    if (webhookResponse.success) {
                        modalSuccess.showModal();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
var handleClearHistory = function () {
    // Handle clear history
    var clearHistory = document.getElementById("clear-history");
    if (!clearHistory) {
        return;
    }
    var modalConfirmClear = new Modal({
        title: getTranslations("confirm-clear"),
        content: getTranslations("confirm-clear-content"),
        type: "warning",
    }, function () { return __awaiter(void 0, void 0, void 0, function () {
        var ajaxURL, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Clear history now");
                    ajaxURL = clearHistory.dataset.ajaxUrl;
                    data = {
                        action: "mkd_clear_history",
                    };
                    return [4 /*yield*/, fetch(ajaxURL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Cache-Control": "no-cache",
                            },
                            body: new URLSearchParams(data),
                        })];
                case 1:
                    _a.sent();
                    // Reload the page
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    }); }, function () { });
    clearHistory.addEventListener("click", function () {
        modalConfirmClear.showModal();
    });
};
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        handleDeployTrigger();
        handleClearHistory();
        return [2 /*return*/];
    });
}); });

;// CONCATENATED MODULE: ./assets/scripts/index.ts
// Styles

// Scripts





})();

/******/ })()
;