<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import { window as appWindow, fs, process } from "@tauri-apps/api";
    import { TauriEvent, type UnlistenFn } from "@tauri-apps/api/event";
    import { BaseDirectory } from "@tauri-apps/api/fs";
	import { browser } from "$app/environment";

    import "@ruffle-rs/ruffle/ruffle.js";

    let ruffleContainer: HTMLDivElement;
    let playerInstance: RufflePlayerInstance | undefined;

    async function loadGame(): Promise<void> {
        // Ensure we load saved state from file.
        window.localStorage.clear();

        // Load localStorage
        if (await fs.exists("storage.json", { dir: BaseDirectory.AppLocalData })) {
            const serialized = await fs.readTextFile("storage.json", { dir: BaseDirectory.AppLocalData });
            const parsed: Record<string, string> = JSON.parse(serialized);
            Object.assign(window.localStorage, parsed);
        }

        const ruffle = window.RufflePlayer.newest();
        if (!playerInstance) {
            const player = playerInstance = ruffle.createPlayer();
            ruffleContainer.appendChild(player);
        }

        return playerInstance.load({
            url: "/plazma-burst.swf",
        });
    }

    async function saveGame(destroy: boolean) {
        if (destroy && playerInstance) {
            // Ensure that Flash variables are saved
            ruffleContainer.removeChild(playerInstance);
            playerInstance = undefined;
        }

        // Save localStorage
        const serialized = JSON.stringify(window.localStorage);

        // wtf
        if (!await fs.exists("", { dir: BaseDirectory.AppLocalData })) {
            await fs.createDir("", {
                dir: BaseDirectory.AppLocalData,
            });
        }

        await fs.writeTextFile("storage.json", serialized, {
            dir: BaseDirectory.AppLocalData,
        });
    }

    let closeRequestUnlisten: UnlistenFn | undefined;

    async function cleanup() {
        if (closeRequestUnlisten) {
            closeRequestUnlisten();
        }
    }

    onMount(async () => {
        await loadGame();

        closeRequestUnlisten = await appWindow.getCurrent().listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async () => {
            try {
                await saveGame(true);
            } catch (e) {
                console.error("save error", e);
            } finally {
                await cleanup();
                await process.exit(0);
            }
        });
    });

    onDestroy(async () => {
        if (browser) {
            try {
                await saveGame(true);
            } catch (e) {
                console.error("save error", e);
            } finally {
                await cleanup();
            }
        }
    });
</script>

<style>
    .flash-content {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .flash-content :global(ruffle-player) {
        height: 100%;
        width: 100%;
    }
</style>

<div bind:this={ruffleContainer} class="flash-content"></div>
