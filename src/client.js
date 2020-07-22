import * as sapper from '@sapper/app'
import Amplify from 'aws-amplify'

Amplify.configure({
	Auth: {
		region: 'us-east-2',
		userPoolId: 'us-east-2_1EqvjhRsp',
		userPoolWebClientId: '2njqa3sijuq8poccgokumm948m'
	}
})

sapper.start({
	target: document.querySelector('#sapper')
})