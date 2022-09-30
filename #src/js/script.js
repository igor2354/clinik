document.addEventListener("DOMContentLoaded", function () {
	let sliderMainScreen = new Swiper(".slider-main", {
		slidesPerView: 1,
		watchOverflow: true,
		navigation: {
			nextEl: ".main-screen .slider-arrow-next",
			prevEl: ".main-screen .slider-arrow-prev",
		},
	});
});
