module.exports = (grunt) ->
  grunt.initConfig
    ptk: "<%= pkg.name %>_<%= pkg.project_version %>"
    pkg: grunt.file.readJSON("package.json")
    jasmine:
      compile:
        src: []
        options:
          keepRunner: true
          host: "http://localhost:3000/"
          vendor: 'lib/jquery-1.10.2.min.js'
          specs: 'test/specs.js'
    uglify:
      options:
        banner: "/*! Built for <%= ptk %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
        compress:
          global_defs:
            "DEBUG": false
          dead_code: true
      app:
        src : "js/<%= ptk %>_app.js",
        dest : "js/<%= ptk %>_app.min.js"
      ready:
        src : "js/<%= ptk %>_ready.js",
        dest : "js/<%= ptk %>_ready.min.js"
      init:
        src : "js/<%= ptk %>_init.js",
        dest : "js/<%= ptk %>_init.min.js"
      templates:
        src : "js/<%= ptk %>_templates.js",
        dest : "js/<%= ptk %>_templates.min.js"
    coffee:
      test:
        options:
          bare:true
        files:
          "test/specs.js": "test/specs.coffee"
      compile:
        options:
          bare:true
        files:
          "js/<%= ptk %>_app.js": "coffeescript/app/*.coffee"
          "js/<%= ptk %>_ready.js": "coffeescript/ready/*.coffee"
          "js/<%= ptk %>_init.js": "coffeescript/init/*.coffee"
    concat:
      concat_sass:
        files:
          "sass/concat.sass" : ["sass/app.sass","sass/modules/*.sass"]
    sass:
      compile:
        options:
          style: "compressed"
        files:
          "css/<%= ptk %>.css": "sass/concat.sass"
    jade:
      compile:
        options:
          client: true
          compileDebug: false
          namespace: "<%= pkg.name %>_templates"
        files:
          "js/<%= ptk %>_templates.js": "jade/*.jade"
    watch:
      scripts:
        files: ["coffeescript/app/*.coffee","coffeescript/ready/*.coffee","coffeescript/init/*.coffee"]
        tasks: ["coffee:compile","uglify:init","uglify:app","uglify:ready"]
      styles:
        files: ["sass/*.sass","sass/modules/*.sass"]
        tasks: ["concat:concat_sass","sass:compile"]
      templates:
        files: "jade/*.jade"
        tasks: ["jade:compile","uglify:templates"]

  grunt.loadNpmTasks "grunt-contrib-concat" # use for concat sass files
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jade"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.registerTask "default", ["watch"]
  grunt.registerTask "test", ["coffee:test","jasmine"]
