import { bindable } from 'aurelia-framework';
import creditcards from './creditcards';

export class CreditCardCvcCustomAttribute {
  @bindable cvc;
  @bindable valid;
  @bindable type;

  cvcChanged(newValue) {
    this._setValidity(newValue, this.type);
  }

  typeChanged(newValue) {
    this._setValidity(this.cvc, newValue);
  }

  _setValidity(cvc, type) {
    this.valid = creditcards.cvc.isValid(cvc, type);
  }
}
