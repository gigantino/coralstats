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

	// Convert the input string to a Date object
	const dateObj = new Date(inputString);

	// Get the day, month, and year from the Date object
	const day = dateObj.getUTCDate().toString();
	const monthIndex = dateObj.getUTCMonth();
	const month = monthShorthands[monthIndex];
	const year = dateObj.getUTCFullYear().toString();

	// Format the date as "d MMM" (e.g., "3 Ago")
	const formattedDate = `${day} ${month}`;

	return formattedDate;
}
