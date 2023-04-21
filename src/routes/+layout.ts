import { browser, dev } from '$app/environment';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async (): Promise<void> => {
	if (browser) {
		const rufflePrefix = dev ? '/node_modules/@ruffle-rs/ruffle' : '/ruffle';

		// @ts-ignore
		(window.RufflePlayer || (window.RufflePlayer = {})).config = {
			publicPath: rufflePrefix,
			warnOnUnsupportedContent: false,
			scale: 'exactfit',
			forceScale: true
		};

		// @vite-ignore
		await import(rufflePrefix + '/ruffle.js');
	}
};
