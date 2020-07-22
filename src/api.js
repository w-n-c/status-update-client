export default (userPool) => {
    const user = userPool.getCurrentUser()
    let api;
    user.getSession((error, session) => {
        if (error) throw(error)
        const token = session.getIdToken().getJwtToken()
        const id = user.getUsername()
        api = apiMethodsBuilder(token, id)
    });
    return api
}

const apiMethodsBuilder = (token, userId) => {
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

