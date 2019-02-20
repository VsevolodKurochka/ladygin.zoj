/**
 * Build
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';

gulp.task('assets:build', () =>
	gulp.src(`${folders.assetsBuild}/**/*`)
		.pipe(gulp.dest(`${folders.build}/assets/build`))
);

gulp.task('vendor:build', () =>
	gulp.src(`${folders.app}/vendor/**/*`)
		.pipe(gulp.dest(`${folders.build}/vendor`))
);

gulp.task('views:build', () =>
	gulp.src(`${folders.app}/views/**/*`)
		.pipe(gulp.dest(`${folders.build}/views`))
);

gulp.task('php:build', () =>
	gulp.src(`${folders.app}/*.php`)
		.pipe(gulp.dest(`${folders.build}`))
);