<script>
	import '../app.css';
	import { partytownSnippet } from '@builder.io/partytown/integration';
</script>

<svelte:head>
	<script>
		partytown = {
			forward: ['dataLayer.push']
		};
	</script>

	{@html '<script>' + partytownSnippet() + '</script>'}
</svelte:head>

<slot />
