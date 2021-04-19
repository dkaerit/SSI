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
        if (typeof byte == 'string') return parseInt(byte, 16);else return byte;
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
        console.log("entró aquí", arr_int, mode, "".concat(arr_int.toString(16)));
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
      this.intsMsg = _transforms.ints.fromString(plaintext);
    }

    if (format == "hex") {
      this.intsMsg = _transforms.ints.fromHexs(plaintext);
    }

    if (format == "int") {}

    if (format == "bin") {
      this.intsMsg = _transforms.ints.fromBins(plaintext);
    } // gestion de los inputs


    this.key = _transforms.bins.fromString(key);
    this.generate_key();
    this.intskey = _transforms.ints.fromString(_transforms.str.fromBins(this.key).join(''));
    this.msgbin = _transforms.bins.fromString(plaintext);
    this.res = _transforms.ints.fromString(plaintext); // mensajes consola

    console.log("\"".concat(plaintext, "\":"), this.msgbin.join(''), this.msgbin.join('').length);
    console.log("\"".concat(_transforms.str.fromBins(this.key).join(''), "\":"), this.key.join(''), this.key.join('').length);
  }

  _createClass(p1, [{
    key: "encrypt",
    value: function encrypt() {
      var _this = this;

      return this.res.map(function (it, ix) {
        return it ^ _this.intskey[ix];
      });
    }
  }, {
    key: "generate_key",
    value: function generate_key() {
      var res = [],
          aux = '';
      this.intsMsg.map(function (it, ix) {
        aux = '';

        for (var i = 0; i < 8; i++) {
          aux += Math.round(Math.random()).toString();
        }

        res.push(aux);
      });

      if ($('#manual').is(':checked') && !$("#cipherkey").val()) {
        this.key = res;
        $("#cipherkey").html(_transforms.str.fromBins(this.key));
      }
    }
  }, {
    key: "render",
    value: function render() {
      $("#res-plaintext").html(_transforms.str.fromInts(this.res));
      $("#res-bin").html(_transforms.bins.fromInts(this.res).join(', '));
      $("#res-hex").html(_transforms.hexs.fromInts(this.res).join(', '));
      $("#res-int").html(this.res.join(', '));
    }
  }]);

  return p1;
}();

exports.default = p1;
},{"../utils/transforms":"js/utils/transforms.js"}],"js/utils/alph-p2.json":[function(require,module,exports) {
module.exports = {
  "alph": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
};
},{}],"js/alg/p2-vigenere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transforms = require("../utils/transforms");

var _alphP = require("../utils/alph-p2.json");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p2 = /*#__PURE__*/function () {
  function p2(format, plaintext, key) {
    _classCallCheck(this, p2);

    this.msg = plaintext.toUpperCase();
    this.cond = this.msg.replace(/\s/g, '');
    this.intsCond = this.intsInAlph(this.cond); // claves 

    this.key = key.toUpperCase();
    this.lkey = this.lengthenKey();
    this.intsLkey = this.intsInAlph(this.lkey);
    console.log(this.cond, this.intsCond);
    console.log(this.lkey, this.intsLkey);
  }

  _createClass(p2, [{
    key: "lengthenKey",
    value: function lengthenKey() {
      var _this = this;

      var result = '',
          aux = 0;
      this.cond.split('').map(function (it, ix) {
        result += _this.key[aux];
        aux == _this.key.length - 1 ? aux = 0 : aux++;
      });
      return result;
    }
  }, {
    key: "encrypt",
    value: function encrypt() {
      var _this2 = this;

      var res = this.intsCond.map(function (it, ix) {
        // Mapeo el mensaje origen                    
        return (it + _this2.intsLkey[ix]) % 26; // Aplico la función vigenere
      });
      return res;
    }
  }, {
    key: "decrypt",
    value: function decrypt() {
      var _this3 = this;

      var et = 0;
      return this.intsCond.map(function (it, ix) {
        // mapeo mensaje cifrado y desenredo la función de vigenere
        if (it + 26 - _this3.intsLkey[ix] >= 26) return (it + 26) % 26 - _this3.intsLkey[ix];else return it + 26 - _this3.intsLkey[ix];
      });
    }
  }, {
    key: "intsInAlph",
    value: function intsInAlph(str) {
      var _this4 = this;

      return str.split('').map(function (char) {
        // Mapeo el mensaje
        if (char != ' ') return _this4.char2int(char); // Convierto a decimal caracter por caracter           
      }).filter(function (el) {
        return el != null;
      }); // se retorna un array con los enteros 
    }
  }, {
    key: "toMessage",
    value: function toMessage(msg) {
      return msg.map(function (int) {
        // mapeo el mensaje
        return _alphP.alph[int]; // Paso binario a entero y de entero a caracter 
      }).join(''); // Concateno (elementos de array) para formar una cadena
    }
  }, {
    key: "char2int",
    value: function char2int(char) {
      var num;
      return _alphP.alph.map(function (it, ix) {
        if (it === char) {
          num = ix;
          return num;
        }
      }).find(function (el) {
        return el === num;
      }); // reducción de array a entero 
    }
  }, {
    key: "render",
    value: function render() {
      $("#res-plaintext").html(this.toMessage(this.res));
      $("#res-bin").html(_transforms.bins.fromString(this.toMessage(this.res)).join(', '));
      $("#res-hex").html(_transforms.hexs.fromString(this.toMessage(this.res)).join(', '));
      $("#res-int").html(_transforms.ints.fromString(this.toMessage(this.res)).join(', '));
    }
  }]);

  return p2;
}();

