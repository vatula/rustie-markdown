(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(1)['default'];

	var _createClass = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _Object$defineProperty = __webpack_require__(7)['default'];

	var _regeneratorRuntime = __webpack_require__(10)['default'];

	var _Object$keys = __webpack_require__(50)['default'];

	var _interopRequireDefault = __webpack_require__(53)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _rustie = __webpack_require__(54);

	var _marked = __webpack_require__(55);

	var _marked2 = _interopRequireDefault(_marked);

	/* TODO utilities are also plugins.
	 Like, utilities.strings.{toUint8, fromUint8} etc
	 utilities can serve as a dependency for plugins
	 utilities can depend on other utilities
	*/

	function uint8ToString(u8a) {
	  var CHUNK_SIZE = 32768;
	  var c = [];
	  for (var i = 0, j = u8a.length; i < j; i += CHUNK_SIZE) {
	    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SIZE)));
	  }
	  return c.join('');
	}

	function stringToUint8(str) {
	  var result = new Uint8Array(str.length);
	  for (var i = 0, j = str.length; i < j; ++i) {
	    result[i] = str.charCodeAt(i);
	  }
	  return result;
	}

	var Markdown = (function (_Plugin) {
	  function Markdown() {
	    _classCallCheck(this, Markdown);

	    if (_Plugin != null) {
	      _Plugin.apply(this, arguments);
	    }
	  }

	  _inherits(Markdown, _Plugin);

	  _createClass(Markdown, [{
	    key: 'process',
	    value: function process(files) {
	      return _regeneratorRuntime.async(function process$(context$2$0) {
	        while (1) switch (context$2$0.prev = context$2$0.next) {
	          case 0:
	            _Object$keys(files).forEach(function (path) {
	              var file = files[path];
	              var contentString = uint8ToString(file.content);
	              file.content = stringToUint8((0, _marked2['default'])(contentString));
	            });
	            return context$2$0.abrupt('return', files);

	          case 2:
	          case 'end':
	            return context$2$0.stop();
	        }
	      }, null, this);
	    }
	  }]);

	  return Markdown;
	})(_rustie.Plugin);

	exports.Markdown = Markdown;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(2)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(5)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(7)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(11);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  delete g.regeneratorRuntime;
	}

	module.exports = { "default": module.exports, __esModule: true };

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	"use strict";

	var _Symbol = __webpack_require__(13)["default"];

	var _Symbol$iterator = __webpack_require__(26)["default"];

	var _Object$create = __webpack_require__(2)["default"];

	var _Promise = __webpack_require__(35)["default"];

	!(function (global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";

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
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = _Object$create((outerFn || Generator).prototype);

	    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));

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

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };

	  runtime.mark = function (genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = _Object$create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument ? _Promise.resolve(value.arg).then(invokeNext, invokeThrow) : result;
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;

	    function enqueue(method, arg) {
	      var enqueueResult =
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
	      previousPromise ? previousPromise.then(function () {
	        return invoke(method, arg);
	      }) : new _Promise(function (resolve) {
	        resolve(invoke(method, arg));
	      });

	      // Avoid propagating enqueueResult failures to Promises returned by
	      // later invocations of the iterator, and call generator.return() to
	      // allow the generator a chance to clean up.
	      previousPromise = enqueueResult["catch"](invokeReturn);

	      return enqueueResult;
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
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
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function () {
	    return this;
	  };

	  Gp.toString = function () {
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
	    this.reset();
	  }

	  runtime.keys = function (object) {
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
	        var i = -1,
	            next = function next() {
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

	    reset: function reset() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
	        this[tempName] = null;
	      }
	    },

	    stop: function stop() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
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

	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function _catch(tryLoc) {
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

	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(12)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	module.exports = __webpack_require__(4).core.Symbol;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(4)
	  , setTag   = __webpack_require__(16).set
	  , uid      = __webpack_require__(19)
	  , shared   = __webpack_require__(18)
	  , $def     = __webpack_require__(20)
	  , $redef   = __webpack_require__(21)
	  , keyOf    = __webpack_require__(22)
	  , enumKeys = __webpack_require__(23)
	  , assertObject = __webpack_require__(24).obj
	  , ObjectProto = Object.prototype
	  , DESC     = $.DESC
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , $names   = __webpack_require__(25)
	  , getNames = $names.get
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , _propertyIsEnumerable = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols = shared('symbols')
	  , useNative = $.isFunction($Symbol);

	var setSymbolDesc = DESC ? function(){ // fallback for old Android
	  try {
	    return $create(setDesc({}, HIDDEN, {
	      get: function(){
	        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
	      }
	    }))[HIDDEN] || setDesc;
	  } catch(e){
	    return function(it, key, D){
	      var protoDesc = getDesc(ObjectProto, key);
	      if(protoDesc)delete ObjectProto[key];
	      setDesc(it, key, D);
	      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	    };
	  }
	}() : setDesc;

	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}

	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = $create(D, {enumerable: desc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function propertyIsEnumerable(key){
	  var E = _propertyIsEnumerable.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });

	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = $names.get = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;

	  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(17)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);

	setter = true;

	$def($def.G + $def.W, {Symbol: $Symbol});

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , TAG      = __webpack_require__(17)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4).g
	  , store  = __webpack_require__(18)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(19).safe('Symbol.' + name));
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || $.hide($.g, SHARED, {})[SHARED];
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(4).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).hide;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(4)
	  , toString = {}.toString
	  , getNames = $.getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(27), __esModule: true };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	__webpack_require__(32);
	module.exports = __webpack_require__(17)('iterator');

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(4).set
	  , $at   = __webpack_require__(29)(true)
	  , ITER  = __webpack_require__(19).safe('iter')
	  , $iter = __webpack_require__(30)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(31)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(4);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(4)
	  , cof               = __webpack_require__(16)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(24)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(17)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(18)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(20)
	  , $redef          = __webpack_require__(21)
	  , $               = __webpack_require__(4)
	  , cof             = __webpack_require__(16)
	  , $iter           = __webpack_require__(30)
	  , SYMBOL_ITERATOR = __webpack_require__(17)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	var $           = __webpack_require__(4)
	  , Iterators   = __webpack_require__(30).Iterators
	  , ITERATOR    = __webpack_require__(17)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , setUnscope = __webpack_require__(34)
	  , ITER       = __webpack_require__(19).safe('iter')
	  , $iter      = __webpack_require__(30)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(31)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var $           = __webpack_require__(4)
	  , UNSCOPABLES = __webpack_require__(17)('unscopables');
	if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  if($.FW)[][UNSCOPABLES][key] = true;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(28);
	__webpack_require__(32);
	__webpack_require__(38);
	module.exports = __webpack_require__(4).core.Promise;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(16)
	  , tmp = {};
	tmp[__webpack_require__(17)('toStringTag')] = 'z';
	if(__webpack_require__(4).FW && cof(tmp) != 'z'){
	  __webpack_require__(21)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(4)
	  , ctx      = __webpack_require__(40)
	  , cof      = __webpack_require__(16)
	  , $def     = __webpack_require__(20)
	  , assert   = __webpack_require__(24)
	  , forOf    = __webpack_require__(41)
	  , setProto = __webpack_require__(43).set
	  , same     = __webpack_require__(39)
	  , species  = __webpack_require__(44)
	  , SPECIES  = __webpack_require__(17)('species')
	  , RECORD   = __webpack_require__(19).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , asap     = process && process.nextTick || __webpack_require__(45).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj
	  , Wrapper;

	function testResolve(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	}

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	function isPromise(it){
	  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
	}
	function sameConstructor(a, b){
	  // library wrapper special case
	  if(!$.FW && a === P && b === Wrapper)return true;
	  return same(a, b);
	}
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  if(chain.length)asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    asap(function(){
	      if(isUnhandled(promise = record.p)){
	        if(cof(process) == 'process'){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && isFunction(console.error)){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then, wrapper;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      wrapper = {r: record, d: false}; // wrap
	      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(err){
	    $reject.call(wrapper || {r: record, d: false}, err); // wrap
	  }
	}

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(48)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species(Wrapper = $.core[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(49)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(24).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(40)
	  , get  = __webpack_require__(30).get
	  , call = __webpack_require__(42);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(24).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(4)
	  , assert = __webpack_require__(24);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(40)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(4)
	  , SPECIES = __webpack_require__(17)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(4)
	  , ctx    = __webpack_require__(40)
	  , cof    = __webpack_require__(16)
	  , invoke = __webpack_require__(46)
	  , cel    = __webpack_require__(47)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , postMessage        = global.postMessage
	  , addEventListener   = global.addEventListener
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    };
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(21);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(17)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	module.exports = __webpack_require__(4).core.Object.keys;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , $def     = __webpack_require__(20)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(25).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else {
			var a = factory();
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _Object$defineProperty = __webpack_require__(1)['default'];

		_Object$defineProperty(exports, '__esModule', {
		  value: true
		});

		var _errors = __webpack_require__(5);

		var _rustie = __webpack_require__(15);

		var _plugin = __webpack_require__(61);

		var _dalReader = __webpack_require__(62);

		var _dalWriter = __webpack_require__(63);

		var _data = __webpack_require__(64);

		exports.Rustie = _rustie.Rustie;
		exports.RustieAbstractClassError = _errors.RustieAbstractClassError;
		exports.Data = _data.Data;
		exports.Plugin = _plugin.Plugin;
		exports.Reader = _dalReader.Reader;
		exports.Writer = _dalWriter.Writer;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(2), __esModule: true };

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		var $ = __webpack_require__(3);
		module.exports = function defineProperty(it, key, desc){
		  return $.setDesc(it, key, desc);
		};

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var global = typeof self != 'undefined' ? self : Function('return this')()
		  , core   = {}
		  , defineProperty = Object.defineProperty
		  , hasOwnProperty = {}.hasOwnProperty
		  , ceil  = Math.ceil
		  , floor = Math.floor
		  , max   = Math.max
		  , min   = Math.min;
		// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
		var DESC = !!function(){
		  try {
		    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
		  } catch(e){ /* empty */ }
		}();
		var hide = createDefiner(1);
		// 7.1.4 ToInteger
		function toInteger(it){
		  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
		}
		function desc(bitmap, value){
		  return {
		    enumerable  : !(bitmap & 1),
		    configurable: !(bitmap & 2),
		    writable    : !(bitmap & 4),
		    value       : value
		  };
		}
		function simpleSet(object, key, value){
		  object[key] = value;
		  return object;
		}
		function createDefiner(bitmap){
		  return DESC ? function(object, key, value){
		    return $.setDesc(object, key, desc(bitmap, value));
		  } : simpleSet;
		}

		function isObject(it){
		  return it !== null && (typeof it == 'object' || typeof it == 'function');
		}
		function isFunction(it){
		  return typeof it == 'function';
		}
		function assertDefined(it){
		  if(it == undefined)throw TypeError("Can't call method on  " + it);
		  return it;
		}

		var $ = module.exports = __webpack_require__(4)({
		  g: global,
		  core: core,
		  html: global.document && document.documentElement,
		  // http://jsperf.com/core-js-isobject
		  isObject:   isObject,
		  isFunction: isFunction,
		  that: function(){
		    return this;
		  },
		  // 7.1.4 ToInteger
		  toInteger: toInteger,
		  // 7.1.15 ToLength
		  toLength: function(it){
		    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
		  },
		  toIndex: function(index, length){
		    index = toInteger(index);
		    return index < 0 ? max(index + length, 0) : min(index, length);
		  },
		  has: function(it, key){
		    return hasOwnProperty.call(it, key);
		  },
		  create:     Object.create,
		  getProto:   Object.getPrototypeOf,
		  DESC:       DESC,
		  desc:       desc,
		  getDesc:    Object.getOwnPropertyDescriptor,
		  setDesc:    defineProperty,
		  setDescs:   Object.defineProperties,
		  getKeys:    Object.keys,
		  getNames:   Object.getOwnPropertyNames,
		  getSymbols: Object.getOwnPropertySymbols,
		  assertDefined: assertDefined,
		  // Dummy, fix for not array-like ES3 string in es5 module
		  ES5Object: Object,
		  toObject: function(it){
		    return $.ES5Object(assertDefined(it));
		  },
		  hide: hide,
		  def: createDefiner(0),
		  set: global.Symbol ? simpleSet : hide,
		  each: [].forEach
		});
		/* eslint-disable no-undef */
		if(typeof __e != 'undefined')__e = core;
		if(typeof __g != 'undefined')__g = global;

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = function($){
		  $.FW   = false;
		  $.path = $.core;
		  return $;
		};

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _inherits = __webpack_require__(6)["default"];

		var _get = __webpack_require__(9)["default"];

		var _classCallCheck = __webpack_require__(14)["default"];

		var _Object$defineProperty = __webpack_require__(1)["default"];

		_Object$defineProperty(exports, "__esModule", {
		  value: true
		});

		var RustieAbstractClassError = (function (_Error) {
		  function RustieAbstractClassError(message, id) {
		    _classCallCheck(this, RustieAbstractClassError);

		    _get(Object.getPrototypeOf(RustieAbstractClassError.prototype), "constructor", this).call(this, message, id);
		  }

		  _inherits(RustieAbstractClassError, _Error);

		  return RustieAbstractClassError;
		})(Error);

		exports.RustieAbstractClassError = RustieAbstractClassError;

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _Object$create = __webpack_require__(7)["default"];

		exports["default"] = function (subClass, superClass) {
		  if (typeof superClass !== "function" && superClass !== null) {
		    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		  }

		  subClass.prototype = _Object$create(superClass && superClass.prototype, {
		    constructor: {
		      value: subClass,
		      enumerable: false,
		      writable: true,
		      configurable: true
		    }
		  });
		  if (superClass) subClass.__proto__ = superClass;
		};

		exports.__esModule = true;

	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(8), __esModule: true };

	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		var $ = __webpack_require__(3);
		module.exports = function create(P, D){
		  return $.create(P, D);
		};

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _Object$getOwnPropertyDescriptor = __webpack_require__(10)["default"];

		exports["default"] = function get(_x, _x2, _x3) {
		  var _again = true;

		  _function: while (_again) {
		    var object = _x,
		        property = _x2,
		        receiver = _x3;
		    desc = parent = getter = undefined;
		    _again = false;

		    var desc = _Object$getOwnPropertyDescriptor(object, property);

		    if (desc === undefined) {
		      var parent = Object.getPrototypeOf(object);

		      if (parent === null) {
		        return undefined;
		      } else {
		        _x = parent;
		        _x2 = property;
		        _x3 = receiver;
		        _again = true;
		        continue _function;
		      }
		    } else if ("value" in desc) {
		      return desc.value;
		    } else {
		      var getter = desc.get;

		      if (getter === undefined) {
		        return undefined;
		      }

		      return getter.call(receiver);
		    }
		  }
		};

		exports.__esModule = true;

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(11), __esModule: true };

	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		var $ = __webpack_require__(3);
		__webpack_require__(12);
		module.exports = function getOwnPropertyDescriptor(it, key){
		  return $.getDesc(it, key);
		};

	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {

		var $        = __webpack_require__(3)
		  , $def     = __webpack_require__(13)
		  , isObject = $.isObject
		  , toObject = $.toObject;
		$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
		  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
		, function(KEY, ID){
		  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
		    , forced = 0
		    , method = {};
		  method[KEY] = ID == 0 ? function freeze(it){
		    return isObject(it) ? fn(it) : it;
		  } : ID == 1 ? function seal(it){
		    return isObject(it) ? fn(it) : it;
		  } : ID == 2 ? function preventExtensions(it){
		    return isObject(it) ? fn(it) : it;
		  } : ID == 3 ? function isFrozen(it){
		    return isObject(it) ? fn(it) : true;
		  } : ID == 4 ? function isSealed(it){
		    return isObject(it) ? fn(it) : true;
		  } : ID == 5 ? function isExtensible(it){
		    return isObject(it) ? fn(it) : false;
		  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
		    return fn(toObject(it), key);
		  } : ID == 7 ? function getPrototypeOf(it){
		    return fn(Object($.assertDefined(it)));
		  } : ID == 8 ? function keys(it){
		    return fn(toObject(it));
		  } : function getOwnPropertyNames(it){
		    return fn(toObject(it));
		  };
		  try {
		    fn('z');
		  } catch(e){
		    forced = 1;
		  }
		  $def($def.S + $def.F * forced, 'Object', method);
		});

	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		var $          = __webpack_require__(3)
		  , global     = $.g
		  , core       = $.core
		  , isFunction = $.isFunction;
		function ctx(fn, that){
		  return function(){
		    return fn.apply(that, arguments);
		  };
		}
		// type bitmap
		$def.F = 1;  // forced
		$def.G = 2;  // global
		$def.S = 4;  // static
		$def.P = 8;  // proto
		$def.B = 16; // bind
		$def.W = 32; // wrap
		function $def(type, name, source){
		  var key, own, out, exp
		    , isGlobal = type & $def.G
		    , isProto  = type & $def.P
		    , target   = isGlobal ? global : type & $def.S
		        ? global[name] : (global[name] || {}).prototype
		    , exports  = isGlobal ? core : core[name] || (core[name] = {});
		  if(isGlobal)source = name;
		  for(key in source){
		    // contains in native
		    own = !(type & $def.F) && target && key in target;
		    if(own && key in exports)continue;
		    // export native or passed
		    out = own ? target[key] : source[key];
		    // prevent global pollution for namespaces
		    if(isGlobal && !isFunction(target[key]))exp = source[key];
		    // bind timers to global for call from export context
		    else if(type & $def.B && own)exp = ctx(out, global);
		    // wrap global constructors for prevent change them in library
		    else if(type & $def.W && target[key] == out)!function(C){
		      exp = function(param){
		        return this instanceof C ? new C(param) : C(param);
		      };
		      exp.prototype = C.prototype;
		    }(out);
		    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
		    // export
		    exports[key] = exp;
		    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
		  }
		}
		module.exports = $def;

	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		exports["default"] = function (instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		};

		exports.__esModule = true;

	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _createClass = __webpack_require__(16)['default'];

		var _classCallCheck = __webpack_require__(14)['default'];

		var _Object$defineProperty = __webpack_require__(1)['default'];

		var _regeneratorRuntime = __webpack_require__(17)['default'];

		_Object$defineProperty(exports, '__esModule', {
		  value: true
		});

		var _pipeline2 = __webpack_require__(53);

		var Rustie = (function () {
		  function Rustie(reader, writer) {
		    _classCallCheck(this, Rustie);

		    this._reader = reader;
		    this._writer = writer;
		    this._pipeline = new _pipeline2.Pipeline();
		  }

		  _createClass(Rustie, [{
		    key: 'addPlugins',
		    value: function addPlugins() {
		      var _pipeline;

		      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
		        plugins[_key] = arguments[_key];
		      }

		      (_pipeline = this._pipeline).addProcessors.apply(_pipeline, plugins);
		    }
		  }, {
		    key: 'build',
		    value: function build(from, to) {
		      var files, processed;
		      return _regeneratorRuntime.async(function build$(context$2$0) {
		        while (1) switch (context$2$0.prev = context$2$0.next) {
		          case 0:
		            context$2$0.next = 2;
		            return this._reader.read(from);

		          case 2:
		            files = context$2$0.sent;
		            context$2$0.next = 5;
		            return this._pipeline.process(files);

		          case 5:
		            processed = context$2$0.sent;
		            context$2$0.next = 8;
		            return this._writer.write(to, processed);

		          case 8:
		            return context$2$0.abrupt('return', context$2$0.sent);

		          case 9:
		          case 'end':
		            return context$2$0.stop();
		        }
		      }, null, this);
		    }
		  }]);

		  return Rustie;
		})();

		exports.Rustie = Rustie;

	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _Object$defineProperty = __webpack_require__(1)["default"];

		exports["default"] = (function () {
		  function defineProperties(target, props) {
		    for (var i = 0; i < props.length; i++) {
		      var descriptor = props[i];
		      descriptor.enumerable = descriptor.enumerable || false;
		      descriptor.configurable = true;
		      if ("value" in descriptor) descriptor.writable = true;

		      _Object$defineProperty(target, descriptor.key, descriptor);
		    }
		  }

		  return function (Constructor, protoProps, staticProps) {
		    if (protoProps) defineProperties(Constructor.prototype, protoProps);
		    if (staticProps) defineProperties(Constructor, staticProps);
		    return Constructor;
		  };
		})();

		exports.__esModule = true;

	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
		// kept identical to the way it is obtained in runtime.js
		var g =
		  typeof global === "object" ? global :
		  typeof window === "object" ? window :
		  typeof self === "object" ? self : this;

		// Use `getOwnPropertyNames` because not all browsers support calling
		// `hasOwnProperty` on the global `self` object in a worker. See #183.
		var hadRuntime = g.regeneratorRuntime &&
		  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

		// Save the old regeneratorRuntime in case it needs to be restored later.
		var oldRuntime = hadRuntime && g.regeneratorRuntime;

		// Force reevalutation of runtime.js.
		g.regeneratorRuntime = undefined;

		module.exports = __webpack_require__(18);

		if (hadRuntime) {
		  // Restore the original runtime.
		  g.regeneratorRuntime = oldRuntime;
		} else {
		  // Remove the global property added by runtime.js.
		  delete g.regeneratorRuntime;
		}

		module.exports = { "default": module.exports, __esModule: true };

		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(global) {/**
		 * Copyright (c) 2014, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
		 * additional grant of patent rights can be found in the PATENTS file in
		 * the same directory.
		 */

		"use strict";

		var _Symbol = __webpack_require__(19)["default"];

		var _Symbol$iterator = __webpack_require__(30)["default"];

		var _Object$create = __webpack_require__(7)["default"];

		var _Promise = __webpack_require__(39)["default"];

		!(function (global) {
		  "use strict";

		  var hasOwn = Object.prototype.hasOwnProperty;
		  var undefined; // More compressible than void 0.
		  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";

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
		    // If outerFn provided, then outerFn.prototype instanceof Generator.
		    var generator = _Object$create((outerFn || Generator).prototype);

		    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));

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

		  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
		  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
		  GeneratorFunctionPrototype.constructor = GeneratorFunction;
		  GeneratorFunction.displayName = "GeneratorFunction";

		  runtime.isGeneratorFunction = function (genFun) {
		    var ctor = typeof genFun === "function" && genFun.constructor;
		    return ctor ? ctor === GeneratorFunction ||
		    // For the native GeneratorFunction constructor, the best we can
		    // do is to check its .name property.
		    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
		  };

		  runtime.mark = function (genFun) {
		    genFun.__proto__ = GeneratorFunctionPrototype;
		    genFun.prototype = _Object$create(Gp);
		    return genFun;
		  };

		  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
		    return new _Promise(function (resolve, reject) {
		      var generator = wrap(innerFn, outerFn, self, tryLocsList);
		      var callNext = step.bind(generator, "next");
		      var callThrow = step.bind(generator, "throw");

		      function step(method, arg) {
		        var record = tryCatch(generator[method], generator, arg);
		        if (record.type === "throw") {
		          reject(record.arg);
		          return;
		        }

		        var info = record.arg;
		        if (info.done) {
		          resolve(info.value);
		        } else {
		          _Promise.resolve(info.value).then(callNext, callThrow);
		        }
		      }

		      callNext();
		    });
		  };

		  function makeInvokeMethod(innerFn, self, context) {
		    var state = GenStateSuspendedStart;

		    return function invoke(method, arg) {
		      if (state === GenStateExecuting) {
		        throw new Error("Generator is already running");
		      }

		      if (state === GenStateCompleted) {
		        // Be forgiving, per 25.3.3.3.3 of the spec:
		        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
		        return doneResult();
		      }

		      while (true) {
		        var delegate = context.delegate;
		        if (delegate) {
		          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
		            // A return or throw (when the delegate iterator has no throw
		            // method) always terminates the yield* loop.
		            context.delegate = null;

		            // If the delegate iterator has a return method, give it a
		            // chance to clean up.
		            var returnMethod = delegate.iterator["return"];
		            if (returnMethod) {
		              var record = tryCatch(returnMethod, delegate.iterator, arg);
		              if (record.type === "throw") {
		                // If the return method threw an exception, let that
		                // exception prevail over the original return or throw.
		                method = "throw";
		                arg = record.arg;
		                continue;
		              }
		            }

		            if (method === "return") {
		              // Continue with the outer return, now that the delegate
		              // iterator has been terminated.
		              continue;
		            }
		          }

		          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

		          if (record.type === "throw") {
		            context.delegate = null;

		            // Like returning generator.throw(uncaught), but without the
		            // overhead of an extra function call.
		            method = "throw";
		            arg = record.arg;
		            continue;
		          }

		          // Delegate generator ran and handled its own exceptions so
		          // regardless of what the method was, we continue as if it is
		          // "next" with an undefined arg.
		          method = "next";
		          arg = undefined;

		          var info = record.arg;
		          if (info.done) {
		            context[delegate.resultName] = info.value;
		            context.next = delegate.nextLoc;
		          } else {
		            state = GenStateSuspendedYield;
		            return info;
		          }

		          context.delegate = null;
		        }

		        if (method === "next") {
		          if (state === GenStateSuspendedYield) {
		            context.sent = arg;
		          } else {
		            delete context.sent;
		          }
		        } else if (method === "throw") {
		          if (state === GenStateSuspendedStart) {
		            state = GenStateCompleted;
		            throw arg;
		          }

		          if (context.dispatchException(arg)) {
		            // If the dispatched exception was caught by a catch block,
		            // then let that catch block handle the exception normally.
		            method = "next";
		            arg = undefined;
		          }
		        } else if (method === "return") {
		          context.abrupt("return", arg);
		        }

		        state = GenStateExecuting;

		        var record = tryCatch(innerFn, self, context);
		        if (record.type === "normal") {
		          // If an exception is thrown from innerFn, we leave state ===
		          // GenStateExecuting and loop back for another invocation.
		          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

		          var info = {
		            value: record.arg,
		            done: context.done
		          };

		          if (record.arg === ContinueSentinel) {
		            if (context.delegate && method === "next") {
		              // Deliberately forget the last sent value so that we don't
		              // accidentally pass it on to the delegate.
		              arg = undefined;
		            }
		          } else {
		            return info;
		          }
		        } else if (record.type === "throw") {
		          state = GenStateCompleted;
		          // Dispatch the exception by looping back around to the
		          // context.dispatchException(arg) call above.
		          method = "throw";
		          arg = record.arg;
		        }
		      }
		    };
		  }

		  function defineGeneratorMethod(method) {
		    Gp[method] = function (arg) {
		      return this._invoke(method, arg);
		    };
		  }
		  defineGeneratorMethod("next");
		  defineGeneratorMethod("throw");
		  defineGeneratorMethod("return");

		  Gp[iteratorSymbol] = function () {
		    return this;
		  };

		  Gp.toString = function () {
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
		    this.reset();
		  }

		  runtime.keys = function (object) {
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
		        var i = -1,
		            next = function next() {
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

		    reset: function reset() {
		      this.prev = 0;
		      this.next = 0;
		      this.sent = undefined;
		      this.done = false;
		      this.delegate = null;

		      this.tryEntries.forEach(resetTryEntry);

		      // Pre-initialize at least 20 temporary variables to enable hidden
		      // class optimizations for simple generators.
		      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
		        this[tempName] = null;
		      }
		    },

		    stop: function stop() {
		      this.done = true;

		      var rootEntry = this.tryEntries[0];
		      var rootRecord = rootEntry.completion;
		      if (rootRecord.type === "throw") {
		        throw rootRecord.arg;
		      }

		      return this.rval;
		    },

		    dispatchException: function dispatchException(exception) {
		      if (this.done) {
		        throw exception;
		      }

		      var context = this;
		      function handle(loc, caught) {
		        record.type = "throw";
		        record.arg = exception;
		        context.next = loc;
		        return !!caught;
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

		    abrupt: function abrupt(type, arg) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
		          var finallyEntry = entry;
		          break;
		        }
		      }

		      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
		        // Ignore the finally entry if control is not jumping to a
		        // location outside the try/catch block.
		        finallyEntry = null;
		      }

		      var record = finallyEntry ? finallyEntry.completion : {};
		      record.type = type;
		      record.arg = arg;

		      if (finallyEntry) {
		        this.next = finallyEntry.finallyLoc;
		      } else {
		        this.complete(record);
		      }

		      return ContinueSentinel;
		    },

		    complete: function complete(record, afterLoc) {
		      if (record.type === "throw") {
		        throw record.arg;
		      }

		      if (record.type === "break" || record.type === "continue") {
		        this.next = record.arg;
		      } else if (record.type === "return") {
		        this.rval = record.arg;
		        this.next = "end";
		      } else if (record.type === "normal" && afterLoc) {
		        this.next = afterLoc;
		      }
		    },

		    finish: function finish(finallyLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.finallyLoc === finallyLoc) {
		          this.complete(entry.completion, entry.afterLoc);
		          resetTryEntry(entry);
		          return ContinueSentinel;
		        }
		      }
		    },

		    "catch": function _catch(tryLoc) {
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

		    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
		      this.delegate = {
		        iterator: values(iterable),
		        resultName: resultName,
		        nextLoc: nextLoc
		      };

		      return ContinueSentinel;
		    }
		  };
		})(
		// Among the various tricks for obtaining a reference to the global
		// object, this seems to be the most reliable technique that does not
		// use indirect eval (which violates Content Security Policy).
		typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(20), __esModule: true };

	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(21);
		module.exports = __webpack_require__(3).core.Symbol;

	/***/ },
	/* 21 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		// ECMAScript 6 symbols shim
		var $        = __webpack_require__(3)
		  , setTag   = __webpack_require__(23).set
		  , uid      = __webpack_require__(26)
		  , shared   = __webpack_require__(25)
		  , $def     = __webpack_require__(13)
		  , $redef   = __webpack_require__(22)
		  , keyOf    = __webpack_require__(27)
		  , enumKeys = __webpack_require__(28)
		  , assertObject = __webpack_require__(29).obj
		  , ObjectProto = Object.prototype
		  , DESC     = $.DESC
		  , has      = $.has
		  , $create  = $.create
		  , getDesc  = $.getDesc
		  , setDesc  = $.setDesc
		  , desc     = $.desc
		  , getNames = $.getNames
		  , toObject = $.toObject
		  , $Symbol  = $.g.Symbol
		  , setter   = false
		  , TAG      = uid('tag')
		  , HIDDEN   = uid('hidden')
		  , _propertyIsEnumerable = {}.propertyIsEnumerable
		  , SymbolRegistry = shared('symbol-registry')
		  , AllSymbols = shared('symbols')
		  , useNative = $.isFunction($Symbol);

		var setSymbolDesc = DESC ? function(){ // fallback for old Android
		  try {
		    return $create(setDesc({}, HIDDEN, {
		      get: function(){
		        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
		      }
		    }))[HIDDEN] || setDesc;
		  } catch(e){
		    return function(it, key, D){
		      var protoDesc = getDesc(ObjectProto, key);
		      if(protoDesc)delete ObjectProto[key];
		      setDesc(it, key, D);
		      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
		    };
		  }
		}() : setDesc;

		function wrap(tag){
		  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
		  DESC && setter && setSymbolDesc(ObjectProto, tag, {
		    configurable: true,
		    set: function(value){
		      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
		      setSymbolDesc(this, tag, desc(1, value));
		    }
		  });
		  return sym;
		}

		function defineProperty(it, key, D){
		  if(D && has(AllSymbols, key)){
		    if(!D.enumerable){
		      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
		      it[HIDDEN][key] = true;
		    } else {
		      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
		      D = $create(D, {enumerable: desc(0, false)});
		    } return setSymbolDesc(it, key, D);
		  } return setDesc(it, key, D);
		}
		function defineProperties(it, P){
		  assertObject(it);
		  var keys = enumKeys(P = toObject(P))
		    , i    = 0
		    , l = keys.length
		    , key;
		  while(l > i)defineProperty(it, key = keys[i++], P[key]);
		  return it;
		}
		function create(it, P){
		  return P === undefined ? $create(it) : defineProperties($create(it), P);
		}
		function propertyIsEnumerable(key){
		  var E = _propertyIsEnumerable.call(this, key);
		  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
		    ? E : true;
		}
		function getOwnPropertyDescriptor(it, key){
		  var D = getDesc(it = toObject(it), key);
		  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
		  return D;
		}
		function getOwnPropertyNames(it){
		  var names  = getNames(toObject(it))
		    , result = []
		    , i      = 0
		    , key;
		  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
		  return result;
		}
		function getOwnPropertySymbols(it){
		  var names  = getNames(toObject(it))
		    , result = []
		    , i      = 0
		    , key;
		  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
		  return result;
		}

		// 19.4.1.1 Symbol([description])
		if(!useNative){
		  $Symbol = function Symbol(){
		    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
		    return wrap(uid(arguments[0]));
		  };
		  $redef($Symbol.prototype, 'toString', function(){
		    return this[TAG];
		  });

		  $.create     = create;
		  $.setDesc    = defineProperty;
		  $.getDesc    = getOwnPropertyDescriptor;
		  $.setDescs   = defineProperties;
		  $.getNames   = getOwnPropertyNames;
		  $.getSymbols = getOwnPropertySymbols;

		  if($.DESC && $.FW)$redef(Object.prototype, 'propertyIsEnumerable', propertyIsEnumerable, true);
		}

		var symbolStatics = {
		  // 19.4.2.1 Symbol.for(key)
		  'for': function(key){
		    return has(SymbolRegistry, key += '')
		      ? SymbolRegistry[key]
		      : SymbolRegistry[key] = $Symbol(key);
		  },
		  // 19.4.2.5 Symbol.keyFor(sym)
		  keyFor: function keyFor(key){
		    return keyOf(SymbolRegistry, key);
		  },
		  useSetter: function(){ setter = true; },
		  useSimple: function(){ setter = false; }
		};
		// 19.4.2.2 Symbol.hasInstance
		// 19.4.2.3 Symbol.isConcatSpreadable
		// 19.4.2.4 Symbol.iterator
		// 19.4.2.6 Symbol.match
		// 19.4.2.8 Symbol.replace
		// 19.4.2.9 Symbol.search
		// 19.4.2.10 Symbol.species
		// 19.4.2.11 Symbol.split
		// 19.4.2.12 Symbol.toPrimitive
		// 19.4.2.13 Symbol.toStringTag
		// 19.4.2.14 Symbol.unscopables
		$.each.call((
		    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
		    'species,split,toPrimitive,toStringTag,unscopables'
		  ).split(','), function(it){
		    var sym = __webpack_require__(24)(it);
		    symbolStatics[it] = useNative ? sym : wrap(sym);
		  }
		);

		setter = true;

		$def($def.G + $def.W, {Symbol: $Symbol});

		$def($def.S, 'Symbol', symbolStatics);

		$def($def.S + $def.F * !useNative, 'Object', {
		  // 19.1.2.2 Object.create(O [, Properties])
		  create: create,
		  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
		  defineProperty: defineProperty,
		  // 19.1.2.3 Object.defineProperties(O, Properties)
		  defineProperties: defineProperties,
		  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
		  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
		  // 19.1.2.7 Object.getOwnPropertyNames(O)
		  getOwnPropertyNames: getOwnPropertyNames,
		  // 19.1.2.8 Object.getOwnPropertySymbols(O)
		  getOwnPropertySymbols: getOwnPropertySymbols
		});

		// 19.4.3.5 Symbol.prototype[@@toStringTag]
		setTag($Symbol, 'Symbol');
		// 20.2.1.9 Math[@@toStringTag]
		setTag(Math, 'Math', true);
		// 24.3.3 JSON[@@toStringTag]
		setTag($.g.JSON, 'JSON', true);

	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(3).hide;

	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {

		var $        = __webpack_require__(3)
		  , TAG      = __webpack_require__(24)('toStringTag')
		  , toString = {}.toString;
		function cof(it){
		  return toString.call(it).slice(8, -1);
		}
		cof.classof = function(it){
		  var O, T;
		  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
		    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
		};
		cof.set = function(it, tag, stat){
		  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
		};
		module.exports = cof;

	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {

		var global = __webpack_require__(3).g
		  , store  = __webpack_require__(25)('wks');
		module.exports = function(name){
		  return store[name] || (store[name] =
		    global.Symbol && global.Symbol[name] || __webpack_require__(26).safe('Symbol.' + name));
		};

	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {

		var $      = __webpack_require__(3)
		  , SHARED = '__core-js_shared__'
		  , store  = $.g[SHARED] || $.hide($.g, SHARED, {})[SHARED];
		module.exports = function(key){
		  return store[key] || (store[key] = {});
		};

	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {

		var sid = 0;
		function uid(key){
		  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
		}
		uid.safe = __webpack_require__(3).g.Symbol || uid;
		module.exports = uid;

	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {

		var $ = __webpack_require__(3);
		module.exports = function(object, el){
		  var O      = $.toObject(object)
		    , keys   = $.getKeys(O)
		    , length = keys.length
		    , index  = 0
		    , key;
		  while(length > index)if(O[key = keys[index++]] === el)return key;
		};

	/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {

		var $ = __webpack_require__(3);
		module.exports = function(it){
		  var keys       = $.getKeys(it)
		    , getDesc    = $.getDesc
		    , getSymbols = $.getSymbols;
		  if(getSymbols)$.each.call(getSymbols(it), function(key){
		    if(getDesc(it, key).enumerable)keys.push(key);
		  });
		  return keys;
		};

	/***/ },
	/* 29 */
	/***/ function(module, exports, __webpack_require__) {

		var $ = __webpack_require__(3);
		function assert(condition, msg1, msg2){
		  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
		}
		assert.def = $.assertDefined;
		assert.fn = function(it){
		  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
		  return it;
		};
		assert.obj = function(it){
		  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
		  return it;
		};
		assert.inst = function(it, Constructor, name){
		  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
		  return it;
		};
		module.exports = assert;

	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(31), __esModule: true };

	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(32);
		__webpack_require__(36);
		module.exports = __webpack_require__(24)('iterator');

	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {

		var set   = __webpack_require__(3).set
		  , $at   = __webpack_require__(33)(true)
		  , ITER  = __webpack_require__(26).safe('iter')
		  , $iter = __webpack_require__(34)
		  , step  = $iter.step;

		// 21.1.3.27 String.prototype[@@iterator]()
		__webpack_require__(35)(String, 'String', function(iterated){
		  set(this, ITER, {o: String(iterated), i: 0});
		// 21.1.5.2.1 %StringIteratorPrototype%.next()
		}, function(){
		  var iter  = this[ITER]
		    , O     = iter.o
		    , index = iter.i
		    , point;
		  if(index >= O.length)return step(1);
		  point = $at(O, index);
		  iter.i += point.length;
		  return step(0, point);
		});

	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {

		// true  -> String#at
		// false -> String#codePointAt
		var $ = __webpack_require__(3);
		module.exports = function(TO_STRING){
		  return function(that, pos){
		    var s = String($.assertDefined(that))
		      , i = $.toInteger(pos)
		      , l = s.length
		      , a, b;
		    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
		    a = s.charCodeAt(i);
		    return a < 0xd800 || a > 0xdbff || i + 1 === l
		      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
		        ? TO_STRING ? s.charAt(i) : a
		        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
		  };
		};

	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var $                 = __webpack_require__(3)
		  , cof               = __webpack_require__(23)
		  , assertObject      = __webpack_require__(29).obj
		  , SYMBOL_ITERATOR   = __webpack_require__(24)('iterator')
		  , FF_ITERATOR       = '@@iterator'
		  , Iterators         = __webpack_require__(25)('iterators')
		  , IteratorPrototype = {};
		// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
		setIterator(IteratorPrototype, $.that);
		function setIterator(O, value){
		  $.hide(O, SYMBOL_ITERATOR, value);
		  // Add iterator for FF iterator protocol
		  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
		}

		module.exports = {
		  // Safari has buggy iterators w/o `next`
		  BUGGY: 'keys' in [] && !('next' in [].keys()),
		  Iterators: Iterators,
		  step: function(done, value){
		    return {value: value, done: !!done};
		  },
		  is: function(it){
		    var O      = Object(it)
		      , Symbol = $.g.Symbol
		      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
		    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
		  },
		  get: function(it){
		    var Symbol  = $.g.Symbol
		      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
		      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
		    return assertObject(getIter.call(it));
		  },
		  set: setIterator,
		  create: function(Constructor, NAME, next, proto){
		    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
		    cof.set(Constructor, NAME + ' Iterator');
		  }
		};

	/***/ },
	/* 35 */
	/***/ function(module, exports, __webpack_require__) {

		var $def            = __webpack_require__(13)
		  , $redef          = __webpack_require__(22)
		  , $               = __webpack_require__(3)
		  , cof             = __webpack_require__(23)
		  , $iter           = __webpack_require__(34)
		  , SYMBOL_ITERATOR = __webpack_require__(24)('iterator')
		  , FF_ITERATOR     = '@@iterator'
		  , KEYS            = 'keys'
		  , VALUES          = 'values'
		  , Iterators       = $iter.Iterators;
		module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
		  $iter.create(Constructor, NAME, next);
		  function createMethod(kind){
		    function $$(that){
		      return new Constructor(that, kind);
		    }
		    switch(kind){
		      case KEYS: return function keys(){ return $$(this); };
		      case VALUES: return function values(){ return $$(this); };
		    } return function entries(){ return $$(this); };
		  }
		  var TAG      = NAME + ' Iterator'
		    , proto    = Base.prototype
		    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
		    , _default = _native || createMethod(DEFAULT)
		    , methods, key;
		  // Fix native
		  if(_native){
		    var IteratorPrototype = $.getProto(_default.call(new Base));
		    // Set @@toStringTag to native iterators
		    cof.set(IteratorPrototype, TAG, true);
		    // FF fix
		    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
		  }
		  // Define iterator
		  if($.FW)$iter.set(proto, _default);
		  // Plug for library
		  Iterators[NAME] = _default;
		  Iterators[TAG]  = $.that;
		  if(DEFAULT){
		    methods = {
		      keys:    IS_SET            ? _default : createMethod(KEYS),
		      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
		      entries: DEFAULT != VALUES ? _default : createMethod('entries')
		    };
		    if(FORCE)for(key in methods){
		      if(!(key in proto))$redef(proto, key, methods[key]);
		    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
		  }
		};

	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(37);
		var $           = __webpack_require__(3)
		  , Iterators   = __webpack_require__(34).Iterators
		  , ITERATOR    = __webpack_require__(24)('iterator')
		  , ArrayValues = Iterators.Array
		  , NL          = $.g.NodeList
		  , HTC         = $.g.HTMLCollection
		  , NLProto     = NL && NL.prototype
		  , HTCProto    = HTC && HTC.prototype;
		if($.FW){
		  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
		  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
		}
		Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

	/***/ },
	/* 37 */
	/***/ function(module, exports, __webpack_require__) {

		var $          = __webpack_require__(3)
		  , setUnscope = __webpack_require__(38)
		  , ITER       = __webpack_require__(26).safe('iter')
		  , $iter      = __webpack_require__(34)
		  , step       = $iter.step
		  , Iterators  = $iter.Iterators;

		// 22.1.3.4 Array.prototype.entries()
		// 22.1.3.13 Array.prototype.keys()
		// 22.1.3.29 Array.prototype.values()
		// 22.1.3.30 Array.prototype[@@iterator]()
		__webpack_require__(35)(Array, 'Array', function(iterated, kind){
		  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
		// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
		}, function(){
		  var iter  = this[ITER]
		    , O     = iter.o
		    , kind  = iter.k
		    , index = iter.i++;
		  if(!O || index >= O.length){
		    iter.o = undefined;
		    return step(1);
		  }
		  if(kind == 'keys'  )return step(0, index);
		  if(kind == 'values')return step(0, O[index]);
		  return step(0, [index, O[index]]);
		}, 'values');

		// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
		Iterators.Arguments = Iterators.Array;

		setUnscope('keys');
		setUnscope('values');
		setUnscope('entries');

	/***/ },
	/* 38 */
	/***/ function(module, exports, __webpack_require__) {

		// 22.1.3.31 Array.prototype[@@unscopables]
		var $           = __webpack_require__(3)
		  , UNSCOPABLES = __webpack_require__(24)('unscopables');
		if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
		module.exports = function(key){
		  if($.FW)[][UNSCOPABLES][key] = true;
		};

	/***/ },
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(40), __esModule: true };

	/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(41);
		__webpack_require__(32);
		__webpack_require__(36);
		__webpack_require__(42);
		module.exports = __webpack_require__(3).core.Promise;

	/***/ },
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		// 19.1.3.6 Object.prototype.toString()
		var cof = __webpack_require__(23)
		  , tmp = {};
		tmp[__webpack_require__(24)('toStringTag')] = 'z';
		if(__webpack_require__(3).FW && cof(tmp) != 'z'){
		  __webpack_require__(22)(Object.prototype, 'toString', function toString(){
		    return '[object ' + cof.classof(this) + ']';
		  }, true);
		}

	/***/ },
	/* 42 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var $        = __webpack_require__(3)
		  , ctx      = __webpack_require__(43)
		  , cof      = __webpack_require__(23)
		  , $def     = __webpack_require__(13)
		  , assert   = __webpack_require__(29)
		  , forOf    = __webpack_require__(44)
		  , setProto = __webpack_require__(46).set
		  , species  = __webpack_require__(47)
		  , SPECIES  = __webpack_require__(24)('species')
		  , RECORD   = __webpack_require__(26).safe('record')
		  , PROMISE  = 'Promise'
		  , global   = $.g
		  , process  = global.process
		  , asap     = process && process.nextTick || __webpack_require__(48).set
		  , P        = global[PROMISE]
		  , isFunction     = $.isFunction
		  , isObject       = $.isObject
		  , assertFunction = assert.fn
		  , assertObject   = assert.obj;

		var useNative = function(){
		  var test, works = false;
		  function P2(x){
		    var self = new P(x);
		    setProto(self, P2.prototype);
		    return self;
		  }
		  try {
		    works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
		    setProto(P2, P);
		    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
		    // actual Firefox has broken subclass support, test that
		    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
		      works = false;
		    }
		  } catch(e){ works = false; }
		  return works;
		}();

		// helpers
		function getConstructor(C){
		  var S = assertObject(C)[SPECIES];
		  return S != undefined ? S : C;
		}
		function isThenable(it){
		  var then;
		  if(isObject(it))then = it.then;
		  return isFunction(then) ? then : false;
		}
		function notify(record){
		  var chain = record.c;
		  if(chain.length)asap(function(){
		    var value = record.v
		      , ok    = record.s == 1
		      , i     = 0;
		    function run(react){
		      var cb = ok ? react.ok : react.fail
		        , ret, then;
		      try {
		        if(cb){
		          if(!ok)record.h = true;
		          ret = cb === true ? value : cb(value);
		          if(ret === react.P){
		            react.rej(TypeError('Promise-chain cycle'));
		          } else if(then = isThenable(ret)){
		            then.call(ret, react.res, react.rej);
		          } else react.res(ret);
		        } else react.rej(value);
		      } catch(err){
		        react.rej(err);
		      }
		    }
		    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
		    chain.length = 0;
		  });
		}
		function isUnhandled(promise){
		  var record = promise[RECORD]
		    , chain  = record.a || record.c
		    , i      = 0
		    , react;
		  if(record.h)return false;
		  while(chain.length > i){
		    react = chain[i++];
		    if(react.fail || !isUnhandled(react.P))return false;
		  } return true;
		}
		function $reject(value){
		  var record = this
		    , promise;
		  if(record.d)return;
		  record.d = true;
		  record = record.r || record; // unwrap
		  record.v = value;
		  record.s = 2;
		  record.a = record.c.slice();
		  setTimeout(function(){
		    asap(function(){
		      if(isUnhandled(promise = record.p)){
		        if(cof(process) == 'process'){
		          process.emit('unhandledRejection', value, promise);
		        } else if(global.console && isFunction(console.error)){
		          console.error('Unhandled promise rejection', value);
		        }
		      }
		      record.a = undefined;
		    });
		  }, 1);
		  notify(record);
		}
		function $resolve(value){
		  var record = this
		    , then, wrapper;
		  if(record.d)return;
		  record.d = true;
		  record = record.r || record; // unwrap
		  try {
		    if(then = isThenable(value)){
		      wrapper = {r: record, d: false}; // wrap
		      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
		    } else {
		      record.v = value;
		      record.s = 1;
		      notify(record);
		    }
		  } catch(err){
		    $reject.call(wrapper || {r: record, d: false}, err); // wrap
		  }
		}

		// constructor polyfill
		if(!useNative){
		  // 25.4.3.1 Promise(executor)
		  P = function Promise(executor){
		    assertFunction(executor);
		    var record = {
		      p: assert.inst(this, P, PROMISE),       // <- promise
		      c: [],                                  // <- awaiting reactions
		      a: undefined,                           // <- checked in isUnhandled reactions
		      s: 0,                                   // <- state
		      d: false,                               // <- done
		      v: undefined,                           // <- value
		      h: false                                // <- handled rejection
		    };
		    $.hide(this, RECORD, record);
		    try {
		      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
		    } catch(err){
		      $reject.call(record, err);
		    }
		  };
		  __webpack_require__(51)(P.prototype, {
		    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
		    then: function then(onFulfilled, onRejected){
		      var S = assertObject(assertObject(this).constructor)[SPECIES];
		      var react = {
		        ok:   isFunction(onFulfilled) ? onFulfilled : true,
		        fail: isFunction(onRejected)  ? onRejected  : false
		      };
		      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
		        react.res = assertFunction(res);
		        react.rej = assertFunction(rej);
		      });
		      var record = this[RECORD];
		      record.c.push(react);
		      if(record.a)record.a.push(react);
		      record.s && notify(record);
		      return promise;
		    },
		    // 25.4.5.1 Promise.prototype.catch(onRejected)
		    'catch': function(onRejected){
		      return this.then(undefined, onRejected);
		    }
		  });
		}

		// export
		$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
		cof.set(P, PROMISE);
		species(P);
		species($.core[PROMISE]); // for wrapper

		// statics
		$def($def.S + $def.F * !useNative, PROMISE, {
		  // 25.4.4.5 Promise.reject(r)
		  reject: function reject(r){
		    return new (getConstructor(this))(function(res, rej){
		      rej(r);
		    });
		  },
		  // 25.4.4.6 Promise.resolve(x)
		  resolve: function resolve(x){
		    return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
		      ? x : new (getConstructor(this))(function(res){
		        res(x);
		      });
		  }
		});
		$def($def.S + $def.F * !(useNative && __webpack_require__(52)(function(iter){
		  P.all(iter)['catch'](function(){});
		})), PROMISE, {
		  // 25.4.4.1 Promise.all(iterable)
		  all: function all(iterable){
		    var C      = getConstructor(this)
		      , values = [];
		    return new C(function(res, rej){
		      forOf(iterable, false, values.push, values);
		      var remaining = values.length
		        , results   = Array(remaining);
		      if(remaining)$.each.call(values, function(promise, index){
		        C.resolve(promise).then(function(value){
		          results[index] = value;
		          --remaining || res(results);
		        }, rej);
		      });
		      else res(results);
		    });
		  },
		  // 25.4.4.4 Promise.race(iterable)
		  race: function race(iterable){
		    var C = getConstructor(this);
		    return new C(function(res, rej){
		      forOf(iterable, false, function(promise){
		        C.resolve(promise).then(res, rej);
		      });
		    });
		  }
		});

	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {

		// Optional / simple context binding
		var assertFunction = __webpack_require__(29).fn;
		module.exports = function(fn, that, length){
		  assertFunction(fn);
		  if(~length && that === undefined)return fn;
		  switch(length){
		    case 1: return function(a){
		      return fn.call(that, a);
		    };
		    case 2: return function(a, b){
		      return fn.call(that, a, b);
		    };
		    case 3: return function(a, b, c){
		      return fn.call(that, a, b, c);
		    };
		  } return function(/* ...args */){
		      return fn.apply(that, arguments);
		    };
		};

	/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {

		var ctx  = __webpack_require__(43)
		  , get  = __webpack_require__(34).get
		  , call = __webpack_require__(45);
		module.exports = function(iterable, entries, fn, that){
		  var iterator = get(iterable)
		    , f        = ctx(fn, that, entries ? 2 : 1)
		    , step;
		  while(!(step = iterator.next()).done){
		    if(call(iterator, f, step.value, entries) === false){
		      return call.close(iterator);
		    }
		  }
		};

	/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {

		var assertObject = __webpack_require__(29).obj;
		function close(iterator){
		  var ret = iterator['return'];
		  if(ret !== undefined)assertObject(ret.call(iterator));
		}
		function call(iterator, fn, value, entries){
		  try {
		    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
		  } catch(e){
		    close(iterator);
		    throw e;
		  }
		}
		call.close = close;
		module.exports = call;

	/***/ },
	/* 46 */
	/***/ function(module, exports, __webpack_require__) {

		// Works with __proto__ only. Old v8 can't work with null proto objects.
		/* eslint-disable no-proto */
		var $      = __webpack_require__(3)
		  , assert = __webpack_require__(29);
		function check(O, proto){
		  assert.obj(O);
		  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
		}
		module.exports = {
		  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
		    ? function(buggy, set){
		        try {
		          set = __webpack_require__(43)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
		          set({}, []);
		        } catch(e){ buggy = true; }
		        return function setPrototypeOf(O, proto){
		          check(O, proto);
		          if(buggy)O.__proto__ = proto;
		          else set(O, proto);
		          return O;
		        };
		      }()
		    : undefined),
		  check: check
		};

	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {

		var $       = __webpack_require__(3)
		  , SPECIES = __webpack_require__(24)('species');
		module.exports = function(C){
		  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
		    configurable: true,
		    get: $.that
		  });
		};

	/***/ },
	/* 48 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var $      = __webpack_require__(3)
		  , ctx    = __webpack_require__(43)
		  , cof    = __webpack_require__(23)
		  , invoke = __webpack_require__(49)
		  , cel    = __webpack_require__(50)
		  , global             = $.g
		  , isFunction         = $.isFunction
		  , html               = $.html
		  , process            = global.process
		  , setTask            = global.setImmediate
		  , clearTask          = global.clearImmediate
		  , postMessage        = global.postMessage
		  , addEventListener   = global.addEventListener
		  , MessageChannel     = global.MessageChannel
		  , counter            = 0
		  , queue              = {}
		  , ONREADYSTATECHANGE = 'onreadystatechange'
		  , defer, channel, port;
		function run(){
		  var id = +this;
		  if($.has(queue, id)){
		    var fn = queue[id];
		    delete queue[id];
		    fn();
		  }
		}
		function listner(event){
		  run.call(event.data);
		}
		// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
		if(!isFunction(setTask) || !isFunction(clearTask)){
		  setTask = function(fn){
		    var args = [], i = 1;
		    while(arguments.length > i)args.push(arguments[i++]);
		    queue[++counter] = function(){
		      invoke(isFunction(fn) ? fn : Function(fn), args);
		    };
		    defer(counter);
		    return counter;
		  };
		  clearTask = function(id){
		    delete queue[id];
		  };
		  // Node.js 0.8-
		  if(cof(process) == 'process'){
		    defer = function(id){
		      process.nextTick(ctx(run, id, 1));
		    };
		  // Modern browsers, skip implementation for WebWorkers
		  // IE8 has postMessage, but it's sync & typeof its postMessage is object
		  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
		    defer = function(id){
		      postMessage(id, '*');
		    };
		    addEventListener('message', listner, false);
		  // WebWorkers
		  } else if(isFunction(MessageChannel)){
		    channel = new MessageChannel;
		    port    = channel.port2;
		    channel.port1.onmessage = listner;
		    defer = ctx(port.postMessage, port, 1);
		  // IE8-
		  } else if(ONREADYSTATECHANGE in cel('script')){
		    defer = function(id){
		      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
		        html.removeChild(this);
		        run.call(id);
		      };
		    };
		  // Rest old browsers
		  } else {
		    defer = function(id){
		      setTimeout(ctx(run, id, 1), 0);
		    };
		  }
		}
		module.exports = {
		  set:   setTask,
		  clear: clearTask
		};

	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {

		// Fast apply
		// http://jsperf.lnkit.com/fast-apply/5
		module.exports = function(fn, args, that){
		  var un = that === undefined;
		  switch(args.length){
		    case 0: return un ? fn()
		                      : fn.call(that);
		    case 1: return un ? fn(args[0])
		                      : fn.call(that, args[0]);
		    case 2: return un ? fn(args[0], args[1])
		                      : fn.call(that, args[0], args[1]);
		    case 3: return un ? fn(args[0], args[1], args[2])
		                      : fn.call(that, args[0], args[1], args[2]);
		    case 4: return un ? fn(args[0], args[1], args[2], args[3])
		                      : fn.call(that, args[0], args[1], args[2], args[3]);
		    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
		                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
		  } return              fn.apply(that, args);
		};

	/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {

		var $        = __webpack_require__(3)
		  , document = $.g.document
		  , isObject = $.isObject
		  // in old IE typeof document.createElement is 'object'
		  , is = isObject(document) && isObject(document.createElement);
		module.exports = function(it){
		  return is ? document.createElement(it) : {};
		};

	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {

		var $redef = __webpack_require__(22);
		module.exports = function(target, src){
		  for(var key in src)$redef(target, key, src[key]);
		  return target;
		};

	/***/ },
	/* 52 */
	/***/ function(module, exports, __webpack_require__) {

		var SYMBOL_ITERATOR = __webpack_require__(24)('iterator')
		  , SAFE_CLOSING    = false;
		try {
		  var riter = [7][SYMBOL_ITERATOR]();
		  riter['return'] = function(){ SAFE_CLOSING = true; };
		  Array.from(riter, function(){ throw 2; });
		} catch(e){ /* empty */ }
		module.exports = function(exec){
		  if(!SAFE_CLOSING)return false;
		  var safe = false;
		  try {
		    var arr  = [7]
		      , iter = arr[SYMBOL_ITERATOR]();
		    iter.next = function(){ safe = true; };
		    arr[SYMBOL_ITERATOR] = function(){ return iter; };
		    exec(arr);
		  } catch(e){ /* empty */ }
		  return safe;
		};

	/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _createClass = __webpack_require__(16)["default"];

		var _classCallCheck = __webpack_require__(14)["default"];

		var _Object$defineProperty = __webpack_require__(1)["default"];

		var _regeneratorRuntime = __webpack_require__(17)["default"];

		var _Object$assign = __webpack_require__(54)["default"];

		var _Object$create = __webpack_require__(7)["default"];

		var _getIterator = __webpack_require__(58)["default"];

		_Object$defineProperty(exports, "__esModule", {
		  value: true
		});

		var Pipeline = (function () {
		  function Pipeline() {
		    _classCallCheck(this, Pipeline);

		    this._processors = [];
		  }

		  _createClass(Pipeline, [{
		    key: "addProcessors",
		    value: function addProcessors() {
		      var _processors;

		      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
		        plugins[_key] = arguments[_key];
		      }

		      (_processors = this._processors).push.apply(_processors, plugins);
		    }
		  }, {
		    key: "process",
		    value: function process(files) {
		      var list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, processor;

		      return _regeneratorRuntime.async(function process$(context$2$0) {
		        while (1) switch (context$2$0.prev = context$2$0.next) {
		          case 0:
		            list = _Object$assign(_Object$create(null), files);
		            _iteratorNormalCompletion = true;
		            _didIteratorError = false;
		            _iteratorError = undefined;
		            context$2$0.prev = 4;
		            _iterator = _getIterator(this._processors);

		          case 6:
		            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
		              context$2$0.next = 14;
		              break;
		            }

		            processor = _step.value;
		            context$2$0.next = 10;
		            return processor.process(list);

		          case 10:
		            list = context$2$0.sent;

		          case 11:
		            _iteratorNormalCompletion = true;
		            context$2$0.next = 6;
		            break;

		          case 14:
		            context$2$0.next = 20;
		            break;

		          case 16:
		            context$2$0.prev = 16;
		            context$2$0.t0 = context$2$0["catch"](4);
		            _didIteratorError = true;
		            _iteratorError = context$2$0.t0;

		          case 20:
		            context$2$0.prev = 20;
		            context$2$0.prev = 21;

		            if (!_iteratorNormalCompletion && _iterator["return"]) {
		              _iterator["return"]();
		            }

		          case 23:
		            context$2$0.prev = 23;

		            if (!_didIteratorError) {
		              context$2$0.next = 26;
		              break;
		            }

		            throw _iteratorError;

		          case 26:
		            return context$2$0.finish(23);

		          case 27:
		            return context$2$0.finish(20);

		          case 28:
		            return context$2$0.abrupt("return", list);

		          case 29:
		          case "end":
		            return context$2$0.stop();
		        }
		      }, null, this, [[4, 16, 20, 28], [21,, 23, 27]]);
		    }
		  }]);

		  return Pipeline;
		})();

		exports.Pipeline = Pipeline;

	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(55), __esModule: true };

	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(56);
		module.exports = __webpack_require__(3).core.Object.assign;

	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.3.1 Object.assign(target, source)
		var $def = __webpack_require__(13);
		$def($def.S, 'Object', {assign: __webpack_require__(57)});

	/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {

		var $        = __webpack_require__(3)
		  , enumKeys = __webpack_require__(28);
		// 19.1.2.1 Object.assign(target, source, ...)
		/* eslint-disable no-unused-vars */
		module.exports = Object.assign || function assign(target, source){
		/* eslint-enable no-unused-vars */
		  var T = Object($.assertDefined(target))
		    , l = arguments.length
		    , i = 1;
		  while(l > i){
		    var S      = $.ES5Object(arguments[i++])
		      , keys   = enumKeys(S)
		      , length = keys.length
		      , j      = 0
		      , key;
		    while(length > j)T[key = keys[j++]] = S[key];
		  }
		  return T;
		};

	/***/ },
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(59), __esModule: true };

	/***/ },
	/* 59 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(36);
		__webpack_require__(32);
		__webpack_require__(60);
		module.exports = __webpack_require__(3).core.getIterator;

	/***/ },
	/* 60 */
	/***/ function(module, exports, __webpack_require__) {

		var core  = __webpack_require__(3).core
		  , $iter = __webpack_require__(34);
		core.isIterable  = $iter.is;
		core.getIterator = $iter.get;

	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _createClass = __webpack_require__(16)['default'];

		var _classCallCheck = __webpack_require__(14)['default'];

		var _Object$defineProperty = __webpack_require__(1)['default'];

		var _regeneratorRuntime = __webpack_require__(17)['default'];

		_Object$defineProperty(exports, '__esModule', {
		  value: true
		});

		var _errors = __webpack_require__(5);

		var Plugin = (function () {
		  function Plugin() {
		    _classCallCheck(this, Plugin);

		    if (this.constructor === Plugin) {
		      throw new _errors.RustieAbstractClassError('cannot instantiate class Plugin. Plugin is an abstract class');
		    }
		  }

		  _createClass(Plugin, [{
		    key: 'process',

		    //noinspection JSMethodCanBeStatic
		    value: function process(files) {
		      return _regeneratorRuntime.async(function process$(context$2$0) {
		        while (1) switch (context$2$0.prev = context$2$0.next) {
		          case 0:
		            return context$2$0.abrupt('return', files);

		          case 1:
		          case 'end':
		            return context$2$0.stop();
		        }
		      }, null, this);
		    }
		  }]);

		  return Plugin;
		})();

		exports.Plugin = Plugin;

	/***/ },
	/* 62 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _createClass = __webpack_require__(16)['default'];

		var _classCallCheck = __webpack_require__(14)['default'];

		var _Object$defineProperty = __webpack_require__(1)['default'];

		var _regeneratorRuntime = __webpack_require__(17)['default'];

		var _Object$create = __webpack_require__(7)['default'];

		_Object$defineProperty(exports, '__esModule', {
		  value: true
		});

		var _errors = __webpack_require__(5);

		var Reader = (function () {
		  function Reader() {
		    _classCallCheck(this, Reader);

		    if (this.constructor === Reader) {
		      throw new _errors.RustieAbstractClassError('cannot instantiate class Reader. Reader is an abstract class');
		    }
		  }

		  _createClass(Reader, [{
		    key: 'read',

		    //noinspection JSMethodCanBeStatic
		    value: function read() {
		      return _regeneratorRuntime.async(function read$(context$2$0) {
		        while (1) switch (context$2$0.prev = context$2$0.next) {
		          case 0:
		            return context$2$0.abrupt('return', _Object$create(null));

		          case 1:
		          case 'end':
		            return context$2$0.stop();
		        }
		      }, null, this);
		    }
		  }]);

		  return Reader;
		})();

		exports.Reader = Reader;
		/*from*/

	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _createClass = __webpack_require__(16)['default'];

		var _classCallCheck = __webpack_require__(14)['default'];

		var _Object$defineProperty = __webpack_require__(1)['default'];

		var _regeneratorRuntime = __webpack_require__(17)['default'];

		_Object$defineProperty(exports, '__esModule', {
		  value: true
		});

		var _errors = __webpack_require__(5);

		var Writer = (function () {
		  function Writer() {
		    _classCallCheck(this, Writer);

		    if (this.constructor === Writer) {
		      throw new _errors.RustieAbstractClassError('cannot instantiate class Writer. Writer is an abstract class');
		    }
		  }

		  _createClass(Writer, [{
		    key: 'write',

		    //noinspection JSMethodCanBeStatic
		    value: function write() {
		      return _regeneratorRuntime.async(function write$(context$2$0) {
		        while (1) switch (context$2$0.prev = context$2$0.next) {
		          case 0:
		            return context$2$0.abrupt('return', true);

		          case 1:
		          case 'end':
		            return context$2$0.stop();
		        }
		      }, null, this);
		    }
		  }]);

		  return Writer;
		})();

		exports.Writer = Writer;
		/*to, files*/

	/***/ },
	/* 64 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _createClass = __webpack_require__(16)["default"];

		var _classCallCheck = __webpack_require__(14)["default"];

		var _Object$defineProperty = __webpack_require__(1)["default"];

		var _Object$create = __webpack_require__(7)["default"];

		_Object$defineProperty(exports, "__esModule", {
		  value: true
		});

		var Data = (function () {
		  /**
		   *
		   * @param {Uint8Array} content
		   */

		  function Data(content) {
		    _classCallCheck(this, Data);

		    this._content = content;
		    this._metadata = _Object$create(null);
		  }

		  _createClass(Data, [{
		    key: "content",
		    get: function () {
		      return this._content;
		    },
		    set: function (value) {
		      this._content = value;
		    }
		  }, {
		    key: "metadata",
		    get: function () {
		      return this._metadata;
		    }
		  }]);

		  return Data;
		})();

		exports.Data = Data;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */

	'use strict';

	;(function () {

	  /**
	   * Block-Level Grammar
	   */

	  var block = {
	    newline: /^\n+/,
	    code: /^( {4}[^\n]+\n*)+/,
	    fences: noop,
	    hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	    nptable: noop,
	    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	    blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	    html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	    table: noop,
	    paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	    text: /^[^\n]+/
	  };

	  block.bullet = /(?:[*+-]|\d+\.)/;
	  block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	  block.item = replace(block.item, 'gm')(/bull/g, block.bullet)();

	  block.list = replace(block.list)(/bull/g, block.bullet)('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')('def', '\\n+(?=' + block.def.source + ')')();

	  block.blockquote = replace(block.blockquote)('def', block.def)();

	  block._tag = '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code' + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo' + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

	  block.html = replace(block.html)('comment', /<!--[\s\S]*?-->/)('closed', /<(tag)[\s\S]+?<\/\1>/)('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();

	  block.paragraph = replace(block.paragraph)('hr', block.hr)('heading', block.heading)('lheading', block.lheading)('blockquote', block.blockquote)('tag', '<' + block._tag)('def', block.def)();

	  /**
	   * Normal Block Grammar
	   */

	  block.normal = merge({}, block);

	  /**
	   * GFM Block Grammar
	   */

	  block.gfm = merge({}, block.normal, {
	    fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
	    paragraph: /^/
	  });

	  block.gfm.paragraph = replace(block.paragraph)('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|' + block.list.source.replace('\\1', '\\3') + '|')();

	  /**
	   * GFM + Tables Block Grammar
	   */

	  block.tables = merge({}, block.gfm, {
	    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	  });

	  /**
	   * Block Lexer
	   */

	  function Lexer(options) {
	    this.tokens = [];
	    this.tokens.links = {};
	    this.options = options || marked.defaults;
	    this.rules = block.normal;

	    if (this.options.gfm) {
	      if (this.options.tables) {
	        this.rules = block.tables;
	      } else {
	        this.rules = block.gfm;
	      }
	    }
	  }

	  /**
	   * Expose Block Rules
	   */

	  Lexer.rules = block;

	  /**
	   * Static Lex Method
	   */

	  Lexer.lex = function (src, options) {
	    var lexer = new Lexer(options);
	    return lexer.lex(src);
	  };

	  /**
	   * Preprocessing
	   */

	  Lexer.prototype.lex = function (src) {
	    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');

	    return this.token(src, true);
	  };

	  /**
	   * Lexing
	   */

	  Lexer.prototype.token = function (src, top, bq) {
	    var src = src.replace(/^ +$/gm, ''),
	        next,
	        loose,
	        cap,
	        bull,
	        b,
	        item,
	        space,
	        i,
	        l;

	    while (src) {
	      // newline
	      if (cap = this.rules.newline.exec(src)) {
	        src = src.substring(cap[0].length);
	        if (cap[0].length > 1) {
	          this.tokens.push({
	            type: 'space'
	          });
	        }
	      }

	      // code
	      if (cap = this.rules.code.exec(src)) {
	        src = src.substring(cap[0].length);
	        cap = cap[0].replace(/^ {4}/gm, '');
	        this.tokens.push({
	          type: 'code',
	          text: !this.options.pedantic ? cap.replace(/\n+$/, '') : cap
	        });
	        continue;
	      }

	      // fences (gfm)
	      if (cap = this.rules.fences.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'code',
	          lang: cap[2],
	          text: cap[3]
	        });
	        continue;
	      }

	      // heading
	      if (cap = this.rules.heading.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'heading',
	          depth: cap[1].length,
	          text: cap[2]
	        });
	        continue;
	      }

	      // table no leading pipe (gfm)
	      if (top && (cap = this.rules.nptable.exec(src))) {
	        src = src.substring(cap[0].length);

	        item = {
	          type: 'table',
	          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	          cells: cap[3].replace(/\n$/, '').split('\n')
	        };

	        for (i = 0; i < item.align.length; i++) {
	          if (/^ *-+: *$/.test(item.align[i])) {
	            item.align[i] = 'right';
	          } else if (/^ *:-+: *$/.test(item.align[i])) {
	            item.align[i] = 'center';
	          } else if (/^ *:-+ *$/.test(item.align[i])) {
	            item.align[i] = 'left';
	          } else {
	            item.align[i] = null;
	          }
	        }

	        for (i = 0; i < item.cells.length; i++) {
	          item.cells[i] = item.cells[i].split(/ *\| */);
	        }

	        this.tokens.push(item);

	        continue;
	      }

	      // lheading
	      if (cap = this.rules.lheading.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'heading',
	          depth: cap[2] === '=' ? 1 : 2,
	          text: cap[1]
	        });
	        continue;
	      }

	      // hr
	      if (cap = this.rules.hr.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'hr'
	        });
	        continue;
	      }

	      // blockquote
	      if (cap = this.rules.blockquote.exec(src)) {
	        src = src.substring(cap[0].length);

	        this.tokens.push({
	          type: 'blockquote_start'
	        });

	        cap = cap[0].replace(/^ *> ?/gm, '');

	        // Pass `top` to keep the current
	        // "toplevel" state. This is exactly
	        // how markdown.pl works.
	        this.token(cap, top, true);

	        this.tokens.push({
	          type: 'blockquote_end'
	        });

	        continue;
	      }

	      // list
	      if (cap = this.rules.list.exec(src)) {
	        src = src.substring(cap[0].length);
	        bull = cap[2];

	        this.tokens.push({
	          type: 'list_start',
	          ordered: bull.length > 1
	        });

	        // Get each top-level item.
	        cap = cap[0].match(this.rules.item);

	        next = false;
	        l = cap.length;
	        i = 0;

	        for (; i < l; i++) {
	          item = cap[i];

	          // Remove the list item's bullet
	          // so it is seen as the next token.
	          space = item.length;
	          item = item.replace(/^ *([*+-]|\d+\.) +/, '');

	          // Outdent whatever the
	          // list item contains. Hacky.
	          if (~item.indexOf('\n ')) {
	            space -= item.length;
	            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
	          }

	          // Determine whether the next list item belongs here.
	          // Backpedal if it does not belong in this list.
	          if (this.options.smartLists && i !== l - 1) {
	            b = block.bullet.exec(cap[i + 1])[0];
	            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	              src = cap.slice(i + 1).join('\n') + src;
	              i = l - 1;
	            }
	          }

	          // Determine whether item is loose or not.
	          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	          // for discount behavior.
	          loose = next || /\n\n(?!\s*$)/.test(item);
	          if (i !== l - 1) {
	            next = item.charAt(item.length - 1) === '\n';
	            if (!loose) loose = next;
	          }

	          this.tokens.push({
	            type: loose ? 'loose_item_start' : 'list_item_start'
	          });

	          // Recurse.
	          this.token(item, false, bq);

	          this.tokens.push({
	            type: 'list_item_end'
	          });
	        }

	        this.tokens.push({
	          type: 'list_end'
	        });

	        continue;
	      }

	      // html
	      if (cap = this.rules.html.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: this.options.sanitize ? 'paragraph' : 'html',
	          pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
	          text: cap[0]
	        });
	        continue;
	      }

	      // def
	      if (!bq && top && (cap = this.rules.def.exec(src))) {
	        src = src.substring(cap[0].length);
	        this.tokens.links[cap[1].toLowerCase()] = {
	          href: cap[2],
	          title: cap[3]
	        };
	        continue;
	      }

	      // table (gfm)
	      if (top && (cap = this.rules.table.exec(src))) {
	        src = src.substring(cap[0].length);

	        item = {
	          type: 'table',
	          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	          cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	        };

	        for (i = 0; i < item.align.length; i++) {
	          if (/^ *-+: *$/.test(item.align[i])) {
	            item.align[i] = 'right';
	          } else if (/^ *:-+: *$/.test(item.align[i])) {
	            item.align[i] = 'center';
	          } else if (/^ *:-+ *$/.test(item.align[i])) {
	            item.align[i] = 'left';
	          } else {
	            item.align[i] = null;
	          }
	        }

	        for (i = 0; i < item.cells.length; i++) {
	          item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
	        }

	        this.tokens.push(item);

	        continue;
	      }

	      // top-level paragraph
	      if (top && (cap = this.rules.paragraph.exec(src))) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'paragraph',
	          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
	        });
	        continue;
	      }

	      // text
	      if (cap = this.rules.text.exec(src)) {
	        // Top-level should never reach here.
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'text',
	          text: cap[0]
	        });
	        continue;
	      }

	      if (src) {
	        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
	      }
	    }

	    return this.tokens;
	  };

	  /**
	   * Inline-Level Grammar
	   */

	  var inline = {
	    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	    autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	    url: noop,
	    tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	    link: /^!?\[(inside)\]\(href\)/,
	    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	    nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	    em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	    code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	    br: /^ {2,}\n(?!\s*$)/,
	    del: noop,
	    text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	  };

	  inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	  inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

	  inline.link = replace(inline.link)('inside', inline._inside)('href', inline._href)();

	  inline.reflink = replace(inline.reflink)('inside', inline._inside)();

	  /**
	   * Normal Inline Grammar
	   */

	  inline.normal = merge({}, inline);

	  /**
	   * Pedantic Inline Grammar
	   */

	  inline.pedantic = merge({}, inline.normal, {
	    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	  });

	  /**
	   * GFM Inline Grammar
	   */

	  inline.gfm = merge({}, inline.normal, {
	    escape: replace(inline.escape)('])', '~|])')(),
	    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	    del: /^~~(?=\S)([\s\S]*?\S)~~/,
	    text: replace(inline.text)(']|', '~]|')('|', '|https?://|')()
	  });

	  /**
	   * GFM + Line Breaks Inline Grammar
	   */

	  inline.breaks = merge({}, inline.gfm, {
	    br: replace(inline.br)('{2,}', '*')(),
	    text: replace(inline.gfm.text)('{2,}', '*')()
	  });

	  /**
	   * Inline Lexer & Compiler
	   */

	  function InlineLexer(links, options) {
	    this.options = options || marked.defaults;
	    this.links = links;
	    this.rules = inline.normal;
	    this.renderer = this.options.renderer || new Renderer();
	    this.renderer.options = this.options;

	    if (!this.links) {
	      throw new Error('Tokens array requires a `links` property.');
	    }

	    if (this.options.gfm) {
	      if (this.options.breaks) {
	        this.rules = inline.breaks;
	      } else {
	        this.rules = inline.gfm;
	      }
	    } else if (this.options.pedantic) {
	      this.rules = inline.pedantic;
	    }
	  }

	  /**
	   * Expose Inline Rules
	   */

	  InlineLexer.rules = inline;

	  /**
	   * Static Lexing/Compiling Method
	   */

	  InlineLexer.output = function (src, links, options) {
	    var inline = new InlineLexer(links, options);
	    return inline.output(src);
	  };

	  /**
	   * Lexing/Compiling
	   */

	  InlineLexer.prototype.output = function (src) {
	    var out = '',
	        link,
	        text,
	        href,
	        cap;

	    while (src) {
	      // escape
	      if (cap = this.rules.escape.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += cap[1];
	        continue;
	      }

	      // autolink
	      if (cap = this.rules.autolink.exec(src)) {
	        src = src.substring(cap[0].length);
	        if (cap[2] === '@') {
	          text = cap[1].charAt(6) === ':' ? this.mangle(cap[1].substring(7)) : this.mangle(cap[1]);
	          href = this.mangle('mailto:') + text;
	        } else {
	          text = escape(cap[1]);
	          href = text;
	        }
	        out += this.renderer.link(href, null, text);
	        continue;
	      }

	      // url (gfm)
	      if (!this.inLink && (cap = this.rules.url.exec(src))) {
	        src = src.substring(cap[0].length);
	        text = escape(cap[1]);
	        href = text;
	        out += this.renderer.link(href, null, text);
	        continue;
	      }

	      // tag
	      if (cap = this.rules.tag.exec(src)) {
	        if (!this.inLink && /^<a /i.test(cap[0])) {
	          this.inLink = true;
	        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	          this.inLink = false;
	        }
	        src = src.substring(cap[0].length);
	        out += this.options.sanitize ? escape(cap[0]) : cap[0];
	        continue;
	      }

	      // link
	      if (cap = this.rules.link.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.inLink = true;
	        out += this.outputLink(cap, {
	          href: cap[2],
	          title: cap[3]
	        });
	        this.inLink = false;
	        continue;
	      }

	      // reflink, nolink
	      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
	        src = src.substring(cap[0].length);
	        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	        link = this.links[link.toLowerCase()];
	        if (!link || !link.href) {
	          out += cap[0].charAt(0);
	          src = cap[0].substring(1) + src;
	          continue;
	        }
	        this.inLink = true;
	        out += this.outputLink(cap, link);
	        this.inLink = false;
	        continue;
	      }

	      // strong
	      if (cap = this.rules.strong.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.strong(this.output(cap[2] || cap[1]));
	        continue;
	      }

	      // em
	      if (cap = this.rules.em.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.em(this.output(cap[2] || cap[1]));
	        continue;
	      }

	      // code
	      if (cap = this.rules.code.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.codespan(escape(cap[2], true));
	        continue;
	      }

	      // br
	      if (cap = this.rules.br.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.br();
	        continue;
	      }

	      // del (gfm)
	      if (cap = this.rules.del.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.del(this.output(cap[1]));
	        continue;
	      }

	      // text
	      if (cap = this.rules.text.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += escape(this.smartypants(cap[0]));
	        continue;
	      }

	      if (src) {
	        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
	      }
	    }

	    return out;
	  };

	  /**
	   * Compile Link
	   */

	  InlineLexer.prototype.outputLink = function (cap, link) {
	    var href = escape(link.href),
	        title = link.title ? escape(link.title) : null;

	    return cap[0].charAt(0) !== '!' ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
	  };

	  /**
	   * Smartypants Transformations
	   */

	  InlineLexer.prototype.smartypants = function (text) {
	    if (!this.options.smartypants) return text;
	    return text
	    // em-dashes
	    .replace(/--/g, '—')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
	    // closing singles & apostrophes
	    .replace(/'/g, '’')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
	    // closing doubles
	    .replace(/"/g, '”')
	    // ellipses
	    .replace(/\.{3}/g, '…');
	  };

	  /**
	   * Mangle Links
	   */

	  InlineLexer.prototype.mangle = function (text) {
	    var out = '',
	        l = text.length,
	        i = 0,
	        ch;

	    for (; i < l; i++) {
	      ch = text.charCodeAt(i);
	      if (Math.random() > 0.5) {
	        ch = 'x' + ch.toString(16);
	      }
	      out += '&#' + ch + ';';
	    }

	    return out;
	  };

	  /**
	   * Renderer
	   */

	  function Renderer(options) {
	    this.options = options || {};
	  }

	  Renderer.prototype.code = function (code, lang, escaped) {
	    if (this.options.highlight) {
	      var out = this.options.highlight(code, lang);
	      if (out != null && out !== code) {
	        escaped = true;
	        code = out;
	      }
	    }

	    if (!lang) {
	      return '<pre><code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
	    }

	    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
	  };

	  Renderer.prototype.blockquote = function (quote) {
	    return '<blockquote>\n' + quote + '</blockquote>\n';
	  };

	  Renderer.prototype.html = function (html) {
	    return html;
	  };

	  Renderer.prototype.heading = function (text, level, raw) {
	    return '<h' + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '">' + text + '</h' + level + '>\n';
	  };

	  Renderer.prototype.hr = function () {
	    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	  };

	  Renderer.prototype.list = function (body, ordered) {
	    var type = ordered ? 'ol' : 'ul';
	    return '<' + type + '>\n' + body + '</' + type + '>\n';
	  };

	  Renderer.prototype.listitem = function (text) {
	    return '<li>' + text + '</li>\n';
	  };

	  Renderer.prototype.paragraph = function (text) {
	    return '<p>' + text + '</p>\n';
	  };

	  Renderer.prototype.table = function (header, body) {
	    return '<table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table>\n';
	  };

	  Renderer.prototype.tablerow = function (content) {
	    return '<tr>\n' + content + '</tr>\n';
	  };

	  Renderer.prototype.tablecell = function (content, flags) {
	    var type = flags.header ? 'th' : 'td';
	    var tag = flags.align ? '<' + type + ' style="text-align:' + flags.align + '">' : '<' + type + '>';
	    return tag + content + '</' + type + '>\n';
	  };

	  // span level renderer
	  Renderer.prototype.strong = function (text) {
	    return '<strong>' + text + '</strong>';
	  };

	  Renderer.prototype.em = function (text) {
	    return '<em>' + text + '</em>';
	  };

	  Renderer.prototype.codespan = function (text) {
	    return '<code>' + text + '</code>';
	  };

	  Renderer.prototype.br = function () {
	    return this.options.xhtml ? '<br/>' : '<br>';
	  };

	  Renderer.prototype.del = function (text) {
	    return '<del>' + text + '</del>';
	  };

	  Renderer.prototype.link = function (href, title, text) {
	    if (this.options.sanitize) {
	      try {
	        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
	      } catch (e) {
	        return '';
	      }
	      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	        return '';
	      }
	    }
	    var out = '<a href="' + href + '"';
	    if (title) {
	      out += ' title="' + title + '"';
	    }
	    out += '>' + text + '</a>';
	    return out;
	  };

	  Renderer.prototype.image = function (href, title, text) {
	    var out = '<img src="' + href + '" alt="' + text + '"';
	    if (title) {
	      out += ' title="' + title + '"';
	    }
	    out += this.options.xhtml ? '/>' : '>';
	    return out;
	  };

	  /**
	   * Parsing & Compiling
	   */

	  function Parser(options) {
	    this.tokens = [];
	    this.token = null;
	    this.options = options || marked.defaults;
	    this.options.renderer = this.options.renderer || new Renderer();
	    this.renderer = this.options.renderer;
	    this.renderer.options = this.options;
	  }

	  /**
	   * Static Parse Method
	   */

	  Parser.parse = function (src, options, renderer) {
	    var parser = new Parser(options, renderer);
	    return parser.parse(src);
	  };

	  /**
	   * Parse Loop
	   */

	  Parser.prototype.parse = function (src) {
	    this.inline = new InlineLexer(src.links, this.options, this.renderer);
	    this.tokens = src.reverse();

	    var out = '';
	    while (this.next()) {
	      out += this.tok();
	    }

	    return out;
	  };

	  /**
	   * Next Token
	   */

	  Parser.prototype.next = function () {
	    return this.token = this.tokens.pop();
	  };

	  /**
	   * Preview Next Token
	   */

	  Parser.prototype.peek = function () {
	    return this.tokens[this.tokens.length - 1] || 0;
	  };

	  /**
	   * Parse Text Tokens
	   */

	  Parser.prototype.parseText = function () {
	    var body = this.token.text;

	    while (this.peek().type === 'text') {
	      body += '\n' + this.next().text;
	    }

	    return this.inline.output(body);
	  };

	  /**
	   * Parse Current Token
	   */

	  Parser.prototype.tok = function () {
	    switch (this.token.type) {
	      case 'space':
	        {
	          return '';
	        }
	      case 'hr':
	        {
	          return this.renderer.hr();
	        }
	      case 'heading':
	        {
	          return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
	        }
	      case 'code':
	        {
	          return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
	        }
	      case 'table':
	        {
	          var header = '',
	              body = '',
	              i,
	              row,
	              cell,
	              flags,
	              j;

	          // header
	          cell = '';
	          for (i = 0; i < this.token.header.length; i++) {
	            flags = { header: true, align: this.token.align[i] };
	            cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), { header: true, align: this.token.align[i] });
	          }
	          header += this.renderer.tablerow(cell);

	          for (i = 0; i < this.token.cells.length; i++) {
	            row = this.token.cells[i];

	            cell = '';
	            for (j = 0; j < row.length; j++) {
	              cell += this.renderer.tablecell(this.inline.output(row[j]), { header: false, align: this.token.align[j] });
	            }

	            body += this.renderer.tablerow(cell);
	          }
	          return this.renderer.table(header, body);
	        }
	      case 'blockquote_start':
	        {
	          var body = '';

	          while (this.next().type !== 'blockquote_end') {
	            body += this.tok();
	          }

	          return this.renderer.blockquote(body);
	        }
	      case 'list_start':
	        {
	          var body = '',
	              ordered = this.token.ordered;

	          while (this.next().type !== 'list_end') {
	            body += this.tok();
	          }

	          return this.renderer.list(body, ordered);
	        }
	      case 'list_item_start':
	        {
	          var body = '';

	          while (this.next().type !== 'list_item_end') {
	            body += this.token.type === 'text' ? this.parseText() : this.tok();
	          }

	          return this.renderer.listitem(body);
	        }
	      case 'loose_item_start':
	        {
	          var body = '';

	          while (this.next().type !== 'list_item_end') {
	            body += this.tok();
	          }

	          return this.renderer.listitem(body);
	        }
	      case 'html':
	        {
	          var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
	          return this.renderer.html(html);
	        }
	      case 'paragraph':
	        {
	          return this.renderer.paragraph(this.inline.output(this.token.text));
	        }
	      case 'text':
	        {
	          return this.renderer.paragraph(this.parseText());
	        }
	    }
	  };

	  /**
	   * Helpers
	   */

	  function escape(html, encode) {
	    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	  }

	  function unescape(html) {
	    return html.replace(/&([#\w]+);/g, function (_, n) {
	      n = n.toLowerCase();
	      if (n === 'colon') return ':';
	      if (n.charAt(0) === '#') {
	        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
	      }
	      return '';
	    });
	  }

	  function replace(regex, opt) {
	    regex = regex.source;
	    opt = opt || '';
	    return function self(name, val) {
	      if (!name) return new RegExp(regex, opt);
	      val = val.source || val;
	      val = val.replace(/(^|[^\[])\^/g, '$1');
	      regex = regex.replace(name, val);
	      return self;
	    };
	  }

	  function noop() {}
	  noop.exec = noop;

	  function merge(obj) {
	    var i = 1,
	        target,
	        key;

	    for (; i < arguments.length; i++) {
	      target = arguments[i];
	      for (key in target) {
	        if (Object.prototype.hasOwnProperty.call(target, key)) {
	          obj[key] = target[key];
	        }
	      }
	    }

	    return obj;
	  }

	  /**
	   * Marked
	   */

	  function marked(src, opt, callback) {
	    if (callback || typeof opt === 'function') {
	      if (!callback) {
	        callback = opt;
	        opt = null;
	      }

	      opt = merge({}, marked.defaults, opt || {});

	      var highlight = opt.highlight,
	          tokens,
	          pending,
	          i = 0;

	      try {
	        tokens = Lexer.lex(src, opt);
	      } catch (e) {
	        return callback(e);
	      }

	      pending = tokens.length;

	      var done = function done(err) {
	        if (err) {
	          opt.highlight = highlight;
	          return callback(err);
	        }

	        var out;

	        try {
	          out = Parser.parse(tokens, opt);
	        } catch (e) {
	          err = e;
	        }

	        opt.highlight = highlight;

	        return err ? callback(err) : callback(null, out);
	      };

	      if (!highlight || highlight.length < 3) {
	        return done();
	      }

	      delete opt.highlight;

	      if (!pending) return done();

	      for (; i < tokens.length; i++) {
	        (function (token) {
	          if (token.type !== 'code') {
	            return --pending || done();
	          }
	          return highlight(token.text, token.lang, function (err, code) {
	            if (err) return done(err);
	            if (code == null || code === token.text) {
	              return --pending || done();
	            }
	            token.text = code;
	            token.escaped = true;
	            --pending || done();
	          });
	        })(tokens[i]);
	      }

	      return;
	    }
	    try {
	      if (opt) opt = merge({}, marked.defaults, opt);
	      return Parser.parse(Lexer.lex(src, opt), opt);
	    } catch (e) {
	      e.message += '\nPlease report this to https://github.com/chjj/marked.';
	      if ((opt || marked.defaults).silent) {
	        return '<p>An error occured:</p><pre>' + escape(e.message + '', true) + '</pre>';
	      }
	      throw e;
	    }
	  }

	  /**
	   * Options
	   */

	  marked.options = marked.setOptions = function (opt) {
	    merge(marked.defaults, opt);
	    return marked;
	  };

	  marked.defaults = {
	    gfm: true,
	    tables: true,
	    breaks: false,
	    pedantic: false,
	    sanitize: false,
	    smartLists: false,
	    silent: false,
	    highlight: null,
	    langPrefix: 'lang-',
	    smartypants: false,
	    headerPrefix: '',
	    renderer: new Renderer(),
	    xhtml: false
	  };

	  /**
	   * Expose
	   */

	  marked.Parser = Parser;
	  marked.parser = Parser.parse;

	  marked.Renderer = Renderer;

	  marked.Lexer = Lexer;
	  marked.lexer = Lexer.lex;

	  marked.InlineLexer = InlineLexer;
	  marked.inlineLexer = InlineLexer.output;

	  marked.parse = marked;

	  if (true) {
	    module.exports = marked;
	  } else if (typeof define === 'function' && define.amd) {
	    define(function () {
	      return marked;
	    });
	  } else {
	    this.marked = marked;
	  }
	}).call((function () {
	  return this || (typeof window !== 'undefined' ? window : global);
	})());
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;