<script>
import { dictionary } from "$lib/components/Waterfall/Waterfall.store";
import { tick } from "svelte";
import Word from "./Word.svelte";
export let content;
export let value = undefined;
export let data = $dictionary.find((obj) => obj.name.toLowerCase() === content.toLowerCase());

let comp, showing, scrollTop;

function handleScroll(e) {
    if (showing) {
        window.scrollTo(0, scrollTop);
    }
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:window on:keydown={triggerClose} on:scroll={handleScroll} />

{#if showing}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        tabindex="-1"
        role="button"
        class="csd-tt__backdrop"
        on:click={() => {
            comp.closeAll();
            showing = false;
        }}>
    </div>
{/if}

<Word
    bind:this={comp}
    {data}
    {content}
    {value}
    on:close={() => {
        showing = false;
    }}
    on:closeAll={() => {
        showing = false;
    }}
    on:showing={() => {
        showing = true;
        scrollTop = window.scrollY;
    }} />

<style lang="scss">
.csd-tt__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100svw;
    height: 100svh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background: color-mix(in srgb, var(--mono-100) 50%, transparent);
    // backdrop-filter: blur(1px);
}
</style>
