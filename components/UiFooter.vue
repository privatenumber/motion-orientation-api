<template>
	<div :class="$s.UiFooter">
		<span>
			<a href="https://developers.google.com/web/fundamentals/native-hardware/device-orientation">Motion & Orientation API</a>
			explorer
		</span>
		<a href="https://GitHub.com/privatenumber/motion-orientation-api">
			<img
				src="https://img.shields.io/github/stars/privatenumber/motion-orientation-api.svg?style=social&label=Star&maxAge=2592000"
			>
		</a>
	</div>
</template>

<style module="$s">
.UiFooter {
	margin-top: 40px;
	display: flex;
	justify-content: space-between;

	& a {
		color: #fff;
	}
}
</style>
