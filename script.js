document.addEventListener("DOMContentLoaded", () => {

/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
menuToggle.addEventListener("click", () => {
const isOpen = navigation.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.setAttribute(
"aria-label",
isOpen ? "Close navigation" : "Open navigation"
);
});

navigation.querySelectorAll("a").forEach(link => {
link.addEventListener("click", () => {
navigation.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation");
});
});
}

/* TESTIMONIAL ROTATION */

const reviews = Array.from(
document.querySelectorAll(".testimonial")
);

const previousButton = document.getElementById("previousReview");
const nextButton = document.getElementById("nextReview");
const reviewCount = document.getElementById("reviewCount");

let currentReview = 0;
let reviewTimer;

function displayReview(index) {
if (!reviews.length) return;

currentReview = (index + reviews.length) % reviews.length;

reviews.forEach((review, position) => {
review.classList.toggle(
"active",
position === currentReview
);
});

if (reviewCount) {
const current = String(currentReview + 1).padStart(2, "0");
const total = String(reviews.length).padStart(2, "0");

reviewCount.textContent = `${current} / ${total}`;
}
}

function restartReviewTimer() {
clearInterval(reviewTimer);

reviewTimer = setInterval(() => {
displayReview(currentReview + 1);
}, 8000);
}

if (reviews.length) {
displayReview(0);
restartReviewTimer();
}

if (previousButton) {
previousButton.addEventListener("click", () => {
displayReview(currentReview - 1);
restartReviewTimer();
});
}

if (nextButton) {
nextButton.addEventListener("click", () => {
displayReview(currentReview + 1);
restartReviewTimer();
});
}

/* PAUSE AUTOMATIC ROTATION WHEN USER HOVERS */

const testimonialCard = document.querySelector(".testimonial-card");

if (testimonialCard) {
testimonialCard.addEventListener("mouseenter", () => {
clearInterval(reviewTimer);
});

testimonialCard.addEventListener("mouseleave", () => {
restartReviewTimer();
});
}

});