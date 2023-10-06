<script lang="ts">
	import StatsTable from '$lib/components/bedwars/StatsTable.svelte';
	import SkinViewer from '$lib/components/shared/SkinViewer.svelte';
	import type { PageData } from './$types';
	import StarProgression from '$lib/components/bedwars/StarProgression.svelte';
	// Graphs
	import OverallProgression from '$lib/components/bedwars/graphs/OverallProgression.svelte';
	import GamesGraph from '$lib/components/bedwars/graphs/GamesGraph.svelte';
	import WinstreakGraph from '$lib/components/bedwars/graphs/WinstreakGraph.svelte';
	import LevelGraph from '$lib/components/bedwars/graphs/LevelGraph.svelte';

	import downloadIcon from '$lib/assets/download.svg';
	import Nametag from '$lib/components/bedwars/Nametag.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{data.errored
			? 'Giocatore non trovato • CoralStats'
			: `${data.player.display_name} • CoralStats`}
	</title>
	<meta
		name="og:title"
		content={data.errored
			? 'Giocatore non trovato • CoralStats'
			: `${data.player.display_name} • CoralStats`}
	/>
	<meta
		name="og:description"
		content={data.errored
			? 'CoralStats ti permette di visualizzare le statistiche dei giocatori di CoralMC.'
			: `Visualizza le statistiche di ${data.player.display_name} su CoralMC.`}
	/>
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
		<div
			class="font-minecraft text-xl bg-stone-800 rounded-lg border w-fit m-auto border-stone-50/10 p-3 text-center"
		>
			<Nametag player={data.player} />
		</div>
		<div class="w-full gap-4 grid grid-cols-10">
			<div class="col-span-full lg:col-span-2 flex justify-center relative items-center flex-col">
				<SkinViewer skinUrl={data.player.skin_url.replace('http', 'https')} />
				<a href={data.player.skin_url.replace('http', 'https')} target="_blank">
					<div
						class="right-0 bottom-0 border-stone-50/10 rounded-lg bg-stone-800 border flex items-center justify-center py-1 px-2 gap-2 w-full"
					>
						<img src={downloadIcon} alt="download" />
						<span>Skin</span>
					</div>
				</a>
			</div>
			<div
				class="col-span-full lg:col-span-8 bg-stone-800 border border-stone-50/10 rounded-lg w-full"
			>
				<div class="w-full overflow-x-auto">
					<div class="w-full min-w-[500px]">
						<StatsTable player={data.player} statsHistory={data.bedwarsStatsHistory} />
					</div>
				</div>
			</div>
		</div>
		<div class="text-xl bg-stone-800 rounded-lg border border-stone-50/10 p-3">
			<LevelGraph player={data.player} />
		</div>
		<div class="text-xl bg-stone-800 rounded-lg border border-stone-50/10 p-3 flex flex-col gap-4">
			<h2 class="font-bold m-auto">Andamento partite</h2>
			<div class="w-full flex flex-col gap-4 items-center">
				<OverallProgression bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
		</div>
		<div class="w-full grid grid-cols-2 gap-4">
			<div
				class="col-span-2 md:col-span-1 bg-stone-800 border border-stone-50/10 rounded-lg p-3 flex flex-col gap-4"
			>
				<h2 class="font-bold m-auto">Stelle</h2>
				<StarProgression bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
			<div
				class="col-span-2 md:col-span-1 bg-stone-800 border border-stone-50/10 rounded-lg p-3 flex flex-col gap-4"
			>
				<h2 class="font-bold m-auto">Partite giocate</h2>
				<GamesGraph bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
		</div>
		<div class="w-full grid grid-cols-2 gap-4">
			<div
				class="col-span-2 md:col-span-1 bg-stone-800 border border-stone-50/10 rounded-lg p-3 flex flex-col gap-4"
			>
				<h2 class="font-bold m-auto">Winstreak</h2>
				<WinstreakGraph bedwarsStatsHistory={data.bedwarsStatsHistory} />
			</div>
		</div>
	</div>
{/if}
