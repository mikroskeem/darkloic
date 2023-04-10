import { browser } from "$app/environment";
export const ssr = false;
export const prerender = true;

if (browser) {
    // @ts-ignore
    (window.RufflePlayer || (window.RufflePlayer = {})).config = {
        publicPath: "node_modules/@ruffle-rs/ruffle",
        warnOnUnsupportedContent: false,
        scale: "exactfit",
        forceScale: true,
    };
}
