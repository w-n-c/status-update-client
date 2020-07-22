<script>
	import { Auth } from 'aws-amplify'
	let family_name;
	let given_name;
	let email;
	let password;

	async function signUp() {
		try {
			const response = Auth.signUp({
				username: email,
				password,
				attributes: {
					family_name,
					given_name,
					email
				}
			})
			location.assign(`/verify#${response.userSub}`)
		} catch (error) {
			console.error('error in signup', error)
		}
	}
</script>
<form on:submit|preventDefault={signUp}>
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
			<input type="text" required bind:value={given_name}>
		</label>
		<label>
			Last Name:
			<input type="text" required bind:value={family_name}>
		</label>
	</fieldset>
	<input type="submit" value="create account">
</form>
