<script lang="ts">
	import type { BedwarsStatsHistory, Player } from '$lib/fetchPlayer';
	type CategoryType = 'settimanali' | 'giornaliere' | 'totali';
	let selectedCategory: CategoryType = 'totali';
	const categories: CategoryType[] = ['totali', 'giornaliere', 'settimanali'];

	export let player: Player;
	export let statsHistory: BedwarsStatsHistory;

	function getLastElement<T>(array: T[]): T | undefined {
		if (!Array.isArray(array) || array.length === 0) {
			return undefined;
		}

		return array[array.length - 1];
	}

	function sumLastSevenElements(arr: number[]): number {
		const lastSevenElements = arr.slice(-7);
		const sum = lastSevenElements.reduce((acc, num) => acc + num, 0);
		return sum;
	}

	function getDisplayedValue(
		category: string,
		data: BedwarsStatsHistory,
		option:
			| 'kills'
			| 'deaths'
			| 'kdr'
			| 'final_kills'
			| 'final_deaths'
			| 'fkdr'
			| 'wins'
			| 'losses'
			| 'wlr'
			| 'beds_broken'
			| 'levels'
	) {
		return category === 'totali'
			? getLastElement(data[option])
			: category === 'giornaliere'
			? getLastElement(data.daily[option])
			: sumLastSevenElements(data.daily[option]);
	}

	function calculateRatio(k: number | undefined, d: number | undefined) {
		if (typeof k == 'undefined' || typeof d == 'undefined') return '0.00';
		if (d === 0) {
			return k?.toFixed(2);
		}
		return Number((k / d).toFixed(2));
	}
	$: kills = getDisplayedValue(selectedCategory, statsHistory, 'kills');
	$: deaths = getDisplayedValue(selectedCategory, statsHistory, 'deaths');
	$: kdr = calculateRatio(kills, deaths);
	$: finalKills = getDisplayedValue(selectedCategory, statsHistory, 'final_kills');
	$: finalDeaths = getDisplayedValue(selectedCategory, statsHistory, 'final_deaths');
	$: fkdr = calculateRatio(finalKills, finalDeaths);
	$: wins = getDisplayedValue(selectedCategory, statsHistory, 'wins');
	$: losses = getDisplayedValue(selectedCategory, statsHistory, 'losses');
	$: wlr = calculateRatio(wins, losses);
	$: bedsBroken = getDisplayedValue(selectedCategory, statsHistory, 'beds_broken');
	$: levels = getDisplayedValue(selectedCategory, statsHistory, 'levels');
</script>

<div class="flex h-full flex-col">
	<div class="w-full flex justify-end gap-3 bg-stone-900 rounded-lg border-stone-50/10 p-3">
		{#each categories as currentCategory}
			<button
				class={`${
					selectedCategory == currentCategory
						? 'border-stone-50/10 bg-stone-800 '
						: 'border-stone-900 hover:border-stone-800'
				} w-full  p-2 rounded-lg border  capitalize  focus:outline-none focus-visible:ring ring-stone-50/10`}
				on:click={() => (selectedCategory = currentCategory)}>{currentCategory}</button
			>
		{/each}
	</div>

	<div class="grid grid-cols-3 h-min p-3 gap-3">
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Uccisioni</span>
			<span>{kills}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Morti</span>
			<span>{deaths}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center relative">
			<span class="font-bold">K/D</span>
			<span>{kdr}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Uccisioni finali</span>
			<span>{finalKills}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Morti finali</span>
			<span>{finalDeaths}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">FK/D</span>
			<span>{fkdr}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Vittorie</span>
			<span>{wins}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Sconfitte</span>
			<span>{losses}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">W/L</span>
			<span>{wlr}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Letti distrutti</span>
			<span>{bedsBroken}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">Winstreak</span>
			<span>{player.bedwarsStats[player.bedwarsStats.length - 1].winstreak}</span>
		</div>
		<div class="flex flex-col border rounded-lg p-2 border-stone-50/10 text-center">
			<span class="font-bold">{selectedCategory == 'totali' ? 'Top Winstreak' : 'Stelle'}</span>
			<span
				>{selectedCategory == 'totali'
					? player.bedwarsStats[player.bedwarsStats.length - 1].highest_winstreak
					: levels}</span
			>
		</div>
	</div>
</div>
