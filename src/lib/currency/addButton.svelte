<script lang="ts">
	import type { Currency } from './currency';
	export let currency: Currency;
</script>

{#if currency.manual}
	<button class="rounded {currency.bgColor} p-2 text-white" on:mousedown={() => currency.add(1)}>
		+1 {currency.name}
	</button>
{/if}
