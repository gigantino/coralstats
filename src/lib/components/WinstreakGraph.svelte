<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { BedwarsStatsHistory } from '$lib/fetchPlayer';
	import formatDate from '$lib/formatDate';

	let ctx: HTMLCanvasElement | undefined;
	let chartObject: Chart | undefined;

	export let bedwarsStatsHistory: BedwarsStatsHistory;

	$: x = bedwarsStatsHistory.dates.map((v) => formatDate(v));
	$: winstreak = bedwarsStatsHistory.winstreak;

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
					maintainAspectRatio: false,
					scales: {
						xAxis: {
							labels: x,
							ticks: {
								maxTicksLimit: 7
							}
						},
						x: {
							stacked: true,
							grid: {
								display: false
							}
						},
						y: {
							stacked: true,
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
	<canvas class="chart" bind:this={ctx} />
</div>
