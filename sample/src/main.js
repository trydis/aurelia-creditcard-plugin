export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-creditcard-plugin');

  aurelia.start().then(a => a.setRoot('src/app'));
}
