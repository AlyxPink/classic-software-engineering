<script lang="ts">
	import { createCurrency } from './currency/currency';
	import CurrencyDisplay from './currency/display.svelte';
	import CurrencyAddButton from './currency/addButton.svelte';
	import ResetForNextButton from './currency/resetForNextButton.svelte';
	import { writable } from 'svelte/store';

	// Initialize currencies
	let redBits = createCurrency({
		name: 'Red Bits',
		suffix: 'R',
		bgColor: 'bg-red-600',
		fgColor: 'text-red-500',
		manual: true,
		unlocked: true
	});
	let greenBits = createCurrency({
		name: 'Green Bits',
		suffix: 'G',
		bgColor: 'bg-green-600',
		fgColor: 'text-green-500'
	});
	let blueBits = createCurrency({
		name: 'Blue Bits',
		suffix: 'B',
		bgColor: 'bg-blue-600',
		fgColor: 'text-blue-500'
	});

	redBits.next = greenBits;
	greenBits.next = blueBits;

	let currencies = writable({
		red: redBits,
		green: greenBits,
		blue: blueBits
	});
</script>

<header class="flex space-x-4">
	{#each Object.entries($currencies) as [key, currency]}
		<CurrencyDisplay {currency} />
	{/each}
</header>

<hr class="my-4 h-2 border-blue-500" />

<main class="space-y-4">
	<div class="flex space-x-4">
		{#each Object.entries($currencies) as [key, currency]}
			<CurrencyAddButton {currency} />
		{/each}
	</div>
	<div class="flex space-x-4">
		{#each Object.entries($currencies) as [key, currency]}
			<ResetForNextButton {currency} />
		{/each}
	</div>
</main>
