<script>
	import '../app.css';
	import { partytownSnippet } from '@builder.io/partytown/integration';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
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
