import { bindable } from 'aurelia-framework';
import creditcards from './creditcards';

export class CreditCardCustomAttribute {
  @bindable number;
  @bindable formatted;
  @bindable eagerType;
  @bindable type;

  numberChanged(newValue, oldValue) {
    this.formatted = creditcards.card.format(newValue);
    this.eagerType = creditcards.card.type(newValue, true);
    this.type = creditcards.card.type(newValue);
  }
}
