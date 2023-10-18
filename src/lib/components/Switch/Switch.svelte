<script>
export let isChecked = false;
import Icon from "@iconify/svelte";
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

function toggleCheck() {
    isChecked = !isChecked;
    dispatch("change", isChecked);
}
</script>

<div class="container">
    <button on:click={toggleCheck} class:checked={isChecked}>
        <div class="ball">
            {#if !isChecked}
                <Icon icon="mingcute:close-fill" width="12" />
            {:else}
                <Icon icon="mingcute:check-fill" width="12" />
            {/if}
        </div>
    </button>
    <slot />
</div>

<style lang="scss">
.container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    button {
        --switch-on-background: #38ae48;
        --switch-off-background: #535353;
        --switch-ball: #fff;
        border: none;
        outline: none;
        color: inherit;
        width: fit-content;
        height: fit-content;
        padding: 0;
        border-radius: 0;
        font-weight: inherit;
        &:hover,
        &:focus {
            box-shadow: none;
        }
        width: 2.5rem;
        height: 1.5rem;
        background-color: var(--switch-off-background);
        border-radius: 1rem;
        padding-inline: 0.25rem;
        justify-content: flex-start;
        transition: all 0.3s ease;
        .ball {
            left: 0;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            background-color: var(--switch-ball);
            color: var(--switch-off-background);
            transition: all 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &.checked {
            background-color: var(--switch-on-background);

            .ball {
                transform: translateX(14px);
                color: var(--switch-on-background);
            }
        }
    }
}
</style>
