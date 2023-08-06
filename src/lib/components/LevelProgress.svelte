<script lang="ts">
	import type { Player } from '$lib/fetchPlayer';
	export let player: Player;

	function getRequiredExperience(level: number) {
		const converted = String(level).slice(-2);

		let lastNumberExperience: number;
		switch (Number(converted[converted.length - 1])) {
			case 0:
				lastNumberExperience = 1000;
				break;
			case 1:
				lastNumberExperience = 1000;
				break;
			case 2:
				lastNumberExperience = 2000;
				break;
			case 3:
				lastNumberExperience = 3500;
				break;
			default:
				lastNumberExperience = 5000;
				break;
		}
		if (converted.length == 1 || lastNumberExperience === 5000) return lastNumberExperience;
		if (converted[0] == '0') return lastNumberExperience;
		return 5000;
	}

	function calculatePercentage(currentValue: number, maxValue: number): number {
		if (maxValue === 0) {
			throw new Error('Max value cannot be zero.');
		}

		const percentage = (currentValue / maxValue) * 100;
		return Math.min(100, Math.max(0, Math.floor(percentage)));
	}

	$: latestBedwarsStats = player.bedwarsStats[player.bedwarsStats.length - 1];
	$: requiredExperience = getRequiredExperience(latestBedwarsStats.level);
	$: percentage = calculatePercentage(latestBedwarsStats.experience, requiredExperience);
	$: color = percentage <= 25 ? 'red' : percentage <= 50 ? 'yellow' : 'green';
</script>

<div />

<div class="flex flex-col items-center gap-2">
	<div class={`font-minecraft text-minecraft-${color} text-center`}>
		Prossimo livello in {requiredExperience - latestBedwarsStats.experience}XP ({percentage}%)
	</div>

	<div class="w-full bg-stone-900 p-2 border-stone-50/10 border rounded-full">
		<div
			style={`width: ${percentage}%`}
			class={`bg-minecraft-${color} h-4 rounded-full text-xs text-black`}
		/>
	</div>
</div>
