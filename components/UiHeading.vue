<script>
export default {
	props: {
		size: {
			type: String,
			default: 'h1'
		},
		marginBottom: {
			type: Boolean,
			default: false
		}
	},
	render (h) {
		return h(this.size, {
			class: [this.$s.Heading, this.$s[this.size], {
				[this.$s.marginBottom]: this.marginBottom
			}]

		}, this.$slots.default)
	}
}
</script>

<style module="$s">

.Heading {
	font-weight: bold;

	&.marginBottom {
		margin-bottom: 8px;
	}
}

.h1 {
	font-size: 18px;
}

.h2 {
	font-size: 14px;
}

.h3 {
	text-transform: uppercase;
	font-size: 10px;
}

</style>
