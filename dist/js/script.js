document.addEventListener("DOMContentLoaded", function () {
	let sliderMainScreen = new Swiper(".slider-main", {
		slidesPerView: 1,
		watchOverflow: true,
		loop: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		navigation: {
			nextEl: ".main-screen .slider-arrow-next",
			prevEl: ".main-screen .slider-arrow-prev",
		},
	});

	let sliderInfo = new Swiper(".info-slider", {
		slidesPerView: 1,
		watchOverflow: true,
		navigation: {
			nextEl: ".slider-info .slider-arrow-next",
			prevEl: ".slider-info .slider-arrow-prev",
		},
	});

	let arrInputPlaceholder = Array.prototype.slice.call(document.querySelectorAll(".js-placeholder"));

	if (arrInputPlaceholder.length > 0) {
		arrInputPlaceholder.forEach((element) => {
			let input = element.querySelector(".js-input");
			let placeholder = element.querySelector(".js-text-place");

			if (input != null && placeholder != null) {
				input.addEventListener("focus", (e) => {
					placeholder.classList.add("active-placeholder");
				});

				input.addEventListener("focusout", (e) => {
					if (input.value.length == 0) {
						placeholder.classList.remove("active-placeholder");
					}
				});
			}
		});
	}
});
