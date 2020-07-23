<script>
	import apiBuilder from '../../api'
	import StatusForm from '../../components/StatusForm.svelte'
	const fetchData = async () => {
		const api = await apiBuilder()
		const response = await api.users.getStatuses()
		return response.data
	}
	let creatingStatus = false
	async function postStatus(status) {
		const api = await apiBuilder()
		await api.statuses.post(status)
		creatingStatus = false
	}
</script>

{#if creatingStatus}
	<StatusForm handleSubmit={postStatus} />
{:else}
	<button on:click={() => (creatingStatus = true)}>new status</button>
{/if}
{#await fetchData()}
	<p>...loading user's status log</p>
{:then statuses}
	<ul>
		{#each statuses as status}
			<li>
				<h3>
					Status from {new Date(status.PostedOn).toLocaleString()}
				</h3>
				<section>
					<h4>{status.EventId.Type}: {status.EventId.Title}</h4>
					<p>
						Progression: {status.Progression}
						<br />
						Note: {status.Note}
					</p>
				</section>
			</li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
