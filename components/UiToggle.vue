<template>
	<label
		:class="$s.ToggleLabel"
	>
		<div>
			<slot />
		</div>
		<input
			v-show="false"
			type="checkbox"
			:class="$s.Checkbox"
			v-bind="$attrs"
			v-on="$listeners"
			@change="$emit('toggle:change', $event.target.checked)"
		>
		<div :class="$s.Toggle">
			<div :class="$s.Ball" />
		</div>
	</label>
</template>

<script>
export default {
	inheritAttrs: false,
	model: {
		event: 'toggle:change'
	}
}
</script>

<style module="$s">
.ToggleLabel {
	display: flex;
	align-items: center;
	font-size: 12px;
}

.Toggle {
	display: inline-block;
	background-color: #fff;
	border-radius: 20px;
	padding: 1px;
	margin-left: 8px;

	& .Ball {
		--dimensions: 12px;

		width: var(--dimensions);
		height: var(--dimensions);
		border-radius: 50%;
		background: #aaa;
		margin-right: var(--dimensions);
		transition:
			background-color ease-in 0.05s,
			margin-right ease-in 0.05s,
			margin-left ease-in 0.05s;
	}
}

.Checkbox:checked + .Toggle .Ball {
	background-color: #4780f1;
	margin-right: 0;
	margin-left: var(--dimensions);
}
</style>
