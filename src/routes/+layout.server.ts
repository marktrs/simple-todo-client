import type { LayoutServerLoad } from './$types'
export const load = (({ locals }) => {
	return {
		user: locals.jwt && {
			id: locals.jwt?.user.id,
			username: locals.jwt?.user.username
		}
	}
}) satisfies LayoutServerLoad
