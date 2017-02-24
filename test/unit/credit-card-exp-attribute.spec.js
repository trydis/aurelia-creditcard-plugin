import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('credit card exp attribute', () => {
  let component;
  let bindingContext = {};

  beforeEach(() => {
    component = StageComponent
      .withResources('src/credit-card-exp-attribute')
      .inView('<input credit-card-exp="month.bind: month; year.bind: year" />')
      .boundTo(bindingContext);
  });

  describe('month valid', () => {
    it('should be true for valid month', done => {
      bindingContext.month = '01';
      create(() => expect(component.viewModel.monthValid).toBe(true), done);
    });

    it('should be false for invalid month', done => {
      bindingContext.month = 'abc';
      create(() => expect(component.viewModel.monthValid).toBe(false), done);
    });
  });

  describe('year valid', () => {
    it('should be true for valid year', done => {
      bindingContext.year = '3000';
      create(() => expect(component.viewModel.yearValid).toBe(true), done);
    });

    it('should be false for invalid year', done => {
      bindingContext.year = 'abc';
      create(() => expect(component.viewModel.yearValid).toBe(false), done);
    });
  });

  describe('is past', () => {
    it('should be true for dates in the past', done => {
      bindingContext.month = '1';
      bindingContext.year = '1';
      create(() => expect(component.viewModel.isPast).toBe(true), done);
    });

    it('should be false for future dates', done => {
      bindingContext.month = '1';
      bindingContext.year = '3000';
      create(() => expect(component.viewModel.isPast).toBe(false), done);
    });
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
