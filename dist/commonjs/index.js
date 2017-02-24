'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
function configure(config) {
  config.globalResources('./credit-card-number-attribute', './credit-card-cvc-attribute', './credit-card-exp-attribute');
}