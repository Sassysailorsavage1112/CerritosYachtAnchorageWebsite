"use strict";

document.addEventListener("DOMContentLoaded", () => {

const body = document.body;

const settingsButton =
document.getElementById("settings-button");

const settingsContent =
document.getElementById("settings-content");

const darkMode =
document.getElementById("dark-mode");

const contrastMode =
document.getElementById("contrast-mode");

const motionMode =
document.getElementById("motion-mode");

const toast =
document.getElementById("toast");


// =================================
// SETTINGS PANEL
// =================================

settingsButton.addEventListener("click", () => {

const expanded =
settingsButton.getAttribute("aria-expanded")
=== "true";

settingsButton.setAttribute(
"aria-expanded",
String(!expanded)
);

settingsContent.hidden = expanded;

});


// =================================
// PERSISTENT USER PREFERENCES
// =================================

function loadPreferences() {

darkMode.checked =
localStorage.getItem("darkMode") === "true";

contrastMode.checked =
localStorage.getItem("contrastMode") === "true";

motionMode.checked =
localStorage.getItem("motionMode") === "true";

applyPreferences();

}


function applyPreferences() {

body.classList.toggle(
"dark-mode",
darkMode.checked
);

body.classList.toggle(
"high-contrast",
contrastMode.checked
);

body.classList.toggle(
"reduce-motion",
motionMode.checked
);

localStorage.setItem(
"darkMode",
darkMode.checked
);

localStorage.setItem(
"contrastMode",
contrastMode.checked
);

localStorage.setItem(
"motionMode",
motionMode.checked
);

}


[darkMode, contrastMode, motionMode]
.forEach(toggle => {

toggle.addEventListener(
"change",
applyPreferences
);

});


// =================================
// MOBILE NAVIGATION
// =================================

const menuButton =
document.querySelector(".menu-toggle");

const navigation =
document.getElementById("navigation");


menuButton.addEventListener("click", () => {

const open =
navigation.classList.toggle("open");

menuButton.setAttribute(
"aria-expanded",
String(open)
);

menuButton.textContent =
open ? "✕" : "☰";

});


navigation.querySelectorAll("a").forEach(link => {

link.addEventListener("click", () => {

navigation.classList.remove("open");

menuButton.setAttribute(
"aria-expanded",
"false"
);

menuButton.textContent = "☰";

});

});


// =================================
// SCROLL PROGRESS
// =================================

const progressBar =
document.getElementById("progress-bar");

const backToTop =
document.getElementById("back-to-top");


function updateScroll() {

const scrollable =
document.documentElement.scrollHeight -
window.innerHeight;

const progress =
scrollable > 0
? (window.scrollY / scrollable) * 100
: 0;

progressBar.style.width =
`${progress}%`;

backToTop.classList.toggle(
"visible",
window.scrollY > 400
);

}


window.addEventListener(
"scroll",
updateScroll,
{ passive: true }
);


backToTop.addEventListener("click", () => {

window.scrollTo({
top: 0,
behavior: motionMode.checked
? "instant"
: "smooth"
});

});


// =================================
// ANIMATED COUNTERS
// =================================

const counters =
document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
entries => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

const counter = entry.target;

const target =
Number(counter.dataset.target);

const duration = 1600;

const start = performance.now();

function animate(now) {

const elapsed = now - start;

const progress = Math.min(
elapsed / duration,
1
);

const eased =
1 - Math.pow(1 - progress, 4);

counter.textContent =
Math.floor(target * eased).toLocaleString();

if (progress < 1) {

requestAnimationFrame(animate);

} else {

counter.textContent =
target.toLocaleString();

}

}

if (motionMode.checked) {

counter.textContent =
target.toLocaleString();

} else {

requestAnimationFrame(animate);

}

observer.unobserve(counter);

});

},
{ threshold: 0.5 }
);


counters.forEach(counter => {
observer.observe(counter);
});


// =================================
// TOAST NOTIFICATIONS
// =================================

let toastTimer;

function showToast(message) {

toast.textContent = message;

toast.classList.add("visible");

clearTimeout(toastTimer);

toastTimer = setTimeout(() => {

toast.classList.remove("visible");

}, 3500);

}


// =================================
// CONTACT FORM
// =================================

const form =
document.getElementById("contact-form");


form.addEventListener("submit", event => {

event.preventDefault();

if (!form.reportValidity()) return;

const name =
form.elements.name.value.trim();

const email =
form.elements.email.value.trim();

const service =
form.elements.service.value;

const message =
form.elements.message.value.trim();


const subject = encodeURIComponent(
`Website Inquiry: ${service}`
);

const body = encodeURIComponent(

`Hello Cerritos Yacht Anchorage,

My name is ${name}.

Email: ${email}

Interested in: ${service}

Message:
${message}

Thank you.`

);


showToast("Preparing your email inquiry...");


window.location.href =
`mailto:contact@cerritosyacht.com?subject=${subject}&body=${body}`;

});


// =================================
// INITIALIZE
// =================================

loadPreferences();

updateScroll();

});
