<script>
	export let handleSubmit

	let Type
	let Title
	let Description

	const onSubmit = () => {
		handleSubmit({ Type, Title, Description })
	}
</script>

<form on:submit|preventDefault={onSubmit}>
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
	<input type="submit" value="add event" />
</form>
