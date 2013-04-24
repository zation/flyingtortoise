module.exports = function(grunt) {
  function handleDependencyDictionaries(dependencyDictionaries, libPath) {
    var dependencies = [], sources = [];
    for (var index in dependencyDictionaries) {
      if (dependencyDictionaries.hasOwnProperty(index)) {
        var dependencyDictionary = dependencyDictionaries[index];
        var path = dependencyDictionary[0];
        var file = dependencyDictionary[1];
        dependencies.push(path + file);
        sources.push(libPath + file);
      }
    }
    return {
      dependencies: dependencies,
      sources: sources
    }
  }

  var dependencyDictionaries = [
      ['components/jquery/', 'jquery.js'],
      ['components/moment/', 'moment.js'],
      ['components/underscore/', 'underscore.js'],
      ['components/backbone/', 'backbone.js'],
      ['components/backbone.localStorage/', 'backbone.localStorage.js'],
      ['components/Chart.js/', 'Chart.js']
    ],
    testDependencyDictionaries = [
      ['components/jasmine-jquery/lib/', 'jasmine-jquery.js'],
      ['components/jasmine-ajax/lib/', 'mock-ajax.js']
    ],
    libPath = 'app/js/lib/',
    testHelperPath = 'spec/helper/',
    dependenciesInfo = handleDependencyDictionaries(dependencyDictionaries, libPath),
    dependencies = dependenciesInfo.dependencies,
    libSources = dependenciesInfo.sources,
    testDependenciesInfo = handleDependencyDictionaries(testDependencyDictionaries, testHelperPath),
    testDependencies = testDependenciesInfo.dependencies,
    testHelpers = testDependenciesInfo.sources,
    sources = ['app/js/Manager.js', 'app/js/model/Task.js', 'app/js/**/*.js'],
    sasses = 'sass',
    templates = 'app/template/**/_*.html',
    specs = 'spec/**/*Spec.js';

  grunt.initConfig({
    copy: {
      js: {
        expand: true,
        flatten: true,
        src: dependencies,
        dest: libPath
      },
      test: {
        expand: true,
        flatten: true,
        src: testDependencies,
        dest: testHelperPath
      }
    },

    concat: {
      html: {
        src: templates,
        dest: 'app/template/main.html'
      }
    },

    uglify: {
      options: {
        compress: true,
        mangle: true,
        report: 'min',
        sourceMap: 'app/js/lib/lib.js.map',
        sourceMappingURL: 'lib.js.map',
        sourceMapPrefix: 3
      },
      js: {
        files: {
          'app/js/lib/lib.min.js': libSources
        }
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
        src: [sources, '!app/js/helper/*', '!' + libPath + '*'],
        options: {
          specs: specs,
          helpers: [testHelpers, testHelperPath + '**/*.js'],
          vendor: ['app/js/lib/lib.min.js', 'app/js/helper/animation-utils.js'],
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

    jshint: {
      test: [sources, '!app/js/helper/*', '!' + libPath + '*']
    },

    watch: {
      js: {
        files: dependencies,
        tasks: ['copy', 'uglify']
      },
      test: {
        files: [sources, specs],
        tasks: ['jasmine:test', 'jasmine:test:build', 'jshint:test']
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jasmine:test', 'jshint:test']);
};