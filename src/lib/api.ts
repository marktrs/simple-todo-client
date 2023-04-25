import { error } from '@sveltejs/kit'

const base = import.meta.env.VITE_SIMPLE_TODO_API

type Opts = {
	method: string
	headers: Record<string, string>
	body?: string
}

async function send({
	method,
	path,
	token,
	data
}: {
	method: string
	path: string
	token?: string
	data?: object
}) {
	const opts: Opts = { method, headers: {} }

	if (data) {
		opts.headers['Content-Type'] = 'application/json'
		opts.body = JSON.stringify(data)
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`
	}

	const res = await fetch(`${base}/${path}`, opts)
	if (res.ok || res.status === 422) {
		return res.json()
	}

	const message = await getErrorMessage(res)

	throw error(res.status, {
		message
	})
}

export function get({ path, token }: { path: string; token?: string }) {
	return send({ method: 'GET', path, token })
}

export function del({ path, token }: { path: string; token?: string }) {
	return send({ method: 'DELETE', path, token })
}

export function post({ path, data, token }: { path: string; data: object; token?: string }) {
	return send({ method: 'POST', path, data, token })
}

export function put({ path, data, token }: { path: string; data: object; token?: string }) {
	return send({ method: 'PUT', path, data, token })
}

async function getErrorMessage(res: Response) {
	const body = await res.text()
	const { message } = JSON.parse(body)

	if (message) {
		return message
	}

	if (res.status === 401) {
		return 'You must be logged in to do that'
	}

	if (res.status === 403) {
		return 'You do not have permission to do that'
	}

	if (res.status === 404) {
		return 'Not found'
	}

	return 'An error occurred'
}
