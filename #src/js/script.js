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

	let sliderDoctorsPopup = new Swiper(".doctors-popup__slider", {
		slidesPerView: "auto",
		watchOverflow: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".doctors-popup__slider .slider-arrow-two-next",
			prevEl: ".doctors-popup__slider .slider-arrow-two-prev",
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

	let datePic = document.querySelector(".calendar-doctor");

	if (datePic != null) {
		const picker = new Litepicker({
			element: datePic,
			inlineMode: true,
			lang: "ru-RU",
			highlightedDays: ["2022-10-15"],
			setup: (picker) => {
				picker.on("render", (ui) => {
					console.log(12312331231);
					// sizeDate(ui);
				});

				picker.on("selected", (date1, date2) => {});
			},
		});

		// function sizeDate(el) {
		// 	let daysCalendar = el.querySelectorAll(".container__days > div");

		// 	if (daysCalendar.length > 0) {
		// 		daysCalendar.forEach((element, index, array) => {
		// 			element.style.height = Math.ceil(array[0].offsetWidth) + "px";
		// 		});
		// 	}

		// 	window.addEventListener("resize", function () {
		// 		if (daysCalendar.length > 0) {
		// 			daysCalendar.forEach((element, index, array) => {
		// 				element.style.height = Math.ceil(array[0].offsetWidth) + "px";
		// 			});
		// 		}
		// 	});
		// }

		// sizeDate(datePic);
	}

	let allSelecet = document.querySelectorAll("select");

	if (allSelecet.length > 0) {
		allSelecet.forEach((element) => {
			NiceSelect.bind(element);
		});
	}

	// Открытие попапов МОЖНО УДАЛЯТЬ
	let popupAllElem = Array.prototype.slice.call(document.querySelectorAll(".modal"));
	let openButton = Array.prototype.slice.call(document.querySelectorAll(".js-modal-show"));
	let closeButton = Array.prototype.slice.call(document.querySelectorAll(".js-modal-close"));
	let body = document.querySelector("body");

	function openPopup(e) {
		e.preventDefault();
		let modal = document.querySelector(`#${e.target.dataset.popup}`);
		modal.classList.add("active");

		body.classList.add("lock");

		setTimeout(() => {
			modal.style.opacity = "1";
		}, 100);
	}

	function closePopup() {
		popupAllElem.forEach((element) => {
			if (element.classList.contains("active")) {
				let modal = element;

				setTimeout(() => {
					modal.classList.remove("active");
				}, 300);

				modal.style.opacity = "0";

				body.classList.remove("lock");
			}
		});
	}

	if (openButton != null) {
		openButton.forEach((element) => {
			element.addEventListener("click", (e) => {
				closePopup(e);

				openPopup(e);
			});
		});
	}

	if (closeButton != null) {
		closeButton.forEach((element) => {
			element.addEventListener("click", (e) => {
				closePopup();
			});
		});
	}

	if (popupAllElem != null) {
		popupAllElem.forEach((element) => {
			element.addEventListener("click", (e) => {
				if (e.target.parentNode.classList.contains("modal")) {
					closePopup();
				}
			});
		});
	}
});
