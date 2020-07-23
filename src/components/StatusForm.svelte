<script>
	let Type, Title, Progression, Note
	export let handleSubmit
	const onSubmit = () => {
		handleSubmit({
			Note,
			Progression,
			PostedOn: Date.now(),
			EventId: { Type, Title },
		})
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<fieldset>
		<legend>What did you work on?</legend>
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
	</fieldset>
	<label>
		Progress:
		<textarea required bind:value={Progression} />
	</label>
	<label>
		Note:
		<textarea required bind:value={Note} />
	</label>
	<input type="submit" value="add event" />
</form>
