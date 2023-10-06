<script lang="ts">
	import { navigating } from '$app/stores';
	import searchIcon from '$lib/assets/search.svg';
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
			<form action={`/player/${username.toLowerCase()}`} autocomplete="off" class="w-full md:w-fit">
				<label class="relative">
					<input
						on:focus={(e) => e.currentTarget.select()}
						placeholder="Cerca giocatore"
						type="text"
						bind:this={searchInput}
						bind:value={username}
						on:input={handleInput}
						class="w-full border border-stone-50/10 bg-stone-800 rounded-lg h-9 px-8 focus:outline-none focus:ring ring-stone-50/10"
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
	</nav>

	<div class="w-full p-4">
		<div class="m-auto w-full max-w-screen-lg">
			<slot />
		</div>
	</div>

	<Footer />
</main>

<svelte:window on:keydown={onKeyDown} />
