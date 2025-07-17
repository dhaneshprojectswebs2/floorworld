const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});