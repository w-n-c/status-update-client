<script>
	import { Auth } from 'aws-amplify'
	import { goto } from '@sapper/app'
	import apiBuilder from '../api'
	export let segment
	const fetchUser = async () => {
		const api = await apiBuilder()
		return api.currentUser
	}
	async function logout() {
		try {
			await Auth.signOut()
			goto('/')
		} catch (error) {
			console.log('error signing out: ', error)
		}
	}
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

{#if segment && segment !== 'signup'}
	<header>
		<nav>
			<ul>
				{#await fetchUser()}
					<li>
						<a href="#loading">my profile</a>
					</li>
				{:then user}
					<li>
						<a href={`/users/${user}`}>my profile</a>
					</li>
				{:catch error}
					<li>{error}</li>
				{/await}
				<li>
					<a href="/users/">users</a>
				</li>
				<li>
					<button on:click={logout}>logout</button>
				</li>
			</ul>
		</nav>
	</header>
{/if}
<main>
	<slot />
</main>
