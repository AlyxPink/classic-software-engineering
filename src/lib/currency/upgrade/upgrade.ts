import { writable, type Writable } from 'svelte/store';
import { Currency } from '$lib/currency/currency';

export type UpgradeParams = {
	name: string;
	costs: Map<Currency, number>;
}

export class Upgrade {
	name: string;
	amount: Writable<number>;
	costs: Map<Currency, number>;

	constructor(upgradeParams: UpgradeParams) {
		this.name = upgradeParams.name;
		this.costs = upgradeParams.costs;
		this.amount = writable(0);
	}

	buy(value: number) {
		this.amount.update(n => n + value);
	}
}
