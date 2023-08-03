import type { BedwarsStats } from '$lib/fetchPlayer';

export default function getDailyStats(bedwarsStats: BedwarsStats[]) {
	if (bedwarsStats.length > 1) {
		return {
			kills: bedwarsStats[0].kills - bedwarsStats[1].kills,
			deaths: bedwarsStats[0].deaths - bedwarsStats[1].deaths,
			final_kills: bedwarsStats[0].final_kills - bedwarsStats[1].final_kills,
			final_deaths: bedwarsStats[0].final_deaths - bedwarsStats[1].final_deaths,
			wins: bedwarsStats[0].wins - bedwarsStats[1].wins,
			losses: bedwarsStats[0].losses - bedwarsStats[1].losses,
			beds_broken: bedwarsStats[0].beds_broken - bedwarsStats[1].beds_broken,
			levels: bedwarsStats[0].level - bedwarsStats[1].level
		};
	} else {
		return {
			kills: 0,
			deaths: 0,
			final_kills: 0,
			final_deaths: 0,
			wins: 0,
			losses: 0,
			beds_broken: 0,
			levels: 0
		};
	}
}
