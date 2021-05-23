(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"iCloudMusic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/utils/utils.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.formatHighText = exports.showToast = exports.makeFriendly = exports.formatTime = void 0;var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return "".concat([year, month, day].map(formatNumber).join('/'), " ").concat([hour, minute, second].map(formatNumber).join(':'));
};exports.formatTime = formatTime;

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0".concat(n);
};



var makeFriendly = function makeFriendly(num) {
  if (num >= 100000000) {
    return Math.round(num / 10000000) / 10 + '亿';
  } else if (num >= 10000) {
    return Math.round(num / 1000) / 10 + '万';
  } else {
    return num;
  }
};exports.makeFriendly = makeFriendly;

var showToast = function showToast(_ref) {var title = _ref.title,_ref$icon = _ref.icon,icon = _ref$icon === void 0 ? "none" : _ref$icon,_ref$duration = _ref.duration,duration = _ref$duration === void 0 ? 1500 : _ref$duration;
  uni.showToast({
    title: title,
    icon: icon,
    duration: duration,
    mask: true });

};exports.showToast = showToast;

var formatHighText = function formatHighText(text, highText) {
  if (!highText) return text;
  var reg = new RegExp(highText, 'i');
  return text.replace(reg, "<span style='color:#55aaff'>".concat(hightext, "</span>"));
};exports.formatHighText = formatHighText;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 14:
/*!*************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/vuex/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 8));



var _state = _interopRequireDefault(__webpack_require__(/*! ./state.js */ 15));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations.js */ 16));
var _getters = _interopRequireDefault(__webpack_require__(/*! ./getters.js */ 17));
var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  getters: _getters.default,
  actions: _actions.default });exports.default = _default;

/***/ }),

/***/ 15:
/*!*************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/vuex/state.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  songId: '',
  // 当前播放列表索引
  currentIndex: 0,
  // 控制播放
  isPlay: false,
  // 当前播放列表
  playlist: [],
  // 当前播放事件
  currentTime: 0,
  playMode: 'list',
  BackgroundAudioManager: {},
  lyrics: [] };exports.default = _default;

/***/ }),

/***/ 16:
/*!*****************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/vuex/mutations.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // 暂停
  pause: function pause(state) {
    state.isPlay = false;
  },
  // 播放
  play: function play(state) {
    state.isPlay = true;
  },
  // 上一首
  prev: function prev(state) {
    // 列表循环
    if (state.playMode === 'list' || state.playMode === 'one') {
      if (state.currentIndex === 0) {
        state.currentIndex = state.playlist.length - 1;
      } else {
        state.currentIndex--;
      }
    }
    // 随机播放
    if (state.playMode === 'random') {
      state.currentIndex = Math.floor(Math.random() * state.playlist.length);
    }
    uni.setStorageSync('currentIndex', state.currentIndex);
    this.dispatch('autoPlay');
  },

  // 下一首
  next: function next(state) {
    // 列表循环
    if (state.playMode === 'list' || state.playMode === 'one') {
      if (state.currentIndex === state.playlist.length - 1) {
        state.currentIndex = 0;
      } else {
        state.currentIndex++;
      }
    }
    // 随机播放
    if (state.playMode === 'random') {
      state.currentIndex = Math.floor(Math.random() * state.playlist.length);
    }
    uni.setStorageSync('currentIndex', state.currentIndex);
    this.dispatch('autoPlay');
  },
  // 播放列表
  setPlaylist: function setPlaylist(state, payload) {
    state.playlist = payload.playlist;
    uni.setStorageSync('playlist', payload.playlist);
  },
  // 当前播放时间
  setCurrentTime: function setCurrentTime(state, payload) {
    state.currentTime = payload.currentTime;
    uni.setStorageSync('currentTime', payload.currentTime);
  },
  // 当前播放歌曲的索引
  setCurrentIndex: function setCurrentIndex(state, payload) {
    state.currentIndex = payload.currentIndex;
    uni.setStorageSync('currentIndex', payload.currentIndex);
  },
  // 背景音乐管理器
  setAudioManager: function setAudioManager(state, payload) {
    state.BackgroundAudioManager = payload;
  },
  // 设置歌词
  setLyric: function setLyric(state, payload) {
    state.lyrics = payload.lyrics;
    uni.setStorageSync('lyrics', payload.lyrics);
  },
  // 播放模式
  setPlayMode: function setPlayMode(state, playMode) {
    state.playMode = playMode;
    uni.setStorageSync('playMode', playMode);
  },
  // 设置歌曲播放时间
  setSongPlayTime: function setSongPlayTime(state, payload) {
    // console.log(state.BackgroundAudioManager);
    state.BackgroundAudioManager.seek(payload.currentTime);
    state.currentTime = payload.currentTime;
    state.BackgroundAudioManager.play();
  },
  // 删除播放列表的歌曲
  deletePlaylistSong: function deletePlaylistSong(state, payload) {
    state.playlist.splice(payload.index, 1);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!***************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/vuex/getters.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // 当前歌曲
  currentSong: function currentSong(state) {
    return state.playlist[state.currentIndex];
  } };exports.default = _default;

/***/ }),

