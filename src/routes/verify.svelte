<script>
	import { onMount } from "svelte";
	import { Auth } from "aws-amplify";
	let code;
	let user;
	onMount(() => {
		user = location.hash.substring(1);
	});
	async function resendEmail() {
		try {
			await Auth.resendSignUp(user);
		} catch (error) {
			console.error('error resending confirmation', error);
		}
	}
	async function validateCode() {
		try {
			await Auth.confirmSignUp(user, code);
		} catch (error) {
			console.error('error confirming sign up', error);
		}
	}
</script>

<svelte:head>
	<title>Validate Your Email</title>
</svelte:head>
<form on:submit|preventDefault={validateCode}>
	<label>
		Please enter the validation code sent to your email below:
	<input type="text" bind:value={code} />
	</label>
	<input type="submit" value="confirm" />
	<button on:click={resendEmail}>resend</button>
</form>
