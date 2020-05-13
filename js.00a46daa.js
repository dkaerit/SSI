// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils/transforms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str = exports.bins = exports.hexs = exports.ints = void 0;
var ints = {
  fromString: function fromString(msg) {
    return msg.split('').map(function (char) {
      return char.charCodeAt(0);
    });
  },
  fromHexs: function fromHexs(arr_hex) {
    if (!Array.isArray(arr_hex)) return parseInt(arr_hex, 16);else {
      return arr_hex.map(function (byte) {
        return parseInt(byte, 16);
      });
    }
  },
  fromBins: function fromBins(arr_bin) {
    if (!Array.isArray(arr_bin)) return parseInt(arr_bin, 2);else {
      return arr_bin.map(function (byte) {
        return parseInt(byte, 2);
      });
    }
  }
};
exports.ints = ints;
var hexs = {
  fromInts: function fromInts(arr_int, mode) {
    if (!Array.isArray(arr_int)) {
      if (mode == "number") {
        if (arr_int.toString(16).length < 2) return Number("0x0".concat(arr_int.toString(16)));else return Number("0x".concat(arr_int.toString(16)));
      } else {
        if (arr_int.toString(16).length < 2) return "0".concat(arr_int.toString(16));else return "".concat(arr_int.toString(16));
      }
    } else {
      return arr_int.map(function (byte) {
        if (byte.toString(16).length < 2) return "0" + byte.toString(16);else return byte.toString(16);
      });
    }
  },
  fromString: function fromString(msg) {
    return this.fromInts(ints.fromString(msg));
  },
  fromBins: function fromBins(arr_bin) {
    return this.fromInts(ints.fromBins(arr_bin));
  }
};
exports.hexs = hexs;
var bins = {
  fromInts: function fromInts(arr_int) {
    if (!Array.isArray(arr_int)) return "0".repeat(8 - arr_int.toString(2).length) + arr_int.toString(2);else {
      return arr_int.map(function (byte) {
        return "0".repeat(8 - byte.toString(2).length) + byte.toString(2);
      });
    }
  },
  fromString: function fromString(msg) {
    return this.fromInts(ints.fromString(msg));
  },
  fromHexs: function fromHexs(arr_hex) {
    return this.fromInts(ints.fromHexs(arr_hex));
  }
};
exports.bins = bins;
var str = {
  fromInts: function fromInts(arr_int) {
    if (!Array.isArray(arr_int)) return String.fromCharCode(arr_int);else {
      return arr_int.map(function (byte, i) {
        return String.fromCharCode(byte);
      });
    }
  },
  fromHexs: function fromHexs(arr_hex) {
    return this.fromInts(ints.fromHexs(arr_hex));
  },
  fromBins: function fromBins(arr_bin) {
    return this.fromInts(ints.fromBins(arr_bin));
  }
};
exports.str = str;
},{}],"js/alg/p1-vernam.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transforms = require("../utils/transforms");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p1 = /*#__PURE__*/function () {
  // vernam
  function p1(format, plaintext, key) {
    _classCallCheck(this, p1);

    if (format == "srt") {
      this.msg = _transforms.ints.fromString(plaintext);
    }

    if (format == "hex") {
      this.msg = _transforms.ints.fromHexs(plaintext);
    }

    if (format == "int") {}

    if (format == "bin") {
      this.msg = _transforms.ints.fromBins(plaintext);
    } // gestion de los inputs


    this.key = _transforms.bins.fromString(key);
    this.intskey = _transforms.ints.fromString(key);
    this.msgbin = _transforms.bins.fromString(plaintext);
    this.res = _transforms.ints.fromString(plaintext); // encriptación

    this.res = this.encrypt(); // mensajes consola

    console.log("\"".concat(plaintext, "\":"), this.msgbin.join(''), this.msgbin.join('').length);
    console.log("\"".concat(key, "\":"), this.key.join(''), this.key.join('').length); // renderizado

    $("#res-plaintext").html(_transforms.str.fromInts(this.res));
    $("#res-bin").html(_transforms.bins.fromInts(this.res).join(', '));
    $("#res-hex").html(_transforms.hexs.fromInts(this.res).join(', '));
    $("#res-int").html(this.res.join(', '));
  }

  _createClass(p1, [{
    key: "encrypt",
    value: function encrypt() {
      var _this = this;

      return this.res.map(function (it, ix) {
        return it, _this.intskey[ix], it ^ _this.intskey[ix];
      });
    }
  }, {
    key: "generate_key",
    value: function generate_key() {}
  }]);

  return p1;
}();

exports.default = p1;
},{"../utils/transforms":"js/utils/transforms.js"}],"js/alg/p2-vigenere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var p2 = function p2(cipher_key, Plaintext) {
  _classCallCheck(this, p2);
};

