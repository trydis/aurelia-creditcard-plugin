import { bindable } from 'aurelia-framework';
import creditcards from './creditcards';

export class CreditCardExpCustomAttribute {
  @bindable month;
  @bindable monthValid;
  @bindable year;
  @bindable yearValid;
  @bindable isPast;

  monthChanged(newValue) {
    const parsed = creditcards.expiration.month.parse(newValue);
    this.monthValid = creditcards.expiration.month.isValid(parsed);
    this._updateIsPast(newValue, this.year);
  }

  yearChanged(newValue) {
    const parsed = creditcards.expiration.year.parse(newValue);
    this.yearValid = creditcards.expiration.year.isValid(parsed);
    this._updateIsPast(this.month, newValue);
  }

  _updateIsPast(month, year) {
    this.isPast = creditcards.expiration.isPast(month, year);
  }
}
