<script lang="ts">
	import * as api from '$lib/api'
	import type { Task } from '$lib/types'
	import { taskStore, toaster } from '$store'
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import timezone from 'dayjs/plugin/timezone'
	import utc from 'dayjs/plugin/utc'

	export let task: Task
	export let token: string

	let isEditing: boolean = false

	dayjs.extend(utc)
	dayjs.extend(timezone)
	dayjs.extend(relativeTime)

	const originalUrl = import.meta.env.VITE_ORIGIN_API
	const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone

	function onCompleted(message: string) {
		toaster.set({ message, type: 'success' })
	}

	async function onTaskUpdate() {
		const { id, completed, message } = task
		await api.put({
			originalUrl,
			path: `tasks/${id}`,
			token,
			data: { message, completed }
		})
		await updateTask()
		onCompleted('Task updated')
		isEditing = false
	}

	async function onRemoveTask(task: Task) {
		const { id } = task
		await api.del({ originalUrl, path: `tasks/${id}`, token })
		await updateTask()
		onCompleted('Task removed')
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

{#if task}
	<div class="flex items-center space-x-3">
		<div class="flex-none w-1/12 pl-0 sm:pl-2">
			<input
				on:click={async () => {
					task.completed = !task.completed
					await onTaskUpdate()
				}}
				bind:value={task.completed}
				checked={task.completed}
				type="checkbox"
				class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500
				dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
			/>
		</div>
		<div class="flex-none w-9/12 sm:w-9/12 py-3">
			<form method="post" on:submit|preventDefault={onTaskUpdate}>
				<span
					on:mousedown={() => {
						isEditing = !isEditing
					}}
					class="
					overflow-auto whitespace-normal break-all
					text-md block text-gray-900 bg-gray-0 rounded-lg border-0
					focus:ring-gray-300 focus:border-0 dark:bg-gray-800 dark:border-0
					dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
					resize-none w-full h-fit
					{task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
					{isEditing ? 'hidden' : 'block'}"
				>
					{task.message}
				</span>

				<input
					maxlength="120"
					required
					name="message"
					bind:value={task.message}
					class="
					overflow-auto whitespace-normal break-all focus:ring-0 focus:border-gray-600 border-b focus:outline-0 text-md
					dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:outline-gray-300 w-full h-fit
					{task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
					{isEditing ? 'block' : 'hidden'}"
				/>
			</form>
			<div
				class="text-xs sm:text-md inline-flex items-center font-light text-gray-400 dark:text-white-500 mt-2"
			>
				{dayjs(task['created_at']).format('HH:mm DD/MM/YYYY')}
				<div class="pl-2">
					({dayjs(task['created_at']).tz(timezoneName).fromNow()})
				</div>
			</div>
		</div>
		<div class="flex-none w-1/12">
			<form method="POST" on:submit|preventDefault={onRemoveTask(task)}>
				<input type="hidden" name="id" value={task.id} />
				<button
					type="submit"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
					data-modal-hide="defaultModal"
				>
					<svg
						aria-hidden="true"
						class="w-4 h-4"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="sr-only">Remove</span>
				</button>
			</form>
		</div>
	</div>
{/if}
