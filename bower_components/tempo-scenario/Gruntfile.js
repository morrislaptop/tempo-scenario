/* global module, require */

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('build', [
    'jshint',
    'clean:build',
    'copy:build'
  ]);
  grunt.registerTask('test', [
    'karma:browser_unit'
  ]);
  grunt.registerTask('test:dev', [
    'karma:headless_unit'
  ]);
  grunt.registerTask('test:debug', [
    'karma:browser_unit_debug'
  ]);
  grunt.registerTask('package', [
    'clean:package',
    'copy:package',
    'concat:package',
    'uglify:package'
  ]);
  grunt.registerTask('workflow:dev', [
    'connect:dev',
    'build',
    'open:dev',
    'watch:dev'
  ]);

  grunt.initConfig({
    pkg:  grunt.file.readJSON("package.json"),
    env: grunt.option('env') || 'dev',

    app: {
      name: 'tempo-scenario',
      source_dir: 'app/src',
      build_dir: 'app/build',
      package_dir: 'app/package'
    },

    clean: {
      build : '<%= app.build_dir %>',
      package : '<%= app.package_dir %>'
    },

    jshint: {
      source: [
        '<%= app.source_dir %>/**/*.js',
        '!<%= app.source_dir %>/bower_components/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= app.source_dir %>',
            src: ['**', '!css/**'],
            dest: '<%= app.build_dir %>'
          },
          {
            expand: true,
            src: ['bower.json', 'package.json'],
            dest: '<%= app.build_dir %>'
          }
        ]
      },
      package: {
        files: [
          {
            expand: true,
            cwd: '<%= app.build_dir %>',
            src: [
              'index.html',
              'images/**',
              'bower.json',
              'package.json',
              'bower_components/**'
            ],
            dest: '<%= app.package_dir %>'
          }
        ]
      }
    },

    karma: {
      headless_unit: {
        options: {
          configFile: 'karma-unit.conf.js',
          browsers: ['PhantomJS']
        }
      },
      browser_unit: {
        options: {
          configFile: 'karma-unit.conf.js'
        }
      },
      browser_unit_debug: {
        options: {
          configFile: 'karma-unit.conf.js',
          singleRun: false,
          browsers: ['Chrome']
        }
      }
    },

    concat: {
      package: {
        src: [
          '<%= app.build_dir %>/js/**/*.js',
          '!<%= app.build_dir %>/js/**/*.spec.js',
        ],
        dest: '<%= app.package_dir %>/js/<%= app.name %>.js'
      }
    },

    uglify: {
      package: {
        files: {
          '<%= app.package_dir %>/js/<%= app.name %>.min.js': [
            '<%= app.package_dir %>/js/<%= app.name %>.js'
          ]
        }
      }
    },

    connect: {
      options: {
        hostname: '*'
      },
      dev: {
        options: {
          port: 9000,
          base: '<%= app.build_dir %>',
        }
      },
      package: {
        options: {
          port: 9001,
          base: '<%= app.package_dir %>',
        }
      }
    },

    open: {
      dev: {
        url: 'http://127.0.0.1:<%= connect.dev.options.port %>'
      },
      package: {
        url: 'http://127.0.0.1:<%= connect.package.options.port %>'
      }
    },

    watch: {
      dev: {
        files: ['<%= app.source_dir %>/**/*'],
        tasks: ['build', 'test:dev'],
        options: {
          livereload: true
        }
      }
    }
  });
};
