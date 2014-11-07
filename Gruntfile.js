module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    vars: {
      dir: "embeds/" + grunt.option('folderName'),
      newDir: grunt.option('name')
    },
    watch: {
      css: {
        files: ['<%= vars.dir %>/*.scss', '<%= vars.dir %>/*.html'],
        tasks: ['sass']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
            '<%= vars.dir %>/style.css' : '<%= vars.dir %>/style.scss'
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['template/*.*'],
          dest: 'embeds/<%= vars.newDir %>'
        }]
      }
    }
  });

  grunt.event.on('watch', function() {
    var dir = grunt.option('folderName');
    var fullDir = "embeds/" + dir;
    var html = grunt.file.read(fullDir + "/index.html");
    var css = grunt.file.read(fullDir + "/style.css");
    var jsonFile = fullDir + "/source.json";

    var project = grunt.file.readJSON(jsonFile);
    project["html"] = '<div class="'+ dir +'__wrapper">' +
                        '<style>' + css + '</style>' +
                        html +
                      '</div>';
    grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
  });

  grunt.registerTask('default', ['sass', 'watch']);
};