const steveSkinUrl = '/steve.png';

export default async function getPlayerData(
	username: string
): Promise<{ skinUrl: string; displayName: string }> {
	try {
		const uuidRequest = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
		if (!uuidRequest.ok) {
			return {
				skinUrl: steveSkinUrl,
				displayName: username
			};
		}
		const { name: displayName, id: uuid } = await uuidRequest.json();

		const skinRequest = await fetch(
			`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
		);
		if (!skinRequest.ok) {
			return {
				skinUrl: steveSkinUrl,
				displayName: displayName
			};
		}

		const { properties } = await skinRequest.json();
		const rawTextureData = Buffer.from(properties[0].value, 'base64').toString('utf-8');
		const textureData = await JSON.parse(rawTextureData);

		return {
			skinUrl: textureData.textures.SKIN.url,
			displayName: displayName
		};
	} catch {
		return {
			skinUrl: steveSkinUrl,
			displayName: username
		};
	}
}
