<script>
    import { onMount } from 'svelte'
    import { CognitoUser } from 'amazon-cognito-identity-js';
    import userPool from '../cognito-store';
    let code;
    let user;
    onMount(() => {
        const username =location.hash.substring(1);
        user = new CognitoUser({ Username: username, Pool: $userPool});
    })
    function resendEmail() {
        user.resendConfirmationCode(err => {
            if (err) alert(err);
        });
    }
    function validateCode() {
        user.confirmRegistration(code, true, (err, results) => {
            if (err) {
                alert(err);
            } else {
                location.assign('/');
            }
        });
    }
</script>
<svelte:head>
    <title>Validate Your Email</title>
</svelte:head>
<form on:submit|preventDefault={validateCode}>
    <label>
        Please enter the validation code sent to your email below:
        <input type="text" bind:value={code}>
    </label>
    <input type="submit" value="confirm">
    <button on:click={resendEmail}>resend</button>
</form>