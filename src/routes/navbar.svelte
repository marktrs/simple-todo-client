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
			<div
				class="hidden sm:block relative w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
			>
				<svg
					class="absolute w-9 h-9 text-gray-400 -bottom-1"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd"
					/></svg
				>
			</div>
			<Span class="hidden sm:block my-auto !font-normal capitalize">{$page.data.user.username}</Span
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
