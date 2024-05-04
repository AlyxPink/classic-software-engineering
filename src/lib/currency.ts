export function createCurrency(
	{
		name,
		suffix,
		bgColor,
		fgColor,
		manual = false,
		unlocked
	}: {
		name: string;
		suffix: string;
		bgColor: string;
		fgColor: string;
		manual?: boolean;
		unlocked: Function;
	}) {

	let amount = 0;

	function add(value: number) {
		amount += value;
	}

	function reset() {
		amount = 0;
	}

	return {
		name,
		suffix,
		bgColor,
		fgColor,
		manual,
		unlocked,
		get amount() { return amount; },
		add,
		reset
	};
}
