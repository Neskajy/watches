class Slider {
    constructor(sliderSelector, wrapperSelector, gallerySelector, remotersSelector, slideSelector, slidesPerView = 1) {
        this.sliderSelector = sliderSelector;
        this.wrapperSelector = wrapperSelector;
        this.gallerySelector = gallerySelector;
        this.remotersSelector = remotersSelector;
        this.slidesSelector = slideSelector;

        this.slider = document.querySelector(sliderSelector);
        this.wrapper = document.querySelector(wrapperSelector);
        this.gallery = document.querySelector(gallerySelector);
        this.remoters = document.querySelector(remotersSelector);
        this.slides = document.querySelectorAll(slideSelector);

        this.slidesPerView = slidesPerView;
        this.slideGap = 10;

        this.getActiveSlideIndexFromHTML();
        this.setDimensions();
        this.controlDots();
        this.listener();
        // this.paintSlides();
    }


    getActiveSlideIndexFromHTML() {
        for (let i = 0; i < this.gallery.children.length; i++) {
            const element = this.gallery.children[i];

            if (element.classList.contains("active")) {
                this.activeSlideIndex = i;
                return;
            }
        }
        this.activeSlideIndex = 0;
    }

    setDimensions() { //Взято из прошлого моего кода
        if (this.slidesPerView > 2) {
            this.slideWidth = (this.gallery.clientWidth - (this.slideGap * 2)) / this.slidesPerView;
        } else if (this.slidesPerView === 1) {
            this.slideWidth = (this.gallery.clientWidth) / this.slidesPerView;
        } else if (this.slidesPerView === 2) {
            this.slideWidth = (this.gallery.clientWidth - (this.slideGap)) / this.slidesPerView;
        }
        Array.from(this.slides).forEach(element => {
            element.style.width = `${this.slideWidth}px`;
        });
        this.gallery.style.gap = `${this.slideGap}px`;
    }

    controlDots() {
        this.dots = document.createElement("div");
        this.dots.className = "dots";
        this.slider.appendChild(this.dots);

        this.dotsCount = this.slides.length;
        for (let i = 0; i <= this.slides.length - this.slidesPerView; i++) {
            const dot = document.createElement("div");
            dot.className = "dot";
            dot.dataset.index = Number(i);

            if (i == this.activeSlideIndex) {
                dot.classList.add("active");
            }

            this.dots.appendChild(dot);

            dot.addEventListener("click", (event) => {
                this.changeActive(dot);
            });
        }

    }

    listener() {
        this.remoters.addEventListener("click", (event) => {
            this.targetArrow = event.target.closest(".btn");

            if (!this.targetArrow) return;

            this.activeSlide = document.querySelector(".slider-item.active");
            this.activeSlideIndex = Array.from(this.slides).indexOf(this.activeSlide);

            this.activeSlide.classList.remove("active");

            this.changeActive();
        });
    }

    changeActive(dot = false) {
        if (dot) {
            this.dots.children[this.activeSlideIndex].classList.remove("active");
            this.activeSlideIndex = dot.dataset.index;
            this.slides[this.activeSlideIndex].classList.add("active");
            this.dots.children[this.activeSlideIndex].classList.add("active");
            this.rollSlide();
            return;
        }
        if (this.targetArrow.classList.contains("right")) {
            this.dots.children[this.activeSlideIndex].classList.remove("active");
            if (this.activeSlideIndex < this.slides.length - (this.slidesPerView)) {
                this.activeSlideIndex++;
            } else {
                this.activeSlideIndex = 0;
            }
        } else if (this.targetArrow.classList.contains("left")) {
            this.dots.children[this.activeSlideIndex].classList.remove("active");
            if (this.activeSlideIndex == 0) {
                this.activeSlideIndex = this.slides.length - (this.slidesPerView);
            } else {
                this.activeSlideIndex--;
            }
        }
        this.dots.children[this.activeSlideIndex].classList.remove("active");
        this.slides[this.activeSlideIndex].classList.add("active");
        this.dots.children[this.activeSlideIndex].classList.add("active");
        this.rollSlide();
    }

    rollSlide() {
        this.gallery.style.transform = `translateX(${(this.activeSlideIndex) * -(this.slideWidth + this.slideGap)}px)`;
    }

    paintSlides() { //Функция взята из моего прошлого слайдера, который есть на гитхабе
        const max = 255;
        const min = 0;
        Array.from(this.gallery.children).forEach(element => {
            const r = Math.floor(Math.random() * (max - min + 1) + min);
            const g = Math.floor(Math.random() * (max - min + 1) + min);
            const b = Math.floor(Math.random() * (max - min + 1) + min);
            element.style.background = `rgb(${r}, ${g}, ${b})`;
        });
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const slider = new Slider(".slider", ".slider-wrapper", ".slider-gallery", ".remoters", ".slider-item", 1);
});