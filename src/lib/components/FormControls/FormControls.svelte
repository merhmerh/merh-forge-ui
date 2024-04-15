<script>
import { createEventDispatcher } from "svelte";

export let reverse;
let confirmButton, cancelButton;
const dispatch = createEventDispatcher();

function confirm() {
    dispatch("confirm");
}

function cancel() {
    dispatch("cancel");
}
</script>

<div class="formControls" class:reverse>
    <button bind:this={confirmButton} class="" on:click={confirm}>Save</button>
    <button bind:this={cancelButton} class="secondary" on:click={cancel}>Cancel</button>
</div>

<style lang="scss">
.formControls {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    button {
        min-width: 80px;
    }
    &.reverse {
        flex-direction: row-reverse;
    }
}
</style>
