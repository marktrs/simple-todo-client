<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { Button, DarkMode, NavBrand, Navbar, Span } from 'flowbite-svelte'
</script>

<Navbar let:hidden let:toggle navClass="px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white block">
			Simple Todo
		</span>
	</NavBrand>
	<div class="flex md:order-2 gap-5">
		{#if $page.data.user}
			<Span class="hidden sm:block my-auto font-thin capitalize"
				>Hi! {$page.data.user.username}</Span
			>
		{/if}
		<DarkMode />
		{#if $page.data.user}
			<form use:enhance method="POST" action="?/logout">
				<Button size="sm" type="submit">Sign Out</Button>
			</form>
		{:else}
			<Button size="sm" href="/login">Sign In</Button>
		{/if}
	</div>
</Navbar>
