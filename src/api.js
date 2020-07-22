import { Auth } from 'aws-amplify'
export default async () => {
	const cognito = await Auth.currentAuthenticatedUser()
	// TODO: Server should map username instead
	const username = cognito.username
	const token = cognito.signInUserSession.idToken.jwtToken
	return apiMethodsBuilder(token, username)
}

const apiMethodsBuilder = (token, userId) => {
	// eslint-disable-next-line no-undef
	const aws = apigClientFactory.newClient()
	const options = { headers: { Authorization: token }}
	return ({
		events: {
			get: async () => aws.eventsGet({}, null, options),
			post: async (body) => aws.eventsPost({}, body, options)
		},
		statuses: {
			get: async () => aws.statusesGet({}, null, options),
			post: async (status) => aws.statusesPost({}, { userId, ...status }, options)
		},
		users: {
			get: async () => aws.usersGet({}, null, options),
			getById: async (id) => aws.usersIdGet({ id }, null, options)
		}
	})
}

