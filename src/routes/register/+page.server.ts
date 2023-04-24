import * as api from '$lib/api'
import { fail, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit'

export const load = async ({ parent }: ServerLoadEvent) => {
	//redirect user to front page if already logged-in.
	const parentData = await parent()
	if (parentData['user' as keyof typeof parent]) {
		throw redirect(303, '/')
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		const form = await request.formData()

		const data = {
			username: form.get('username'),
			password: form.get('password')
		}

		const body = await api.post({ path: 'users', data })

		if (body.errors) {
			return fail(401, body)
		}

		cookies.set('jwt', JSON.stringify(body), { path: '/' })

		throw redirect(307, '/')
	}
} satisfies Actions
