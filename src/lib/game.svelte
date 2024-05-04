<script lang="ts">
	import { createCurrency } from './currency';
	import { writable } from 'svelte/store';

	// Initialize currencies
	let redBits = createCurrency({
		name: 'Red Bits',
		suffix: 'R',
		bgColor: 'bg-red-600',
		fgColor: 'text-red-500',
		manual: true,
		unlocked: function () {
			return true;
		}
	});
	let greenBits = createCurrency({
		name: 'Green Bits',
		suffix: 'G',
		bgColor: 'bg-green-600',
		fgColor: 'text-green-500',
		unlocked: function () {
			return redBits.amount >= 100;
		}
	});
	let blueBits = createCurrency({
		name: 'Blue Bits',
		suffix: 'B',
		bgColor: 'bg-blue-600',
		fgColor: 'text-blue-500',
		unlocked: function () {
			return greenBits.amount >= 1000;
		}
	});

	let currencies = writable({
		red: redBits,
		green: greenBits,
		blue: blueBits
	});

	function addCurrency(currencyKey: string) {
		$currencies[currencyKey as keyof typeof $currencies].add(1);
		currencies.set($currencies);
	}
</script>

<header class="flex space-x-4">
	{#each Object.entries($currencies) as [key, currency]}
		{#if currency.unlocked()}
			<div>
				<b class={currency.fgColor}>{currency.name}</b>
				<div class="flex">
					<span class="value">{currency.amount}</span>
					<span class="ml-1 text-gray-500">{currency.suffix}</span>
				</div>
			</div>
		{/if}
	{/each}
</header>

<hr class="my-4 h-2 border-blue-500" />

<main>
	<div class="flex space-x-4">
		{#each Object.entries($currencies) as [key, currency]}
			{#if currency.manual}
				<button class="rounded {currency.bgColor} p-2 text-white" on:click={() => addCurrency(key)}
					>+1 {currency.name}</button
				>
			{/if}
		{/each}
	</div>
</main>
