'use strict';

System.register(['aurelia-framework', './creditcards'], function (_export, _context) {
  "use strict";

  var bindable, creditcards, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, CreditCardNumberCustomAttribute;

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

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }, function (_creditcards) {
      creditcards = _creditcards.default;
    }],
    execute: function () {
      _export('CreditCardNumberCustomAttribute', CreditCardNumberCustomAttribute = (_class = function () {
        function CreditCardNumberCustomAttribute() {
          _classCallCheck(this, CreditCardNumberCustomAttribute);

          _initDefineProp(this, 'number', _descriptor, this);

          _initDefineProp(this, 'formatted', _descriptor2, this);

          _initDefineProp(this, 'eagerType', _descriptor3, this);

          _initDefineProp(this, 'type', _descriptor4, this);
        }

        CreditCardNumberCustomAttribute.prototype.numberChanged = function numberChanged(newValue) {
          var parsed = creditcards.card.parse(newValue);
          this.formatted = creditcards.card.format(parsed);
          this.eagerType = creditcards.card.type(parsed, true);
          this.type = creditcards.card.type(parsed);
        };

        return CreditCardNumberCustomAttribute;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'number', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'formatted', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'eagerType', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'type', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('CreditCardNumberCustomAttribute', CreditCardNumberCustomAttribute);
    }
  };
});