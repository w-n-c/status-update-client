import { readable } from 'svelte/store'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
export default readable(new CognitoUserPool({
    UserPoolId: 'us-east-2_1EqvjhRsp',
    ClientId: '2njqa3sijuq8poccgokumm948m'
}))