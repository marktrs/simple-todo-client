import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const csr = true

export const load = (async ({ locals }) => {
	const jwt = locals.jwt
	if (!jwt) {
		throw redirect(303, '/login')
	}

	const { user, token } = jwt

	return {
		user,
		token
	}
}) satisfies PageServerLoad

export const actions = {
	logout: async (event) => {
		event.cookies.delete('jwt')
		event.locals.jwt = null
	}
} satisfies Actions
