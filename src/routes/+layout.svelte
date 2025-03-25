<script>
	import { Toaster } from "svelte-5-french-toast";
	import "../app.css";

	let { children } = $props();
</script>

<Toaster />
<div class="app">
	<main>
		{@render children()}
	</main>
</div>
