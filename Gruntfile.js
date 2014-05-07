'use strict';

module.exports = function(grunt) {


  var cfg = {
    host : '*',
    port : 9000,
    livereload : 35729
  }
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dev : "dist"
      
    },
    copy: {
      dev : {
        files: [
          // {expand : true, cwd : 'src', src : ['**', '!lib/**'], dest : 'dist'},
          {expand : true, cwd : 'src', src : 'index.html', dest : 'dist'},
          {expand : true, cwd : 'src', src : 'image/**', dest : 'dist'},
          {expand : true, cwd : 'src/lib/jquery/dist', src : 'jquery.js', dest : 'dist/lib'},
          {expand : true, cwd : 'src/lib/backbone', src : 'backbone.js', dest : 'dist/lib'},
          {expand : true, cwd : 'src/lib/underscore', src : 'underscore.js', dest : 'dist/lib'},
          {expand : true, cwd : 'src/lib/seajs', src : 'sea-debug.js', dest : 'dist/lib'}

        ]
      }
      
    },
    connect : {
      options : {

      },
      dev : {
        options: {
          port: cfg.port,
          hostname: cfg.host,
          livereload : true,
          base : 'dist',
          // middleware : function(connect, options, middlewares) {
          //   return [
          //     connect.static(options.base[0]),
          //     function(req, res, next) {
          //       console.log(2222222222)
          //       connect.require('connect-livereload');
          //       res.end('Hello from port ' + options.port);
          //     }
          //   ];
          
          // },
          // middleware: function(connect, options) {
          //      return [
          //           require('connect-livereload')({
          //                port: options.livereload
          //           }),
          //           connect.query(),
          //           // require('./test/data/buildTestData.js').middleware,
          //           // Serve static files.
          //           connect.static(options.base),
          //           // Make empty directories browsable.
          //           connect.directory(options.base),
          //      ];
          // },

          open : {
            target: 'http://localhost:' + cfg.port + '/index.html',
            appName: 'chrome',
            callback: function() {}
          }
        }
      }
    },
    watch: {
      dev: {
        files: 'src/**',
        tasks: ['copy'],
        options : {
          livereload : cfg.livereload
        }
      },
      server: {
        files: 'src/**',
        tasks: ['copy', 'transport', 'concat'],
        options : {
          livereload : cfg.livereload
        }
      }
    },
    transport : {
      options : {
        // 默认true，自动生成多一套a-debug.js形式的文件
        debug : false,
        paths : ['ffff'],
        // 在模块名前面增加标志，默认空
        idleading : '',
        alias : {
          common : 'fffff'
        }
      },
      server : {
        cwd : 'src', expand : true, src : 'common/**/*', dest : 'dist' 
      }
    },
    concat : {
      server : {
        options : {
          banner : '//banner\r\t',
          footer : '//footer\r\t',

        },
        files : {
          'dist/common/a.js' : ['dist/common/**/*.js']
          // cwd : 'dist/common', expand : true, src : '**/*', dest : 'dist/a.js' 
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');


  // Default task.
  grunt.registerTask('dev', ['clean', 'copy', 'connect', 'watch']);
  grunt.registerTask('server', ['clean', 'copy', 'connect', 'transport', 'concat', 'watch:server']);

};
