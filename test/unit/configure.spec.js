import { configure } from '../../src/index';

class ConfigStub {
  globalResources(...resources) {
    this.resources = resources;
  }
}

describe('the Aurelia configuration', () => {
  let mockedConfiguration;

  beforeEach(() => {
    mockedConfiguration = new ConfigStub();
    configure(mockedConfiguration);
  });

  it('should register global resources', () => {
    expect(mockedConfiguration.resources)
      .toEqual([
        './credit-card-number-attribute',
        './credit-card-cvc-attribute',
        './credit-card-exp-attribute']);
  });
});
