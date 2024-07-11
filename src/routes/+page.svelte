<script>
import "./main.scss";

import Popover from "$lib/components/popover/Popover.svelte";
import Modal from "$lib/components/modal/Modal.svelte";
import Tooltip from "$lib/components/tooltip/Tooltip.svelte";
import Select, { initItems } from "$lib/components/select/Select.svelte";
import { beta } from "./main.store";
import Notify from "$lib/components/Notify/Notify.svelte";
import { notify } from "$lib/components/Notify/notify.store.js";
import { dictionary } from "$lib/components/Waterfall/Waterfall.store";
import dict from "./data/dictionary.json";
import WaterfallSingle from "$lib/components/Waterfall/WaterfallSingle.svelte";
import Waterfall from "$lib/components/Waterfall/Waterfall.svelte";
import Switch from "$lib/components/Switch/Switch.svelte";
import Checkbox from "$lib/components/Checkbox/Checkbox.svelte";
import FormControls from "$lib/components/FormControls/FormControls.svelte";
import { fruits } from "./data/data.js";

dictionary.set(dict);
console.log($beta);
let modal;
let nested_modal;
</script>

<h1>MERH FORGE UI</h1>

<div class="section">
    <h2>Notify</h2>

    <Notify />

    <button
        on:click={() => {
            notify.add("hello");
        }}>Notify</button>
    <button
        on:click={() => {
            notify.alert(
                ".my-element:not(:defined) applies styles when the variable is not defined or empty..my-element:not(:defined) applies styles when the variable is not defined or empty.",
            );
        }}>Alert</button>
</div>

<div class="section column">
    <h2>Select Dropdown</h2>
    <Select searchable placeholder={false} items={fruits} defaultValue="Cherry"></Select>

    <div class="select-container">
        <span>Wrap with container with clamp width</span>
        <Select items={fruits} searchable defaultValue={[10]} />
    </div>
</div>

<div id="checkbox" class="section">
    <h2>Checkbox</h2>
    <Checkbox filled>Filled</Checkbox>
    <Checkbox filled={false}>Outlined</Checkbox>
    <Checkbox disabled>Disabled</Checkbox>
    <div class="grid">
        <Checkbox filled>Filled</Checkbox>
        <Checkbox filled={false}>Outlined</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
    </div>
</div>

<div class="section">
    <h2>Switch</h2>
    <Switch
        bind:isChecked={$beta}
        on:change={(e) => {
            console.log(e.detail);
        }}>Toggle</Switch>
</div>

<div class="section column">
    <h2>Tooltip</h2>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <Tooltip position="top" value="Unstyled Tooltip">
        <code>Unstyled</code>
    </Tooltip>

    <Tooltip
        position="top"
        value="Copy"
        clickedValue="Copied"
        let:triggerClick
        on:click={(e) => {
            const slot = e.detail.slot;
            const range = document.createRange();
            range.selectNodeContents(slot);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }}>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <code class="tooltip" on:click={triggerClick}>Actionable</code>
    </Tooltip>
</div>

<div class="section column">
    <h2>Form Controls (Cancel, OK)</h2>

    <div>
        <span>Standard:</span>
        <FormControls />
    </div>

    <div>
        <span>Reverse:</span>
        <FormControls reverse={true} />
    </div>

    <div>
        <span>Custom Text:</span>
        <FormControls confirmText="Yeap" cancelText="Nope" />
    </div>
</div>

<div class="section column">
    <h2>Waterfall</h2>

    <span>
        <WaterfallSingle content="Label" />
    </span>

    <div>
        <WaterfallSingle content="any:spaceName" slotted>
            <span style="font-style:italic">any</span>
        </WaterfallSingle>
    </div>

    <span>
        <Waterfall content="This a label using boolean operator" />
    </span>
</div>

<div class="section">
    <h2>Modal</h2>
    <Modal bind:this={modal} let:closeModal>
        <h1 style="margin:0;">Modal</h1>
        <p>Content</p>
        <button on:click={() => nested_modal.show()}>Open Nested Modal</button>

        <Modal bind:this={nested_modal}>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
        </Modal>

        <Select searchable items={fruits}></Select>

        <button on:click={closeModal}>Close</button>
    </Modal>

    <button
        on:click={() => {
            modal.open();
        }}>
        Click to show Modal
    </button>
</div>

<div class="section column">
    <h2>Popover</h2>
    <Popover position="top-right">
        <span slot="button">
            <button class="alt">Anchor at top right</button>
        </span>

        <span slot="popup" class="mypopup">
            <a href="/">item 1</a>
            <a href="/">item 2</a>
            <a href="/">item 3</a>
            <a href="/">item 4</a>
        </span>
    </Popover>

    <Popover>
        <span slot="button">
            <button class="alt">anchor auto</button>
        </span>

        <span slot="popup" class="mypopup">
            <a href="/">item 1</a>
            <a href="/">item 2</a>
            <a href="/">item 3</a>
            <a href="/">item 4</a>
        </span>
    </Popover>
</div>

<style lang="scss">
.section {
    border: 1px solid var(--mono-200);
    padding: 1rem;
    border-radius: 0.5rem;
    h2 {
        margin: 0;
        padding-bottom: 1rem;
    }
    &.column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        h2 {
            padding-bottom: 0;
        }
    }
}

.select-container {
    width: 400px;
}

#checkbox {
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        justify-items: start;
    }
}

.tooltip {
    background-color: var(--mono-100);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
