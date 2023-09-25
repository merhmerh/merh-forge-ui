<script>
import { convertStringToArray, convert } from "$lib/components/Waterfall/Waterfall.store";
import WaterfallSingle from "./WaterfallSingle.svelte";

export let content;
const arr = convertStringToArray(convert(content));
</script>

{#each arr as item}
    {#if item.type == "string"}
        {item.content}
    {:else if item.type == "data"}
        <WaterfallSingle content={item.content} data={item.data} />
    {/if}
{/each}
