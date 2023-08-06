<script lang="ts">
	import { navigating } from '$app/stores';
	import searchIcon from '$lib/assets/search.svg';
	import AlphaBanner from '$lib/components/AlphaBanner.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let username = '';
	let searchInput: HTMLInputElement | undefined;
	const onKeyDown = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
			event.preventDefault();
			searchInput?.focus();
		}
	};

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		username = target.value.replace(/\s/g, '');
	}

	$: isLoading = $navigating ? true : false;
</script>

<svelte:head>
	<title>CoralStats</title>
	<meta name="og:title" content="CoralStats" />
	<meta
		name="og:description"
		content={'CoralStats ti permette di visualizzare le statistiche dei giocatori di CoralMC.'}
	/>
</svelte:head>

<main class="main-container flex flex-col justify-center">
	<AlphaBanner />
	<div class="w-full flex items-center h-full justify-center flex-col gap-4 px-4">
		<img
			src="/logo.webp"
			alt="coralstats logo"
			class={`rounded-full shadow-lg w-28 ${isLoading && 'animate-spin'}`}
		/>
		<form action={`/player/${username.toLowerCase()}`} autocomplete="off" class="w-fit">
			<label class="relative">
				<input
					on:focus={(e) => e.currentTarget.select()}
					placeholder="Cerca giocatore"
					type="text"
					bind:this={searchInput}
					bind:value={username}
					on:input={handleInput}
					class="w-full max-w-[400px] border border-stone-50/10 bg-stone-800 rounded-lg h-9 px-8 focus:outline-none focus:ring ring-stone-50/10"
				/>
				<img src={searchIcon} alt="search" class="absolute top-0 left-2" />
				<div
					class="top-0 right-2 border-stone-50/10 border rounded-lg bg-stone-900 w-fit text-sm px-1 absolute"
				>
					Ctrl K
				</div>
			</label>
		</form>
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
