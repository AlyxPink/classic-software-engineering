<script lang="ts">
	import type { Currency } from './currency';
	export let currency: Currency;
</script>

{#if currency.next}
	<button class="rounded {currency.bgColor} p-2 text-white" on:click={() => currency.resetFor(0)}>
		+1 <span class="rounded bg-white p-2 {currency.next.fgColor}">{currency.next.name}</span>
		for 100 {currency.name}
	</button>
{/if}
