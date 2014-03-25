module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');

  grunt.initConfig({
    transpile: {
      app: {
        type: 'amd',
        moduleName: function(path) {
          return grunt.config.process('js/') + path;
        },
        files: [{
          expand: true,
          cwd: 'js/app/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['index.html', 'js/*.js', 'js/templates/*.handlebars'],
        tasks: ['dev'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    },
    hashres: {
      options: {
        renameFiles: true
      },
      prod: {
        src: ['js/dist/deps.min.js'],
        dest: 'index.html'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
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
            'js/dist/transpiled/**/*.js',
            'js/dist/tmpl.min.js',
            'js/startup.js'],
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
            'js/dist/transpiled/**/*.js',
            'js/dist/tmpl.min.js',
            'js/test/*.js',
            'js/startup.js'],
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

  grunt.task.registerTask('dev', ['transpile', 'emberhandlebars', 'concat:dist']);
  grunt.task.registerTask('local', ['dev', 'watch']);
  grunt.task.registerTask('deploy', ['transpile', 'emberhandlebars', 'concat:dist', 'hashres']);
  grunt.task.registerTask('test', ['transpile', 'emberhandlebars', 'concat:test', 'karma']);
}
