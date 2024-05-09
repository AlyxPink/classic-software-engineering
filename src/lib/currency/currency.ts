import { get, writable, type Writable } from 'svelte/store';

export type CurrencyParams = {
	name: string;
	suffix: string;
	bgColor: string;
	fgColor: string;
	manual?: boolean;
	unlocked?: boolean;
	next?: Currency;
}

export type Currency = {
	name: string;
	suffix: string;
	bgColor: string;
	fgColor: string;
	manual?: boolean;
	unlocked?: boolean;
	next?: Currency;

	amount: Writable<number>;
	add: (value: number) => void;
	reset: () => void;
	resetFor: (required: number) => void;
}


export function createCurrency(currencyParams: CurrencyParams): Currency {
	let amount = writable(0);

	function add(value: number) {
		amount.update(n => n + value);
	}

	function reset() {
		amount.set(0);
	}

	function resetFor(required: number) {
		// If there is no "next" currency, return
		if (currencyParams.next === undefined) {
			console.error(`No next currency for ${currencyParams.name}`);
			return;
		}
		// If the amount of the current currency is less than the required amount, return
		if (get(amount) < required) {
			console.error(`Not enough ${currencyParams.name} to reset for ${currencyParams.next.name}`);
			return;
		}

		reset();
		currencyParams.next.amount.update(n => n + 1);
	}

	return {
		...currencyParams,
		amount,
		add,
		reset,
		resetFor,
	}
}
