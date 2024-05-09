<script lang="ts">
	import type { Currency } from './currency';
	export let currency: Currency;

	let currency_value: number;

	currency.amount.subscribe((value) => {
		currency_value = value;
	});
</script>

{#if currency.unlocked}
	<div>
		<b class={currency.fgColor}>{currency.name}</b>
		<div class="flex">
			<span>{currency_value}</span>
			<span class="ml-1 text-gray-500">{currency.suffix}</span>
		</div>
	</div>
{:else}
	<div>
		<b class="text-gray-800">???</b>
		<div class="flex">
			<span class="text-gray-600">???</span>
			<span class="ml-1 text-gray-800">?</span>
		</div>
	</div>
{/if}
