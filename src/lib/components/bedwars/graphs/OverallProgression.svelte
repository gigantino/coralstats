<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { BedwarsStatsHistory } from '$lib/fetchPlayer';
	import EmptyGraph from '$lib/components/shared/EmptyGraph.svelte';
	import arrayHasChanged from "$lib/arrayHasChanged"
	import formatDate from '$lib/formatDate';

	let ctx: HTMLCanvasElement | undefined;
	let chartObject: Chart | undefined;

	export let bedwarsStatsHistory: BedwarsStatsHistory;

	$: x = bedwarsStatsHistory.dates.map((v) => formatDate(v));
	$: kills = bedwarsStatsHistory.kills;
	$: deaths = bedwarsStatsHistory.deaths;
	$: finalKills = bedwarsStatsHistory.final_kills;
	$: finalDeaths = bedwarsStatsHistory.final_deaths;
	$: wins = bedwarsStatsHistory.wins;
	$: losses = bedwarsStatsHistory.losses;
	$: graphIsEmpty = !arrayHasChanged(wins) && !arrayHasChanged(losses)

	$: {
		if (ctx) {
			if (chartObject) {
				chartObject.destroy();
			}

			chartObject = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [
						{
							label: 'Uccisioni',
							backgroundColor: '#55FF55',
							borderColor: '#55FF55',
							data: kills
						},
						{
							label: 'Morti',
							backgroundColor: '#FF5555',
							borderColor: '#FF5555',
							data: deaths
						},
						{
							label: 'Uccisioni finali',
							backgroundColor: '#FFAA00',
							borderColor: '#FFAA00',
							data: finalKills
						},
						{
							label: 'Morti finali',
							backgroundColor: '#FFFF55',
							borderColor: '#FFFF55',
							data: finalDeaths
						},
						{
							label: 'Vittorie',
							backgroundColor: '#AA00AA',
							borderColor: '#AA00AA',
							data: wins
						},
						{
							label: 'Sconfitte',
							backgroundColor: '#5555FF',
							borderColor: '#5555FF',
							hidden: true,
							data: losses
						}
					]
				},
				options: {
					responsive: true,
					animation: false,
					maintainAspectRatio: false,
					scales: {
						xAxis: {
							labels: x,
							grid: {
								display: false
							},
							ticks: {
								maxTicksLimit: 7
							}
						},
						x: {
							border: {
								display: false
							}
						},
						y: {
							ticks: {
								stepSize: 1
							},
							grid: {
								display: false
							}
						}
					},
					plugins: {
						legend: {
							position: 'bottom'
						}
					}
				}
			});
		}
	}
</script>

<div class="w-full h-96">
	{#if graphIsEmpty}
		<EmptyGraph />
	{:else}
		<canvas class="chart" bind:this={ctx} />
	{/if}
</div>
