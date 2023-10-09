export default function formatDate(inputString: string): string {
	const monthShorthands = [
		'Gen',
		'Feb',
		'Mar',
		'Apr',
		'Mag',
		'Giu',
		'Lug',
		'Ago',
		'Set',
		'Ott',
		'Nov',
		'Dic'
	];

	const dateObj = new Date(inputString);
	// {day} {month}
	return `${dateObj.getUTCDate()} ${monthShorthands[dateObj.getUTCMonth()]}`;
}
