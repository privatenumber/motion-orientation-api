<template>
	<div
		:class="$s.Meter"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div
			:class="$s.Dot"
			:style="dotStyles"
		/>
	</div>
</template>

<script>
export default {

	props: {
		max: {
			type: Number,
			required: true
		},
		min: {
			type: Number,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	},

	computed: {
		dotStyles () {
			const position = (this.value - this.min) / (this.max - this.min)
			return {
				left: `${(position * 100).toFixed(2)}%`
			}
		}
	}
}
</script>

<style module="$s">

.Meter {
	color: #fff;
	position: relative;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background: rgba(255, 255, 255, 0.2);
}

.Dot {
	position: absolute;
	border-radius: 50%;
	background: red;
	width: 2px;
	height: 2px;
}
</style>
