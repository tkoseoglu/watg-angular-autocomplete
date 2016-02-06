/**
 * Created by Kemal on 02/05/16.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            beforeconcat: ["gruntfile.js", "app/**/*.js"]
        },
        concat: {
            app: {
                src: ["src/app/app.js", "src/app/core/*.js", "src/app/directives/*.js", "src/app/tests/*.js"],
                dest: "dev/js/watg-angular-autocomplete.js"
            },
            appDist: {
                src: ['src/app/appdist.js', 'src/app/directives/watgAutocompleteDirective2.js'],
                dest: 'dist/js/watg-angular-autocomplete.js'
            },
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-ui/jquery-ui.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js'
                ],
                dest: 'dev/js/vendor.js'
            },
            vendorDist: {
                src: [
                    'bower_components/jquery/dist.jquery.min.js',
                    'bower_components/jquery-ui/jquery-ui.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js'
                ],
                dest: 'dev/js/vendor.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            app: {
                files: {
                    'dev/js/watg-angular-autocomplete.min.js': ['dev/js/watg-angular-autocomplete.js']
                }
            },
            appDist: {
                files: {
                    'dist/js/watg-angular-autocomplete.min.js': ['dist/js/watg-angular-autocomplete.js']
                }
            }
        },
        concat_css: {
            assets: {
                src: ["src/assets/watg-angular-autocomplete.css"],
                dest: "dev/css/watg-angular-autocomplete.css"
            },
            assetsDist: {
                src: ["src/assets/watg-angular-autocomplete.css"],
                dest: "dist/css/watg-angular-autocomplete.css"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            assets: {
                files: {
                    'dev/css/watg-angular-autocomplete.min.css': ['dev/css/watg-angular-autocomplete.css']
                }
            },
            assetsDist: {
                files: {
                    'dist/css/watg-angular-autocomplete.min.css': ['dist/css/watg-angular-autocomplete.css']
                }
            },
            vendor: {
                files: {
                    'dev/css/vendor.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/fontawesome/css/font-awesome.css',
                        'bower_components/jquery-ui/themes/base/all.css',
                    ]
                }
            }
        },
        watch: {
            files: ["src/app/app.js", "src/app/core/*.js", "src/app/**/*.js", "src/assets/*.css"],
            tasks: ['concat:app', 'uglify', 'concat_css', 'cssmin:assets']
        },
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        src: ['bower_components/fontawesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
                        dest: 'dev/fonts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['bower_components/jquery-ui/themes/base/images/*',"src/assets/images/*"],
                        dest: 'dev/css/images/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ["src/assets/images/*"],
                        dest: 'dist/css/images/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask('dev', ["jshint", 'concat', 'uglify', 'concat_css', 'cssmin', 'copy', 'watch']); //, 'watch'
    grunt.registerTask('dist', ['concat:appDist', 'uglify:appDist', 'concat_css:assetsDist', 'cssmin:assetsDist','copy:dist']);
};
