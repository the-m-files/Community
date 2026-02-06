
const navbar = document.getElementById("navbar");
const header = document.getElementById("header-bkg");

// Use explicit threshold for scroll
const threshold = header.offsetHeight; // navbar becomes opaque after header

window.addEventListener("scroll", () => {
  if(window.scrollY >= threshold) {
    navbar.classList.add("scrolled"); // opaque
  } else {
    navbar.classList.remove("scrolled"); // transparent
  }
});

