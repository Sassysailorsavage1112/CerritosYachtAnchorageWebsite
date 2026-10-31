/* =========================================
CERRITOS YACHT ANCHORAGE
Website Interactions
========================================= */


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");

function closeMenu() {
if (!menuToggle || !mainNavigation) return;

menuToggle.classList.remove("active");
mainNavigation.classList.remove("open");

menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation menu");

document.body.classList.remove("menu-open");
}


if (menuToggle && mainNavigation) {

menuToggle.addEventListener("click", () => {

const isOpen = mainNavigation.classList.toggle("open");

menuToggle.classList.toggle("active", isOpen);

menuToggle.setAttribute("aria-expanded", String(isOpen));

menuToggle.setAttribute(
"aria-label",
isOpen ? "Close navigation menu" : "Open navigation menu"
);

document.body.classList.toggle("menu-open", isOpen);

});


mainNavigation.querySelectorAll("a").forEach(link => {

link.addEventListener("click", closeMenu);

});


document.addEventListener("keydown", event => {

if (event.key === "Escape") {
closeMenu();
}

});


window.addEventListener("resize", () => {

if (window.innerWidth > 760) {
closeMenu();
}

});

}


/* STICKY HEADER */

const siteHeader = document.getElementById("siteHeader");


function updateHeader() {

if (!siteHeader) return;

if (window.scrollY > 50) {
siteHeader.classList.add("scrolled");
} else {
siteHeader.classList.remove("scrolled");
}

}


window.addEventListener("scroll", updateHeader);

updateHeader();


/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
".intro-grid, .image-feature, .heritage-grid, .service-card, .amenity-item, .testimonial-card, .compass-decoration"
);

revealElements.forEach(element => {

element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(

entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("visible");

revealObserver.unobserve(entry.target);

}

});

},

{
threshold: 0.12,
rootMargin: "0px 0px -35px 0px"
}

);


revealElements.forEach(element => {

revealObserver.observe(element);

});


/* FLOATING LOGO CONFETTI */

const confettiToggle = document.getElementById("confettiToggle");
const confettiToggleText = document.getElementById("confettiToggleText");
const confettiLayer = document.getElementById("confettiLayer");

let confettiEnabled = false;
let confettiInterval = null;


/*
This uses the same logo image as the header.
The logo image floats gently across the screen.
*/

function createLogoConfetti() {

if (!confettiLayer || !confettiEnabled) return;

const piece = document.createElement("img");

piece.src = "assets/cerritos-logo-no-text.png";

piece.alt = "";

piece.className = "confetti-piece";

const leftPosition = Math.random() * 95;

const size = 18 + Math.random() * 18;

piece.style.left = `${leftPosition}%`;
piece.style.top = `${70 + Math.random() * 25}%`;

piece.style.width = `${size}px`;
piece.style.height = `${size}px`;

piece.style.animationDuration = `${4 + Math.random() * 3}s`;

confettiLayer.appendChild(piece);


setTimeout(() => {

piece.remove();

}, 7500);

}


function startConfetti() {

if (confettiInterval) return;

confettiEnabled = true;

createLogoConfetti();

confettiInterval = setInterval(() => {

createLogoConfetti();

}, 650);

}


function stopConfetti() {

confettiEnabled = false;

if (confettiInterval) {

clearInterval(confettiInterval);

confettiInterval = null;

}

if (confettiLayer) {

confettiLayer.innerHTML = "";

}

}


if (confettiToggle) {

confettiToggle.addEventListener("click", () => {

if (confettiEnabled) {

stopConfetti();

confettiToggle.setAttribute("aria-pressed", "false");

confettiToggleText.textContent = "Nautical accents: Off";

} else {

startConfetti();

confettiToggle.setAttribute("aria-pressed", "true");

confettiToggleText.textContent = "Nautical accents: On";

}

});

}


/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", event => {

const targetId = anchor.getAttribute("href");

if (!targetId || targetId === "#") return;

const target = document.querySelector(targetId);

if (!target) return;

event.preventDefault();

target.scrollIntoView({
behavior: "smooth",
block: "start"
});

});

});


/* FOOTER YEAR */

const copyrightText = document.querySelector(".footer-bottom span");

if (copyrightText) {

copyrightText.textContent =
`© ${new Date().getFullYear()} CERRITOS YACHT ANCHORAGE, INC.`;

}
