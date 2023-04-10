<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import { listen, TauriEvent } from "@tauri-apps/api/event";
    //import { appWindow } from "@tauri-apps/api/window";
	import { browser } from "$app/environment";

    import "@ruffle-rs/ruffle/ruffle.js";

    let ruffleContainer: HTMLDivElement;
    let playerInstance: RufflePlayerInstance | undefined;

    async function loadGame(): Promise<void> {
        const ruffle = window.RufflePlayer.newest();
        if (!playerInstance) {
            const player = playerInstance = ruffle.createPlayer();
            ruffleContainer.appendChild(player);
        }

        return playerInstance.load({
            url: "/plazma-burst.swf",
            allowScriptAccess: false,
        });
    }

    onMount(() => loadGame());
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
