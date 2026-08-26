let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const currentNumber = document.getElementById("current");
const progress = document.getElementById("progress");

function showSlide(index) {

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

    currentSlide = index;

    currentNumber.textContent = index + 1;

    const percentage =
        ((index + 1) / slides.length) * 100;

    progress.style.width = percentage + "%";
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function previousSlide() {
    showSlide(currentSlide - 1);
}


/* Keyboard */
document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowRight" ||
        event.key === " " ||
        event.key === "PageDown"
    ) {
        nextSlide();
    }

    if (
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
    ) {
        previousSlide();
    }

    if (event.key === "Home") {
        showSlide(0);
    }

    if (event.key === "End") {
        showSlide(slides.length - 1);
    }

    if (event.key === "f" || event.key === "F") {
        toggleFullscreen();
    }

});


/* Fullscreen */

function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}


/* Touch swipe */

let touchStartX = 0;

document.addEventListener("touchstart", function(event) {

    touchStartX = event.changedTouches[0].screenX;

});


document.addEventListener("touchend", function(event) {

    const touchEndX =
        event.changedTouches[0].screenX;

    const difference =
        touchStartX - touchEndX;

    if (difference > 50) {
        nextSlide();
    }

    if (difference < -50) {
        previousSlide();
    }

});


/* Initialize */

showSlide(0);