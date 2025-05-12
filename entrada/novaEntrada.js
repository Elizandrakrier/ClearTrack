document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    let countdown = 3;

    const redirect = () => {
        window.location.href = '../lancamentos/lancamentos.html';
    };

    const updateCountdown = () => {
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            redirect();
        } else {
            countdown--;
            setTimeout(updateCountdown, 1000);
        }
    };

    updateCountdown();
});