//your JS code here. If required.

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector('.video');
    const soundPickerButtons = document.querySelectorAll('.sound-picker button');
    const playButton = document.querySelector('.play');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelectButtons = document.querySelectorAll('.time-select button');
    let audio = new Audio('Sounds/beach.mp3');
    let duration = 600; // Default duration: 10 minutes
    let timer;

    // Play/Pause functionality
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            video.play();
            playButton.textContent = "Pause";
            startTimer();
        } else {
            audio.pause();
            video.pause();
            playButton.textContent = "Play";
            clearInterval(timer);
        }
    });

    // Sound and video switch functionality
    soundPickerButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(timer);
            audio.pause();
            video.pause();
            playButton.textContent = "Play";
            audio.src = button.getAttribute('data-sound');
            video.src = button.getAttribute('data-video');
            audio.currentTime = 0;
            video.currentTime = 0;
        });
    });

    // Timer selection functionality
    timeSelectButtons.forEach(button => {
        button.addEventListener('click', () => {
            duration = parseInt(button.getAttribute('data-time'));
            updateTimeDisplay(duration);
            clearInterval(timer);
            audio.pause();
            video.pause();
            playButton.textContent = "Play";
        });
    });

    function startTimer() {
        let currentTime = duration;
        updateTimeDisplay(currentTime);

        timer = setInterval(() => {
            currentTime--;
            updateTimeDisplay(currentTime);
            if (currentTime <= 0) {
                clearInterval(timer);
                audio.pause();
                video.pause();
                playButton.textContent = "Play";
            }
        }, 1000);
    }

    function updateTimeDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
