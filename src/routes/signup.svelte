<script>
	import { Auth } from 'aws-amplify'
	let family_name
	let given_name
	let email
	let password
	let verifyPass
	let passwordError = ''
	let emailError = ''
	let viewRequirements = false

	async function signUp() {
		try {
			const response = Auth.signUp({
				username: email,
				password,
				attributes: {
					family_name,
					given_name,
					email,
				},
			})
			location.assign(`/verify#${response.userSub}`)
		} catch (error) {
			console.error('error in signup', error)
		}
	}
	function validatePasswords() {
		passwordError =
			password == verifyPass ? '' : 'passwords are not the same'
	}
	function validateEmail() {
		emailError = email.endsWith('@lntinfotech.com')
			? ''
			: 'please use your lti email'
	}
</script>

<style>
	legend {
		font-size: 1.4rem;
	}
	.label {
		margin-top: 15px;
	}
	.error {
		color: red;
	}
	.input,
	.label {
		display: flex;
		font-size: 1.2rem;
		margin-left: 3%;
	}
	label {
		margin-right: 5px;
	}
	.toggle:hover {
		cursor: pointer;
	}
	input[type='submit'] {
		font-size: 1.2rem;
	}
</style>

<form on:submit|preventDefault={signUp}>
	<fieldset>
		<legend>Signup:</legend>
		<label class="label" for="email">LTI Email:</label>
		<div class="input">
			<input
				id="email"
				type="email"
				required
				on:blur={validateEmail}
				on:focus={() => (emailError = '')}
				bind:value={email} />
			<div class="error">{emailError}</div>
		</div>
		<div class="label">
			<label>Password:</label>
			<aside
				class="toggle"
				on:click={() => (viewRequirements = !viewRequirements)}>
				{#if viewRequirements}
					12 characters, at least 1 lowercase, 1 capital, and 1 number
				{:else}(show requirements){/if}
			</aside>
		</div>
		<div for="password" class="input">
			<input
				id="password"
				minlength="12"
				pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{'{'}12,{'}'}$"
				type="password"
				required
				bind:value={password} />

		</div>
		<label class="label" for="verifyPassword">Verify Password:</label>
		<div class="input">
			<input
				id="verifyPassword"
				type="password"
				required
				on:focus={() => (passwordError = '')}
				on:blur={validatePasswords}
				bind:value={verifyPass} />
			<div class="error">{passwordError}</div>
		</div>
		<label class="label" for="firstName">First Name:</label>
		<input
			class="input"
			id="firstName"
			type="text"
			required
			bind:value={given_name} />
		<label class="label" for="lastName">Last Name:</label>
		<input
			class="input"
			id="lastName"
			type="text"
			required
			bind:value={family_name} />
	</fieldset>
	<input type="submit" value="create account" />
</form>
