/**
 * browserSync
 * -----------------------------------------------------------------------------
 * https://github.com/gulpjs/gulp/blob/4.0/docs/recipes/minimal-browsersync-setup-with-gulp4.md
 */

import gulp 						from 'gulp';
import folders					from './folders';
import browserSync 			from 'browser-sync';


export const server = browserSync.create();


export function reload(done) {
	server.reload();
	done();
}


export function serve(done) {
	
	global.watch = true;

	server.init({
		proxy: 'ladygin.zoj',
		notify: false
	});

	done();
}