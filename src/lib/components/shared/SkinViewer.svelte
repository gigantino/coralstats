<script lang="ts">
	import { SkinViewer, IdleAnimation } from 'skinview3d';
	export let skinUrl: string;
	let ctx: HTMLCanvasElement | undefined;

	$: {
		if (ctx) {
			const skinViewer = new SkinViewer({
				width: 140,
				height: 300,
				canvas: ctx,
				skin: skinUrl,
				animation: new IdleAnimation()
			});

			skinViewer.controls.enableZoom = false;
		}
	}
</script>

<canvas bind:this={ctx} />
