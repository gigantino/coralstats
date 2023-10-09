<script lang="ts">
	import StatsTable from '$lib/components/bedwars/StatsTable.svelte';
	import SkinViewer from '$lib/components/shared/SkinViewer.svelte';
	import type { PageData } from './$types';
	import LevelPercentage from '$lib/components/bedwars/LevelPercentage.svelte';
	// Graphs
	import CoinsGraph from '$lib/components/bedwars/graphs/CoinsGraph.svelte';
	import OverallProgression from '$lib/components/bedwars/graphs/OverallProgression.svelte';
	import GamesGraph from '$lib/components/bedwars/graphs/GamesGraph.svelte';
	import WinstreakGraph from '$lib/components/bedwars/graphs/WinstreakGraph.svelte';
	import StarProgression from '$lib/components/bedwars/graphs/StarProgression.svelte';

	import downloadIcon from '$lib/assets/download.svg';
	import Nametag from '$lib/components/bedwars/Nametag.svelte';

	export let data: PageData;

	$: pageTitle = data.errored
		? 'Giocatore non trovato • CoralStats'
		: `${data.player.display_name} • CoralStats`;
	$: pageDescription = data.errored
		? 'CoralStats ti permette di visualizzare le statistiche dei giocatori di CoralMC.'
		: `Visualizza le statistiche di ${data.player.display_name} su CoralMC.`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="og:title" content={pageTitle} />
	<meta name="description" content={pageDescription} />
	<meta name="og:description" content={pageDescription} />
</svelte:head>

{#if data.errored}
	<div class="w-full font-minecraft flex items-center flex-col justify-center gap-2">
		<h1 class="text-6xl text-minecraft-yellow">{data.status}!</h1>
		<p>
			{`${
				data.status == 404
					? 'Giocatore non trovato'
					: data.status == 400
					? 'Username invalido'
					: "C'e' stato un errore!"
			}`}
		</p>
	</div>
{:else}
	<div class="flex flex-col gap-4">
		<div class="font-minecraft text-xl w-fit m-auto p-3 text-center">
			<Nametag player={data.player} />
		</div>
		<div class="w-full gap-4 grid grid-cols-10">
			<div class="col-span-full lg:col-span-2 flex justify-center relative items-center flex-col">
				<SkinViewer skinUrl={data.player.skin_url.replace('http', 'https')} />
				<a href={data.player.skin_url.replace('http', 'https')} target="_blank">
					<div
						class="right-0 bottom-0 border-stone-50/10 rounded-lg bg-stone-800 border flex items-center justify-center py-1 px-2 gap-2 w-full"
					>
						<img src={downloadIcon} alt="download" width="20px" height="20px" />
						<span>Skin</span>
					</div>
				</a>
			</div>
			<div class="col-span-full lg:col-span-8 wrapper">
				<div class="w-full overflow-x-auto">
					<div class="w-full min-w-[500px]">
						<StatsTable player={data.player} statsHistory={data.bedwarsStatsHistory} />
					</div>
				</div>
			</div>
		</div>
		<div class="text-xl bg-stone-800 rounded-lg border border-stone-50/10 p-3">
			<LevelPercentage player={data.player} />
		</div>
		<div class="wrapper">
			<h2 class="font-bold m-auto">Andamento partite</h2>
			<div class="w-full flex flex-col gap-4 items-center">
				<OverallProgression bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
		</div>
		<div class="w-full grid grid-cols-2 gap-4">
			<div class="wrapper col-span-2 md:col-span-1">
				<h2 class="font-bold m-auto">Stelle</h2>
				<StarProgression bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
			<div class="wrapper col-span-2 md:col-span-1">
				<h2 class="font-bold m-auto">Partite giocate</h2>
				<GamesGraph bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
		</div>
		<div class="w-full grid grid-cols-2 gap-4">
			<div class="wrapper col-span-2 md:col-span-1">
				<h2 class="font-bold m-auto">Winstreak</h2>
				<WinstreakGraph bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
			<div class="wrapper col-span-2 md:col-span-1">
				<h2 class="font-bold m-auto">Coins</h2>
				<CoinsGraph bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
		</div>
	</div>
{/if}

<style scoped>
	.wrapper {
		@apply bg-stone-800 border border-stone-50/10 rounded-lg p-3 flex flex-col gap-4;
	}
</style>
