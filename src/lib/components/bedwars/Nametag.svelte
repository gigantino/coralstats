<script lang="ts">
	import type { Player } from '$lib/fetchPlayer';
	export let player: Player;

	type MinecraftColor =
		| 'white'
		| 'dark-red'
		| 'red'
		| 'gold'
		| 'yellow'
		| 'dark-green'
		| 'green'
		| 'aqua'
		| 'dark-aqua'
		| 'dark-blue'
		| 'blue'
		| 'light-purple'
		| 'dark-purple'
		| 'gray'
		| 'dark-gray';

	type StarColor = {
		text: string;
		color: MinecraftColor;
	};

	function getStarsColors(star: number): StarColor[] {
		const convertedStar = `[${star}✪]`;
		if (star < 1000) {
			if (star < 100) return [{ text: convertedStar, color: 'gray' }];
			if (star < 200) return [{ text: convertedStar, color: 'white' }];
			if (star < 300) return [{ text: convertedStar, color: 'gold' }];
			if (star < 400) return [{ text: convertedStar, color: 'aqua' }];
			if (star < 500) return [{ text: convertedStar, color: 'green' }];
			if (star < 600) return [{ text: convertedStar, color: 'dark-aqua' }];
			if (star < 700) return [{ text: convertedStar, color: 'dark-red' }];
			if (star < 800) return [{ text: convertedStar, color: 'light-purple' }];
			if (star < 900) return [{ text: convertedStar, color: 'blue' }];
			return [{ text: String(star), color: 'dark-purple' }];
		} else {
			const singleCharacters = convertedStar.split('');
			const rainbowColor: StarColor[] = [];

			singleCharacters.forEach((char, i) => {
				switch (i) {
					case 0:
						rainbowColor.push({ text: char, color: 'red' });
						break;
					case 1:
						rainbowColor.push({ text: char, color: 'gold' });
						break;
					case 2:
						rainbowColor.push({ text: char, color: 'yellow' });
						break;
					case 3:
						rainbowColor.push({ text: char, color: 'green' });
						break;
					case 4:
						rainbowColor.push({ text: char, color: 'aqua' });
						break;
					case 5:
						rainbowColor.push({ text: char, color: 'light-purple' });
						break;
					case 6:
						rainbowColor.push({ text: char, color: 'dark-purple' });
						break;
				}
			});

			return rainbowColor;
		}
	}

	function getRankColor(rank: 'CHAMPION' | 'FAMOUS' | 'OWNER' | string): MinecraftColor {
		switch (rank) {
			case 'CHAMPION':
				return 'gold';
			case 'FAMOUS':
				return 'light-purple';
			case 'ADMIN':
				return 'red';
			case 'SRADMIN':
				return 'red';
			case 'OWNER':
				return 'dark-red';
			case 'YOUTUBER':
				return 'gold';
			case 'LEGEND':
				return 'blue';
			case 'VIP':
				return 'green';
			case 'JRDEV':
				return 'aqua';
			case 'STREAMER':
				return 'dark-purple';
			case 'HELPER':
				return 'dark-green';
			case 'DEV':
				return 'aqua';
			case 'MOD':
				return 'dark-aqua';
			case 'SRMOD':
				return 'dark-blue';
			case 'MOD+':
				return 'dark-aqua';
			default:
				return 'white';
		}
	}

	$: latestBedwarsStats = player.bedwarsStats[player.bedwarsStats.length - 1];
	$: starColors = getStarsColors(latestBedwarsStats.level);
	$: rankColor = getRankColor(player.bedwars_rank);
</script>

{#each starColors as char}
	<span class={`text-minecraft-${char.color}`}>{char.text}</span>
{/each}
<span class={`text-minecraft-${rankColor}`}>
	{player.bedwars_rank && `[${player.bedwars_rank}]`}
</span>
<span class="white">{player.display_name}</span>
<span class="text-minecraft-gray">{player.bedwars_clan && `[${player.bedwars_clan}]`}</span>
