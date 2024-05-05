<script>
export let notification;
export let opts;
import Icon from "@iconify/svelte";
import { createEventDispatcher } from "svelte";

export let type;

const dispatch = createEventDispatcher();

function remove() {
    dispatch("remove");
}
</script>

<div class="notify__card" class:info={type == "info"} class:alert={type == "alert"}>
    <div class="icon">
        {#if !opts.type || opts.type == "info"}
            <Icon icon="fluent:info-12-regular" height="24" />
        {/if}
        {#if opts.type == "alert"}
            <Icon icon="mingcute:alert-line" height="24" />
        {/if}
        {#if opts.type == "copy"}
            <Icon icon="mingcute:copy-3-line" height="24" />
        {/if}
    </div>
    <span>
        {notification}
    </span>
    <button class="close" on:click={remove}>
        <Icon icon="mingcute:close-line" width="20" />
    </button>
</div>

<style lang="scss">
.notify__card {
    width: 350px;
    background-color: var(--background-secondary);
    padding: 0.5rem;
    padding-inline: 1rem 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.5s ease-in-out;
    opacity: 1;
    display: flex;
    align-items: center;
    --text-color: var(--main);

    &.alert {
        --background-color: var(--red, #ff5b5b);
        --text-color: var(--main-alt, #fff);
        background-color: var(--background-color);
        color: var(--text-color);
    }
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
    }
    span {
        padding: 0.5rem;
        width: 100%;
        border-right: 1px solid var(--text-color);
    }
    .close {
        background-color: transparent;
        border: none;
        outline: none;
        color: inherit;
        padding: 0.25rem;
        border-radius: 0.25rem;
        font-weight: inherit;
        &:hover {
            box-shadow: none;
            background-color: transparent;
            color: inherit !important;
        }
        &:focus {
            box-shadow: none;
        }
        width: 36px;
        aspect-ratio: 1;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.25rem;
        border-radius: 0;
        &:hover {
            color: var(--accent-500);
        }
    }
}
</style>
