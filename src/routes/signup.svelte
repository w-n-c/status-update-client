<script>
    import userPool from '../cognito-store'
    import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
    let familyName;
    let givenName;
    let email;
    let password;
    function handleResponse(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        location.assign(`/verify#${result.user.getUsername()}`)
    }

    function createAccount() {
        const emailAttr = new CognitoUserAttribute({
            Name: 'email',
            Value: email
        })
        const fNameAttr = new CognitoUserAttribute({
            Name: 'family_name',
            Value: familyName
        })
        const gNameAttr = new CognitoUserAttribute({
            Name: 'given_name',
            Value: givenName
        })
        $userPool.signUp(email, password, [emailAttr, fNameAttr, gNameAttr], null, handleResponse)
    }
</script>
<form on:submit|preventDefault={createAccount}>
	<fieldset>
		<legend>Signup:</legend>
		<label>
			Email:
			<input type="email" required bind:value={email}>
		</label>
		<label>
			Password:
			<input type="password" required bind:value={password}>
        </label>
        <br>
        <label>
            First Name:
            <input type="text" required bind:value={givenName}>
        </label>
        <label>
            Last Name:
            <input type="text" required bind:value={familyName}>
        </label>
	</fieldset>
	<input type="submit" value="create account">
</form>
