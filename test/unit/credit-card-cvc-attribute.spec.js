import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('credit card cvc attribute', () => {
  let component;
  let bindingContext = {};

  beforeEach(() => {
    component = StageComponent
      .withResources('src/credit-card-cvc-attribute')
      .inView('<input credit-card-cvc="cvc.bind: cvc; type.bind: type" />')
      .boundTo(bindingContext);
  });

  it('should set validity', done => {
    bindingContext.cvc = '123';
    create(() => expect(component.viewModel.valid).toBe(true), done);
  });

  it('should consider type', done => {
    bindingContext.cvc = '123';
    bindingContext.type = 'American Express';
    create(() => expect(component.viewModel.valid).toBe(false), done);
  });

  afterEach(() => {
    component.dispose();
  });

  function create(expect, done) {
    component.create(bootstrap).then(() => {
      expect();
      done();
    }).catch(e => { console.log(e.toString()); });
  }
});
