let timerDuration = 0.5 * 60; // 30 minutes in seconds
let reminderDuration = 0.1 * 60; // 3 minutes in seconds
let currentTime = timerDuration;
let reminderTime = reminderDuration;
let reminderTimeout;
let timerInterval;
let reminderInterval;
let beepSound = document.getElementById('beepSound');
let continuousBeepInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        currentTime--;
        updateTimerDisplay();

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            playBeep();
            startReminder();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateReminderDisplay() {
    let minutes = Math.floor(reminderTime / 60);
    let seconds = reminderTime % 60;
    document.getElementById('reminderTime').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playBeep() {
    beepSound.play();
}

function startReminder() {
    document.getElementById('reminderCountdown').classList.remove('hidden');
    reminderTime = reminderDuration;
    updateReminderDisplay();

    reminderInterval = setInterval(() => {
        reminderTime--;
        updateReminderDisplay();

        if (reminderTime <= 0) {
            clearInterval(reminderInterval);
            document.getElementById('reminderCountdown').classList.add('hidden');
            document.getElementById('finalWarningMessage').classList.remove('hidden');
            playContinuousBeep();
        }
    }, 1000);
}

function playContinuousBeep() {
    continuousBeepInterval = setInterval(() => {
        playBeep();
    }, 1000); // Beep every second
}

function stopContinuousBeep() {
    clearInterval(continuousBeepInterval);
}

function drinkWater() {
    clearInterval(timerInterval);
    clearTimeout(reminderTimeout);
    clearInterval(reminderInterval);
    stopContinuousBeep();
    document.getElementById('reminderCountdown').classList.add('hidden');
    document.getElementById('finalWarningMessage').classList.add('hidden');
    currentTime = timerDuration;
    updateTimerDisplay();
    startTimer();
    animateButton();
}

function animateButton() {
    const button = document.getElementById('drinkButton');
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

document.addEventListener('DOMContentLoaded', (event) => {
    startTimer();
});
