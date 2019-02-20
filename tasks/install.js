/**
 * Install packages
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';
import install 					from 'gulp-install';


gulp.src(['./package.json'])
	.pipe(install())