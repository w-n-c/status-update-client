<script context="module">
	import apiBuilder from '../../api'
	import StatusForm from '../../components/StatusForm.svelte'
	export async function preload({ params: slug }) {
		const api = await apiBuilder()
		const response = await api.users.getStatuses(slug)
		return { statuses: response.data }
	}
</script>

<script>
	export let statuses
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

<ul>
	{#each statuses as status}
		<li>
			<h3>Status from {new Date(status.PostedOn).toLocaleString()}</h3>
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
