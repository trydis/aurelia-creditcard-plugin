define(["module", "exports"], function (module, exports) {
  "use strict";

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  (function (f) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }g.creditcards = f();
    }
  })(function () {
    var define, module, exports;return function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
          }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }return n[o].exports;
      }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
      }return s;
    }({
      1: [function (require, module, exports) {
        'use strict';

        var luhn = require('fast-luhn');
        var types = require('./types');

        module.exports = {
          types: types,
          parse: parseCard,
          format: formatCard,
          type: cardType,
          luhn: luhn,
          isValid: isCardValid
        };

        function parseCard(number) {
          if (typeof number !== 'string') return '';
          return number.replace(/[^\d]/g, '');
        }

        function formatCard(number, separator) {
          var type = getType(number, true);
          if (!type) return number;
          return type.group(number).join(separator || ' ');
        }

        function cardType(number, eager) {
          var type = getType(number, eager);
          return type ? type.name : undefined;
        }

        function isCardValid(number, type) {
          if (type) {
            type = types.get(type);
          } else {
            type = getType(number);
          }
          if (!type) return false;
          return (!type.luhn || luhn(number)) && type.test(number);
        }

        function getType(number, eager) {
          return types.find(function (type) {
            return type.test(number, eager);
          });
        }
      }, { "./types": 25, "fast-luhn": 8 }], 2: [function (require, module, exports) {
        'use strict';

        var types = require('./types');
        var cvcRegex = /^\d{3,4}$/;

        module.exports = {
          isValid: cvcIsValid
        };

        function cvcIsValid(cvc, type) {
          if (typeof cvc !== 'string') return false;
          if (!cvcRegex.test(cvc)) return false;
          if (!type) return true;
          return types.get(type).cvcLength === cvc.length;
        }
      }, { "./types": 25 }], 3: [function (require, module, exports) {
        'use strict';

        var isValidMonth = require('is-valid-month');
        var parseIntStrict = require('parse-int');
        var parseYear = require('parse-year');

        module.exports = {
          isPast: isPast,
          month: {
            parse: parseMonth,
            isValid: isValidMonth
          },
          year: {
            parse: parseYear,
            format: formatExpYear,
            isValid: isExpYearValid,
            isPast: isExpYearPast
          }
        };

        function isPast(month, year) {
          return Date.now() >= new Date(year, month);
        }

        function parseMonth(month) {
          return parseIntStrict(month);
        }

        function formatExpYear(year, strip) {
          year = year.toString();
          return strip ? year.substr(2, 4) : year;
        }

        function isExpYearValid(year) {
          if (typeof year !== 'number') return false;
          year = parseIntStrict(year);
          return year > 0;
        }

        function isExpYearPast(year) {
          return new Date().getFullYear() > year;
        }
      }, { "is-valid-month": 9, "parse-int": 13, "parse-year": 17 }], 4: [function (require, module, exports) {
        'use strict';

        module.exports = {
          card: require('./card'),
          cvc: require('./cvc'),
          expiration: require('./expiration')
        };
      }, { "./card": 1, "./cvc": 2, "./expiration": 3 }], 5: [function (require, module, exports) {
        'use strict';

        var types = exports.types = require('./src/types');
        exports.Type = require('./src/type');

        exports.find = function findCardType(callback) {
          for (var typeName in types) {
            var type = types[typeName];
            var result = callback(type);
            if (result) return type;
          }
        };
      }, { "./src/type": 6, "./src/types": 7 }], 6: [function (require, module, exports) {
        'use strict';

        var extend = require('xtend/mutable');

        module.exports = CardType;

        function CardType(name, config) {
          extend(this, { name: name }, config);
        }

        CardType.prototype.cvcLength = 3;
        CardType.prototype.luhn = true;
        CardType.prototype.groupPattern = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/;

        CardType.prototype.group = function (number) {
          return (number.match(this.groupPattern) || []).slice(1).filter(Boolean);
        };

        CardType.prototype.test = function (number, eager) {
          return this[eager ? 'eagerPattern' : 'pattern'].test(number);
        };
      }, { "xtend/mutable": 24 }], 7: [function (require, module, exports) {
        'use strict';

        var Type = require('./type');

        var group19 = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/;

        exports.visa = new Type('Visa', {
          pattern: /^4\d{12}(\d{3}|\d{6})?$/,
          eagerPattern: /^4/,
          groupPattern: group19
        });

        exports.maestro = new Type('Maestro', {
          pattern: /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/,
          eagerPattern: /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/,
          groupPattern: group19
        });

        exports.forbrugsforeningen = new Type('Forbrugsforeningen', {
          pattern: /^600722\d{10}$/,
          eagerPattern: /^600/
        });

        exports.dankort = new Type('Dankort', {
          pattern: /^5019\d{12}$/,
          eagerPattern: /^5019/
        });

        exports.masterCard = new Type('MasterCard', {
          pattern: /^(5[1-5]|2[2-7])\d{14}$/,
          eagerPattern: /^(2|5[1-5])/
        });

        exports.americanExpress = new Type('American Express', {
          pattern: /^3[47]\d{13}$/,
          eagerPattern: /^3[47]/,
          groupPattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
          cvcLength: 4
        });

        exports.dinersClub = new Type('Diners Club', {
          pattern: /^3(0[0-5]|[68]\d)\d{11}$/,
          eagerPattern: /^3(0|[68])/,
          groupPattern: /(\d{1,4})?(\d{1,6})?(\d{1,4})?/
        });

        exports.discover = new Type('Discover', {
          pattern: /^6(011(0[0-9]|[2-4]\d|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]\d{3}|5\d{4})\d{10}$/,
          eagerPattern: /^6(011(0[0-9]|[2-4]|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]|5)/
        });

        exports.jcb = new Type('JCB', {
          pattern: /^35\d{14}$/,
          eagerPattern: /^35/
        });

        exports.unionPay = new Type('UnionPay', {
          pattern: /^62[0-5]\d{13,16}$/,
          eagerPattern: /^62/,
          groupPattern: group19,
          luhn: false
        });
      }, { "./type": 6 }], 8: [function (require, module, exports) {
        'use strict';

        module.exports = function (array) {
          return function luhn(number) {
            if (typeof number !== 'string') throw new TypeError('Expected string input');
            if (!number) return false;
            var length = number.length;
            var bit = 1;
            var sum = 0;
            var value;

            while (length) {
              value = parseInt(number.charAt(--length), 10);
              sum += (bit ^= 1) ? array[value] : value;
            }

            return !!sum && sum % 10 === 0;
          };
        }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);
      }, {}], 9: [function (require, module, exports) {
        'use strict';

        var isInteger = require('is-integer');

        module.exports = function isValidMonth(month) {
          if (typeof month !== 'number' || !isInteger(month)) return false;
          return month >= 1 && month <= 12;
        };
      }, { "is-integer": 10 }], 10: [function (require, module, exports) {
        var isFinite = require("is-finite");
        module.exports = Number.isInteger || function (val) {
          return typeof val === "number" && isFinite(val) && Math.floor(val) === val;
        };
      }, { "is-finite": 11 }], 11: [function (require, module, exports) {
        'use strict';

        var numberIsNan = require('number-is-nan');

        module.exports = Number.isFinite || function (val) {
          return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
        };
      }, { "number-is-nan": 12 }], 12: [function (require, module, exports) {
        'use strict';

        module.exports = Number.isNaN || function (x) {
          return x !== x;
        };
      }, {}], 13: [function (require, module, exports) {
        'use strict';

        var isInteger = require('is-integer');

        module.exports = function parseIntStrict(integer) {
          if (typeof integer === 'number') {
            return isInteger(integer) ? integer : undefined;
          }
          if (typeof integer === 'string') {
            return (/^-?\d+$/.test(integer) ? parseInt(integer, 10) : undefined
            );
          }
        };
      }, { "is-integer": 14 }], 14: [function (require, module, exports) {
        arguments[4][10][0].apply(exports, arguments);
      }, { "dup": 10, "is-finite": 15 }], 15: [function (require, module, exports) {
        arguments[4][11][0].apply(exports, arguments);
      }, { "dup": 11, "number-is-nan": 16 }], 16: [function (require, module, exports) {
        arguments[4][12][0].apply(exports, arguments);
      }, { "dup": 12 }], 17: [function (require, module, exports) {
        'use strict';

        var parseIntStrict = require('parse-int');
        var expandYear = require('expand-year');

        module.exports = function parseYear(year, expand, now) {
          year = parseIntStrict(year);
          if (year == null) return;
          if (!expand) return year;
          return expandYear(year, now);
        };
      }, { "expand-year": 18, "parse-int": 13 }], 18: [function (require, module, exports) {
        'use strict';

        var zeroFill = require('zero-fill');
        var parseIntStrict = require('parse-int');

        var pad = zeroFill(2);

        module.exports = function expandYear(year, now) {
          now = now || new Date();
          var base = now.getFullYear().toString().substr(0, 2);
          year = parseIntStrict(year);
          return parseIntStrict(base + pad(year));
        };
      }, { "parse-int": 13, "zero-fill": 19 }], 19: [function (require, module, exports) {
        module.exports = function zeroFill(width, number, pad) {
          if (number === undefined) {
            return function (number, pad) {
              return zeroFill(width, number, pad);
            };
          }
          if (pad === undefined) pad = '0';
          width -= number.toString().length;
          if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number;
          return number + '';
        };
      }, {}], 20: [function (require, module, exports) {

        var space = require('to-space-case');

        module.exports = toCamelCase;

        function toCamelCase(string) {
          return space(string).replace(/\s(\w)/g, function (matches, letter) {
            return letter.toUpperCase();
          });
        }
      }, { "to-space-case": 21 }], 21: [function (require, module, exports) {

        var clean = require('to-no-case');

        module.exports = toSpaceCase;

        function toSpaceCase(string) {
          return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
            return match ? ' ' + match : '';
          }).trim();
        }
      }, { "to-no-case": 22 }], 22: [function (require, module, exports) {

        module.exports = toNoCase;

        var hasSpace = /\s/;
        var hasSeparator = /(_|-|\.|:)/;
        var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;

        function toNoCase(string) {
          if (hasSpace.test(string)) return string.toLowerCase();
          if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
          if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
          return string.toLowerCase();
        }

        var separatorSplitter = /[\W_]+(.|$)/g;

        function unseparate(string) {
          return string.replace(separatorSplitter, function (m, next) {
            return next ? ' ' + next : '';
          });
        }

        var camelSplitter = /(.)([A-Z]+)/g;

        function uncamelize(string) {
          return string.replace(camelSplitter, function (m, previous, uppers) {
            return previous + ' ' + uppers.toLowerCase().split('').join(' ');
          });
        }
      }, {}], 23: [function (require, module, exports) {
        module.exports = extend;

        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function extend() {
          var target = {};

          for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        }
      }, {}], 24: [function (require, module, exports) {
        module.exports = extend;

        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function extend(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        }
      }, {}], 25: [function (require, module, exports) {
        'use strict';

        var ccTypes = require('creditcards-types');
        var camel = require('to-camel-case');
        var extend = require('xtend');

        module.exports = extend(ccTypes, {
          get: function getTypeByName(name) {
            return ccTypes.types[camel(name)];
          }
        });
      }, { "creditcards-types": 5, "to-camel-case": 20, "xtend": 23 }]
    }, {}, [4])(4);
  });
});