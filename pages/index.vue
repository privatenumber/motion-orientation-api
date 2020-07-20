<template>
	<div>
		<visualizer-motion />
		<visualizer-orientation />
		<ui-button
			v-if="requiresPermission() && !permissionGranted"
			:class="$s.StartButton"
			@click="requestPermission"
		>
			Start analysis
		</ui-button>

		<ui-footer />
	</div>
</template>

<script>
import UiButton from '~/components/UiButton'
import UiFooter from '~/components/UiFooter'
import VisualizerMotion from '~/components/VisualizerMotion'
import VisualizerOrientation from '~/components/VisualizerOrientation'

export default {
	components: {
		UiButton,
		VisualizerMotion,
		VisualizerOrientation,
		UiFooter
	},

	data () {
		return {
			permissionGranted: false
		}
	},

	mounted () {
		window.addEventListener('devicemotion', () => {
			this.permissionGranted = true
		}, { once: true })
	},

	methods: {
		requiresPermission () {
			return typeof window.DeviceMotionEvent.requestPermission === 'function'
		},

		async requestPermission () {
			const permission = await window.DeviceMotionEvent.requestPermission()
			this.permissionGranted = permission === 'granted'
		}
	}
}
</script>

<style module="$s">

.Title {
	font-size: 12px;
	text-align: center;
}

.StartButton {
	position: fixed;
	bottom: 24px;
	width: calc(100% - 24px * 2);
}

.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family:
		'Quicksand',
		'Source Sans Pro',
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		'Helvetica Neue',
		Arial,
		sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>
