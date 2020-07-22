<script>
	import apiBuilder from '../../api'
	let Type
	let Title
	let Description

	async function createEvent() {
		try {
			const api = await apiBuilder()
			const result = await api.events.post({ Type, Title, Description })
			alert('Success!')
		} catch (error) {
			console.error(error)
		}
	}
</script>

<form on:submit|preventDefault={createEvent}>
	<fieldset>
		<legend>Create An Event:</legend>
		<label>
			Type:
			<select bind:value={Type}>
				<option>Training</option>
				<option>Application</option>
				<option>Other</option>
			</select>
		</label>
		<label>
			Title:
			<input type="text" required bind:value={Title} />
		</label>
		<br />
		<label>
			Description:
			<textarea required bind:value={Description} />
		</label>
	</fieldset>
	<input type="submit" value="create event" />
</form>
