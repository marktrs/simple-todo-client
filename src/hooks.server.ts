import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt')
	event.locals.jwt = jwt ? JSON.parse(jwt) : null

	const response = await resolve(event)
	return response
}) satisfies Handle
