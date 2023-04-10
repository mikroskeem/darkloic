import { browser, dev } from "$app/environment";
export const ssr = false;
export const prerender = true;

if (browser) {
    // @ts-ignore
    (window.RufflePlayer || (window.RufflePlayer = {})).config = {
        publicPath: dev ? "node_modules/@ruffle-rs/ruffle" : "ruffle",
        warnOnUnsupportedContent: false,
        scale: "exactfit",
        forceScale: true,
    };
}
