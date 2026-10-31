/* ==========================================
CERRITOS YACHT ANCHORAGE
WEBSITE INTERACTIONS
========================================== */


/* ==========================================
INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

initializeNavigation();

initializeScrollProgress();

initializeTestimonials();

initializeLogoConfetti();

initializeContactForm();

initializeBackToTop();

initializeFooterYear();

});


/* ==========================================
MOBILE NAVIGATION
========================================== */

function initializeNavigation() {

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

if (!menuToggle || !navLinks) return;


menuToggle.addEventListener("click", () => {

const isOpen = navLinks.classList.toggle("open");

menuToggle.setAttribute(
"aria-expanded",
String(isOpen)
);

menuToggle.setAttribute(
"aria-label",
isOpen ? "Close navigation menu" : "Open navigation menu"
);

menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close menu after selecting a navigation link

navLinks.querySelectorAll("a").forEach(link => {

link.addEventListener("click", () => {

navLinks.classList.remove("open");

menuToggle.setAttribute("aria-expanded", "false");

menuToggle.setAttribute(
"aria-label",
"Open navigation menu"
);

menuToggle.textContent = "☰";

});

});


// Close menu when clicking outside

document.addEventListener("click", event => {

if (
!navLinks.contains(event.target) &&
!menuToggle.contains(event.target)
) {

navLinks.classList.remove("open");

menuToggle.setAttribute("aria-expanded", "false");

menuToggle.textContent = "☰";

}

});

}


/* ==========================================
SCROLL PROGRESS BAR
========================================== */

function initializeScrollProgress() {

const progressBar = document.getElementById("scrollProgress");

if (!progressBar) return;


let ticking = false;


window.addEventListener("scroll", () => {

if (ticking) return;

ticking = true;

requestAnimationFrame(() => {

const scrollableHeight =
document.documentElement.scrollHeight -
window.innerHeight;

const progress = scrollableHeight > 0
? (window.scrollY / scrollableHeight) * 100
: 0;

progressBar.style.width =
Math.min(progress, 100) + "%";

ticking = false;

});

}, { passive: true });

}


/* ==========================================
TESTIMONIAL CAROUSEL
========================================== */

function initializeTestimonials() {

const cards = document.querySelectorAll(".testimonial-card");

const nextButton = document.getElementById("testimonialNext");

const prevButton = document.getElementById("testimonialPrev");

const dotsContainer = document.getElementById("testimonialDots");

const counter = document.getElementById("testimonialCounter");


if (
!cards.length ||
!nextButton ||
!prevButton ||
!dotsContainer ||
!counter
) return;


let currentIndex = 0;


// Create navigation dots

cards.forEach((card, index) => {

const dot = document.createElement("button");

dot.type = "button";

dot.className = "testimonial-dot";

dot.setAttribute(
"aria-label",
`Show testimonial ${index + 1}`
);

dot.addEventListener("click", () => {

showTestimonial(index);

});

dotsContainer.appendChild(dot);

});


const dots = dotsContainer.querySelectorAll(".testimonial-dot");


// Display selected testimonial

function showTestimonial(index) {

currentIndex =
(index + cards.length) % cards.length;


cards.forEach((card, i) => {

const active = i === currentIndex;

card.classList.toggle("active", active);

card.setAttribute("aria-hidden", String(!active));

});


dots.forEach((dot, i) => {

const active = i === currentIndex;

dot.classList.toggle("active", active);

if (active) {

dot.setAttribute("aria-current", "true");

} else {

dot.removeAttribute("aria-current");

}

});


counter.textContent =
`${currentIndex + 1} / ${cards.length}`;

}


// Next

nextButton.addEventListener("click", () => {

showTestimonial(currentIndex + 1);

});


// Previous

prevButton.addEventListener("click", () => {

showTestimonial(currentIndex - 1);

});


// Keyboard navigation while carousel has focus

const carousel = document.querySelector(".testimonial-carousel");

carousel.addEventListener("keydown", event => {

if (event.key === "ArrowRight") {

showTestimonial(currentIndex + 1);

}

if (event.key === "ArrowLeft") {

showTestimonial(currentIndex - 1);

}

});


// Initialize

showTestimonial(0);

}


/* ==========================================
FLOATING NAUTICAL LOGO CONFETTI
========================================== */

function initializeLogoConfetti() {

const toggle = document.getElementById("logoConfettiToggle");

if (!toggle) return;


const logoPath = "assets/cerritos-logo.png";

const storageKey = "cerritosLogoConfetti";

const reducedMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
);


const MAX_PARTICLES = 12;

let lastScroll = 0;

let animationFrame = null;


// Restore saved preference

const savedPreference = localStorage.getItem(storageKey);

toggle.checked = savedPreference === "true";


// Respect reduced motion preferences

if (reducedMotion.matches) {

toggle.checked = false;

toggle.disabled = true;

}


// Create floating logo

function createFloatingLogo() {

if (!toggle.checked || reducedMotion.matches) return;


const activeParticles = document.querySelectorAll(
".logo-confetti"
);


if (activeParticles.length >= MAX_PARTICLES) return;


const logo = document.createElement("img");

logo.src = logoPath;

logo.alt = "";

logo.className = "logo-confetti";

logo.setAttribute("aria-hidden", "true");


// Random horizontal position

logo.style.left = Math.random() * 95 + "vw";


// Random animation duration

const duration = 5 + Math.random() * 5;

logo.style.animationDuration = duration + "s";


// Random logo size

const size = 22 + Math.random() * 20;

logo.style.width = size + "px";

logo.style.height = size + "px";


document.body.appendChild(logo);


// Remove after animation

logo.addEventListener("animationend", () => {

logo.remove();

});


// Remove if image cannot load

logo.addEventListener("error", () => {

logo.remove();

});

}


// Detect scrolling

function handleScroll() {

if (!toggle.checked || reducedMotion.matches) return;


const currentScroll = window.scrollY;


if (Math.abs(currentScroll - lastScroll) > 90) {

createFloatingLogo();

lastScroll = currentScroll;

}

}


// Efficient scroll listener

window.addEventListener("scroll", () => {

if (animationFrame) return;


animationFrame = requestAnimationFrame(() => {

handleScroll();

animationFrame = null;

});

}, { passive: true });


// Toggle interaction

toggle.addEventListener("change", () => {

localStorage.setItem(
storageKey,
String(toggle.checked)
);


if (!toggle.checked) {

document.querySelectorAll(".logo-confetti").forEach(logo => {

logo.remove();

});

} else {

createFloatingLogo();

}

});


// React to operating-system motion preferences

reducedMotion.addEventListener("change", event => {

if (event.matches) {

toggle.checked = false;

toggle.disabled = true;

localStorage.setItem(storageKey, "false");


document.querySelectorAll(".logo-confetti").forEach(logo => {

logo.remove();

});

} else {

toggle.disabled = false;

}

});

}


/* ==========================================
CONTACT FORM
========================================== */

function initializeContactForm() {

const form = document.getElementById("contactForm");

if (!form) return;


form.addEventListener("submit", event => {

event.preventDefault();


const name = document.getElementById("name").value.trim();

const email = document.getElementById("email").value.trim();

const message = document.getElementById("message").value.trim();


if (!name || !email || !message) {

alert("Please complete all fields.");

return;

}


const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if (!emailPattern.test(email)) {

alert("Please enter a valid email address.");

return;

}


/*
DEMONSTRATION FORM

Replace this placeholder with the verified
business email address before launching.

This opens the visitor's email application.
It does not submit to a server.
*/


const businessEmail = "";

if (!businessEmail) {

alert(
"The contact form is ready for configuration. " +
"A verified business email address needs to be added."
);

return;

}


const subject = encodeURIComponent(
"Website Inquiry - " + name
);


const body = encodeURIComponent(
"Name: " + name +
"\nEmail: " + email +
"\n\nMessage:\n" + message
);


window.location.href =
`mailto:${businessEmail}?subject=${subject}&body=${body}`;

});

}


/* ==========================================
BACK TO TOP
========================================== */

function initializeBackToTop() {

const button = document.getElementById("backToTop");

if (!button) return;


window.addEventListener("scroll", () => {

button.classList.toggle(
"visible",
window.scrollY > 500
);

}, { passive: true });


button.addEventListener("click", () => {

const reducedMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;


window.scrollTo({

top: 0,

behavior: reducedMotion ? "auto" : "smooth"

});

});

}


/* ==========================================
AUTOMATIC COPYRIGHT YEAR
========================================== */

function initializeFooterYear() {

const year = document.getElementById("currentYear");

if (year) {

year.textContent = new Date().getFullYear();

}

}
