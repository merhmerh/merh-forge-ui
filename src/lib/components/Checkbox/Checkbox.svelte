<script>
export let isChecked = false;
import Icon from "@iconify/svelte";
import { createEventDispatcher } from "svelte";

export let height = "32";
export let filled = false;

const dispatch = createEventDispatcher();

function toggleCheck() {
    isChecked = !isChecked;
    dispatch("check", isChecked);
}
</script>

<button class="container" on:click={toggleCheck} style="--height:{height}px">
    <div class="checkbox">
        {#if isChecked}
            {#if filled}
                <Icon icon="fluent:checkbox-checked-24-filled" {height} />
            {:else}
                <Icon icon="fluent:checkbox-checked-24-regular" {height} />
            {/if}
        {:else if filled}
            <Icon icon="fluent:checkbox-unchecked-24-filled" {height} />
        {:else}
            <Icon icon="fluent:checkbox-unchecked-24-regular" {height} />
        {/if}
    </div>
    <span>
        <slot />
    </span>
</button>

<style lang="scss">
button.container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    padding: 0;
    &:hover {
        background-color: none;
        box-shadow: none;
    }

    div.checkbox {
        color: var(--main);
        height: var(--height);
    }
    span {
        color: var(--main);
    }
}
</style>
