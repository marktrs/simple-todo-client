import type { RequestHandler } from '@sveltejs/kit'

const baseURL = import.meta.env.VITE_SIMPLE_API_BASE

export const GET = (async ({ locals }) => {
	const response = await fetch(`${baseURL}/tasks`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.jwt?.token,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*'
		}
	})

	return response
}) satisfies RequestHandler

export const POST = (async ({ request, locals }) => {
	console.log(request.method)

	const body = await request.json()

	const response = await fetch(`${baseURL}/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.jwt?.token,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*'
		},
		body: JSON.stringify(body)
	})

	return response
}) satisfies RequestHandler

export const PUT = (async ({ request, locals, route }) => {
	console.log(request.method)

	const body = await request.json()
	const response = await fetch(`${baseURL}/tasks/${route.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.jwt?.token,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*'
		},
		body: JSON.stringify(body)
	})

	return response
}) satisfies RequestHandler

export const DELETE = (async ({ request, locals, route }) => {
	console.log(request.method)

	const response = await fetch(`${baseURL}/tasks/${route.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.jwt?.token,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*'
		}
	})

	return response
}) satisfies RequestHandler
