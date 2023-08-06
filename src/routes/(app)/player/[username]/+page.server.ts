import type { PageServerLoad } from './$types';
import fetchPlayer from '$lib/fetchPlayer';
import getPlayerData from '$lib/getPlayerData';

export const load = (async ({ params }) => {
	const player = await fetchPlayer(params.username);
	if (!player.errored) {
		if (player.player.skin_url == '') {
			const data = await getPlayerData(player.player.username);
			player.player.display_name = data.displayName;
			player.player.skin_url = data.skinUrl;
		} else if (player.player.display_name == '') {
			player.player.display_name = player.player.username;
		}
	}
	return { ...player };
}) satisfies PageServerLoad;
