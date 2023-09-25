<script>
import Icon from "@iconify/svelte";
import Word from "./Word.svelte";
import { convertStringToArray } from "$lib/components/Waterfall/Waterfall.store";
import { generateID } from "$lib/helper";
import { createEventDispatcher, onMount, tick } from "svelte";
export let data;
const tooltip_data = convertStringToArray(data.tooltip);
const id = generateID();

const dispatch = createEventDispatcher();

let comp,
    popup,
    popup_left = 0,
    popup_top = 0,
    fade = false;

let margin_top = 8;

export function getId() {
    return id;
}

function handleShowing(e) {
    fade = true;
}

function close() {
    dispatch("close");
    const nodes = document.querySelectorAll(".csd-tt__popup");
    if (nodes.length == 1) {
        dispatch("closeAll");
    }
}

function closePopup(e) {
    if (e.key == "Escape") {
        const nodes = document.querySelectorAll(".csd-tt__popup");
        const lastPopup = Array.from(nodes).pop();

        if (id == lastPopup.id) {
            close();
        }
    }
}

onMount(async () => {
    const parent = document.getElementById(id).previousElementSibling;
    const parent_dim = parent.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const [offsetLeft, parentPopup_dim] = (() => {
        const parentPopup = document.getElementById(id).parentElement.parentElement;
        let offsetLeft,
            parentPopup_dim = null;
        if (!parentPopup.classList.contains("csd-tt__popup")) {
            offsetLeft = parent_dim.left - 32;
        } else {
            parentPopup_dim = parentPopup.getBoundingClientRect();
            offsetLeft = parentPopup_dim.left + 32;
        }
        return [offsetLeft, parentPopup_dim];
    })();

    popup_left = offsetLeft;
    popup_top = parent_dim.top + parent_dim.height + margin_top;

    // handle if overflow
    await tick();
    const popup_dim = popup.getBoundingClientRect();

    if (popup_dim.top + popup_dim.height > windowHeight) {
        popup_top = windowHeight - popup_dim.height;
        if (parentPopup_dim && parentPopup_dim.top + parentPopup_dim.height == windowHeight) {
            popup_left = popup_left + 64;
        }
    }
});
</script>

<svelte:window on:keydown={closePopup} />

<div {id} bind:this={popup} class="csd-tt__popup" style="--popup_top:{popup_top}px; --popup_left:{popup_left}px" class:csd-tt__fade={fade}>
    <button
        class="csd-tt__button-unstyled csd-tt__popup__close"
        on:click={(e) => {
            close();
        }}>
        <div class="csd-tt__popup__close__icon">
            <Icon icon="material-symbols:close" height="24" />
        </div>
    </button>
    <!-- {id} -->
    <span class="csd-tt__popup__label">{data.title}</span>
    <div class="csd-tt__popup__content">
        {#each tooltip_data as obj}
            {#if obj.type == "string"}{obj.content}&nbsp;
            {:else if obj.type == "data"}
                <Word
                    bind:this={comp}
                    data={obj.data}
                    content={obj.content}
                    on:remove={() => {
                        fade = false;
                    }}
                    on:showing={handleShowing} />
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
.csd-tt__popup {
    position: fixed;
    left: var(--popup_left);
    top: var(--popup_top);
    z-index: 5000;
    max-width: 400px;
    background-color: var(--background-secondary);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    border: 1px solid var(--mono-200);
    box-shadow: 0 2px 5px color-mix(in srgb, var(--mono-600) 12%, transparent);
    &.csd-tt__fade {
        &::after {
            // pointer-events: none;
            // user-select: none;
            content: "";
            border-radius: 0.5rem;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: var(--background-secondary);
            opacity: 0.25;
        }
    }
    button.csd-tt__popup__close {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: 0.25rem;
        width: 24px;
        height: 24px;
        border-radius: 100px;
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        .csd-tt__popup__close__icon {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            pointer-events: none;
        }
    }

    .csd-tt__popup__label {
        font-weight: 600;
        font-size: 1.25rem;
        text-transform: capitalize;
    }
    .csd-tt__popup__content {
        position: relative;

        // color: yellow;
        word-wrap: normal;
        white-space: break-spaces;
    }
}

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
    padding-block: 2px;
    border-radius: 4px;
    &:hover {
        background-color: var(--muted);
    }

    &:focus {
        // border: 0 !important;
        outline: 0 !important;
    }
}
</style>
