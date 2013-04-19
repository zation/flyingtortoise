module.exports = function(grunt) {

  var dependencies = [
      'components/jquery/jquery.js',
      'components/moment/moment.js',
      'components/underscore/underscore.js',
      'components/backbone/backbone.js',
      'components/backbone.localStorage/backbone.localStorage.js',
      'components/Chart.js/Chart.js'],
    devDependencies = [
      'components/jasmine-jquery/lib/jasmine-jquery.js',
      'components/jasmine-ajax/lib/mock-ajax.js'],
    sources = 'app/js/**/*.js',
    sasses = 'sass',
    templates = 'app/template/**/_*.html',
    specs = 'spec/**/*Spec.js';

  grunt.initConfig({
    concat: {
      js: {
        src: dependencies,
        dest: 'app/js/lib.js'
      },
      test: {
        src: devDependencies,
        dest: 'spec/helper/lib.js'
      },
      html: {
        src: templates,
        dest: 'app/template/main.html'
      }
    },

    connect: {
      dev: {
        options: {
          hostname: '',
          port: 9000,
          base: 'app/',
          keepalive: true
        }
      },
      test: {
        options: {
          port: 9001,
          base: './',
          keepalive: true
        }
      }
    },

    jasmine: {
      test: {
        src: ['app/js/Manager.js', 'app/js/model/Task.js', sources,
          '!app/js/lib.js', '!app/js/helper/*'],
        options: {
          specs: specs,
          helpers: ['spec/helper/lib.js', 'spec/helper/**/*.js'],
          vendor: ['app/js/lib.js', 'app/js/helper/animation-utils.js'],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage.json',
            report: [
              {
                type: 'html',
                options: {dir: 'reports/coverage'}
              },
              {
                type: 'text-summary'
              }
            ]
          }
        }
      }
    },

    compass: {
      dev: {
        options: {
          outputStyle: 'compressed',
          sassDir: sasses,
          cssDir: 'app/css',
          imagesDir: 'app/css/images',
          relativeAssets: true
        }
      }
    },

    watch: {
      test: {
        files: [sources, specs],
        tasks: ['jasmine:test', 'jasmine:test:build']
      },
      css: {
        files: sasses + '/**/*',
        tasks: 'compass:dev'
      },
      html: {
        files: templates,
        tasks: 'concat:html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
};