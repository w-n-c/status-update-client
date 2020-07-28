<script context="module">
	import apiBuilder from '../../api'
	export async function preload() {
		const api = await apiBuilder()
		const response = await api.users.get()
		return { users: response.data }
	}
</script>

<script>
	export let users
</script>

<ul>
	{#each users as user}
		<li>
			<a rel="prefetch" href={`/users/${user.username}`}>
				View {user.given_name} {user.family_name}'s Profile
			</a>
			{#if typeof user.status == 'string'}
				<div>{user.status}</div>
			{:else}
				<section>
					<h4>
						{user.status.EventId.Type}: {user.status.EventId.Title}
					</h4>
					<p>
						Progression: {user.status.Progression}
						<br />
						Note: {user.status.Note}
					</p>
				</section>
			{/if}
			<div />
		</li>
	{/each}
</ul>
