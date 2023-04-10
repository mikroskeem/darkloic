// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

    interface Window {
        RufflePlayer: RufflePlayer;
    }

    interface RufflePlayer {
        config: Partial<RufflePlayerConfig>;
        newest(): RufflePlayerPolyfill
    }

    interface RufflePlayerConfig {
        // Options affecting the whole page
        "publicPath": string | undefined;
        "polyfills": boolean;

        // Options affecting files only
        "autoplay": "auto" | "off" | "on";
        "unmuteOverlay": "visible";
        "backgroundColor": null;
        "wmode": "window";
        "letterbox": "fullscreen";
        "warnOnUnsupportedContent": boolean;
        "contextMenu": true;
        "showSwfDownload": false;
        "upgradeToHttps": boolean;
        "maxExecutionDuration": {
            "secs": number;
            "nanos": number;
        };
        "logLevel": "error";
        "base": null;
        "menu": boolean;
        "salign": "";
        "scale": "showAll" | "noborder" | "exactfit" | "noscale";
        "forceScale": boolean;
        "quality": "high";
        "splashScreen": boolean;
    }

    interface RufflePlayerPolyfill {
        version: string;
        createPlayer(): RufflePlayerInstance;
    }

    interface RufflePlayerInstance extends Element {
        load(what: string | RufflePlayerLoadParams): Promise<void>;
        fullscreenEnabled: boolean;
        isFullscreen: boolean;
        enterFullscreen(): void;
        exitFullscreen(): void;
    }

    interface RufflePlayerLoadParams {
        url: string;
        parameters?: string;
        allowScriptAccess?: boolean;
    }
}

export {};
