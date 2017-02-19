import { bindable } from 'aurelia-framework';

export class App {
  @bindable number;
  
  constructor() {
    console.log('app ctor');
  }
}
