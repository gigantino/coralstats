<script lang="ts">
	import { navigating } from '$app/stores';
	import searchIcon from '$lib/assets/search.svg';
	import AlgoliaSearch from '$lib/components/shared/AlgoliaSearch.svelte';
	import AlphaBanner from '$lib/components/shared/AlphaBanner.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';

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

<main class="w-full">
	<AlphaBanner />
	<nav class="w-full px-4 min-h-16 border-b flex items-center border-stone-50/10 bg-stone-900">
		<div class="flex justify-between py-2 gap-2 w-full max-w-screen-lg m-auto items-center">
			<a href="/" class="flex-shrink-0">
				<img
					src="/logo.webp"
					alt="coralstats logo"
					class={`${
						isLoading && 'animate-spin'
					} w-10 h-10 rounded-full drop-shadow-sm flex-shrink-0`}
				/>
			</a>
			<AlgoliaSearch />
		</div>
	</nav>

	<div class="w-full p-4">
		<div class="m-auto w-full max-w-screen-lg">
			<slot />
		</div>
	</div>

	<Footer />
</main>

<svelte:window on:keydown={onKeyDown} />
