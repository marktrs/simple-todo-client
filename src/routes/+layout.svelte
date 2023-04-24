<script lang="ts">
	import '../app.postcss'
	import Navbar from './navbar.svelte'
	import Toast from './toast.svelte'
</script>

<Toast />
<Navbar />

<main>
	<slot />
</main>
