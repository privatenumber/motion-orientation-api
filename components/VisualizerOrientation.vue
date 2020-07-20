<template>
	<ui-section>
		<ui-heading
			slot="title"
			size="h2"
		>
			Orientation API
		</ui-heading>

		<div :class="$s.OrientationDemo">
			<div>
				<div
					ref="canvas"
					:class="$s.Canvas"
				>
					<div :class="$s.xAxis" />
					<div :class="$s.yAxis" />
					<div
						:class="$s.zBall"
						:style="zBallStyles"
					/>
					<div
						ref="ball"
						:class="$s.xyBall"
						:style="xyBallStyles"
					/>
				</div>
			</div>

			<div :class="$s.Data">
				<div :class="$s.DataRow">
					<ui-legend
						label="alpha"
						color="var(--alpha-color)"
					>
						<data>
							{{ data.alpha }}°
						</data>
					</ui-legend>
					<data-meter
						:class="$s.DataMeter"
						:min="0"
						:max="360"
						:value="data.alpha"
					/>
				</div>

				<div :class="$s.DataRow">
					<ui-legend
						label="beta"
						color="var(--beta-color)"
					>
						<data>
							{{ data.beta }}
						</data>
					</ui-legend>
					<data-meter
						:class="$s.DataMeter"
						:min="-180"
						:max="180"
						:value="data.beta"
					/>
				</div>
				<div :class="$s.DataRow">
					<ui-legend
						label="gamma"
						color="var(--gamma-color)"
					>
						<data>
							{{ data.gamma }}
						</data>
					</ui-legend>
					<data-meter
						:class="$s.DataMeter"
						:min="-90"
						:max="90"
						:value="data.gamma"
					/>
				</div>
			</div>
		</div>
	</ui-section>
</template>

<script>
import UiSection from '~/components/UiSection'
import UiHeading from '~/components/UiHeading'
import UiLegend from '~/components/UiLegend'
import DataMeter from '~/components/DataMeter'

export default {

	components: {
		UiSection,
		UiHeading,
		UiLegend,
		DataMeter
	},

	data () {
		return {
			data: {
				alpha: 0,
				beta: 0,
				gamma: 0
			}
		}
	},

	computed: {
		xyBallStyles () {
			const { gamma } = this.data
			let { beta } = this.data

			// Because we don't want to have the device upside down
			// We constrain the x value to the range [-90,90]
			if (beta > 90) {
				beta = 90
			}
			if (beta < -90) {
				beta = -90
			}

			// It center the positioning point to the center of the ball
			return {
				top: ((beta + 90) / 180 * 100).toFixed(2) + '%',
				left: ((gamma + 90) / 180 * 100).toFixed(2) + '%'
			}
		},

		zBallStyles () {
			const canvasDimensions = 8 * 20
			const canvasRadius = canvasDimensions / 2
			const radian = Math.PI / 180

			let { alpha } = this.data
			alpha += 180
			return {
				left: `${(canvasRadius * Math.sin(alpha * radian))}px`,
				top: `${(canvasRadius * Math.cos(alpha * radian))}px`
			}
		}
	},

	mounted () {
		window.addEventListener('deviceorientation', this.onDeviceOrientation)
	},

	methods: {
		onDeviceOrientation ({ alpha, beta, gamma }) {
			Object.assign(this.data, {
				alpha: Math.floor(alpha),
				beta: Math.floor(beta),
				gamma: Math.floor(gamma)
			})
		}
	}
}
</script>

<style module="$s">

:root {
	--canvas-dimensions: calc(8px * 20);
	--alpha-color: #55ba9f;
	--beta-color: #db615c;
	--gamma-color: rgb(255, 203, 107);
	--glow-size: 2px;
}

.OrientationDemo {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.Data {
	padding-left: 24px;
	padding-right: 8px;
	flex: 1;
}

.DataRow {
	margin-bottom: 24px;
}

.DataMeter {
	margin-top: 8px;
}

.Canvas {
	--color: rgb(238, 255, 255, 0.4);

	position: relative;
	width: var(--canvas-dimensions);
	height: var(--canvas-dimensions);
	border-radius: 50%;
	border: 1px solid var(--color);

	& .xAxis {
		--color: var(--gamma-color);

		position: absolute;
		height: 1px;
		width: 100%;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background-color: var(--color);
		box-shadow: 0 0 var(--glow-size) var(--color);
	}

	& .yAxis {
		--color: var(--beta-color);

		position: absolute;
		width: 1px;
		height: 100%;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--color);
		box-shadow: 0 0 var(--glow-size) var(--color);
	}
}

.Ball {
	position: absolute;
	border-radius: 50%;
	width: var(--dimensions);
	height: var(--dimensions);
	transform: translateX(-50%) translateY(-50%);
	background-color: var(--color);
	box-shadow: 0 0 var(--glow-size) var(--color);
}

.zBall {
	composes: Ball;

	--dimensions: 8px;
	--color: var(--alpha-color);

	margin-top: 50%;
	margin-left: 50%;
}

.xyBall {
	composes: Ball;

	--dimensions: 8px;
	--color: rgba(255, 255, 255, 0.4);
}
</style>
