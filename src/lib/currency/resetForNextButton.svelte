<script lang="ts">
	import type { Currency } from './currency';
	import { get } from 'svelte/store';
	export let currency: Currency;

	export let required = 1;

	currency.next?.amount.subscribe(() => {
		refreshNext();
	});

	function refreshNext() {
		if (currency.next != undefined) {
			required = Math.floor(
				Math.pow(get(currency.next?.amount) + 1, 1.33 + Math.pow(get(currency.next?.amount), 0.33))
			);
		}
	}
</script>

{#if currency.next}
	<button
		class="rounded p-2 {currency.bgColor} text-white"
		on:mousedown={() => currency.resetFor(required)}
	>
		+1 <span class="inline-block rounded {currency.next.bgColor} p-1 text-white"
			>{currency.next.name}</span
		>
		for {required}
		{currency.name}
	</button>
{/if}
