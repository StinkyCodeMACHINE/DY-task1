const slideContainer = document.querySelector(".slide-container");
const slides = Array.from(slideContainer.children);
const prevButton = document.querySelector(".slider-button-prev-container");
const nextButton = document.querySelector(".slider-button-next-container");
const dotContainer = document.querySelector(".slider-dots-container");
const dots = Array.from(dotContainer.children);

function moveToSlide(currentSlide, targetSlide) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const targetSlideIndex = slides.indexOf(targetSlide);
  slideContainer.style.transform = `translateX(${
    -slideWidth * targetSlideIndex
  }px)`;
  currentSlide.classList.toggle("current-slide");
  targetSlide.classList.toggle("current-slide");
  const activeDot = dotContainer.querySelector(".slide-dot-selected");
  activeDot.classList.remove("slide-dot-selected");

  switch (targetSlideIndex) {
    case 0:
      dotContainer.classList.remove(
        "second-slide-active",
        "third-slide-active"
      );
      dotContainer.classList.add("first-slide-active");
      break;
    case 1:
      dotContainer.classList.remove("first-slide-active", "third-slide-active");
      dotContainer.classList.add("second-slide-active");
      break;
    case 2:
      dotContainer.classList.remove(
        "first-slide-active",
        "second-slide-active"
      );
      dotContainer.classList.add("third-slide-active");
      break;
  }
  dots[targetSlideIndex].classList.add("slide-dot-selected");
}

function autoMoveSlides() {
  const currentSlide = slideContainer.querySelector(".current-slide");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const nextSlide =
    currentSlideIndex === slides.length - 1
      ? slides[0]
      : currentSlide.nextElementSibling;

  moveToSlide(currentSlide, nextSlide);
  clearTimeout(slideTimer);
  slideTimer = setInterval(autoMoveSlides, 5000);
}

prevButton.addEventListener("click", (e) => {
  const currentSlide = slideContainer.querySelector(".current-slide");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const prevSlide =
    currentSlideIndex === 0
      ? slides[slides.length - 1]
      : currentSlide.previousElementSibling;
  moveToSlide(currentSlide, prevSlide);
  clearTimeout(slideTimer);
  slideTimer = setInterval(autoMoveSlides, 5000);
});

nextButton.addEventListener("click", (e) => {
  const currentSlide = slideContainer.querySelector(".current-slide");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const nextSlide =
    currentSlideIndex === slides.length - 1
      ? slides[0]
      : currentSlide.nextElementSibling;

  moveToSlide(currentSlide, nextSlide);
  clearTimeout(slideTimer);
  slideTimer = setInterval(autoMoveSlides, 5000);
});

dotContainer.addEventListener("click", (e) => {
  const targetDot = e.target.closest(".slider-dot");

  if (targetDot) {
    const targetDotIndex = dots.indexOf(targetDot);
    const currentSlide = slideContainer.querySelector(".current-slide");
    const targetSlide = slides[targetDotIndex];
    moveToSlide(currentSlide, targetSlide);
    clearTimeout(slideTimer);
    slideTimer = setInterval(autoMoveSlides, 5000);
  }
});

let slideTimer = setInterval(autoMoveSlides, 5000 * 1000);
