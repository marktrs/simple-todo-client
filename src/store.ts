import type { Task } from '$lib/types'
import { writable } from 'svelte/store'

export interface Toaster {
	message: string
	type: 'success' | 'error'
}

export const toaster = writable({
	message: '',
	type: 'success'
})

export interface TaskStore {
	tasks: Task[]
}

export const taskStore = writable<TaskStore>({
	tasks: []
})
