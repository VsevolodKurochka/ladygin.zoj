/**
 * Optimize PNG, JPEG, GIF, SVG images.
 * -----------------------------------------------------------------------------
 */
 
import gulp 						from 'gulp';
import folders					from './folders';
import imagemin 				from 'gulp-imagemin';

// Task `image`
gulp.task('image', () => {
	return gulp.src(`${folders.assetsSrc}/img/**/*`)
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(gulp.dest(`${folders.assetsBuild}/img`))
});


// Task `image:watch`
gulp.task('image:watch', () =>
	gulp.watch(`${folders.assetsSrc}/img/**/*`, gulp.series('image'))
);