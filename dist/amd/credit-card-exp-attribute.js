define(['exports', 'aurelia-framework', './creditcards'], function (exports, _aureliaFramework, _creditcards) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreditCardExpCustomAttribute = undefined;

  var _creditcards2 = _interopRequireDefault(_creditcards);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var CreditCardExpCustomAttribute = exports.CreditCardExpCustomAttribute = (_class = function () {
    function CreditCardExpCustomAttribute() {
      _classCallCheck(this, CreditCardExpCustomAttribute);

      _initDefineProp(this, 'month', _descriptor, this);

      _initDefineProp(this, 'monthValid', _descriptor2, this);

      _initDefineProp(this, 'year', _descriptor3, this);

      _initDefineProp(this, 'yearValid', _descriptor4, this);

      _initDefineProp(this, 'isPast', _descriptor5, this);
    }

    CreditCardExpCustomAttribute.prototype.monthChanged = function monthChanged(newValue) {
      var parsed = _creditcards2.default.expiration.month.parse(newValue);
      this.monthValid = _creditcards2.default.expiration.month.isValid(parsed);
      this._updateIsPast(newValue, this.year);
    };

    CreditCardExpCustomAttribute.prototype.yearChanged = function yearChanged(newValue) {
      var parsed = _creditcards2.default.expiration.year.parse(newValue);
      this.yearValid = _creditcards2.default.expiration.year.isValid(parsed);
      this._updateIsPast(this.month, newValue);
    };

    CreditCardExpCustomAttribute.prototype._updateIsPast = function _updateIsPast(month, year) {
      this.isPast = _creditcards2.default.expiration.isPast(month, year);
    };

    return CreditCardExpCustomAttribute;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'month', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'monthValid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'year', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'yearValid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'isPast', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});