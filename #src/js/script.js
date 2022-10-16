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

	Inputmask({
		mask: "+7 (Z99) 999-99-99",
		definitions: {
			Z: {
				validator: "[0-6,9]",
			},
		},
	}).mask('[type="tel"]');

	let allSelecet = document.querySelectorAll("select");

	if (allSelecet.length > 0) {
		allSelecet.forEach((element) => {
			NiceSelect.bind(element);
		});
	}

	let datePic = document.querySelector(".calendar-doctor");
	let dataTime = {
		1666213200000: ["15:00", "16:00"],
		1666386000000: ["13:00", "17:00"],
	};
	let picker;

	if (datePic != null) {
		picker = new Litepicker({
			element: datePic,
			inlineMode: true,
			lang: "ru-RU",
			highlightedDays: Object.keys(dataTime),
			setup: (picker) => {
				picker.on("render", (ui) => {});

				picker.on("selected", (date1) => {
					let timeList = document.querySelector(".js-list-time");
					let tip = document.querySelector(".js-tip");
					if (dataTime[Date.parse(date1.dateInstance)] != undefined) {
						timeList.classList.add("active");
						tip.classList.remove("active");
					} else {
						timeList.classList.remove("active");
						tip.classList.add("active");
					}
				});
			},
		});
	}
});

document.addEventListener("click", function (e) {
	let element = e.target;

	if (element.closest(".js-add-doctor")) {
		e.preventDefault();
		let modal = element.closest(".modal");

		modal.classList.remove("--step-1");
		modal.classList.add("--step-2");

		modal.querySelector(".js-step-1").classList.remove("active");
		modal.querySelector(".js-step-2").classList.add("active");
	}

	if (element.closest(".js-time")) {
		let parentOrder = element.closest(".order-doctor");
		let timeDoctors = parentOrder.querySelector(".time-doctors");
		let resultDoctors = parentOrder.querySelector(".result-doctors");

		timeDoctors.classList.remove("active");
		resultDoctors.classList.add("active");
	}

	if (element.closest(".js-back")) {
		let parentOrder = element.closest(".order-doctor");
		let timeDoctors = parentOrder.querySelector(".time-doctors");
		let resultDoctors = parentOrder.querySelector(".result-doctors");

		timeDoctors.classList.add("active");
		resultDoctors.classList.remove("active");
	}
});

document.addEventListener("DOMContentLoaded", function () {
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
