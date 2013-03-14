module.exports = function(grunt) {

  var dependencies = [
      'components/jquery/jquery.js',
      'components/moment/moment.js',
      'components/underscore/underscore.js',
      'components/backbone/backbone.js',
      'components/backbone.localStorage/backbone.localStorage.js'],
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
      spec: {
        src: devDependencies,
        dest: 'spec/helper/lib.js'
      },
      template: {
        src: templates,
        dest: 'app/template/main.html'
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app/',
          keepalive: true
        }
      },
      spec: {
        options: {
          port: 9001,
          base: './',
          keepalive: true
        }
      }
    },

    jasmine: {
      test: {
        src: sources,
        options: {
          specs: specs,
          helpers: ['spec/helper/lib.js', 'spec/helper/**/*.js'],
          vendor: 'app/js/lib.js'
        }
      }
    },

    compass: {
      development: {
        options: {
          sassDir: sasses,
          cssDir: 'app/css'
        }
      }
    },

    watch: {
      test: {
        files: [sources, specs],
        tasks: ['jasmine:test:build']
      },
      css: {
        files: sasses + '/**/*',
        tasks: 'compass:development'
      },
      template: {
        files: templates,
        tasks: 'concat:template'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
};