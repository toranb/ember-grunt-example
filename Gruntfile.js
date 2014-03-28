module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-ember-template-compiler');

  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    transpile: {
      tests: {
        type: 'amd',
        moduleName: function(path) {
            return grunt.config.process('js/tests/') + path;
        },
        files: [{
          expand: true,
          cwd: 'js/tests/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/tests/'
        }]
      },
      app: {
        type: 'amd',
        moduleName: function(path) {
          return grunt.config.process('js/') + path;
        },
        files: [{
          expand: true,
          cwd: 'js/app/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/app/'
        }]
      }
    },
    concat: {
      dist: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.js',
            'vendor/loader.js',
            'vendor/ember-resolver.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/tmpl.min.js'],
          dest: 'js/dist/deps.min.js'
      },
      test: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.js',
            'js/vendor/jquery-mockjax/jquery.mockjax.js',
            'vendor/loader.js',
            'vendor/ember-resolver.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/transpiled/tests/**/*.js',
            'js/dist/tmpl.min.js',
            'js/tests/helpers/integration_test_helper.js',
            'js/tests/specs/**/*.js'],
          dest: 'js/dist/deps.min.js'
      }
    },
    emberhandlebars: {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    var newSource = sourceFile.replace('js/templates/', '');
                    return newSource.replace('.handlebars', '');
                }
            },
            files: ['js/templates/*.handlebars'],
            dest: 'js/dist/tmpl.min.js'
        }
    }
  });

  grunt.task.registerTask('local', ['transpile:app', 'emberhandlebars', 'concat:dist']);
  grunt.task.registerTask('test', ['transpile:app', 'transpile:tests', 'emberhandlebars', 'concat:test', 'karma']);
}
