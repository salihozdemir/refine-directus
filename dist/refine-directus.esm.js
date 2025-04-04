export * from '@directus/sdk';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

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
  exports.wrap = wrap;

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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

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
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
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
        return new PromiseImpl(function(resolve, reject) {
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
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
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
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
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
        context.arg = undefined$1;
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

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

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

  exports.keys = function(object) {
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

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
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
          context.arg = undefined$1;
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
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var operators = {
  eq: "_eq",
  ne: "_neq",
  lt: "_lt",
  gt: "_gt",
  lte: "_lte",
  gte: "_gte",
  "in": "_in",
  nin: "_nin",
  contains: "_contains",
  containss: undefined,
  ncontains: "_ncontains",
  ncontainss: undefined,
  "null": "_null",
  nnull: "_nnull",
  between: "_between",
  nbetween: "_nbetween"
};

var strToObj = function strToObj(str, val) {
  var i,
      obj = {},
      strarr = str.split('.');
  var x = obj;

  for (i = 0; i < strarr.length - 1; i++) {
    x = x[strarr[i]] = {};
  }

  x[strarr[i]] = val;
  return obj;
};

var generateSort = function generateSort(sort) {
  var _sort = [];

  if (sort) {
    sort.map(function (item) {
      if (item.order) {
        item.order === "desc" ? _sort.push("-" + item.field) : _sort.push("" + item.field);
      }
    });
  }

  return _sort;
};

var generateFilter = function generateFilter(filters) {
  var queryFilters = {};
  var search = '';

  if (filters) {
    queryFilters['_and'] = [];
    filters.map(function (_ref) {
      var field = _ref.field,
          operator = _ref.operator,
          value = _ref.value;

      if (value) {
        if (field === "search") {
          search = value;
        } else {
          var directusOperator = operators[operator];
          var queryField = field + "." + directusOperator;
          var filterObj = strToObj(queryField, value);
          queryFilters['_and'].push(filterObj);
        }
      }
    });
  }

  return {
    search: search,
    filters: queryFilters
  };
};

var dataProvider = function dataProvider(directusClient) {
  return {
    getList: function () {
      var _getList = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref2) {
        var resource, pagination, filters, sort, metaData, current, pageSize, _sort, paramsFilters, sortString, directus, params, response;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resource = _ref2.resource, pagination = _ref2.pagination, filters = _ref2.filters, sort = _ref2.sort, metaData = _ref2.metaData;
                current = (pagination == null ? void 0 : pagination.current) || 1;
                pageSize = (pagination == null ? void 0 : pagination.pageSize) || 50;
                _sort = generateSort(sort);
                paramsFilters = generateFilter(filters);
                sortString = sort && sort.length > 0 ? _sort.join(",") : '-date_created';
                directus = directusClient.items(resource);
                params = _extends({
                  search: paramsFilters.search,
                  filter: _extends({}, paramsFilters.filters, {
                    status: {
                      _neq: 'archived'
                    }
                  }),
                  meta: '*',
                  page: current,
                  limit: pageSize,
                  sort: sortString,
                  fields: ['*']
                }, metaData);
                _context.prev = 8;
                _context.next = 11;
                return directus.readByQuery(params);

              case 11:
                response = _context.sent;
                return _context.abrupt("return", {
                  data: response.data,
                  total: response.meta.filter_count
                });

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](8);
                console.log(_context.t0);
                throw new Error(_context.t0.errors && _context.t0.errors[0] && _context.t0.errors[0].message);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[8, 15]]);
      }));

      function getList(_x) {
        return _getList.apply(this, arguments);
      }

      return getList;
    }(),
    getMany: function () {
      var _getMany = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(_ref3) {
        var resource, ids, metaData, directus, params, response;
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resource = _ref3.resource, ids = _ref3.ids, metaData = _ref3.metaData;
                directus = directusClient.items(resource);
                params = _extends({
                  filter: {
                    id: {
                      _in: ids
                    },
                    status: {
                      _neq: 'archived'
                    }
                  },
                  fields: ['*']
                }, metaData);
                _context2.prev = 3;
                _context2.next = 6;
                return directus.readByQuery(params);

              case 6:
                response = _context2.sent;
                return _context2.abrupt("return", {
                  data: response.data,
                  total: response.meta.filter_count
                });

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                console.log(_context2.t0);
                throw new Error(_context2.t0.errors && _context2.t0.errors[0] && _context2.t0.errors[0].message);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 10]]);
      }));

      function getMany(_x2) {
        return _getMany.apply(this, arguments);
      }

      return getMany;
    }(),
    create: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(_ref4) {
        var resource, variables, metaData, directus, params, response;
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resource = _ref4.resource, variables = _ref4.variables, metaData = _ref4.metaData;
                directus = directusClient.items(resource);
                params = _extends({}, variables, metaData);
                _context3.prev = 3;
                _context3.next = 6;
                return directus.createOne(params);

              case 6:
                response = _context3.sent;
                return _context3.abrupt("return", {
                  data: response
                });

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](3);
                console.log(_context3.t0);
                throw new Error(_context3.t0.errors && _context3.t0.errors[0] && _context3.t0.errors[0].message);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 10]]);
      }));

      function create(_x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }(),
    update: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(_ref5) {
        var resource, id, variables, metaData, directus, params, response;
        return runtime_1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resource = _ref5.resource, id = _ref5.id, variables = _ref5.variables, metaData = _ref5.metaData;
                directus = directusClient.items(resource);
                params = _extends({}, variables, metaData);
                _context4.prev = 3;
                _context4.next = 6;
                return directus.updateOne(id, params);

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", {
                  data: response
                });

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](3);
                console.log(_context4.t0);
                throw new Error(_context4.t0.errors && _context4.t0.errors[0] && _context4.t0.errors[0].message);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[3, 10]]);
      }));

      function update(_x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }(),
    updateMany: function () {
      var _updateMany = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(_ref6) {
        var resource, ids, variables, metaData, directus, params, response;
        return runtime_1.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resource = _ref6.resource, ids = _ref6.ids, variables = _ref6.variables, metaData = _ref6.metaData;
                directus = directusClient.items(resource);
                params = _extends({}, variables, metaData);
                _context5.prev = 3;
                _context5.next = 6;
                return directus.updateMany(ids, params);

              case 6:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  data: response.data
                });

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](3);
                console.log(_context5.t0);
                throw new Error(_context5.t0.errors && _context5.t0.errors[0] && _context5.t0.errors[0].message);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 10]]);
      }));

      function updateMany(_x5) {
        return _updateMany.apply(this, arguments);
      }

      return updateMany;
    }(),
    createMany: function () {
      var _createMany = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(_ref7) {
        var resource, variables, metaData, directus, params, response;
        return runtime_1.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                resource = _ref7.resource, variables = _ref7.variables, metaData = _ref7.metaData;
                directus = directusClient.items(resource);
                params = _extends({}, variables, metaData);
                _context6.prev = 3;
                _context6.next = 6;
                return directus.createMany(params);

              case 6:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  data: response.data
                });

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](3);
                console.log(_context6.t0);
                throw new Error(_context6.t0.errors && _context6.t0.errors[0] && _context6.t0.errors[0].message);

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 10]]);
      }));

      function createMany(_x6) {
        return _createMany.apply(this, arguments);
      }

      return createMany;
    }(),
    getOne: function () {
      var _getOne = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(_ref8) {
        var resource, id, metaData, directus, params, response;
        return runtime_1.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resource = _ref8.resource, id = _ref8.id, metaData = _ref8.metaData;
                directus = directusClient.items(resource);
                params = _extends({}, metaData);
                _context7.prev = 3;
                _context7.next = 6;
                return directus.readOne(id, params);

              case 6:
                response = _context7.sent;
                return _context7.abrupt("return", Promise.resolve({
                  data: response
                }));

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](3);
                console.log(_context7.t0);
                throw new Error(_context7.t0.errors && _context7.t0.errors[0] && _context7.t0.errors[0].message);

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[3, 10]]);
      }));

      function getOne(_x7) {
        return _getOne.apply(this, arguments);
      }

      return getOne;
    }(),
    deleteOne: function () {
      var _deleteOne = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(_ref9) {
        var resource, id, directus, response;
        return runtime_1.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                resource = _ref9.resource, id = _ref9.id;
                directus = directusClient.items(resource);
                _context8.prev = 2;
                _context8.next = 5;
                return directus.deleteOne(id);

              case 5:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  data: response
                });

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](2);
                console.log(_context8.t0);
                throw new Error(_context8.t0.errors && _context8.t0.errors[0] && _context8.t0.errors[0].message);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 9]]);
      }));

      function deleteOne(_x8) {
        return _deleteOne.apply(this, arguments);
      }

      return deleteOne;
    }(),
    deleteMany: function () {
      var _deleteMany = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(_ref10) {
        var resource, ids, directus, response;
        return runtime_1.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                resource = _ref10.resource, ids = _ref10.ids;
                directus = directusClient.items(resource);
                _context9.prev = 2;
                _context9.next = 5;
                return directus.deleteMany(ids);

              case 5:
                response = _context9.sent;
                return _context9.abrupt("return", {
                  data: response.data
                });

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](2);
                console.log(_context9.t0);
                throw new Error(_context9.t0.errors && _context9.t0.errors[0] && _context9.t0.errors[0].message);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 9]]);
      }));

      function deleteMany(_x9) {
        return _deleteMany.apply(this, arguments);
      }

      return deleteMany;
    }(),
    getApiUrl: function getApiUrl() {
      return directusClient.getUrl();
    },
    custom: function () {
      var _custom = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(_ref11) {
        var url, method, payload, query, headers, directusTransport, response;
        return runtime_1.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                url = _ref11.url, method = _ref11.method, payload = _ref11.payload, query = _ref11.query, headers = _ref11.headers;
                directusTransport = directusClient.transport;
                _context10.t0 = method;
                _context10.next = _context10.t0 === "put" ? 5 : _context10.t0 === "post" ? 9 : _context10.t0 === "patch" ? 13 : _context10.t0 === "delete" ? 17 : 21;
                break;

              case 5:
                _context10.next = 7;
                return directusTransport.put(url, payload, {
                  headers: headers,
                  params: query
                });

              case 7:
                response = _context10.sent;
                return _context10.abrupt("break", 25);

              case 9:
                _context10.next = 11;
                return directusTransport.post(url, payload, {
                  headers: headers,
                  params: query
                });

              case 11:
                response = _context10.sent;
                return _context10.abrupt("break", 25);

              case 13:
                _context10.next = 15;
                return directusTransport.patch(url, payload, {
                  headers: headers,
                  params: query
                });

              case 15:
                response = _context10.sent;
                return _context10.abrupt("break", 25);

              case 17:
                _context10.next = 19;
                return directusTransport["delete"](url, {
                  headers: headers,
                  params: query
                });

              case 19:
                response = _context10.sent;
                return _context10.abrupt("break", 25);

              case 21:
                _context10.next = 23;
                return directusTransport.get(url, {
                  headers: headers,
                  params: query
                });

              case 23:
                response = _context10.sent;
                return _context10.abrupt("break", 25);

              case 25:
                return _context10.abrupt("return", _extends({}, response, {
                  data: response.data
                }));

              case 26:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function custom(_x10) {
        return _custom.apply(this, arguments);
      }

      return custom;
    }()
  };
};