/***/ 18:
/*!***************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/vuex/actions.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _index = _interopRequireDefault(__webpack_require__(/*! @/request/index */ 9));
var _utils = __webpack_require__(/*! @/utils/utils */ 10);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =




{
  // 获取歌曲链接
  getSongSrc: function getSongSrc(_ref)



  {var state = _ref.state,getters = _ref.getters,commit = _ref.commit;
    return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var res, _ref3, url;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                // 先停止
                state.BackgroundAudioManager.stop();if (!
                getters.currentSong.url) {_context.next = 4;break;}
                resolve(getters.currentSong.url);return _context.abrupt("return");case 4:_context.next = 6;return (




                  (0, _index.default)({
                    url: '/song/url',
                    data: {
                      id: getters.currentSong.id,
                      br: 320000 } }));case 6:res = _context.sent;if (!(



                res.data.code !== 200)) {_context.next = 10;break;}
                reject('获取链接失败');return _context.abrupt("return");case 10:_ref3 =





                res.data.data[0] || "", url = _ref3.url;

                // // 如果当前歌曲播放不了 
                if (!url) {
                  reject('当前音乐不能播放,自动跳过');
                } else {
                  resolve(url);
                }case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2) {return _ref2.apply(this, arguments);};}());

  },
  // 获取歌词
  getLyric: function getLyric(_ref4)



  {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var state, getters, commit, lyric;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:state = _ref4.state, getters = _ref4.getters, commit = _ref4.commit;_context2.next = 3;return (

                (0, _index.default)({
                  url: '/lyric',
                  data: {
                    id: getters.currentSong.id } }));case 3:lyric = _context2.sent;


              // 判断当前歌曲是否有歌词 没有的话清空上一首的
              if (lyric.data.lrc) {
                _this.dispatch('parseLyric', lyric.data.lrc.lyric);
              } else {
                commit('setLyric', {
                  lyrics: [],
                  times: [] });

              }case 5:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  // 解析歌词
  parseLyric: function parseLyric(_ref5,

  text) {var commit = _ref5.commit;
    var lyrics = [];
    var lrcArr = text.split("\n");
    var timeReg = /\[(\d*:\d*\.\d*)\]/g;
    lrcArr.forEach(function (lrc) {
      // 用正则匹配时间
      var _times = lrc.match(timeReg);
      // 歌词
      var lyric = lrc.replace(timeReg, '').trim();
      // 过滤掉非歌词部分
      if (_times !== null && lyric) {
        _times.forEach(function (item) {
          var min = Number(String(item.match(/\[\d{2}/i)).slice(1));
          var sec = parseFloat(String(item.match(/\d{2}\.\d{2}/i)));
          //换算时间，保留两位小数
          var time = Math.round((min * 60 + sec) * 100) / 100;
          //把时间和对应的歌词保存到数组
          lyrics.push({
            time: time,
            lyric: lyric });

        });

      }
    });
    //重新按时间排序
    lyrics.sort(function (a, b) {
      return a.time - b.time;
    });
    // 最后添加一个最大的数 用于歌词比较
    lyrics.push({
      time: Number.MAX_SAFE_INTEGER });


    commit('setLyric', {
      lyrics: lyrics });

  },
  // 监听用户 播放操作
  switchPlaySong: function switchPlaySong(_ref6)



  {var state = _ref6.state,commit = _ref6.commit,getters = _ref6.getters;
    // 如果没有链接
    if (!state.BackgroundAudioManager.src) {
      if (getters.currentSong.url) {
        state.BackgroundAudioManager.src = getters.currentSong.url;
        state.BackgroundAudioManager.title = getters.currentSong.name;
        state.BackgroundAudioManager.seek(state.currentTime);
      } else {
        this.dispatch('getSongSrc').then(function (res) {
          state.BackgroundAudioManager.src = res;
          state.BackgroundAudioManager.title = getters.currentSong.name;
          state.BackgroundAudioManager.seek(state.currentTime);
        });
      }
    }

    state.BackgroundAudioManager.play();
    commit('play');
  },
  // 监听用户 暂停操作
  switchPauseSong: function switchPauseSong(_ref7)


  {var state = _ref7.state,commit = _ref7.commit;
    state.BackgroundAudioManager.pause();
    commit('pause');
  },
  autoPlay: function autoPlay(_ref8)



  {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var commit, getters, state, _yield$_this2$dispatc, _yield$_this2$dispatc2, err, url;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:commit = _ref8.commit, getters = _ref8.getters, state = _ref8.state;_context3.next = 3;return (
                _this2.dispatch('getSongSrc').then(function (res) {return [null, res];}).catch(function (err) {return [err, null];}));case 3:_yield$_this2$dispatc = _context3.sent;_yield$_this2$dispatc2 = _slicedToArray(_yield$_this2$dispatc, 2);err = _yield$_this2$dispatc2[0];url = _yield$_this2$dispatc2[1];if (!

              err) {_context3.next = 11;break;}
              (0, _utils.showToast)({
                title: err });

              commit('next');return _context3.abrupt("return");case 11:


              getters.currentSong.url = url;
              state.BackgroundAudioManager.src = url;
              state.BackgroundAudioManager.title = getters.currentSong.name;
              commit('play');
              _this2.dispatch('getLyric');case 16:case "end":return _context3.stop();}}}, _callee3);}))();
  } };exports.default = _default;

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"iCloudMusic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"iCloudMusic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"iCloudMusic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"iCloudMusic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 223:
/*!***********************************************************************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 252:
/*!*************************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/static/images/heijiao.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**********************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/pages.json ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 8:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 9:
/*!****************************************************************!*\
  !*** D:/code/uni-app/iCloudMusic/iCloudMusic/request/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = request;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var bese_url = 'http://192.168.1.14:5000';

function request(params) {

  var CookieSrt = uni.getStorageSync('Cookie');
  if (CookieSrt) {

    CookieSrt = CookieSrt.split(";").find(function (item) {return item.indexOf("MUSIC_U") !== -1;});

    if (CookieSrt && params.header && Object.keys(params.header).length > 0) {
      params.header.Cookie = CookieSrt;
    } else if (CookieSrt) {
      params.header = {
        Cookie: CookieSrt };

    }
  }


  // if (params.data && Object.keys(params.data).length > 0) {
  //   params.data.proxy = 'your-proxy'
  // } else {
  //   params.data = {
  //     proxy: 'your-proxy'
  //   }
  // }
  return new Promise(function (resolve, reject) {
    uni.request(_objectSpread(_objectSpread({},
    params), {}, {
      url: bese_url + params.url,
      success: function success(result) {
        resolve(result);
      },
      fail: function fail(err) {
        reject(err);
      } }));

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map