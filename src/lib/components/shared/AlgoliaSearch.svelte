<script lang="ts">
	import searchIcon from '$lib/assets/search.svg';
	import algoliaIcon from '$lib/assets/algolia.svg';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// Click outside
	let inputIsFocused = false;
	let searchForm: HTMLFormElement;

	const handleClick = (event: MouseEvent) => {
		if (searchForm && !searchForm.contains(event.target as Node)) {
			inputIsFocused = false;
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleClick);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleClick);
		}
	});

	// Strip special characters away from usernames
	let username = '';

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		username = target.value.replace(/\s/g, '');
		fetchResults();
	}

	// Add CTRL + K shortcut
	let searchInput: HTMLInputElement | undefined;

	const onKeyDown = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			searchInput?.focus();
		}
	};

	// Algolia search
	let searchResults: {
		displayName: string;
	}[] = [];

	async function fetchResults() {
		if (username.length > 0) {
			const response = await fetch(`https://api.coralstats.com/search/${username}`);
			if (response.ok) {
				const formattedResponse = await response.json();
				if (!formattedResponse) return;
				searchResults = formattedResponse.slice(0, 3);
			}
		} else {
			searchResults = [];
		}
	}
</script>

<form
	action={`/player/${username.toLowerCase()}`}
	autocomplete="off"
	class="w-fit"
	bind:this={searchForm}
	on:submit={() => (inputIsFocused = false)}
>
	<div class="relative">
		<input
			on:focus={(e) => e.currentTarget.select()}
			type="text"
			placeholder="Cerca (e.g. AfkaraLP)"
			bind:this={searchInput}
			bind:value={username}
			on:focusin={() => (inputIsFocused = true)}
			on:input={handleInput}
			class="w-full max-w-sm border border-stone-50/10 bg-stone-800 rounded-lg h-9 px-8 focus:outline-none focus:ring ring-stone-50/10"
		/>
		<div
			class="top-2 right-2 border-stone-50/10 border rounded-lg bg-stone-900 w-fit text-sm px-1 absolute"
		>
			Ctrl K
		</div>
		<img src={searchIcon} alt="search" class="absolute top-2 left-2" />
		{#if username && username !== '' && searchResults.length > 0 && inputIsFocused}
			<div
				class="w-full flex flex-col mt-2 border absolute border-stone-50/10 bg-stone-800 rounded-lg overflow-hidden z-50"
			>
				<div class="flex flex-col">
					{#each searchResults as result}
						<button
							class={`${
								result.displayName.toLowerCase() == username.toLowerCase() && 'bg-stone-900'
							} text-start hover:bg-stone-900 outline-none focus:bg-stone-900 duration-150 p-2`}
							on:focusin={() => (username = result.displayName)}
						>
							{result.displayName}
						</button>
					{/each}
				</div>
				<div class="self-end p-2">
					<div
						class="text-xs border flex gap-1 border-stone-50/10 bg-stone-700 py-1 px-2 rounded-full"
					>
						<img src={algoliaIcon} alt="search" class="w-3 font-bold" />
						Powered by Algolia
					</div>
				</div>
			</div>
		{/if}
	</div>
</form>

<svelte:window on:keydown={onKeyDown} />