exports.default = p2;
},{}],"js/alg/p3-rc4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p4-a5-1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p5-gen-e0.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p6-multi-snow3g-y-aes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p7-rijndael.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p8-cbc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p9-diffle-hellman.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p10-fiat-shamir.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p11-rsa.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/alg/p12-gamal-eliptico.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = function hello(cipher_key, Plaintext, mode) {
  _classCallCheck(this, hello);
};

exports.default = hello;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _transforms = require("./utils/transforms");

var _p1Vernam = _interopRequireDefault(require("./alg/p1-vernam"));

var _p2Vigenere = _interopRequireDefault(require("./alg/p2-vigenere"));

var _p3Rc = _interopRequireDefault(require("./alg/p3-rc4"));

var _p4A = _interopRequireDefault(require("./alg/p4-a5-1"));

var _p5GenE = _interopRequireDefault(require("./alg/p5-gen-e0"));

var _p6MultiSnow3gYAes = _interopRequireDefault(require("./alg/p6-multi-snow3g-y-aes"));

var _p7Rijndael = _interopRequireDefault(require("./alg/p7-rijndael"));

var _p8Cbc = _interopRequireDefault(require("./alg/p8-cbc"));

var _p9DiffleHellman = _interopRequireDefault(require("./alg/p9-diffle-hellman"));

var _p10FiatShamir = _interopRequireDefault(require("./alg/p10-fiat-shamir"));

var _p11Rsa = _interopRequireDefault(require("./alg/p11-rsa"));

var _p12GamalEliptico = _interopRequireDefault(require("./alg/p12-gamal-eliptico"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

disable(1, 1, 1, 1);
var objs = [0, _p1Vernam.default, _p2Vigenere.default, _p3Rc.default, _p4A.default, _p5GenE.default, _p6MultiSnow3gYAes.default, _p7Rijndael.default, _p8Cbc.default, _p9DiffleHellman.default, _p10FiatShamir.default, _p11Rsa.default, _p12GamalEliptico.default];
$('#algoritmo').children().map(function (it) {
  return createEvent(objs[it], $('#algoritmo').children()[it].innerHTML);
});
$('#algoritmo').change(function () {
  switch ($('#algoritmo option:selected').text()) {
    case "P1  - Vernam":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      $("#cipherkey").html(_transforms.str.fromBins(["00111100", "00011000", "01110011"]).join(''));
      ;
      break;

    case "P2  - Vigenere":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P3  - RC4":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P4  - A5-1":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P5  - Generador E0 de Bluetooth":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P6  - Multiplicación Snow3G y AES":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P7  - Rijndael":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P8  - CBC":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P9  - Diffle-Hellman":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P10 - Fiat-Shamir":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P11 - RSA":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    case "P12 - Gamal Elíptico":
      active(1, 1, 1, 1);
      disable(0, 0, 1, 0);
      ;
      break;

    default:
      $('#cipherkey').attr('disabled', 'disabled');
      $('#plaintext').attr('disabled', 'disabled');
      $('#encrypt').attr('disabled', 'disabled');
      ;
      break;
  }
});

function disable(formato, plaintext, key, btn) {
  if (formato) $('#formato').attr('disabled', 'disabled');
  if (plaintext) $('#plaintext').attr('disabled', 'disabled');
  if (key) $('#cipherkey').attr('disabled', 'disabled');
  if (btn) $('#encrypt').attr('disabled', 'disabled');
}

function active(formato, plaintext, key, btn) {
  if (formato) $('#formato').removeAttr('disabled');
  if (plaintext) $('#plaintext').removeAttr('disabled');
  if (key) $('#cipherkey').removeAttr('disabled');
  if (btn) $('#encrypt').removeAttr('disabled');
}

function createEvent(obj, tag) {
  $("#encrypt").click(function () {
    if ($('#algoritmo option:selected').text() == tag) new obj($('#formato option:selected').val(), $("#plaintext").val(), $("#cipherkey").val());
  });
}
},{"./utils/transforms":"js/utils/transforms.js","./alg/p1-vernam":"js/alg/p1-vernam.js","./alg/p2-vigenere":"js/alg/p2-vigenere.js","./alg/p3-rc4":"js/alg/p3-rc4.js","./alg/p4-a5-1":"js/alg/p4-a5-1.js","./alg/p5-gen-e0":"js/alg/p5-gen-e0.js","./alg/p6-multi-snow3g-y-aes":"js/alg/p6-multi-snow3g-y-aes.js","./alg/p7-rijndael":"js/alg/p7-rijndael.js","./alg/p8-cbc":"js/alg/p8-cbc.js","./alg/p9-diffle-hellman":"js/alg/p9-diffle-hellman.js","./alg/p10-fiat-shamir":"js/alg/p10-fiat-shamir.js","./alg/p11-rsa":"js/alg/p11-rsa.js","./alg/p12-gamal-eliptico":"js/alg/p12-gamal-eliptico.js"}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63425" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map