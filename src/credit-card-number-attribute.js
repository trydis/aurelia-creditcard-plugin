import { bindable } from 'aurelia-framework';
import creditcards from './creditcards';

export class CreditCardNumberCustomAttribute {
  @bindable number;
  @bindable formatted;
  @bindable eagerType;
  @bindable type;

  numberChanged(newValue) {
    const parsed = creditcards.card.parse(newValue);
    this.formatted = creditcards.card.format(parsed);
    this.eagerType = creditcards.card.type(parsed, true);
    this.type = creditcards.card.type(parsed);
  }
}
