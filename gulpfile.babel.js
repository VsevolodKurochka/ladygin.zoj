'use strict';

/**
 * General
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './tasks/folders';

/**
 * Require modules
 * -----------------------------------------------------------------------------
 */

import requireDir from 'require-dir';

requireDir('./tasks');

import {server, reload, serve} from './tasks/browserSync';

// Your "watch" task
gulp.task(
	'watch', 
	gulp.series(
		serve,
		'babel',
		'concat',
		gulp.parallel(
			'babel:watch',
			'concat:watch',
			'sass',
			'sass:watch',
			'image',
			'fonts',
			'image:watch',
			'fonts:watch'
		)
	)
);

// Build
gulp.task(
	'build',
	gulp.series(
		'assets:build',
		'vendor:build',
		'views:build',
		'php:build',
	)
);

gulp.task('default', gulp.series('watch'));