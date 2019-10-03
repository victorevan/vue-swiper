import 'swiper/dist/css/swiper.min.css';
import {
	Swiper,
	Virtual,
	Keyboard,
	Pagination,
	Navigation,
	A11y
} from 'swiper/dist/js/swiper.esm.js';
import kebabCase from 'lodash/kebabCase';
import deepMerge from 'lodash/merge';
import events from './events';

Swiper.use([Virtual, Keyboard, Pagination, Navigation, A11y]);

export default {
	name: 'VueSwiper',

	model: {
		prop: 'active',
		event: 'change'
	},

	props: {
		active: {
			type: Number,
			default: null
		},
		options: {
			type: Object,
			default: () => ({})
		},
		defaultPagination: {
			type: Boolean,
			default: false
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

	destroyed() {
		if (this.swiper) this.swiper.destroy();
	},

	methods: {
		init() {
			if (this.swiper) this.swiper.destroy();

			const config = deepMerge(
				{
					preloadImages: false,
					keyboard: {
						enabled: true,
						onlyInViewport: true
					},
					a11y: true,
					pagination: this.defaultPagination
						? {
								el: '.swiper-pagination'
						  }
						: {}
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
			this.$on('swiper:slide-change', () => {
				this.$emit('change', this.currentSlide);
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
		const { $slots, defaultPagination } = this;

		return (
			<div class="swiper-container" attrs={this.$attrs} on={this.$listeners}>
				<ul class="swiper-wrapper">{$slots.default}</ul>
				{defaultPagination && <div class="swiper-pagination"></div>}
			</div>
		);
	}
};
