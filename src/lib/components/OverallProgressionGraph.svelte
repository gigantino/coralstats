<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { BedwarsStatsHistory } from '$lib/fetchPlayer';
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
							backgroundColor: '#FEE75C',
							borderColor: '#FEE75C',
							data: kills
						},
						{
							label: 'Morti',
							backgroundColor: '#FEE75C',
							borderColor: '#FEE75C',
							hidden: true,
							data: deaths
						},
						{
							label: 'Uccisioni finali',
							backgroundColor: '#75C',
							borderColor: '#75C',
							data: finalKills
						},
						{
							label: 'Morti finali',
							backgroundColor: '#22E79C',
							borderColor: '#22E79C',
							data: finalDeaths
						},
						{
							label: 'Vittorie',
							backgroundColor: '#99A',
							borderColor: '#99A',
							data: wins
						},
						{
							label: 'Sconfitte',
							backgroundColor: '#22E79C',
							borderColor: '#22E79C',
							hidden: true,
							data: losses
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
							grid: {
								display: false
							}
						},
						y: {
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
	<canvas class="chart" bind:this={ctx} />
</div>
