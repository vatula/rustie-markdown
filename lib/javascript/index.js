(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/define-property', 'babel-runtime/regenerator', 'babel-runtime/core-js/object/keys', 'rustie', './marked', 'babel-runtime/helpers/interop-require-default'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/create-class'), require('babel-runtime/helpers/class-call-check'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/regenerator'), require('babel-runtime/core-js/object/keys'), require('rustie'), require('./marked'), require('babel-runtime/helpers/interop-require-default'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._inherits, global._createClass, global._classCallCheck, global._Object$defineProperty, global._regeneratorRuntime, global._Object$keys, global.rustie, global.marked, global._interopRequireDefault);
    global.index = mod.exports;
  }
})(this, function (exports, _babelRuntimeHelpersInherits, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeCoreJsObjectDefineProperty, _babelRuntimeRegenerator, _babelRuntimeCoreJsObjectKeys, _rustie, _marked, _babelRuntimeHelpersInteropRequireDefault) {
  'use strict';

  (0, _babelRuntimeCoreJsObjectDefineProperty['default'])(exports, '__esModule', {
    value: true
  });

  var _marked2 = (0, _babelRuntimeHelpersInteropRequireDefault['default'])(_marked);

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
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, Markdown);

      if (_Plugin != null) {
        _Plugin.apply(this, arguments);
      }
    }

    (0, _babelRuntimeHelpersInherits['default'])(Markdown, _Plugin);
    (0, _babelRuntimeHelpersCreateClass['default'])(Markdown, [{
      key: 'process',
      value: function process(files) {
        return _babelRuntimeRegenerator['default'].async(function process$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              (0, _babelRuntimeCoreJsObjectKeys['default'])(files).forEach(function (path) {
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
});