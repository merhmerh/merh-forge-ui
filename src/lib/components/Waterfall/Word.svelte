<script>
import Popup from "./Popup.svelte";
import { createEventDispatcher, tick } from "svelte";
const dispatch = createEventDispatcher();

export let data;
export let content;
export let value = undefined;
let show;
let popup;

export function closeAll() {
    show = false;
}
</script>

<button
    class="csd-tt__button-unstyled"
    on:click={() => {
        show = true;
        dispatch("showing");
    }}>{value ? value : content}</button>
{#if show}
    <Popup
        bind:this={popup}
        {data}
        on:closeAll={() => {
            dispatch("closeAll");
        }}
        on:close={() => {
            show = false;
            dispatch("remove");
        }} />
{/if}

<style lang="scss">
.csd-tt__button-unstyled {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    box-shadow: none;
    outline: none;
    transition: none;
    display: inline-block;

    font-weight: 400;
    background-color: var(--muted);
    padding-inline: 4px;
    // padding-block: 2px;
    border-radius: 4px;
    font-family: var(--monospace), monospace;
    &:hover {
        background-color: var(--muted);
    }

    &:focus {
        // border: 0 !important;
        outline: 0 !important;
    }
}
</style>
