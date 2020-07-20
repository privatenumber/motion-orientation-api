<template>
	<div
		:class="$s.Legend"
	>
		<div>
			<div
				v-if="color"
				:class="$s.ColorCode"
				:style="{ backgroundColor: color }"
			/>
			<label :class="$s.Label">
				{{ label }}
			</label>
		</div>

		<span :class="$s.Data">
			<slot />
		</span>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: undefined
		}
	}
}
</script>

<style module="$s">

.Legend {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 4px;
}

.ColorCode {
	vertical-align: middle;
	display: inline-block;
	width: 2px;
	height: 1em;
	margin-right: 4px;
}

.Label {
	vertical-align: middle;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.5);
	font-weight: bold;
	letter-spacing: 1px;
	font-size: 10px;
}

.Data {
	font-size: 12px;
}

</style>
