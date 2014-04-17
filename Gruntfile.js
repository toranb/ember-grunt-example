module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['**/*.{js,hbs,handlebars,html}', '!js/dist/**/*'],
        tasks: ["local"]
      },
    },
    testem: {
      basic: {
        src: [
          "node_modules/qunit-special-blend/qunit-special-blend.js",
          "js/dist/deps.min.js",
          "node_modules/qunit-special-blend/run-qunit-special-blend.js"
        ],
        options: {
          parallel: 2,
          framework: "qunit",
          launch_in_dev: ["PhantomJS"],
          launch_in_ci: ["PhantomJS"]
        }
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
            'js/dist/tmpl.min.js',
            'vendor/loader.js',
            'vendor/ember-resolver.js',
            'js/dist/transpiled/app/**/*.js'],
          dest: 'js/dist/deps.min.js'
      },
      test: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.js',
            'js/vendor/jquery-mockjax/jquery.mockjax.js',
            'js/dist/tmpl.min.js',
            'vendor/loader.js',
            'vendor/ember-resolver.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/transpiled/tests/**/*.js',
            'vendor/test-loader.js'],
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
    },
    connect: {
      server: {
        options: {
          port: 3000,
          livereload: true,
          base: './'
        }
      }
    }
  });

  grunt.task.registerTask('local', ['transpile:app', 'emberhandlebars', 'concat:dist']);
  grunt.task.registerTask('test', ['transpile:app', 'transpile:tests', 'emberhandlebars', 'concat:test', 'testem:ci:basic']);
  grunt.task.registerTask("server", ['connect:server', 'watch']);
}
