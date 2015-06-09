(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'rustie', './marked'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('rustie'), require('./marked'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.rustie, global.marked);
    global.index = mod.exports;
  }
})(this, function (exports, _rustie, _marked) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
        return regeneratorRuntime.async(function process$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              Object.keys(files).forEach(function (path) {
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