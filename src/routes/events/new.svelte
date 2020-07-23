<script>
	import apiBuilder from '../../api'
	import EventForm from '../../components/EventForm.svelte'

	async function createEvent(event) {
		try {
			const api = await apiBuilder()
			await api.events.post(event)
			alert('Success!')
		} catch (error) {
			console.error(error)
		}
	}
</script>

<EventForm handleSubmit={createEvent} />
