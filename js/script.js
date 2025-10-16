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
document.addEventListener('DOMContentLoaded', function() {
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-input');
    const captchaError = document.getElementById('captcha-error');
    const submitButton = document.getElementById('submit-button');
    const contactForm = document.querySelector('.contact-form');

    let expectedAnswer;

    /**
     * Generates a simple addition CAPTCHA.
     */
    function generateCaptcha() {
        // Generate two random numbers between 1 and 9
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        
        expectedAnswer = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
        captchaInput.value = ''; // Clear previous input
        captchaInput.focus();
        submitButton.disabled = true; // Keep button disabled until solved
        captchaError.textContent = '';
    }

    /**
     * Checks the user's CAPTCHA answer.
     */
    function checkCaptcha() {
        const userAnswer = parseInt(captchaInput.value, 10);
        
        if (userAnswer === expectedAnswer) {
            // Correct answer
            submitButton.disabled = false;
            captchaError.textContent = 'Captcha solved!';
            captchaError.style.color = '#5cb85c'; // A green color for success
        } else {
            // Incorrect answer
            submitButton.disabled = true;
            captchaError.textContent = 'Incorrect answer. Please try again.';
            captchaError.style.color = '#d9534f'; // Red for error
        }
    }

    // Initialize the CAPTCHA when the page loads
    generateCaptcha();

    // Re-generate CAPTCHA on focus (in case the user leaves the field without solving)
    captchaInput.addEventListener('focus', function() {
        // Only regenerate if the button is still disabled and the field is empty
        if (submitButton.disabled && captchaInput.value === '') {
            generateCaptcha();
        }
    });

    // Check the CAPTCHA whenever the user types
    captchaInput.addEventListener('input', checkCaptcha);

    // Re-generate and disable button on form submission (in case the user edits it after solving)
    contactForm.addEventListener('submit', function(e) {
        // Final check on submit
        if (parseInt(captchaInput.value, 10) !== expectedAnswer) {
            e.preventDefault(); // Stop the form from submitting
            captchaError.textContent = 'Please solve the Captcha correctly before submitting.';
            captchaError.style.color = '#d9534f';
            // Optionally, re-generate a new puzzle
            setTimeout(generateCaptcha, 1500); 
        }
    });
});
