import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('credit card attribute', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('src/credit-card-attribute')
      .inView('<input credit-card="number.bind: number" />')
      .boundTo({
        number: '4711100000000000'
      });
  });

  it('should format the number', done => {
    createAndExpect(() => expect(component.viewModel.formatted).toBe('4711 1000 0000 0000'), done);
  });

  it('should detect eager type', done => {
    createAndExpect(() => expect(component.viewModel.eagerType).toBe('Visa'), done);
  });

  it('should detect type', done => {
    createAndExpect(() => expect(component.viewModel.type).toBe('Visa'), done);
  });

  afterEach(() => {
    component.dispose();
  });

  function createAndExpect(expect, done) {
    component.create(bootstrap).then(() => {
      expect();
      done();
    }).catch(e => { console.log(e.toString()); });
  }
});
