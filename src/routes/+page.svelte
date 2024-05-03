<script>
	import game from './game';
	{
		$game;
	}
</script>

<header class="flex space-x-4">
	<div>
		<b class=" text-violet-500">Bits</b>
		<div class="flex">
			<span class="value">{$game.bits}</span>
			<span class="ml-1 text-gray-500">b</span>
		</div>
	</div>
</header>

<hr class="my-4" />

<section>
	<button on:click={() => game.addBit(1)} class="rounded bg-red-500 p-2 text-white">
		Add Bit
	</button>
</section>
