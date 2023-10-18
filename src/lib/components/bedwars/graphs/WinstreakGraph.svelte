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
	$: winstreak = bedwarsStatsHistory.winstreak;
	$: graphIsEmpty = !arrayHasChanged(bedwarsStatsHistory.winstreak)

	$: {
		if (ctx) {
			if (chartObject) {
				chartObject.destroy();
			}

			chartObject = new Chart(ctx, {
				type: 'bar',
				data: {
					datasets: [
						{
							label: 'Winstreak',
							backgroundColor: '#FFFF55',
							data: winstreak
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
							display: false
						}
					}
				}
			});
		}
	}
</script>

<div class="w-full h-72">
	{#if graphIsEmpty}
		<EmptyGraph />
	{:else}
		<canvas class="chart" bind:this={ctx} />
	{/if}
</div>
