<script lang="ts">
	import { Currency } from './currency/currency';
	import { Upgrade } from '$lib/currency/upgrade/upgrade';
	import CurrencyDisplay from './currency/display.svelte';
	import CurrencyAddButton from './currency/addButton.svelte';
	import ResetForNextButton from './currency/resetForNextButton.svelte';
	import BuyUpgrade from './currency/upgrade/buyButton.svelte';
	import { get, writable } from 'svelte/store';
	import { redirect } from '@sveltejs/kit';

	// Initialize currencies
	let whiteBits = new Currency({
		name: 'White Bits',
		suffix: 'W',
		bgColor: 'bg-white',
		fgColor: 'text-white'
	});
	let redBits = new Currency({
		name: 'Red Bits',
		suffix: 'R',
		bgColor: 'bg-red-600',
		fgColor: 'text-red-500',
		manual: true,
		forceUnlock: true
	});
	let greenBits = new Currency({
		name: 'Green Bits',
		suffix: 'G',
		bgColor: 'bg-green-600',
		fgColor: 'text-green-500',
		upgrades: []
	});
	let blueBits = new Currency({
		name: 'Blue Bits',
		suffix: 'B',
		bgColor: 'bg-blue-600',
		fgColor: 'text-blue-500',
		upgrades: []
	});

	// Set next currencies
	redBits.next = greenBits;
	greenBits.next = blueBits;

	// Make the currencies writable
	let currencies = writable({
		red: redBits,
		green: greenBits,
		blue: blueBits
	});

	// Add upgrades
	redBits.upgrades = [
		new Upgrade({
			name: 'Autobuy',
			costs: new Map<Currency, number>([[redBits, 10]])
		})
	];

	redBits.upgrades[0].amount.subscribe((value) => {
		setInterval(() => {
			currencies.update((currencies) => {
				currencies.red.add(value || 0);
				return currencies;
			});
		}, 50);
	});
</script>

<header>
	<section>
		<h2 class="py-2 text-center text-xl font-bold">
			Goal: Reach 100 white bits ({get(whiteBits.amount)}
			{whiteBits.suffix})
		</h2>
	</section>

	<section class="bg-gray-900 px-2 py-4">
		<h1 class="py-1 text-2xl font-bold">Currencies</h1>
		<div class="flex space-x-4">
			{#each Object.entries($currencies) as [key, currency]}
				<CurrencyDisplay {currency} />
			{/each}
		</div>
	</section>
</header>

<main>
	<h1 class="py-4 text-2xl font-bold">Manual</h1>
	<div class="flex space-x-4">
		{#each Object.entries($currencies) as [key, currency]}
			<CurrencyAddButton {currency} />
		{/each}
	</div>

	<h1 class="py-4 text-2xl font-bold">Reset for a new currency</h1>
	<div class="flex space-x-4">
		{#each Object.entries($currencies) as [key, currency]}
			<ResetForNextButton {currency} />
		{/each}
	</div>

	<h1 class="py-4 text-2xl font-bold">Upgrades</h1>
	<div class="flex space-x-4">
		{#each Object.entries($currencies) as [key, currency]}
			{#each Object.entries(currency.upgrades || {}) as [key, upgrade]}
				<div class="flex-wrap space-x-4 rounded p-4 {currency.bgColor}">
					{currency.name}: <BuyUpgrade {upgrade} />
				</div>
			{/each}
		{/each}
	</div>
</main>
