define(['exports', 'aurelia-framework', './creditcards'], function (exports, _aureliaFramework, _creditcards) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreditCardCvcCustomAttribute = undefined;

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

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

  var CreditCardCvcCustomAttribute = exports.CreditCardCvcCustomAttribute = (_class = function () {
    function CreditCardCvcCustomAttribute() {
      _classCallCheck(this, CreditCardCvcCustomAttribute);

      _initDefineProp(this, 'cvc', _descriptor, this);

      _initDefineProp(this, 'valid', _descriptor2, this);

      _initDefineProp(this, 'type', _descriptor3, this);
    }

    CreditCardCvcCustomAttribute.prototype.cvcChanged = function cvcChanged(newValue) {
      this._setValidity(newValue, this.type);
    };

    CreditCardCvcCustomAttribute.prototype.typeChanged = function typeChanged(newValue) {
      this._setValidity(this.cvc, newValue);
    };

    CreditCardCvcCustomAttribute.prototype._setValidity = function _setValidity(cvc, type) {
      this.valid = _creditcards2.default.cvc.isValid(cvc, type);
    };

    return CreditCardCvcCustomAttribute;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'cvc', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'valid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});