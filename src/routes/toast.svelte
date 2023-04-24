<script lang="ts">
	import { toaster } from '$store'
	import { Toast } from 'flowbite-svelte'
	import { slide } from 'svelte/transition'

	let type = 'success'
	let message = 'Logged in'
	let show = false
	let counter = 3

	toaster.subscribe(({ message: _message, type: _type }) => {
		type = _type
		message = _message
		trigger()
	})

	function trigger() {
		if (!message) return
		show = true
		counter = 3
		timeout()
	}

	function timeout(): ReturnType<typeof setTimeout> | void {
		if (--counter > 0) return setTimeout(timeout, 1000)
		show = false
	}
</script>

<div class="absolute right-8 flex gap-10 mt-24">
	<Toast simple transition={slide} bind:open={show}>
		<svelte:fragment slot="icon">
			{#if type == 'success'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			{:else if type == 'error'}
				<svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			{/if}
		</svelte:fragment>
		{message}
	</Toast>
</div>
