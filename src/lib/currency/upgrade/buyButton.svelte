<script lang="ts">
	import { Upgrade } from '$lib/currency/upgrade/upgrade';
	import { get, writable, type Writable } from 'svelte/store';

	export let upgrade: Upgrade;

	let upgrade_value: number;

	upgrade.amount.subscribe((value) => {
		upgrade_value = value;
	});
</script>

<button
	class="rounded bg-slate-500 p-2 text-white"
	on:mousedown={() => upgrade.amount.update((amount) => amount + 1)}
	>Buy {upgrade.name} ({upgrade_value})</button
>
