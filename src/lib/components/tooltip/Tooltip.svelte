<script>
import { createEventDispatcher, tick } from "svelte";
import { fade } from "svelte/transition";

export let clickedValue = "";
export let value;
export let position = "center";
export let fixed = false;
export let display = "inline-block";
export let width = "fit-content";
let tooltipValue = value;

const dispatch = createEventDispatcher();

let showToolTip, tooltipTopLeft, tooltipTopOffset, slot, overlay, container;

$: showToolTip,
    (() => {
        if (showToolTip && overlay && slot) {
            tooltipValue = value;
            if (position == "top") {
                const tooltip_height = overlay.getBoundingClientRect().height;
                tooltipTopOffset = `-${Math.ceil(tooltip_height)}px`;
            }
            if (position == "bottom") {
                const slot_height = slot.getBoundingClientRect().height;
                tooltipTopOffset = `${Math.ceil(slot_height) + 6}px`;
            }
        }
    })();

function setPosition() {
    if (position == "top") {
        const tooltip_height = overlay.getBoundingClientRect().height;
        const container_dim = container.getBoundingClientRect();
        tooltipTopOffset = container_dim.y - tooltip_height + "px";
        tooltipTopLeft = container_dim.x + container_dim.width / 2 + "px";
    }
}

function onClick() {
    if (clickedValue) {
        tooltipValue = clickedValue;
    }
    dispatch("click", {
        slot: slot,
        container: container,
    });
}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    bind:this={container}
    class="tooltip-container"
    style="--tooltip__container-display:{display}; --tooltip__container-width:{width}"
    on:mouseleave={() => {
        showToolTip = false;
    }}
    on:mouseenter={async () => {
        showToolTip = true;
        await tick();
        if (fixed) {
            setPosition();
        }
    }}>
    <div class="slot" bind:this={slot}>
        <slot {onClick} />
    </div>
    {#if showToolTip}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="tooltip__popup"
            class:fixed
            class:arrow={position !== "center"}
            class:clickable={clickedValue}
            style="--tooltip__left: {tooltipTopLeft}; --tooltip__top: {tooltipTopOffset};
                --tooltip__width: {width}"
            class:top={position == "top"}
            class:bottom={position == "bottom"}
            transition:fade={{ duration: 150 }}
            on:click={onClick}>
            <span>{@html tooltipValue}</span>
            <div bind:this={overlay} class="overlay"></div>
        </div>
    {/if}
</div>

<style lang="scss">
.tooltip-container {
    display: var(--tooltip__container-display);
    position: relative;
    height: fit-content;
    width: var(--tooltip__container-width);
}

.tooltip__popup {
    &.clickable {
        cursor: pointer;
    }
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    border: 1px solid var(--tooltip-border, var(--mono-300));
    background-color: var(--tooltip-bg, var(--mono-200));
    span {
        display: flex;
        text-align: center;
        justify-content: center;
        width: var(--tooltip-popup-width, var(--tooltip__width));
        white-space: var(--wrap, nowrap);
    }

    .overlay {
        // background-color: bisque;
        z-index: -1;
        position: absolute;
        width: 100%;
        height: calc(100% + 8px);
        left: 0;
        top: 0;
    }
    &.arrow {
        &:after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%) rotateZ(45deg);
            width: 8px;
            height: 8px;
            bottom: -5px;
            background-color: var(--tooltip-bg, var(--mono-200));
            border-bottom: 1px solid var(--tooltip-border, var(--mono-300));
            border-right: 1px solid var(--tooltip-border, var(--mono-300));
        }
    }

    &.top {
        top: var(--tooltip__top);
        left: 50%;
        transform: translateX(-50%);
    }
    &.bottom {
        top: var(--tooltip__top);
        left: 50%;
        transform: translateX(-50%);
        &.arrow {
            &:after {
                top: -5px;
                border: none;
                border-top: 1px solid var(--tooltip-border, var(--mono-300));
                border-left: 1px solid var(--tooltip-border, var(--mono-300));
            }
        }
        .overlay {
            top: -7px;
        }
    }
    &.fixed {
        position: fixed;
        top: var(--tooltip__top);
        left: var(--tooltip__left);
        width: var(--tooltip__width, var(--tooltip-popup-width));
        span {
            white-space: normal;
        }
    }
}
</style>
