import { get, writable, type Writable } from 'svelte/store';
import { Upgrade } from '$lib/currency/upgrade/upgrade';

export type CurrencyParams = {
	name: string;
	suffix: string;
	bgColor: string;
	fgColor: string;
	manual?: boolean;
	forceUnlock?: boolean;
	next?: Currency;
	upgrades?: Array<Upgrade>;
}

export class Currency {
	name: string;
	suffix: string;
	bgColor: string;
	fgColor: string;
	manual?: boolean;
	forceUnlock?: boolean;
	next?: Currency;
	upgrades?: Array<Upgrade>;

	amount: Writable<number>;

	constructor(currencyParams: CurrencyParams) {
		this.name = currencyParams.name;
		this.suffix = currencyParams.suffix;
		this.bgColor = currencyParams.bgColor;
		this.fgColor = currencyParams.fgColor;
		this.manual = currencyParams.manual;
		this.forceUnlock = currencyParams.forceUnlock;
		this.next = currencyParams.next;
		this.upgrades = currencyParams.upgrades;
		this.amount = writable(0);
	}

	add(value: number) {
		this.amount.update(n => n + value);
	}

	unlocked() {
		return this.forceUnlock || get(this.amount) > 0;
	}

	reset() {
		this.amount.set(0);
	}

	resetFor(required: number) {
		// If there is no "next" currency, return
		if (this.next === undefined) {
			return;
		}
		// If the amount of the current currency is less than the required amount, return
		if (get(this.amount) < required) {
			return;
		}

		this.reset();
		this.next.amount.update(n => n + 1);
	}
}