exports.default = p2;
},{"../utils/transforms":"js/utils/transforms.js","../utils/alph-p2.json":"js/utils/alph-p2.json"}],"js/alg/p3-rc4.js":[function(require,module,exports) {
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
},{}],"js/utils/rijndael.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AESencrypt = AESencrypt;
exports.keyExpansion = keyExpansion;

/* Rijndael (AES) Encryption
 * Copyright 2005 Herbert Hanewinkel, www.haneWIN.de
 * version 1.1, check www.haneWIN.de for the latest version

 * This software is provided as-is, without express or implied warranty.  
 * Permission to use, copy, modify, distribute or sell this software, with or
 * without fee, for any purpose and by any individual or organization, is hereby
 * granted, provided that the above copyright notice and this paragraph appear 
 * in all copies. Distribution as a part of an application or binary must
 * include the above copyright notice in the documentation and/or other
 * materials provided with the application or distribution.
 */
// The round constants used in subkey expansion
var Rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91]; // Precomputed lookup table for the SBox

var S = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
var T1 = [0xa56363c6, 0x847c7cf8, 0x997777ee, 0x8d7b7bf6, 0x0df2f2ff, 0xbd6b6bd6, 0xb16f6fde, 0x54c5c591, 0x50303060, 0x03010102, 0xa96767ce, 0x7d2b2b56, 0x19fefee7, 0x62d7d7b5, 0xe6abab4d, 0x9a7676ec, 0x45caca8f, 0x9d82821f, 0x40c9c989, 0x877d7dfa, 0x15fafaef, 0xeb5959b2, 0xc947478e, 0x0bf0f0fb, 0xecadad41, 0x67d4d4b3, 0xfda2a25f, 0xeaafaf45, 0xbf9c9c23, 0xf7a4a453, 0x967272e4, 0x5bc0c09b, 0xc2b7b775, 0x1cfdfde1, 0xae93933d, 0x6a26264c, 0x5a36366c, 0x413f3f7e, 0x02f7f7f5, 0x4fcccc83, 0x5c343468, 0xf4a5a551, 0x34e5e5d1, 0x08f1f1f9, 0x937171e2, 0x73d8d8ab, 0x53313162, 0x3f15152a, 0x0c040408, 0x52c7c795, 0x65232346, 0x5ec3c39d, 0x28181830, 0xa1969637, 0x0f05050a, 0xb59a9a2f, 0x0907070e, 0x36121224, 0x9b80801b, 0x3de2e2df, 0x26ebebcd, 0x6927274e, 0xcdb2b27f, 0x9f7575ea, 0x1b090912, 0x9e83831d, 0x742c2c58, 0x2e1a1a34, 0x2d1b1b36, 0xb26e6edc, 0xee5a5ab4, 0xfba0a05b, 0xf65252a4, 0x4d3b3b76, 0x61d6d6b7, 0xceb3b37d, 0x7b292952, 0x3ee3e3dd, 0x712f2f5e, 0x97848413, 0xf55353a6, 0x68d1d1b9, 0x00000000, 0x2cededc1, 0x60202040, 0x1ffcfce3, 0xc8b1b179, 0xed5b5bb6, 0xbe6a6ad4, 0x46cbcb8d, 0xd9bebe67, 0x4b393972, 0xde4a4a94, 0xd44c4c98, 0xe85858b0, 0x4acfcf85, 0x6bd0d0bb, 0x2aefefc5, 0xe5aaaa4f, 0x16fbfbed, 0xc5434386, 0xd74d4d9a, 0x55333366, 0x94858511, 0xcf45458a, 0x10f9f9e9, 0x06020204, 0x817f7ffe, 0xf05050a0, 0x443c3c78, 0xba9f9f25, 0xe3a8a84b, 0xf35151a2, 0xfea3a35d, 0xc0404080, 0x8a8f8f05, 0xad92923f, 0xbc9d9d21, 0x48383870, 0x04f5f5f1, 0xdfbcbc63, 0xc1b6b677, 0x75dadaaf, 0x63212142, 0x30101020, 0x1affffe5, 0x0ef3f3fd, 0x6dd2d2bf, 0x4ccdcd81, 0x140c0c18, 0x35131326, 0x2fececc3, 0xe15f5fbe, 0xa2979735, 0xcc444488, 0x3917172e, 0x57c4c493, 0xf2a7a755, 0x827e7efc, 0x473d3d7a, 0xac6464c8, 0xe75d5dba, 0x2b191932, 0x957373e6, 0xa06060c0, 0x98818119, 0xd14f4f9e, 0x7fdcdca3, 0x66222244, 0x7e2a2a54, 0xab90903b, 0x8388880b, 0xca46468c, 0x29eeeec7, 0xd3b8b86b, 0x3c141428, 0x79dedea7, 0xe25e5ebc, 0x1d0b0b16, 0x76dbdbad, 0x3be0e0db, 0x56323264, 0x4e3a3a74, 0x1e0a0a14, 0xdb494992, 0x0a06060c, 0x6c242448, 0xe45c5cb8, 0x5dc2c29f, 0x6ed3d3bd, 0xefacac43, 0xa66262c4, 0xa8919139, 0xa4959531, 0x37e4e4d3, 0x8b7979f2, 0x32e7e7d5, 0x43c8c88b, 0x5937376e, 0xb76d6dda, 0x8c8d8d01, 0x64d5d5b1, 0xd24e4e9c, 0xe0a9a949, 0xb46c6cd8, 0xfa5656ac, 0x07f4f4f3, 0x25eaeacf, 0xaf6565ca, 0x8e7a7af4, 0xe9aeae47, 0x18080810, 0xd5baba6f, 0x887878f0, 0x6f25254a, 0x722e2e5c, 0x241c1c38, 0xf1a6a657, 0xc7b4b473, 0x51c6c697, 0x23e8e8cb, 0x7cdddda1, 0x9c7474e8, 0x211f1f3e, 0xdd4b4b96, 0xdcbdbd61, 0x868b8b0d, 0x858a8a0f, 0x907070e0, 0x423e3e7c, 0xc4b5b571, 0xaa6666cc, 0xd8484890, 0x05030306, 0x01f6f6f7, 0x120e0e1c, 0xa36161c2, 0x5f35356a, 0xf95757ae, 0xd0b9b969, 0x91868617, 0x58c1c199, 0x271d1d3a, 0xb99e9e27, 0x38e1e1d9, 0x13f8f8eb, 0xb398982b, 0x33111122, 0xbb6969d2, 0x70d9d9a9, 0x898e8e07, 0xa7949433, 0xb69b9b2d, 0x221e1e3c, 0x92878715, 0x20e9e9c9, 0x49cece87, 0xff5555aa, 0x78282850, 0x7adfdfa5, 0x8f8c8c03, 0xf8a1a159, 0x80898909, 0x170d0d1a, 0xdabfbf65, 0x31e6e6d7, 0xc6424284, 0xb86868d0, 0xc3414182, 0xb0999929, 0x772d2d5a, 0x110f0f1e, 0xcbb0b07b, 0xfc5454a8, 0xd6bbbb6d, 0x3a16162c];
var T2 = [0x6363c6a5, 0x7c7cf884, 0x7777ee99, 0x7b7bf68d, 0xf2f2ff0d, 0x6b6bd6bd, 0x6f6fdeb1, 0xc5c59154, 0x30306050, 0x01010203, 0x6767cea9, 0x2b2b567d, 0xfefee719, 0xd7d7b562, 0xabab4de6, 0x7676ec9a, 0xcaca8f45, 0x82821f9d, 0xc9c98940, 0x7d7dfa87, 0xfafaef15, 0x5959b2eb, 0x47478ec9, 0xf0f0fb0b, 0xadad41ec, 0xd4d4b367, 0xa2a25ffd, 0xafaf45ea, 0x9c9c23bf, 0xa4a453f7, 0x7272e496, 0xc0c09b5b, 0xb7b775c2, 0xfdfde11c, 0x93933dae, 0x26264c6a, 0x36366c5a, 0x3f3f7e41, 0xf7f7f502, 0xcccc834f, 0x3434685c, 0xa5a551f4, 0xe5e5d134, 0xf1f1f908, 0x7171e293, 0xd8d8ab73, 0x31316253, 0x15152a3f, 0x0404080c, 0xc7c79552, 0x23234665, 0xc3c39d5e, 0x18183028, 0x969637a1, 0x05050a0f, 0x9a9a2fb5, 0x07070e09, 0x12122436, 0x80801b9b, 0xe2e2df3d, 0xebebcd26, 0x27274e69, 0xb2b27fcd, 0x7575ea9f, 0x0909121b, 0x83831d9e, 0x2c2c5874, 0x1a1a342e, 0x1b1b362d, 0x6e6edcb2, 0x5a5ab4ee, 0xa0a05bfb, 0x5252a4f6, 0x3b3b764d, 0xd6d6b761, 0xb3b37dce, 0x2929527b, 0xe3e3dd3e, 0x2f2f5e71, 0x84841397, 0x5353a6f5, 0xd1d1b968, 0x00000000, 0xededc12c, 0x20204060, 0xfcfce31f, 0xb1b179c8, 0x5b5bb6ed, 0x6a6ad4be, 0xcbcb8d46, 0xbebe67d9, 0x3939724b, 0x4a4a94de, 0x4c4c98d4, 0x5858b0e8, 0xcfcf854a, 0xd0d0bb6b, 0xefefc52a, 0xaaaa4fe5, 0xfbfbed16, 0x434386c5, 0x4d4d9ad7, 0x33336655, 0x85851194, 0x45458acf, 0xf9f9e910, 0x02020406, 0x7f7ffe81, 0x5050a0f0, 0x3c3c7844, 0x9f9f25ba, 0xa8a84be3, 0x5151a2f3, 0xa3a35dfe, 0x404080c0, 0x8f8f058a, 0x92923fad, 0x9d9d21bc, 0x38387048, 0xf5f5f104, 0xbcbc63df, 0xb6b677c1, 0xdadaaf75, 0x21214263, 0x10102030, 0xffffe51a, 0xf3f3fd0e, 0xd2d2bf6d, 0xcdcd814c, 0x0c0c1814, 0x13132635, 0xececc32f, 0x5f5fbee1, 0x979735a2, 0x444488cc, 0x17172e39, 0xc4c49357, 0xa7a755f2, 0x7e7efc82, 0x3d3d7a47, 0x6464c8ac, 0x5d5dbae7, 0x1919322b, 0x7373e695, 0x6060c0a0, 0x81811998, 0x4f4f9ed1, 0xdcdca37f, 0x22224466, 0x2a2a547e, 0x90903bab, 0x88880b83, 0x46468cca, 0xeeeec729, 0xb8b86bd3, 0x1414283c, 0xdedea779, 0x5e5ebce2, 0x0b0b161d, 0xdbdbad76, 0xe0e0db3b, 0x32326456, 0x3a3a744e, 0x0a0a141e, 0x494992db, 0x06060c0a, 0x2424486c, 0x5c5cb8e4, 0xc2c29f5d, 0xd3d3bd6e, 0xacac43ef, 0x6262c4a6, 0x919139a8, 0x959531a4, 0xe4e4d337, 0x7979f28b, 0xe7e7d532, 0xc8c88b43, 0x37376e59, 0x6d6ddab7, 0x8d8d018c, 0xd5d5b164, 0x4e4e9cd2, 0xa9a949e0, 0x6c6cd8b4, 0x5656acfa, 0xf4f4f307, 0xeaeacf25, 0x6565caaf, 0x7a7af48e, 0xaeae47e9, 0x08081018, 0xbaba6fd5, 0x7878f088, 0x25254a6f, 0x2e2e5c72, 0x1c1c3824, 0xa6a657f1, 0xb4b473c7, 0xc6c69751, 0xe8e8cb23, 0xdddda17c, 0x7474e89c, 0x1f1f3e21, 0x4b4b96dd, 0xbdbd61dc, 0x8b8b0d86, 0x8a8a0f85, 0x7070e090, 0x3e3e7c42, 0xb5b571c4, 0x6666ccaa, 0x484890d8, 0x03030605, 0xf6f6f701, 0x0e0e1c12, 0x6161c2a3, 0x35356a5f, 0x5757aef9, 0xb9b969d0, 0x86861791, 0xc1c19958, 0x1d1d3a27, 0x9e9e27b9, 0xe1e1d938, 0xf8f8eb13, 0x98982bb3, 0x11112233, 0x6969d2bb, 0xd9d9a970, 0x8e8e0789, 0x949433a7, 0x9b9b2db6, 0x1e1e3c22, 0x87871592, 0xe9e9c920, 0xcece8749, 0x5555aaff, 0x28285078, 0xdfdfa57a, 0x8c8c038f, 0xa1a159f8, 0x89890980, 0x0d0d1a17, 0xbfbf65da, 0xe6e6d731, 0x424284c6, 0x6868d0b8, 0x414182c3, 0x999929b0, 0x2d2d5a77, 0x0f0f1e11, 0xb0b07bcb, 0x5454a8fc, 0xbbbb6dd6, 0x16162c3a];
var T3 = [0x63c6a563, 0x7cf8847c, 0x77ee9977, 0x7bf68d7b, 0xf2ff0df2, 0x6bd6bd6b, 0x6fdeb16f, 0xc59154c5, 0x30605030, 0x01020301, 0x67cea967, 0x2b567d2b, 0xfee719fe, 0xd7b562d7, 0xab4de6ab, 0x76ec9a76, 0xca8f45ca, 0x821f9d82, 0xc98940c9, 0x7dfa877d, 0xfaef15fa, 0x59b2eb59, 0x478ec947, 0xf0fb0bf0, 0xad41ecad, 0xd4b367d4, 0xa25ffda2, 0xaf45eaaf, 0x9c23bf9c, 0xa453f7a4, 0x72e49672, 0xc09b5bc0, 0xb775c2b7, 0xfde11cfd, 0x933dae93, 0x264c6a26, 0x366c5a36, 0x3f7e413f, 0xf7f502f7, 0xcc834fcc, 0x34685c34, 0xa551f4a5, 0xe5d134e5, 0xf1f908f1, 0x71e29371, 0xd8ab73d8, 0x31625331, 0x152a3f15, 0x04080c04, 0xc79552c7, 0x23466523, 0xc39d5ec3, 0x18302818, 0x9637a196, 0x050a0f05, 0x9a2fb59a, 0x070e0907, 0x12243612, 0x801b9b80, 0xe2df3de2, 0xebcd26eb, 0x274e6927, 0xb27fcdb2, 0x75ea9f75, 0x09121b09, 0x831d9e83, 0x2c58742c, 0x1a342e1a, 0x1b362d1b, 0x6edcb26e, 0x5ab4ee5a, 0xa05bfba0, 0x52a4f652, 0x3b764d3b, 0xd6b761d6, 0xb37dceb3, 0x29527b29, 0xe3dd3ee3, 0x2f5e712f, 0x84139784, 0x53a6f553, 0xd1b968d1, 0x00000000, 0xedc12ced, 0x20406020, 0xfce31ffc, 0xb179c8b1, 0x5bb6ed5b, 0x6ad4be6a, 0xcb8d46cb, 0xbe67d9be, 0x39724b39, 0x4a94de4a, 0x4c98d44c, 0x58b0e858, 0xcf854acf, 0xd0bb6bd0, 0xefc52aef, 0xaa4fe5aa, 0xfbed16fb, 0x4386c543, 0x4d9ad74d, 0x33665533, 0x85119485, 0x458acf45, 0xf9e910f9, 0x02040602, 0x7ffe817f, 0x50a0f050, 0x3c78443c, 0x9f25ba9f, 0xa84be3a8, 0x51a2f351, 0xa35dfea3, 0x4080c040, 0x8f058a8f, 0x923fad92, 0x9d21bc9d, 0x38704838, 0xf5f104f5, 0xbc63dfbc, 0xb677c1b6, 0xdaaf75da, 0x21426321, 0x10203010, 0xffe51aff, 0xf3fd0ef3, 0xd2bf6dd2, 0xcd814ccd, 0x0c18140c, 0x13263513, 0xecc32fec, 0x5fbee15f, 0x9735a297, 0x4488cc44, 0x172e3917, 0xc49357c4, 0xa755f2a7, 0x7efc827e, 0x3d7a473d, 0x64c8ac64, 0x5dbae75d, 0x19322b19, 0x73e69573, 0x60c0a060, 0x81199881, 0x4f9ed14f, 0xdca37fdc, 0x22446622, 0x2a547e2a, 0x903bab90, 0x880b8388, 0x468cca46, 0xeec729ee, 0xb86bd3b8, 0x14283c14, 0xdea779de, 0x5ebce25e, 0x0b161d0b, 0xdbad76db, 0xe0db3be0, 0x32645632, 0x3a744e3a, 0x0a141e0a, 0x4992db49, 0x060c0a06, 0x24486c24, 0x5cb8e45c, 0xc29f5dc2, 0xd3bd6ed3, 0xac43efac, 0x62c4a662, 0x9139a891, 0x9531a495, 0xe4d337e4, 0x79f28b79, 0xe7d532e7, 0xc88b43c8, 0x376e5937, 0x6ddab76d, 0x8d018c8d, 0xd5b164d5, 0x4e9cd24e, 0xa949e0a9, 0x6cd8b46c, 0x56acfa56, 0xf4f307f4, 0xeacf25ea, 0x65caaf65, 0x7af48e7a, 0xae47e9ae, 0x08101808, 0xba6fd5ba, 0x78f08878, 0x254a6f25, 0x2e5c722e, 0x1c38241c, 0xa657f1a6, 0xb473c7b4, 0xc69751c6, 0xe8cb23e8, 0xdda17cdd, 0x74e89c74, 0x1f3e211f, 0x4b96dd4b, 0xbd61dcbd, 0x8b0d868b, 0x8a0f858a, 0x70e09070, 0x3e7c423e, 0xb571c4b5, 0x66ccaa66, 0x4890d848, 0x03060503, 0xf6f701f6, 0x0e1c120e, 0x61c2a361, 0x356a5f35, 0x57aef957, 0xb969d0b9, 0x86179186, 0xc19958c1, 0x1d3a271d, 0x9e27b99e, 0xe1d938e1, 0xf8eb13f8, 0x982bb398, 0x11223311, 0x69d2bb69, 0xd9a970d9, 0x8e07898e, 0x9433a794, 0x9b2db69b, 0x1e3c221e, 0x87159287, 0xe9c920e9, 0xce8749ce, 0x55aaff55, 0x28507828, 0xdfa57adf, 0x8c038f8c, 0xa159f8a1, 0x89098089, 0x0d1a170d, 0xbf65dabf, 0xe6d731e6, 0x4284c642, 0x68d0b868, 0x4182c341, 0x9929b099, 0x2d5a772d, 0x0f1e110f, 0xb07bcbb0, 0x54a8fc54, 0xbb6dd6bb, 0x162c3a16];
var T4 = [0xc6a56363, 0xf8847c7c, 0xee997777, 0xf68d7b7b, 0xff0df2f2, 0xd6bd6b6b, 0xdeb16f6f, 0x9154c5c5, 0x60503030, 0x02030101, 0xcea96767, 0x567d2b2b, 0xe719fefe, 0xb562d7d7, 0x4de6abab, 0xec9a7676, 0x8f45caca, 0x1f9d8282, 0x8940c9c9, 0xfa877d7d, 0xef15fafa, 0xb2eb5959, 0x8ec94747, 0xfb0bf0f0, 0x41ecadad, 0xb367d4d4, 0x5ffda2a2, 0x45eaafaf, 0x23bf9c9c, 0x53f7a4a4, 0xe4967272, 0x9b5bc0c0, 0x75c2b7b7, 0xe11cfdfd, 0x3dae9393, 0x4c6a2626, 0x6c5a3636, 0x7e413f3f, 0xf502f7f7, 0x834fcccc, 0x685c3434, 0x51f4a5a5, 0xd134e5e5, 0xf908f1f1, 0xe2937171, 0xab73d8d8, 0x62533131, 0x2a3f1515, 0x080c0404, 0x9552c7c7, 0x46652323, 0x9d5ec3c3, 0x30281818, 0x37a19696, 0x0a0f0505, 0x2fb59a9a, 0x0e090707, 0x24361212, 0x1b9b8080, 0xdf3de2e2, 0xcd26ebeb, 0x4e692727, 0x7fcdb2b2, 0xea9f7575, 0x121b0909, 0x1d9e8383, 0x58742c2c, 0x342e1a1a, 0x362d1b1b, 0xdcb26e6e, 0xb4ee5a5a, 0x5bfba0a0, 0xa4f65252, 0x764d3b3b, 0xb761d6d6, 0x7dceb3b3, 0x527b2929, 0xdd3ee3e3, 0x5e712f2f, 0x13978484, 0xa6f55353, 0xb968d1d1, 0x00000000, 0xc12ceded, 0x40602020, 0xe31ffcfc, 0x79c8b1b1, 0xb6ed5b5b, 0xd4be6a6a, 0x8d46cbcb, 0x67d9bebe, 0x724b3939, 0x94de4a4a, 0x98d44c4c, 0xb0e85858, 0x854acfcf, 0xbb6bd0d0, 0xc52aefef, 0x4fe5aaaa, 0xed16fbfb, 0x86c54343, 0x9ad74d4d, 0x66553333, 0x11948585, 0x8acf4545, 0xe910f9f9, 0x04060202, 0xfe817f7f, 0xa0f05050, 0x78443c3c, 0x25ba9f9f, 0x4be3a8a8, 0xa2f35151, 0x5dfea3a3, 0x80c04040, 0x058a8f8f, 0x3fad9292, 0x21bc9d9d, 0x70483838, 0xf104f5f5, 0x63dfbcbc, 0x77c1b6b6, 0xaf75dada, 0x42632121, 0x20301010, 0xe51affff, 0xfd0ef3f3, 0xbf6dd2d2, 0x814ccdcd, 0x18140c0c, 0x26351313, 0xc32fecec, 0xbee15f5f, 0x35a29797, 0x88cc4444, 0x2e391717, 0x9357c4c4, 0x55f2a7a7, 0xfc827e7e, 0x7a473d3d, 0xc8ac6464, 0xbae75d5d, 0x322b1919, 0xe6957373, 0xc0a06060, 0x19988181, 0x9ed14f4f, 0xa37fdcdc, 0x44662222, 0x547e2a2a, 0x3bab9090, 0x0b838888, 0x8cca4646, 0xc729eeee, 0x6bd3b8b8, 0x283c1414, 0xa779dede, 0xbce25e5e, 0x161d0b0b, 0xad76dbdb, 0xdb3be0e0, 0x64563232, 0x744e3a3a, 0x141e0a0a, 0x92db4949, 0x0c0a0606, 0x486c2424, 0xb8e45c5c, 0x9f5dc2c2, 0xbd6ed3d3, 0x43efacac, 0xc4a66262, 0x39a89191, 0x31a49595, 0xd337e4e4, 0xf28b7979, 0xd532e7e7, 0x8b43c8c8, 0x6e593737, 0xdab76d6d, 0x018c8d8d, 0xb164d5d5, 0x9cd24e4e, 0x49e0a9a9, 0xd8b46c6c, 0xacfa5656, 0xf307f4f4, 0xcf25eaea, 0xcaaf6565, 0xf48e7a7a, 0x47e9aeae, 0x10180808, 0x6fd5baba, 0xf0887878, 0x4a6f2525, 0x5c722e2e, 0x38241c1c, 0x57f1a6a6, 0x73c7b4b4, 0x9751c6c6, 0xcb23e8e8, 0xa17cdddd, 0xe89c7474, 0x3e211f1f, 0x96dd4b4b, 0x61dcbdbd, 0x0d868b8b, 0x0f858a8a, 0xe0907070, 0x7c423e3e, 0x71c4b5b5, 0xccaa6666, 0x90d84848, 0x06050303, 0xf701f6f6, 0x1c120e0e, 0xc2a36161, 0x6a5f3535, 0xaef95757, 0x69d0b9b9, 0x17918686, 0x9958c1c1, 0x3a271d1d, 0x27b99e9e, 0xd938e1e1, 0xeb13f8f8, 0x2bb39898, 0x22331111, 0xd2bb6969, 0xa970d9d9, 0x07898e8e, 0x33a79494, 0x2db69b9b, 0x3c221e1e, 0x15928787, 0xc920e9e9, 0x8749cece, 0xaaff5555, 0x50782828, 0xa57adfdf, 0x038f8c8c, 0x59f8a1a1, 0x09808989, 0x1a170d0d, 0x65dabfbf, 0xd731e6e6, 0x84c64242, 0xd0b86868, 0x82c34141, 0x29b09999, 0x5a772d2d, 0x1e110f0f, 0x7bcbb0b0, 0xa8fc5454, 0x6dd6bbbb, 0x2c3a1616];

