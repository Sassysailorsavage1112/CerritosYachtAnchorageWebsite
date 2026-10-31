// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
const isOpen = navigation.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach(link => {
link.addEventListener("click", () => {
navigation.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
});
});


// TESTIMONIAL SLIDER

const reviews = document.querySelectorAll(".review");
const reviewCount = document.getElementById("review-count");

const previousButton = document.getElementById("previous-review");
const nextButton = document.getElementById("next-review");

let currentReview = 0;

function showReview(index) {
reviews[currentReview].classList.remove("active");

currentReview = (index + reviews.length) % reviews.length;

reviews[currentReview].classList.add("active");

reviewCount.textContent =
`${String(currentReview + 1).padStart(2, "0")} / ${String(reviews.length).padStart(2, "0")}`;
}

previousButton.addEventListener("click", () => {
showReview(currentReview - 1);
});

nextButton.addEventListener("click", () => {
showReview(currentReview + 1);
});


// FLOATING LOGO EFFECT

const effectToggle = document.getElementById("effect-toggle");
const floatingContainer = document.getElementById("floating-logos");

let effectEnabled = false;
let floatingInterval = null;

function createFloatingLogo() {
const logo = document.createElement("img");

logo.src = "assets/cerritos-logo-no-text.png";
logo.alt = "";

logo.className = "floating-logo";

logo.style.left = Math.random() * 95 + "%";
logo.style.animationDuration = (6 + Math.random() * 5) + "s";
logo.style.width = (25 + Math.random() * 25) + "px";

floatingContainer.appendChild(logo);

setTimeout(() => {
logo.remove();
}, 11000);
}

function enableEffect() {
if (effectEnabled) return;

effectEnabled = true;

effectToggle.setAttribute("aria-pressed", "true");

createFloatingLogo();

floatingInterval = setInterval(createFloatingLogo, 850);
}

function disableEffect() {
effectEnabled = false;

effectToggle.setAttribute("aria-pressed", "false");

clearInterval(floatingInterval);

floatingContainer.innerHTML = "";
}

effectToggle.addEventListener("click", () => {
if (effectEnabled) {
disableEffect();
} else {
enableEffect();
}
});