var AuthHelper = function AuthHelper(directusClient) {
  return {
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(identifier, password) {
        var response;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return directusClient.auth.login({
                  email: identifier,
                  password: password
                });

              case 2:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    me: function () {
      var _me = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(metaData) {
        var me;
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return directusClient.users.me.read(metaData);

              case 2:
                me = _context2.sent;
                return _context2.abrupt("return", me);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function me(_x3) {
        return _me.apply(this, arguments);
      }

      return me;
    }(),
    setToken: function () {
      var _setToken = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(token) {
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return directusClient.auth["static"](token);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function setToken(_x4) {
        return _setToken.apply(this, arguments);
      }

      return setToken;
    }(),
    getToken: function getToken() {
      return directusClient.auth.token;
    },
    logout: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
        return runtime_1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return directusClient.auth.logout();

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  };
};

var getValueProps = function getValueProps(data, imageUrl) {
  var _data$fileList;

  if (!data) {
    return {
      fileList: []
    };
  }

  return {
    file: data.file,
    fileList: (_data$fileList = data.fileList) != null ? _data$fileList : (Array.isArray(data) ? data : [].concat(data)).map(function (item) {
      var file = {
        name: item.name,
        percent: item.percent,
        size: item.size,
        status: item.status,
        type: item.mime || item.type,
        uid: item.id
      };

      if (item.url) {
        file.url = "" + imageUrl + item.url;
      }

      return file;
    })
  };
};
var mediaUploadMapper = function mediaUploadMapper(params) {
  Object.keys(params).map(function (item) {
    if (params[item]) {
      var param = params[item].fileList;
      var isMediaField = Array.isArray(param);

      if (isMediaField) {
        var ids = [];

        for (var _iterator = _createForOfIteratorHelperLoose(param), _step; !(_step = _iterator()).done;) {
          var _item = _step.value;

          if (_item.response) {
            for (var _iterator2 = _createForOfIteratorHelperLoose(_item.response), _step2; !(_step2 = _iterator2()).done;) {
              var response = _step2.value;
              ids.push(response.id);
            }
          } else {
            ids.push(_item.uid);
          }
        }

        params[item] = ids;
      }
    }
  });
  return params;
};

export { AuthHelper, dataProvider, getValueProps, mediaUploadMapper };
//# sourceMappingURL=refine-directus.esm.js.map
