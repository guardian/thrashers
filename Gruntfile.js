module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-json-generator');

  grunt.initConfig({
    vars: {
      dir: grunt.option('folderName')
    },
    watch: {
      css: {
        files: '<%= vars.dir %>/style.scss',
        tasks: ['sass']
      },
      json: {
        files: '<%= vars.dir %>/<%= vars.dir %>.html',
        tasks: ['json_generatorC']
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
    json_generator: {
      target: {
        dest: '<%= vars.dir %>/template.json',
        options: {
          html: "test",
          previous: "",
          refreshStatus: true
        }
      }
    }
  });

  grunt.registerTask('default', ['sass', 'watch']);
};