'use strict';

module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-jsxhint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Configurable paths
	var config = {};

	// Define the configuration for all the tasks
	grunt.initConfig({
			// Project settings
			config: config,

			copy: {
				dist: {
					files: [{
						expand: false,
						src: ['server/**', 'shared/**'],
						dest: 'dist/'
					}, {
						expand: true,
						cwd: 'node_modules/bootstrap/dist',
						src: ['**'],
						dest: 'dist/client',
					}, {
						expand: true,
						cwd: 'node_modules/font-awesome',
						src: ['css/**', 'fonts/**'],
						dest: 'dist/client',
					}, {
						expand: true,
						src: [' client/**/*.{html,css}'],
						dest: 'dist/'
					}, ],
				},
			},

			jshint: {
				build: {
					files: {
						src: ['Gruntfile.js']
					},
					options: {
						node: true
					}
				},
				client: {
					files: {
						src: ['client/js/*.{js,jsx}', 'shared/*.js']
					},
					options: {
						browserify: true
					}
				},
				server: {
					files: {
						src: ['server/*.js', 'shared/*.js']
					},
					options: {
						node: true
					}
				}
			},

			browserify: {
				dist: {
					src: 'client/js/main.jsx',
					dest: 'dist/client/js/bundle.js',
					options: {
						transform: [require('grunt-react').browserify],
						browserifyOptions: {
							extensions: ['.jsx']
						}
					}
				}
			},

			clean: {
				dist: ["dist/"]
			},

			watch: {
				files: ['client/**', 'server/**'],
				tasks: ['build']
			},

			express: {
				dev: {
					options: {
						script: 'dist/server/server.js'
					}
				}
			},

			mochaTest: {
				test: {
					options: {
						reporter: 'spec',
						captureFile: 'results.txt', // Optionally capture the reporter output to a file
						quiet: false, // Optionally suppress output to standard out (defaults to false)
						clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
					},
					src: ['test/**/*.js']
				}

			}
		});

		grunt.registerTask('test', ['mochaTest']);

		grunt.registerTask('build', [
			'jshint',
			'test',
			'copy:dist',
			'browserify:dist',
		]);

		grunt.registerTask('dev', [
			'build',
			'express',
			'watch'
		]);

		grunt.registerTask('default', [
			'build'
		]);

	};
