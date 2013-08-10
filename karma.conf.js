module.exports = function(karma) {
    karma.set({
        basePath: 'js',

        files: [
          "vendor/jquery/jquery.min.js",
          "vendor/handlebars/handlebars.js",
          "vendor/ember/ember.js",
          "vendor/jquery-mockjax/jquery.mockjax.js",
          "app.js",
          "tests/*.js",
          "templates/*.handlebars"
        ],

        logLevel: karma.LOG_ERROR,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,

        frameworks: ["qunit"],

        plugins: [
            'karma-qunit',
            'karma-chrome-launcher',
            'karma-ember-preprocessor',
            'karma-phantomjs-launcher'
        ],

        preprocessors: {
            "**/*.handlebars": 'ember'
        }
    });
};
