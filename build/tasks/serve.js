let gulp = require('gulp');
let browserSync = require('browser-sync');
let path = require('path');
let paths = require('../paths');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  let bs = browserSync.create('Sample server');

  bs.init({
    server: {
      baseDir: paths.sample,
      routes: {
        '/aurelia-creditcard-plugin': path.join(paths.output, 'amd')
      },
    },
  }, done);
});
