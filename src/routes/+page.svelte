<script>
import "./main.scss";

import Popover from "$lib/components/popover/Popover.svelte";
import Modal from "$lib/components/modal/Modal.svelte";
import Tooltip from "$lib/components/tooltip/Tooltip.svelte";
import Select, { initItems } from "$lib/components/select/Select.svelte";
import Notify from "$lib/components/Notify/Notify.svelte";
import { notify } from "$lib/components/Notify/notify.store.js";
import { dictionary } from "$lib/components/Waterfall/Waterfall.store";
import dict from "./dictionary.json";
import WaterfallSingle from "$lib/components/Waterfall/WaterfallSingle.svelte";
import Waterfall from "$lib/components/Waterfall/Waterfall.svelte";

dictionary.set(dict);

let modal;

const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Iguana Fruit",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Ugli Fruit",
    "Vanilla Bean",
    "Watermelon",
    "Ximenia Americana",
    "Yuzu",
    "Zucchini",
];
</script>

<Notify />

<main>
    <h1>FORGE UI</h1>

    <Tooltip
        position="top"
        value="Copy"
        clickedValue="Copied"
        on:click={(e) => {
            console.log("i click tooltip!", e.detail.slot);
            const slot = e.detail.slot;
            const range = document.createRange();
            range.selectNodeContents(slot);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }}>
        <code class="button">Copy this text</code>
    </Tooltip>

    <span>
        <WaterfallSingle content="Label" />
    </span>

    <WaterfallSingle content="any:spaceName" slotted>
        <span style="font-style:italic">any</span>
    </WaterfallSingle>

    <span>
        <Waterfall content="This a label using boolean operator" />
    </span>

    <Modal bind:this={modal} let:closeModal>
        <h1 style="margin:0;">Modal</h1>
        <p>Content</p>
        <Select searchable items={fruits}></Select>
        <button on:click={closeModal}>Close</button>
    </Modal>

    <div class="select-container">
        <Select items={fruits} searchable defaultValue={[10]}></Select>
    </div>

    <button
        on:click={() => {
            modal.open();
        }}>
        Click to show Modal
    </button>

    <input
        type="text"
        on:keydown={(e) => {
            if (e.key == "Enter") {
                console.log("??");
                notify.add("User Deleted");
            }
        }} />

    <div style="height:400px; width:100%; background-color:pink"></div>
    <div style="height:400px; width:100%; background-color:pink"></div>
    <div style="height:400px; width:100%; background-color:pink"></div>

    <div class="fixed">
        <Popover position="auto">
            <span slot="button">
                <button class="alt">Click Me</button>
            </span>

            <span slot="popup" class="mypopup">
                <a href="/">item 1</a>
                <a href="/">item 2</a>
                <a href="/">item 3</a>
                <a href="/">item 4</a>
            </span>
        </Popover>
    </div>
</main>

<style lang="scss">
.select-container {
    width: 400px;
}

main {
    width: 800px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

span.mypopup {
    border: 1px solid black;
    background-color: white;
    padding-inline: 1rem;
    min-width: 120px;
    display: flex;
    flex-direction: column;
}
</style>
