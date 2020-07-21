<style>
	h1 {
		text-align: center;
		margin: 0 auto;
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
	legend {
		font-size: 1.2em;
	}
	fieldset {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	fieldset label {
		margin: .5em 0;
	}
</style>
<script>
	import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
	import userPool from '../cognito-store';
	let email;
	let password;
	function login() {
		const authDetails = new AuthenticationDetails({Username: email, Password: password});
		const user = new CognitoUser({Username: email, Pool: $userPool });
		user.authenticateUser(authDetails, {
			onSuccess: function() {
				location.assign('/blog');
			},
			onFailure: function(err) {
				alert(err);
			}
		});
	}
</script>

<svelte:head>
	<title>Landing</title>
</svelte:head>

<h1>Welcome!</h1>

<form on:submit|preventDefault={login}>
	<fieldset>
		<legend>Credentials:</legend>
		<label>
			Email:
			<input type="email" required bind:value={email}>
		</label>
		<label>
			Password:
			<input type="password" required bind:value={password}>
		</label>
	</fieldset>
	<input type="submit" value="login">
	<button><a href="/signup">signup</a></button>
</form>
