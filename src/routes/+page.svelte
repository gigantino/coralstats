<script lang="ts">
	import { navigating } from '$app/stores';
	import { blur } from 'svelte/transition';
	import AlgoliaSearch from '$lib/components/shared/AlgoliaSearch.svelte';
	import AlphaBanner from '$lib/components/shared/AlphaBanner.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import '../app.css';

	$: isLoading = $navigating ? true : false;
	let imageIsLoading = true;

	const pageDescription =
		'CoralStats ti permette di visualizzare le statistiche dei giocatori di CoralMC.';
</script>

<svelte:head>
	<title>CoralStats</title>
	<meta name="og:title" content="CoralStats" />
	<meta name="og:description" content={pageDescription} />
	<meta name="description" content={pageDescription} />
</svelte:head>

<main class="main-container flex flex-col justify-center">
	<AlphaBanner />
	<div class="w-full flex items-center h-full justify-center flex-col gap-4 px-4">
		<div class="w-28 h-28 rounded-full bg-orange-300 relative">
			{#if !imageIsLoading}
				<div transition:blur class="absolute w-full h-full rounded-full bg-logo-yellow" />
			{/if}
			<img
				src="/logo.webp"
				alt="coralstats logo"
				class={`rounded-full shadow-lg w-28 ${isLoading && 'animate-spin'}`}
				height="112px"
				width="112px"
				loading="eager"
				on:load={() => (imageIsLoading = true)}
			/>
		</div>
		<AlgoliaSearch />
	</div>
	<Footer />
</main>

<style>
	.main-container {
		width: 100%;
		height: 100dvh;
	}
</style>
