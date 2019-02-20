/**
 * JS
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';
import babel 						from 'gulp-babel';

import uglify 					from 'gulp-uglify';
import notify 					from 'gulp-notify';
import rename						from 'gulp-rename';

import {reload} 				from './browserSync';


// Task `babel`
gulp.task('babel', () =>
	gulp.src(`${folders.assetsSrc}/js/babel/*.babel.js`)
		.pipe(babel())
		.on('error', notify.onError({
			title: 'Babel Error',
			message: '<%= error.message %>'
		}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(gulp.dest(`${folders.assetsSrc}/js/libs`))
);

// Task `babel:watch`
gulp.task('babel:watch', () =>
	gulp.watch(`${folders.assetsSrc}/js/babel/*.babel.js`, gulp.series('babel', reload))
);