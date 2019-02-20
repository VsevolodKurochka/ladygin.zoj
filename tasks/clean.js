/**
 * Clean
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';
import del 							from 'del';


// Task `clean`
gulp.task('clean', () => {
		del(`${folders.assetsBuild}/css`, {force: true});
		del(`${folders.assetsBuild}/fonts`, {force: true});
		del(`${folders.assetsBuild}/img`, {force: true});
		del(`${folders.assetsBuild}/js`, {force: true});
	}
);