export interface Task {
	id: number
	completed: boolean
	message: string
	completed_at: string
	created_at: string
}

export interface Components {
	schemas: {
		jwt: {
			token: string
			user: {
				id: string
				username: string
			}
		}
	}
}
