//your JS code here. If required.

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector('.video');
    const soundPicker = document.querySelectorAll('.sound-picker button');
    const playButton = document.querySelector('.play');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelectButtons = document.querySelectorAll('.time-select button');

    let audio = new Audio('Sounds/beach.mp3');
    let duration = 600; // Default duration in seconds

    // Play/Pause Button Functionality
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

    // Change Sound and Video
    soundPicker.forEach(button => {
        button.addEventListener('click', function() {
            audio.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            audio.play();
            video.play();
            playButton.textContent = "Pause";
            clearInterval(timer);
            startTimer();
        });
    });

    // Timer Functionality
    let timer;
    function startTimer() {
        let currentTime = duration;
        timeDisplay.textContent = formatTime(currentTime);

        timer = setInterval(() => {
            currentTime--;
            timeDisplay.textContent = formatTime(currentTime);
            if (currentTime<=0) {
                clearInterval(timer);
                audio.pause();
                video.pause();
                playButton.textContent = "Play";
            }
        }, 1000);
    }

    timeSelectButtons.forEach(button => {
        button.addEventListener('click', function() {
            duration = parseInt(this.getAttribute('data-time'));
            timeDisplay.textContent = formatTime(duration);
        });
    });

    function formatTime(time) {
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        return `${minutes}:${seconds<10 ? '0':''}${seconds}`;
    }
});
