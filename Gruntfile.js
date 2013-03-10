module.exports = function(grunt) {

  var dependencies = [
      'components/jquery/jquery.js',
      'components/underscore/underscore.js',
      'components/backbone/backbone.js',
      'components/backbone.localStorage/backbone.localStorage.js'],

    sources = 'app/js/**/*.js',

    sasses = 'sass',

    specs = 'spec/*Spec.js';

  grunt.initConfig({
    concat: {
      development: {
        src: dependencies,
        dest: 'app/js/lib.js'
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
};