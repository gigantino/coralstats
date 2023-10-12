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
	coins: number[];
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

export default async function fetchPlayer(username: string): Promise<PlayerResponse> {
	const playerRequest = await fetch(`https://api.coralstats.com/h/player/${username}`);

	if (!playerRequest.ok) {
		console.log(playerRequest);
		return {
			errored: true,
			status: playerRequest.status
		};
	}

	const playerInfo: {
		player: Player;
		bedwarsStatsHistory: BedwarsStatsHistory;
	} = await playerRequest.json().catch((err) => {
		console.error("Couldn't parse player info:", err);
	});

	if (!playerInfo)
		return {
			errored: true,
			status: 500
		};

	return {
		errored: false,
		...playerInfo
	};
}
