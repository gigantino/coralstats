<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade, blur } from 'svelte/transition';
	import { onMount } from 'svelte';
	import searchIcon from '$lib/assets/search.svg';
	import AlphaBanner from '$lib/components/shared/AlphaBanner.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import '../app.css';

	let username = '';
	let searchInput: HTMLInputElement | undefined;
	const onKeyDown = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			searchInput?.focus();
		}
	};

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		username = target.value.replace(/\s/g, '');
	}

	let hasLoaded = false;
	let imageLoading = true;
	let searchPlaceholder = '';
	onMount(() => {
		const randomPlayers = ['8hi', 'AfkaraLP', 'PreAke', 'LilVenox', 'TrueF_'];
		searchPlaceholder = `Cerca (e.g. ${
			randomPlayers[Math.floor(Math.random() * randomPlayers.length)]
		})`;
		hasLoaded = true;
	});

	$: isLoading = $navigating ? true : false;
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
		{#if hasLoaded}
			<div class="w-28 h-28 rounded-full bg-orange-300 relative">
				{#if imageLoading}
					<div transition:blur class="absolute w-full h-full rounded-full bg-logo-yellow" />
				{/if}
				<img
					src="/logo.webp"
					alt="coralstats logo"
					class={`rounded-full shadow-lg w-28 ${isLoading && 'animate-spin'}`}
					height="112px"
					width="112px"
					on:load={() => (imageLoading = false)}
				/>
			</div>
			<form
				transition:fade
				action={`/player/${username.toLowerCase()}`}
				autocomplete="off"
				class="w-fit"
			>
				<label class="relative">
					<input
						on:focus={(e) => e.currentTarget.select()}
						placeholder={searchPlaceholder}
						type="text"
						bind:this={searchInput}
						bind:value={username}
						on:input={handleInput}
						class="w-full max-w-sm border border-stone-50/10 bg-stone-800 rounded-lg h-9 px-8 focus:outline-none focus:ring ring-stone-50/10"
					/>
					<img src={searchIcon} alt="search" class="absolute top-0 left-2" />
					<div
						class="top-0 right-2 border-stone-50/10 border rounded-lg bg-stone-900 w-fit text-sm px-1 absolute"
					>
						Ctrl K
					</div>
				</label>
			</form>
		{/if}
	</div>
	<Footer />
</main>

<svelte:window on:keydown={onKeyDown} />

<style>
	.main-container {
		width: 100%;
		height: 100dvh;
	}
</style>
