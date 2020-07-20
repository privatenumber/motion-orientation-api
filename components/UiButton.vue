<template>
	<button
		:class="$s.Button"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot />
	</button>
</template>

<style module="$s">
.Button {
	display: inline-block;
	border-radius: 4px;
	border: none;
	color: #fff;
	text-decoration: none;
	padding: 16px 24px;
	text-transform: uppercase;
	background-color: #4780f1;
	letter-spacing: 1px;
}
</style>
