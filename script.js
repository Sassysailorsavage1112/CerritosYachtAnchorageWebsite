const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

if (menuButton && nav) {
menuButton.addEventListener('click', () => {
const open = nav.classList.toggle('open');

menuButton.setAttribute('aria-expanded', String(open));
menuButton.setAttribute(
'aria-label',
open ? 'Close navigation' : 'Open navigation'
);
});

nav.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => {
nav.classList.remove('open');
menuButton.setAttribute('aria-expanded', 'false');
});
});
}

const reviews = [
{
author: 'John B.',
quote: 'The most honest and friendliest shop, Mike is an awesome guy very thorough and will work with your time and budget. They are on time with their schedules, he gave me so much advise for my boat and he personally drove me to my slip on a Saturday. He goes above and beyond. Don’t hesitate to talk to him and he will get the job done.'
},
{
author: 'Jason B.',
quote: 'I had to put in a transducer in my boat and my expeirence from start to finish was excellent. The secretary (Kendal) was very informative and answered all my questions and concerns. I brought the boat in and they did a clean professional job. I would use them again without question. Lupe and his brother were always there to answer any questions or lend a hand when I needed it. Five star’s for a little mom and pop boat yard.'
},
{
author: 'TlW F.',
quote: 'I Had Eddies haul out my 35 sailboat to do a bottom job, replace thru hulls, ball valves and install a tranducer. All i can say about Eddies marine is that they are the best and most honest boat yard in the Long Beach area. Lupe and his crew did a perfect job, on time and correct. The final cost was right on target from the bid Mike the owner origannaly quoted me. I did have them do a few other things and all of the extras although not in my original bid were priced very fair. Thanks Mike, Lupe and the crew at Eddys for renewing my faith in the boating community that you can still get high quality work done at honest and fair price on boats in the LA Area.'
},
{
author: 'El Chop O.',
quote: 'Very happy with the service i received. mike is a great person and easy to work with. i am in the process of restoring my 1976 uniflite sport fisher…when it comes to boat repairs you definitely get what you pay for, this shipyard performs quality work at a fair price. the marina is well maintained and i received a great slip here. happy to find this place and great front office service as well. highly recommend!'
},
{
author: 'Collins R.',
quote: 'I love this marina, they are very professional and down to earth. Security is great, you couldn’t ask for nicer people who understand boats and the challenges that can arise out of nowhere, when owning a boat. I highly recommend Cerritos Yacht Anchorage, two big thumbs, Way, Way up!!!'
}
];

let index = 0;

const quote = document.querySelector('#review-quote');
const author = document.querySelector('#review-author');
const number = document.querySelector('#review-index');

function showReview() {
quote.textContent = reviews[index].quote;
author.textContent = reviews[index].author;
number.textContent = String(index + 1).padStart(2, '0');
}

document.querySelector('#prev')?.addEventListener('click', () => {
index = (index - 1 + reviews.length) % reviews.length;
showReview();
});

document.querySelector('#next')?.addEventListener('click', () => {
index = (index + 1) % reviews.length;
showReview();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const toggle = document.querySelector('#effect-toggle');
const layer = document.querySelector('#confetti-layer');

let timer;

function burst() {
const p = document.createElement('i');

p.className = 'confetti-piece';
p.style.left = Math.random() * 100 + '%';
p.style.setProperty('--drift', (Math.random() * 150 - 75) + 'px');
p.style.setProperty('--duration', (2.5 + Math.random() * 2) + 's');

p.style.background = [
'#b58c52',
'#dfc38f',
'#f2efe7',
'#587b82'
][Math.floor(Math.random() * 4)];

layer.appendChild(p);

setTimeout(() => p.remove(), 5000);
}

toggle?.addEventListener('click', () => {
const on = toggle.getAttribute('aria-pressed') !== 'true';

toggle.setAttribute('aria-pressed', String(on));
toggle.querySelector('b').textContent = on ? 'On' : 'Off';

if (on) {
for (let i = 0; i < 18; i++) {
setTimeout(burst, i * 65);
}

timer = setInterval(burst, 850);
} else {
clearInterval(timer);
layer.replaceChildren();
}
});
