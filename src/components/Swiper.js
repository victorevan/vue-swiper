import "swiper/dist/css/swiper.min.css";
import Swiper from "swiper/dist/js/swiper.esm.bundle";
import kebabCase from "lodash/kebabCase";
import events from "./events";

export default {
	name: "VueSwiper",

	model: {
		prop: "active",
		event: "change"
	},

	props: {
		active: {
			type: Number,
			default: null
		},
		options: {
			type: Object,
			default: () => ({})
		}
	},

	data() {
		return {
			swiper: undefined
		};
	},

	computed: {
		currentSlide() {
			return this.swiper.activeIndex;
		},
		slidesCount() {
			// filter only slides next
			return this.$slots.default.length;
		}
	},

	watch: {
		/**
		 * @param {Number} index
		 */
		active(index) {
			this.changeSlideByModel(index);
		}
	},

	mounted() {
		this.init();
	},

	updated() {
		this.swiper.update();
	},

	beforeDestroy() {
		if (this.swiper) this.swiper.destroy();
	},

	methods: {
		init() {
			if (this.swiper) this.swiper.destroy();

			const config = Object.assign(
				{
					preloadImages: false,
					keyboard: {
						enabled: true,
						onlyInViewport: true
					},
					a11y: true
				},
				this.options
			);

			this.swiper = new Swiper(this.$el, config);

			this.eventConnector(events);
			this.bindModel();
		},
		/**
		 * Pass swiper events to Vue events
		 * @param {array} - swiper events
		 */
		eventConnector(events) {
			events.map(event => {
				this.swiper.on(event, e => {
					const emitter = kebabCase(event);
					this.$emit(`swiper:${emitter}`, e);
				});
			});
		},
		/**
		 * Bind v-model
		 */
		bindModel() {
			this.$on("swiper:slide-change", () => {
				this.$emit("change", this.currentSlide);
			});
		},
		/**
		 * Change slide by v-model
		 */
		changeSlideByModel(index) {
			if (index === null) return;

			this.swiper.slideTo(index);
		}
	},

	render(h) {
		return (
			<div class="swiper-container">
				<ul class="swiper-wrapper">{this.$slots.default}</ul>
			</div>
		);
	}
};
