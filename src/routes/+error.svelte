<script>
	import { page } from '$app/stores';
</script>

<div class="w-full h-[100dvh] font-minecraft flex items-center flex-col justify-center gap-2">
	<h1 class="text-6xl text-minecraft-yellow">{$page.status}!</h1>
	<p>{$page.error?.message}</p>
</div>
