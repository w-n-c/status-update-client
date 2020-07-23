<script>
	import apiBuilder from '../../api'
	const fetchData = async () => {
		const api = await apiBuilder()
		const response = await api.users.get()
		return response.data
	}
</script>

{#await fetchData()}
	<p>...loading user list</p>
{:then users}
	<ul>
		{#each users as user}
			<li>
				<a href={`./${user.username}`}>
					View {user.given_name} {user.family_name}'s Profile
				</a>
			</li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
