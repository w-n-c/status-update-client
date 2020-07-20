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
	let email;
	let password;
	function handleSubmit(e) {
		// TODO: fetch('')
	}
</script>

<svelte:head>
	<title>Landing</title>
</svelte:head>

<h1>Welcome!</h1>

<form on:submit|preventDefault={handleSubmit}>
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
