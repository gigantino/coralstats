<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { BedwarsStatsHistory } from '$lib/fetchPlayer';
	import formatDate from '$lib/formatDate';
	import EmptyGraph from '$lib/components/shared/EmptyGraph.svelte';
	import arrayHasChanged from "$lib/arrayHasChanged"

	let ctx: HTMLCanvasElement | undefined;
	let chartObject: Chart | undefined;

	export let bedwarsStatsHistory: BedwarsStatsHistory;

	$: x = bedwarsStatsHistory.dates.map((v) => formatDate(v));
	$: stars = bedwarsStatsHistory.levels;
	$: graphIsEmpty = !arrayHasChanged(stars)

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
							label: 'Stelle',
							backgroundColor: '#FEE75C',
							borderColor: '#FEE75C',
							data: stars
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
