import { error } from '@sveltejs/kit'

let base = import.meta.env.VITE_SIMPLE_TODO_API

type Opts = {
	method: string
	headers: Record<string, string>
	body?: string
}

async function send({
	method,
	path,
	token,
	data,
	originalUrl
}: {
	method: string
	path: string
	token?: string
	data?: object
	originalUrl?: string
}) {
	const opts: Opts = { method, headers: {} }

	if (data) {
		opts.headers['Content-Type'] = 'application/json'
		opts.body = JSON.stringify(data)
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`
	}

	if (originalUrl) {
		base = originalUrl
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

export function get({
	path,
	token,
	originalUrl
}: {
	path: string
	token?: string
	originalUrl?: string
}) {
	return send({ method: 'GET', path, token, originalUrl })
}

export function del({
	path,
	token,
	originalUrl
}: {
	path: string
	token?: string
	originalUrl?: string
}) {
	return send({ method: 'DELETE', path, token, originalUrl })
}

export function post({
	path,
	data,
	token,
	originalUrl
}: {
	path: string
	data: object
	token?: string
	originalUrl?: string
}) {
	return send({ method: 'POST', path, data, token, originalUrl })
}

export function put({
	path,
	data,
	token,
	originalUrl
}: {
	path: string
	data: object
	token?: string
	originalUrl?: string
}) {
	return send({ method: 'PUT', path, data, token, originalUrl })
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
