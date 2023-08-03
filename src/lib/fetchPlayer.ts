export type BedwarsStats = {
	beds_broken: number;
	coins: number;
	collectionId: string;
	collectionName: string;
	created: string;
	deaths: number;
	experience: number;
	final_deaths: number;
	final_kills: number;
	highest_winstreak: number;
	id: string;
	kills: number;
	level: number;
	losses: number;
	player: string;
	updated: string;
	wins: number;
	winstreak: number;
};

export type BedwarsStatsHistory = {
	levels: number[];
	kills: number[];
	deaths: number[];
	kdr: number[];
	final_kills: number[];
	final_deaths: number[];
	fkdr: number[];
	wins: number[];
	losses: number[];
	wlr: number[];
	beds_broken: number[];
	winstreak: number[];
	dates: string[];
	daily: {
		levels: number[];
		kills: number[];
		deaths: number[];
		kdr: number[];
		final_kills: number[];
		final_deaths: number[];
		fkdr: number[];
		wins: number[];
		losses: number[];
		wlr: number[];
		beds_broken: number[];
	};
};

export type Player = {
	bedwars_clan: string;
	bedwars_rank: string;
	collectionId: string;
	collectionName: string;
	created: string;
	display_name: string;
	id: string;
	kitpvp_gang: string;
	kitpvp_rank: string;
	skin_is_slim: boolean;
	skin_url: string;
	updated: string;
	username: string;
	bedwarsStats: BedwarsStats[];
};

type PlayerResponse =
	| {
			errored: true;
			status: number;
	  }
	| {
			errored: false;
			player: Player;
			bedwarsStatsHistory: BedwarsStatsHistory;
	  };

function calculateRatio(k: number, d: number) {
	if (d === 0) {
		return k;
	}

	return Number((k / d).toFixed(2));
}

export default async function fetchPlayer(username: string): Promise<PlayerResponse> {
	const playerRequest = await fetch(`https://api.coralstats.com/player/${username}`);

	if (!playerRequest.ok) {
		console.log(playerRequest);
		return {
			errored: true,
			status: playerRequest.status
		};
	}

	const player: Player = await playerRequest.json();

	const bedwarsStatsHistory: BedwarsStatsHistory = {
		levels: [],
		kills: [],
		deaths: [],
		kdr: [],
		final_kills: [],
		final_deaths: [],
		fkdr: [],
		wins: [],
		losses: [],
		wlr: [],
		beds_broken: [],
		winstreak: [],
		dates: [],
		daily: {
			levels: [],
			kills: [],
			deaths: [],
			kdr: [],
			final_kills: [],
			final_deaths: [],
			fkdr: [],
			wins: [],
			losses: [],
			wlr: [],
			beds_broken: []
		}
	};

	const chronologicalBedwarsStats = player.bedwarsStats.reverse();
	chronologicalBedwarsStats.forEach((day, i) => {
		bedwarsStatsHistory.levels.push(day.level);
		bedwarsStatsHistory.kills.push(day.kills);
		bedwarsStatsHistory.deaths.push(day.deaths);
		bedwarsStatsHistory.kdr.push(calculateRatio(day.kills, day.deaths));
		bedwarsStatsHistory.final_kills.push(day.final_kills);
		bedwarsStatsHistory.final_deaths.push(day.final_deaths);
		bedwarsStatsHistory.fkdr.push(calculateRatio(day.final_kills, day.final_deaths));
		bedwarsStatsHistory.wins.push(day.wins);
		bedwarsStatsHistory.losses.push(day.losses);
		bedwarsStatsHistory.wlr.push(calculateRatio(day.wins, day.losses));
		bedwarsStatsHistory.beds_broken.push(day.beds_broken);
		bedwarsStatsHistory.winstreak.push(day.winstreak);
		bedwarsStatsHistory.dates.push(day.created);
		if (i > 0) {
			const dailyKills = day.kills - bedwarsStatsHistory.kills[i - 1];
			const dailyDeaths = day.deaths - bedwarsStatsHistory.deaths[i - 1];
			const dailyFinalKills = day.final_kills - bedwarsStatsHistory.final_kills[i - 1];
			const dailyFinalDeaths = day.final_deaths - bedwarsStatsHistory.final_deaths[i - 1];
			const dailyWins = day.wins - bedwarsStatsHistory.wins[i - 1];
			const dailyLosses = day.losses - bedwarsStatsHistory.losses[i - 1];
			const dailyBedsBroken = day.beds_broken - bedwarsStatsHistory.beds_broken[i - 1];

			bedwarsStatsHistory.daily.levels.push(day.level - bedwarsStatsHistory.levels[i - 1]);
			bedwarsStatsHistory.daily.kills.push(dailyKills);
			bedwarsStatsHistory.daily.deaths.push(dailyDeaths);
			bedwarsStatsHistory.daily.kdr.push(calculateRatio(dailyKills, dailyDeaths));
			bedwarsStatsHistory.daily.final_kills.push(dailyFinalKills);
			bedwarsStatsHistory.daily.final_deaths.push(dailyFinalDeaths);
			bedwarsStatsHistory.daily.fkdr.push(calculateRatio(dailyFinalKills, dailyFinalDeaths));
			bedwarsStatsHistory.daily.wins.push(dailyWins);
			bedwarsStatsHistory.daily.losses.push(dailyLosses);
			bedwarsStatsHistory.daily.wlr.push(calculateRatio(dailyWins, dailyLosses));
			bedwarsStatsHistory.daily.beds_broken.push(dailyBedsBroken);
		}
	});

	return {
		errored: false,
		player,
		bedwarsStatsHistory
	};
}
