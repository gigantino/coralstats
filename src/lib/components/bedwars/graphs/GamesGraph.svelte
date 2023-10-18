<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { BedwarsStatsHistory } from '$lib/fetchPlayer';
	import formatDate from '$lib/formatDate';
	import EmptyGraph from '$lib/components/shared/EmptyGraph.svelte';

	let ctx: HTMLCanvasElement | undefined;
	let chartObject: Chart | undefined;

	export let bedwarsStatsHistory: BedwarsStatsHistory;

	$: x = bedwarsStatsHistory.dates.map((v) => formatDate(v));
	$: wins = bedwarsStatsHistory.daily.wins;
	$: losses = bedwarsStatsHistory.daily.losses;
	$: graphIsEmpty = [...wins, ...losses].reduce((sum, num) => sum + num, 0) == 0;

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
							label: 'Vittorie',
							backgroundColor: '#57F287',
							data: wins,
							stack: 'Stack 0'
						},
						{
							label: 'Sconfitte',
							backgroundColor: '#ED4245',
							data: losses,
							stack: 'Stack 0'
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
