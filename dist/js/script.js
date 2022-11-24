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
		pagination: {
			el: ".main-screen .slider-pagination",
			type: "fraction",
		},
	});

	let sliderInfo = new Swiper(".info-slider", {
		slidesPerView: 1,
		watchOverflow: true,
		navigation: {
			nextEl: ".slider-info .slider-arrow-next",
			prevEl: ".slider-info .slider-arrow-prev",
		},
		pagination: {
			el: ".slider-info .slider-pagination",
			type: "fraction",
		},
	});

	let sliderDoctorsPopup = new Swiper(".doctors-popup__slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		watchOverflow: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".doctors-popup__slider .slider-arrow-next",
			prevEl: ".doctors-popup__slider .slider-arrow-prev",
		},

		breakpoints: {
			1000: {
				slidesPerView: "auto",
				spaceBetween: 0,
			},

			630: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
		},
	});

	let sliderOtherBlog = new Swiper(".blog-other .blog-other__slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		initialSlide: 2,
		watchOverflow: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".blog-other .slider-arrow-next",
			prevEl: ".blog-other .slider-arrow-prev",
		},

		breakpoints: {
			1000: {
				slidesPerView: 3,
				spaceBetween: 60,
			},

			630: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
		},
	});

	function bodyLock(lock) {
		let body = document.querySelector("body");
		if (body != null) {
			if (lock) {
				body.classList.add("lock");
			} else {
				body.classList.remove("lock");
			}
		}
	}

	let burger = document.querySelector(".js-burger");
	let mobMenu = document.querySelector(".mob-menu");
	let closeMenu = document.querySelector(".js-close-menu");
	let openSubMenu = document.querySelectorAll(".js-open-submenu");
	let closeSubMenu = document.querySelectorAll(".js-close-submenu");

	if (burger != null && mobMenu != null && closeMenu != null) {
		burger.addEventListener("click", function () {
			mobMenu.classList.add("active");
			bodyLock(true);
		});

		closeMenu.addEventListener("click", function () {
			mobMenu.classList.remove("active");
			bodyLock(false);
		});
	}

	if (openSubMenu.length > 0 && closeSubMenu.length > 0) {
		openSubMenu.forEach((element) => {
			element.addEventListener("click", function () {
				this.closest(".mob-menu__item").querySelector(".mob-menu__submenu").classList.add("active");
			});
		});

		closeSubMenu.forEach((element) => {
			element.addEventListener("click", function () {
				this.closest(".mob-menu__submenu").classList.remove("active");
			});
		});
	}

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

	const da = new DynamicAdapt("max");
	da.init();

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

	let lightgalleryAll = document.querySelectorAll(".lightgallery");

	if (lightgalleryAll.length > 0) {
		lightgalleryAll.forEach((element) => {
			lightGallery(element, {
				selector: ".lg-target",
				addClass: "lightGallery-white-theme",
				exThumbImage: "data-external-thumb-image",
				speed: 500,
				plugins: [lgFullscreen, lgThumbnail],
			});
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

		modal.querySelector(".popup-general__title").textContent = "Выберите дату приема";

		modal.querySelector(".js-step-1").classList.remove("active");
		modal.querySelector(".js-step-2").classList.add("active");
	}

	if (element.closest(".js-next-order")) {
		e.preventDefault();
		let modal = element.closest(".modal");

		modal.querySelector(".popup-general__title").textContent = "Хотите прервать запись?";

		modal.classList.remove("--step-2");
		modal.classList.add("--step-3");

		modal.querySelector(".js-step-2").classList.remove("active");
		modal.querySelector(".js-step-3").classList.add("active");
	}

	if (element.closest(".js-end-order")) {
		e.preventDefault();
		let modal = element.closest(".modal");

		modal.classList.remove("--step-3");
		modal.classList.add("--step-4");

		modal.querySelector(".js-step-3").classList.remove("active");
		modal.querySelector(".js-step-4").classList.add("active");
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
