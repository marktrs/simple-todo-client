<script lang="ts">
	import * as api from '$lib/api'
	import type { Task } from '$lib/types'
	import { taskStore, toaster } from '$store'
	import { Input, Listgroup } from 'flowbite-svelte'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'
	import TaskItem from './task.svelte'

	export let data: PageData

	let tasks: Task[] = []
	let { token } = data

	const originalUrl = import.meta.env.VITE_ORIGIN_API

	taskStore.subscribe(({ tasks: _tasks }) => {
		tasks = _tasks
	})

	onMount(async () => {
		await updateTask()
	})

	function onCompleted(message: string) {
		toaster.set({ message, type: 'success' })
	}

	async function onTaskCreated() {
		const data = new FormData(this)
		await api.post({
			originalUrl,
			path: `tasks/`,
			token,
			data: { message: data.get('message') }
		})
		await updateTask()
		onCompleted('Task created')
	}

	async function updateTask() {
		const response = await api.get({
			originalUrl,
			path: `tasks/`,
			token
		})
		taskStore.set({ tasks: response.tasks })
	}
</script>

<svelte:head>
	<title>Tasks • Simple Todo</title>
</svelte:head>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-24 mx-auto min-h-screen">
		<form method="POST" on:submit|preventDefault={onTaskCreated} class="w-full max-w-xl mb-4">
			<Input
				id="search"
				placeholder="Name a task here"
				size="lg"
				class="px-12 bg-white italic"
				name="message"
			/>
		</form>
		{#if tasks.length === 0}
			<div class="mt-24 flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
				No tasks yet
			</div>
		{:else}
			<div
				class="w-full bg-white rounded-lg h-fit dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700"
			>
				<Listgroup
					items={tasks}
					let:item
					class="border-0 outline-0 shadow-none dark:!bg-transparent py-0"
				>
					<TaskItem task={item} {token} />
				</Listgroup>
			</div>
		{/if}
	</div>
</section>