function B0(x) {
  return x & 255;
}

function B1(x) {
  return x >> 8 & 255;
}

function B2(x) {
  return x >> 16 & 255;
}

function B3(x) {
  return x >> 24 & 255;
}

function F1(x0, x1, x2, x3) {
  return B1(T1[x0 & 255]) | B1(T1[x1 >> 8 & 255]) << 8 | B1(T1[x2 >> 16 & 255]) << 16 | B1(T1[x3 >>> 24]) << 24;
}

function packBytes(octets) {
  var i, j;
  var len = octets.length;
  var b = new Array(len / 4);
  if (!octets || len % 4) return;

  for (i = 0, j = 0; j < len; j += 4) {
    b[i++] = octets[j] | octets[j + 1] << 8 | octets[j + 2] << 16 | octets[j + 3] << 24;
  }

  return b;
}

function unpackBytes(packed) {
  var j;
  var i = 0,
      l = packed.length;
  var r = new Array(l * 4);

  for (j = 0; j < l; j++) {
    r[i++] = B0(packed[j]);
    r[i++] = B1(packed[j]);
    r[i++] = B2(packed[j]);
    r[i++] = B3(packed[j]);
  }

  return r;
} // ------------------------------------------------


var maxkc = 8;
var maxrk = 14;

function keyExpansion(key) {
  var kc, i, j, r, t;
  var rounds;
  var keySched = new Array(maxrk + 1);
  var keylen = key.length;
  var k = new Array(maxkc);
  var tk = new Array(maxkc);
  var rconpointer = 0;

  if (keylen == 16) {
    rounds = 10;
    kc = 4;
  } else if (keylen == 24) {
    rounds = 12;
    kc = 6;
  } else if (keylen == 32) {
    rounds = 14;
    kc = 8;
  } else {
    alert('Invalid AES key length ' + keylen);
    return;
  }

  for (i = 0; i < maxrk + 1; i++) {
    keySched[i] = new Array(4);
  }

  for (i = 0, j = 0; j < keylen; j++, i += 4) {
    k[j] = key.charCodeAt(i) | key.charCodeAt(i + 1) << 8 | key.charCodeAt(i + 2) << 16 | key.charCodeAt(i + 3) << 24;
  }

  for (j = kc - 1; j >= 0; j--) {
    tk[j] = k[j];
  }

  r = 0;
  t = 0;

  for (j = 0; j < kc && r < rounds + 1;) {
    for (; j < kc && t < 4; j++, t++) {
      keySched[r][t] = tk[j];
    }

    if (t == 4) {
      r++;
      t = 0;
    }
  }

  while (r < rounds + 1) {
    var temp = tk[kc - 1];
    tk[0] ^= S[B1(temp)] | S[B2(temp)] << 8 | S[B3(temp)] << 16 | S[B0(temp)] << 24;
    tk[0] ^= Rcon[rconpointer++];

    if (kc != 8) {
      for (j = 1; j < kc; j++) {
        tk[j] ^= tk[j - 1];
      }
    } else {
      for (j = 1; j < kc / 2; j++) {
        tk[j] ^= tk[j - 1];
      }

      temp = tk[kc / 2 - 1];
      tk[kc / 2] ^= S[B0(temp)] | S[B1(temp)] << 8 | S[B2(temp)] << 16 | S[B3(temp)] << 24;

      for (j = kc / 2 + 1; j < kc; j++) {
        tk[j] ^= tk[j - 1];
      }
    }

    for (j = 0; j < kc && r < rounds + 1;) {
      for (; j < kc && t < 4; j++, t++) {
        keySched[r][t] = tk[j];
      }

      if (t == 4) {
        r++;
        t = 0;
      }
    }
  }

  this.rounds = rounds;
  this.rk = keySched;
  return this;
}

