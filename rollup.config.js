import svelte from 'rollup-plugin-svelte';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { generateSW } from 'rollup-plugin-workbox'
import { terser } from 'rollup-plugin-terser';
import dotenv from 'dotenv'
dotenv.config()
const production = !process.env.ROLLUP_WATCH;

// console.log(process.env)

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			}
		}),



		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		replace({
			MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
      FIREBASE_apiKey: process.env.FIREBASE_apiKey,
			FIREBASE_authDomain: process.env.FIREBASE_authDomain,
			FIREBASE_databaseURL: process.env.FIREBASE_databaseURL,
			FIREBASE_projectId: process.env.FIREBASE_projectId,
			FIREBASE_storageBucket: process.env.FIREBASE_storageBucket,
			FIREBASE_messagingSenderId: process.env.FIREBASE_messagingSenderId,
			FIREBASE_appId: process.env.FIREBASE_appId
    }),
		commonjs(),
		generateSW({
			swDest: 'public/service-worker.js',
			globDirectory: 'public/',
			globPatterns: ['*.{js,png,html,css,gif,ico}']
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
