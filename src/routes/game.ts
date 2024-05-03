import { writable } from 'svelte/store';

const game = writable({
	bits: 0
});

const gameStore = {
	subscribe: game.subscribe,
	set: (u: { bits: number }) => {
		game.set(u);
	},

	delete: () => {
		game.set({ bits: 0 });
	},

	addBit: (n: number) => {
		game.update(game => {
			game.bits += n;
			return game;
		});
	}
};

export default gameStore;
