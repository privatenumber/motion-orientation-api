<template>
	<ui-section>
		<ui-heading
			slot="title"
			size="h2"
		>
			Motion API
		</ui-heading>

		<div :class="$s.MotionCharts">
			<div :class="$s.Chart">
				<div :class="$s.ChartHeader">
					<ui-heading
						size="h3"
						margin-bottom
					>
						Acceleration (m/s<sup>2</sup>)
					</ui-heading>

					<ui-toggle
						v-model="withGravity"
					>
						with Gravity
					</ui-toggle>
				</div>
				<data-line-chart
					:class="$s.LineChart"
					:x-max="100"
					:lines="data.accelerations"
				/>
			</div>
			<div :class="$s.Chart">
				<ui-heading
					size="h3"
					margin-bottom
				>
					Rotation (°/s)
				</ui-heading>
				<data-line-chart
					:class="$s.LineChart"
					:x-max="100"
					:lines="data.rotationRate"
				/>
			</div>
		</div>
	</ui-section>
</template>

<script>
import throttle from 'lodash/throttle'
import UiSection from '~/components/UiSection'
import UiHeading from '~/components/UiHeading'
import DataLineChart from '~/components/DataLineChart'

const roundDown = n => Math.floor(n * 100) / 100

class Line {
	constructor (opts) {
		this.label = opts.label
		this.color = opts.color
		this.points = []
	}

	get value () {
		return this.points[this.points.length - 1] || 0
	}
}

export default {

	components: {
		UiSection,
		UiHeading,
		DataLineChart
	},

	data () {
		const accelerations = [
			new Line({
				label: 'x',
				color: 'var(--x-color)'
			}),
			new Line({
				label: 'y',
				color: 'var(--y-color)'
			}),
			new Line({
				label: 'z',
				color: 'var(--z-color)'
			})
		]
		Object.assign(accelerations, {
			x: accelerations['0'],
			y: accelerations['1'],
			z: accelerations['2']
		})

		const rotationRate = [
			new Line({
				label: 'alpha',
				color: 'var(--alpha-color)'
			}),
			new Line({
				label: 'beta',
				color: 'var(--y-color)'
			}),
			new Line({
				label: 'gamma',
				color: 'var(--z-color)'
			})
		]
		Object.assign(rotationRate, {
			alpha: rotationRate['0'],
			beta: rotationRate['1'],
			gamma: rotationRate['2']
		})

		return {
			withGravity: false,
			data: {
				accelerations,
				rotationRate
			}
		}
	},

	created () {
		this.onDeviceMotion = throttle(this.onDeviceMotion, 100)
	},

	mounted () {
		window.addEventListener('devicemotion', this.onDeviceMotion)
	},

	methods: {
		pushLimit (arr, item, limit = 100) {
			arr.push(item)
			if (arr.length > limit) {
				arr.shift()
			}
		},
		onDeviceMotion (e) {
			const acceleration = this.withGravity ? e.accelerationIncludingGravity : e.acceleration

			this.pushLimit(this.data.accelerations.x.points, roundDown(acceleration.x))
			this.pushLimit(this.data.accelerations.y.points, roundDown(acceleration.y))
			this.pushLimit(this.data.accelerations.z.points, roundDown(acceleration.z))

			this.pushLimit(this.data.rotationRate.alpha.points, roundDown(e.rotationRate.alpha))
			this.pushLimit(this.data.rotationRate.beta.points, roundDown(e.rotationRate.beta))
			this.pushLimit(this.data.rotationRate.gamma.points, roundDown(e.rotationRate.gamma))
		}
	}
}
</script>

<style module="$s">

:root {
	--alpha-color: #55ba9f;
	--x-color: rgb(79, 101, 187);
	--y-color: rgb(255, 83, 112);
	--z-color: rgb(255, 203, 107);
}

.Chart {
	margin-bottom: 24px;

	&:last-child {
		margin-bottom: 0;
	}
}

.ChartHeader {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

</style>
