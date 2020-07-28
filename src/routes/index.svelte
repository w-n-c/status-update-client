<script>
	import { goto } from '@sapper/app'
	import { Auth } from 'aws-amplify'
	let email
	let password
	let error = ''
	async function login() {
		try {
			const user = await Auth.signIn(email, password)
			goto(`/users/${user.username}`)
		} catch (err) {
			error = err.message
		}
	}
</script>

<style>
	input[type='submit'] {
		cursor: pointer;
	}
	button a {
		text-decoration: none;
	}
	h1 {
		text-align: center;
		margin: 0 auto;
		font-size: 3em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
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
		margin: 0.5em 0;
	}
	.error {
		color: red;
	}
</style>

<svelte:head>
	<title>Landing</title>
</svelte:head>

<h1>Welcome!</h1>

<form on:submit|preventDefault={login}>
	<fieldset>
		<legend>Credentials:</legend>
		<label>
			Email:
			<input type="email" required bind:value={email} />
		</label>
		<label>
			Password:
			<input type="password" required bind:value={password} />
		</label>
		<div class="error">{error}</div>
	</fieldset>
	<input type="submit" value="login" />
	<button>
		<a href="/signup">signup</a>
	</button>
</form>
