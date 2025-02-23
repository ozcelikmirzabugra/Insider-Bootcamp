document.querySelector(".favorite-btn").addEventListener("click", function () {
  this.classList.toggle("active");
  const icon = this.querySelector("i");
  icon.classList.toggle("far");
  icon.classList.toggle("fas");
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
