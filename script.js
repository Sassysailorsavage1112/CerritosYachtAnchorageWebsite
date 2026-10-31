
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

  /* TESTIMONIAL SLIDER */

  const reviews = Array.from(
    document.querySelectorAll(".testimonial")
  );

  const previousButton = document.getElementById("previousReview");
  const nextButton = document.getElementById("nextReview");
  const reviewCount = document.getElementById("reviewCount");
  const testimonialSection = document.querySelector(".testimonials");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (!reviews.length) return;

  let currentReview = 0;
  let reviewTimer = null;
  let isPaused = reducedMotion.matches;

  const rotationDelay = 8000;

  function displayReview(index) {
    currentReview = (index + reviews.length) % reviews.length;

    reviews.forEach((review, position) => {
      const isActive = position === currentReview;

      review.classList.toggle("active", isActive);
      review.setAttribute("aria-hidden", String(!isActive));
    });

    if (reviewCount) {
      const current = String(currentReview + 1).padStart(2, "0");
      const total = String(reviews.length).padStart(2, "0");

      reviewCount.textContent = `${current} / ${total}`;
    }
  }

  function stopReviewTimer() {
    if (reviewTimer !== null) {
      clearInterval(reviewTimer);
      reviewTimer = null;
    }
  }

  function startReviewTimer() {
    stopReviewTimer();

    if (isPaused || reviews.length < 2) return;

    reviewTimer = setInterval(() => {
      displayReview(currentReview + 1);
    }, rotationDelay);
  }

  function pauseReviews() {
    isPaused = true;
    stopReviewTimer();
  }

  function resumeReviews() {
    isPaused = false;
    startReviewTimer();
  }

  function moveReview(direction) {
    displayReview(currentReview + direction);
    startReviewTimer();
  }

  /* INITIALIZE */

  displayReview(0);
  startReviewTimer();

  /* PREVIOUS AND NEXT ARROWS */

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      moveReview(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      moveReview(1);
    });
  }

  /* PAUSE WHILE THE USER HOVERS OR USES THE CONTROLS */

  if (testimonialSection) {
    testimonialSection.addEventListener("mouseenter", pauseReviews);
    testimonialSection.addEventListener("mouseleave", resumeReviews);

    testimonialSection.addEventListener("focusin", pauseReviews);

    testimonialSection.addEventListener("focusout", event => {
      if (!testimonialSection.contains(event.relatedTarget)) {
        resumeReviews();
      }
    });
  }

  /* RESPECT REDUCED-MOTION SETTINGS */

  reducedMotion.addEventListener("change", event => {
    if (event.matches) {
      pauseReviews();
    } else {
      resumeReviews();
    }
  });
});