function AESencrypt(block, ctx) {
  var r;
  var t0, t1, t2, t3;
  var b = packBytes(block);
  var rounds = ctx.rounds;
  var b0 = b[0];
  var b1 = b[1];
  var b2 = b[2];
  var b3 = b[3];

  for (r = 0; r < rounds - 1; r++) {
    t0 = b0 ^ ctx.rk[r][0];
    t1 = b1 ^ ctx.rk[r][1];
    t2 = b2 ^ ctx.rk[r][2];
    t3 = b3 ^ ctx.rk[r][3];
    b0 = T1[t0 & 255] ^ T2[t1 >> 8 & 255] ^ T3[t2 >> 16 & 255] ^ T4[t3 >>> 24];
    b1 = T1[t1 & 255] ^ T2[t2 >> 8 & 255] ^ T3[t3 >> 16 & 255] ^ T4[t0 >>> 24];
    b2 = T1[t2 & 255] ^ T2[t3 >> 8 & 255] ^ T3[t0 >> 16 & 255] ^ T4[t1 >>> 24];
    b3 = T1[t3 & 255] ^ T2[t0 >> 8 & 255] ^ T3[t1 >> 16 & 255] ^ T4[t2 >>> 24];
  } // last round is special


  r = rounds - 1;
  t0 = b0 ^ ctx.rk[r][0];
  t1 = b1 ^ ctx.rk[r][1];
  t2 = b2 ^ ctx.rk[r][2];
  t3 = b3 ^ ctx.rk[r][3];
  b[0] = F1(t0, t1, t2, t3) ^ ctx.rk[rounds][0];
  b[1] = F1(t1, t2, t3, t0) ^ ctx.rk[rounds][1];
  b[2] = F1(t2, t3, t0, t1) ^ ctx.rk[rounds][2];
  b[3] = F1(t3, t0, t1, t2) ^ ctx.rk[rounds][3];
  return unpackBytes(b);
}
},{}],"js/alg/p8-cbc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transforms = require("../utils/transforms");

