import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('credit card number attribute', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('src/credit-card-number-attribute')
      .inView('<input credit-card-number="number.bind: number" />')
      .boundTo({
        number: '4711100000000000_this_should_be_removed_when_parsed'
      });
  });

  it('should format the number', done => {
    create(() => expect(component.viewModel.formatted).toBe('4711 1000 0000 0000'), done);
  });

  it('should detect eager type', done => {
    create(() => expect(component.viewModel.eagerType).toBe('Visa'), done);
  });

  it('should detect type', done => {
    create(() => expect(component.viewModel.type).toBe('Visa'), done);
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
