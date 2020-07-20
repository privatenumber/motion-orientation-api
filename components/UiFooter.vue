<template>
	<div :class="$s.UiFooter">
		<span>
			<a href="https://developers.google.com/web/fundamentals/native-hardware/device-orientation">
				Motion & Orientation APIs
			</a>
			explorer
		</span>
		<a href="https://GitHub.com/privatenumber/github-cdn">
			<img
				src="https://img.shields.io/github/stars/privatenumber/github-cdn.svg?style=social&label=Star&maxAge=2592000"
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
