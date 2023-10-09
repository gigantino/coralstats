/** @type {import('tailwindcss').Config} */

const minecraftColors = {
	'minecraft-white': '#FFFFFF',
	'minecraft-dark-red': '#AA0000',
	'minecraft-red': '#FF5555',
	'minecraft-gold': '#FFAA00',
	'minecraft-yellow': '#FFFF55',
	'minecraft-dark-green': '#00AA00',
	'minecraft-green': '#55FF55',
	'minecraft-aqua': '#55FFFF',
	'minecraft-dark-aqua': '#00AAAA',
	'minecraft-dark-blue': '#0000AA',
	'minecraft-blue': '#5555FF',
	'minecraft-light-purple': '#FF55FF',
	'minecraft-dark-purple': '#AA00AA',
	'minecraft-gray': '#AAAAAA',
	'minecraft-dark-gray': '#555555'
};

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		...Object.keys(minecraftColors).map((v) => `bg-${v}`),
		...Object.keys(minecraftColors).map((v) => `text-${v}`)
	],
	theme: {
		extend: {
			fontSize: {
				mid: '1rem'
			},
			screens: {
				'mobile-layout': '1024px'
			},
			fontFamily: {
				minecraft: ['Minecraft', 'sans']
			},
			colors: {
				...minecraftColors
			}
		}
	},
	plugins: []
};
