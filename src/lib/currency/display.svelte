<script lang="ts">
	import type { Currency } from './currency';
	export let currency: Currency;

	let currency_value: number;
	let currency_unlocked: boolean;

	currency.amount.subscribe((value) => {
		currency_value = value;
		currency_unlocked = currency.unlocked();
	});
</script>

{#if currency_unlocked}
	<div class="bg-black p-2">
		<span class="font-bold {currency.fgColor}">{currency.name}</span>
		<div class="flex">
			<span class="font-bold shadow-red-500 {currency.fgColor}">{Math.floor(currency_value)}</span>
			<span class="ml-1 font-semibold text-white">{currency.suffix}</span>
		</div>
	</div>
{:else}
	<div class="bg-black p-2 font-bold">
		<span class="text-gray-800">???</span>
		<div class="flex">
			<span class="text-gray-500">???</span>
			<span class="ml-1 text-gray-800">?</span>
		</div>
	</div>
{/if}
