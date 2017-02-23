var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
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

import { bindable } from 'aurelia-framework';
import creditcards from './creditcards';

export let CreditCardNumberCustomAttribute = (_class = class CreditCardNumberCustomAttribute {
  constructor() {
    _initDefineProp(this, 'number', _descriptor, this);

    _initDefineProp(this, 'formatted', _descriptor2, this);

    _initDefineProp(this, 'eagerType', _descriptor3, this);

    _initDefineProp(this, 'type', _descriptor4, this);
  }

  numberChanged(newValue) {
    const parsed = creditcards.card.parse(newValue);
    this.formatted = creditcards.card.format(parsed);
    this.eagerType = creditcards.card.type(parsed, true);
    this.type = creditcards.card.type(parsed);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'number', [bindable], {
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
})), _class);