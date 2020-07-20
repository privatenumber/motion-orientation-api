<template>
	<section
		:class="$s.Section"
	>
		<div
			v-if="$slots.default"
			:class="$s.Title"
		>
			<slot name="title" />
		</div>

		<div
			:class="$s.Content"
		>
			<slot />
		</div>
	</section>
</template>

<script>
export default {

}
</script>

<style module="$s">

.Section {
	display: block;
	margin-bottom: 24px;
}

.Title {
	margin-bottom: 16px;
}

.Content {
	border-radius: 8px;
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
}
</style>
