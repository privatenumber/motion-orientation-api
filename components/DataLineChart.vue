<template>
	<div
		:class="$s.LineChart"
	>
		<div>
			<svg
				ref="svg"
				:class="$s.Svg"
			>
				<line
					x1="0"
					y1="50%"
					x2="100%"
					y2="50%"
					:class="$s.MiddleLine"
					stroke-dasharray="4"
				/>
				<polyline
					v-for="line in lines"
					:key="`line-${line.label}`"
					fill="none"
					:stroke="line.color"
					stroke-width="1"
					:points="pointsToCoordinates(line.points)"
				/>
			</svg>

			<div :class="$s.Caption">
				Last 10 seconds
			</div>
		</div>

		<div :class="$s.Legend">
			<div
				v-for="line in lines"
				:key="`legend-${line.label}`"
				:class="$s.DataRow"
			>
				<ui-legend
					:label="line.label"
					:color="line.color"
				>
					<data>
						{{ line.value }}
					</data>
				</ui-legend>
			</div>

			<ui-legend
				label="Max"
			>
				<data>
					{{ viewBoxY.max }}
				</data>
			</ui-legend>
			<ui-legend
				label="Min"
			>
				<data>
					{{ viewBoxY.min }}
				</data>
			</ui-legend>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		lines: {
			type: Array,
			required: true
		},
		xMax: {
			type: Number,
			default: undefined
		}
	},

	data () {
		return {
			svgWidth: null,
			svgHeight: null
		}
	},
	computed: {
		spaceBetweenPoints () {
			return this.svgWidth / (this.xMax || this.lines[0].points.length)
		},
		viewBoxY () {
			const { lines } = this
			let min, max

			for (let i = 0; i < lines.length; i += 1) {
				const line = lines[i]

				for (let j = 0; j < line.points.length; j += 1) {
					const point = line.points[j]

					if (min === undefined || point < min) {
						min = point
					}

					if (max === undefined || max < point) {
						max = point
					}
				}
			}

			if (min === undefined) {
				min = 0
			}
			if (max === undefined) {
				max = 0
			}
			return { min, max }
		}
	},

	mounted () {
		this.svgWidth = this.$refs.svg.clientWidth
		this.svgHeight = this.$refs.svg.clientHeight
	},
	methods: {
		pointsToCoordinates (points) {
			const { svgHeight } = this
			if (!svgHeight) {
				return ''
			}
			const { min, max } = this.viewBoxY
			const maxSide = Math.max(Math.abs(min), Math.abs(max), 3)
			const chartHeight = maxSide * 2

			return points
				.map((p, idx) => [
					this.spaceBetweenPoints * idx,
					((p + maxSide) * (svgHeight / chartHeight)) || 0
				].join(','))
				.join(' ')
		}
	}
}
</script>

<style module="$s">
:root {
	--chart-width: calc(8px * 24);
}

.LineChart {
	display: flex;
}

.Svg {
	width: var(--chart-width);
	height: 100px;
	border: 1px solid rgba(255, 255, 255, 0.3);
}

.MiddleLine {
	stroke: rgba(255, 255, 255, 0.1);
	stroke-width: 1px;
}

.Caption {
	font-size: 11px;
	font-style: italic;
	color: #ccc;
}

.Legend {
	flex: 1;
	padding-left: 24px;
}

</style>