var _rijndael = require("../utils/rijndael");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p8 = /*#__PURE__*/function () {
  function p8(format, plaintext, key) {
    _classCallCheck(this, p8);

    // str,str,str
    this.iv = prompt("Introduce el IV", "00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00");
    this.key = key.split(','); // preparar la clave - HEXS

    this.iv = this.iv.split(','); // preparar IV - HEXS

    this.bloques = this.separarEnBloques(plaintext); // array de bloques(arrays) - HEXS

    this.bf = [].concat.apply([], this.bloques); // bloques concatenados en uno - HEXS
    // mostrar los valores iniciales

    console.log("Clave", this.key);
    console.log("IV", this.iv);
    this.bloques.map(function (bloque, i) {
      console.log("Plaintext B".concat(i), bloque);
    }); // resultado final

    this.res = _transforms.ints.fromHexs(this.bf);
  }

  _createClass(p8, [{
    key: "encrypt",
    value: function encrypt() {
      var _this = this;

      var b_xor_iv = [];
      this.bloques[0].map(function (hex, i) {
        // a
        b_xor_iv.push(hex ^ _this.iv[i]);
      }); // 16, 24, 32

      var key = _transforms.str.fromHexs([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

      console.log(key);
      console.log("AES", (0, _rijndael.AESencrypt)("Hola mundo", new _rijndael.keyExpansion(ctx)));
      return _transforms.ints.fromHexs(this.bf);
    }
  }, {
    key: "decrypt",
    value: function decrypt() {
      return _transforms.ints.fromHexs(this.bf);
    }
  }, {
    key: "separarEnBloques",
    value: function separarEnBloques(plaintext) {
      var txtarr = plaintext.split(', ');
      var tmp = [];
      var result = [];
      txtarr.map(function (byte, i) {
        tmp.push(byte);

        if (i % 16 == 15 || i + 1 == txtarr.length) {
          result.push(tmp);
          tmp = [];
        }
      });
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      $("#res-plaintext").html(_transforms.str.fromInts(this.res));
      $("#res-bin").html(_transforms.bins.fromInts(this.res).join(', '));
      $("#res-hex").html(_transforms.hexs.fromInts(this.res).join(', '));
      $("#res-int").html(this.res.join(', '));
    }
  }]);

  return p8;
}();

exports.default = p8;
},{"../utils/transforms":"js/utils/transforms.js","../utils/rijndael":"js/utils/rijndael.js"}],"js/alg/p9-diffle-hellman.js":[function(require,module,exports) {
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

disable(1, 1, 1, 1, 1, 1);
var objs = [0, _p1Vernam.default, _p2Vigenere.default, _p3Rc.default, _p4A.default, _p5GenE.default, _p6MultiSnow3gYAes.default, _p7Rijndael.default, _p8Cbc.default, _p9DiffleHellman.default, _p10FiatShamir.default, _p11Rsa.default, _p12GamalEliptico.default]; // selectores
// listeners

$('#algoritmo').children().map(function (it) {
  return createEncrypt(objs[it], $('#algoritmo').children()[it].innerHTML);
});
$('#algoritmo').children().map(function (it) {
  return createDecrypt(objs[it], $('#algoritmo').children()[it].innerHTML);
});

if ($('#ej1').is(':checked')) {
  $('#ej2').attr('disabled', 'disabled');
} else {} // inicialización


$('#algoritmo').change(function () {
  switch ($('#algoritmo option:selected').val()) {
    case "1":
      active(1, 1, 1, 1, 1, 1);
      disable(0, 0, 1, 0, 0, 0);
      $("#formato").val('srt');
      $('#ejemplos').change(function () {
        if ($('#algoritmo option:selected').val() == "1") {
          if ($('#ej1').is(':checked')) {
            $("#plaintext").html("SOL");
            $("#cipherkey").html(_transforms.str.fromBins(["00111100", "00011000", "01110011"]).join(''));
          }

          if ($('#ej2').is(':checked')) {
            $("#plaintext").html("[t");
            $("#cipherkey").html(_transforms.str.fromBins(["00001111", "00100001"]).join(''));
          }
        }
      });
      ;
      break;

    case "2":
      active(1, 1, 1, 1, 1, 1);
      disable(0, 0, 0, 0, 0, 0);
      $("#formato").val('srt');
      $('#ej2').attr('disabled', 'disabled');
      $('#ejemplos').change(function () {
        if ($('#algoritmo option:selected').val() == "2") {
          if ($('#ej1').is(':checked')) {
            $("#plaintext").html("ESTE MENSAJE SE AUTODESTRUIRA");
            $("#cipherkey").html("MISION");
          }
        }
      });
      ;
      break;

    case "3":
      ;
      break;

    case "4":
      ;
      break;

    case "5":
      ;
      break;

    case "6":
      ;
      break;

    case "7":
      ;
      break;

    case "8":
      active(1, 1, 1, 1, 1, 1);
      disable(1, 0, 0, 0, 0, 0);
      $("#formato").val('hex');
      $('#ejemplos').change(function () {
        if ($('#algoritmo option:selected').val() == "8") {
          if ($('#ej1').is(':checked')) {
            disable(0, 0, 1, 0, 0, 0);
            $("#plaintext").html(["00", "11", "22", "33", "44", "55", "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"].join(', '));
            $("#cipherkey").html(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F"].join(', '));
          }

          if ($('#ej2').is(':checked')) {
            disable(0, 0, 1, 0, 0, 0);
            $("#plaintext").html(["00", "11", "22", "33", "44", "55", "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"].join(', '));
            $("#cipherkey").html(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F"].join(', '));
          }

          if ($('#manual').is(':checked')) {
            active(0, 0, 1, 0, 0, 0);
          }
        }
      });
      ;
      break;

    case "9":
      ;
      break;

    case "10":
      ;
      break;

    case "11":
      ;
      break;

    case "12":
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

function disable(formato, plaintext, key, enc, des, ej) {
  if (formato) $('#formato').attr('disabled', 'disabled');
  if (plaintext) $('#plaintext').attr('disabled', 'disabled');
  if (key) $('#cipherkey').attr('disabled', 'disabled');
  if (enc) $('#encrypt').attr('disabled', 'disabled');
  if (des) $('#decrypt').attr('disabled', 'disabled');
  if (ej) $('.form-check-input').attr('disabled', 'disabled');
}

function active(formato, plaintext, key, enc, des, ej) {
  if (formato) $('#formato').removeAttr('disabled');
  if (plaintext) $('#plaintext').removeAttr('disabled');
  if (key) $('#cipherkey').removeAttr('disabled');
  if (enc) $('#encrypt').removeAttr('disabled');
  if (des) $('#decrypt').removeAttr('disabled');
  if (ej) $('.form-check-input').removeAttr('disabled');
}

function createEncrypt(obj, tag) {
  $("#encrypt").click(function () {
    if ($('#algoritmo option:selected').text() == tag) {
      console.clear();
      var tmp = new obj($('#formato option:selected').val(), $("#plaintext").val(), $("#cipherkey").val());
      tmp.res = tmp.encrypt();
      tmp.render();
    }
  });
}

function createDecrypt(obj, tag) {
  $("#decrypt").click(function () {
    if ($('#algoritmo option:selected').text() == tag) {
      var tmp = new obj($('#formato option:selected').val(), $("#plaintext").val(), $("#cipherkey").val());
      tmp.res = tmp.decrypt();
      tmp.render();
    }
  });
}
},{"./utils/transforms":"js/utils/transforms.js","./alg/p1-vernam":"js/alg/p1-vernam.js","./alg/p2-vigenere":"js/alg/p2-vigenere.js","./alg/p3-rc4":"js/alg/p3-rc4.js","./alg/p4-a5-1":"js/alg/p4-a5-1.js","./alg/p5-gen-e0":"js/alg/p5-gen-e0.js","./alg/p6-multi-snow3g-y-aes":"js/alg/p6-multi-snow3g-y-aes.js","./alg/p7-rijndael":"js/alg/p7-rijndael.js","./alg/p8-cbc":"js/alg/p8-cbc.js","./alg/p9-diffle-hellman":"js/alg/p9-diffle-hellman.js","./alg/p10-fiat-shamir":"js/alg/p10-fiat-shamir.js","./alg/p11-rsa":"js/alg/p11-rsa.js","./alg/p12-gamal-eliptico":"js/alg/p12-gamal-eliptico.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36363" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map