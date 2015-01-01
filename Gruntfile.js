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
	
	// Configurable paths
	var config = {
	};

	// Define the configuration for all the tasks
	grunt.initConfig({
		// Project settings
		config: config,

		copy: {
			dist: {
				files: [
					{
						expand: false,
						src: ['server/**'],
						dest: 'dist/'
					},
					{
						expand: true,
						cwd: 'node_modules/bootstrap/dist',
						src: ['**'],
						dest: 'dist/client',
					},
					{
						expand: true,
						cwd: 'node_modules/font-awesome',
						src: ['css/**', 'fonts/**'],
						dest: 'dist/client',
					},
					{
						expand: true,
						src: [' client/**/*.{html,css}'],
						dest: 'dist/'
					},
				],
			},
		},
		
		jshint: {
			dist: ['Gruntfile.js', 'client/js/*.{js,jsx}', 'server/*.js'],
			options: {node: true}
		},
		
		browserify: {
			dist: {
				src: 'client/js/main.jsx',
				dest: 'dist/client/js/bundle.js',
				options: {
				    transform:  [ require('grunt-react').browserify ],
					browserifyOptions: { extensions: ['.jsx'] }
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
		}

	});

	grunt.registerTask('test', function(target) {});

	grunt.registerTask('build', [
		'jshint:dist',
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
