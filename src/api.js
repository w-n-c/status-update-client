import { Auth } from 'aws-amplify'
export default async () => {
	const cognito = await Auth.currentAuthenticatedUser()
	// TODO: Server should map username instead
	const username = cognito.username
	const token = cognito.signInUserSession.idToken.jwtToken
	return apiMethodsBuilder(token, username)
}

const apiMethodsBuilder = (token, id) => {
	// eslint-disable-next-line no-undef
	const aws = apigClientFactory.newClient()
	const options = { headers: { Authorization: token }}
	return ({
		currentUser: id,
		events: {
			get: async () => aws.eventsGet({}, null, options),
			post: async (body) => aws.eventsPost({}, body, options)
		},
		statuses: {
			get: async () => aws.statusesGet({}, null, options),
			post: async (status) => aws.statusesPost({}, { UserId: id, ...status }, options)
		},
		users: {
			get: async () => {
				const res = await aws.usersGet({}, null, options)
				res.data.forEach(user => {
					if (typeof user.status == 'object')
						user.status.EventId = JSON.parse(user.status.EventId)
				})
				return res
			},
			getById: async (id) => aws.usersIdGet({ id }, null, options),
			getStatuses: async (user = { id }) => aws.usersIdStatusesGet(user, null, options)
		}
	})
}

