const wrapper = document.querySelector(".wrapper"),
  playPauseBtn = wrapper.querySelector("#play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressBar = wrapper.querySelector(".progress-bar"),
  progressArea = wrapper.querySelector(".progress-area"),
  currentTimeEl = wrapper.querySelector(".current-time"),
  maxDurationEl = wrapper.querySelector(".max-duration"),
  menuBtn = wrapper.querySelector("#menu-btn"),
  menu = wrapper.querySelector("#menu");

// Play/Pause button event
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});

const playMusic = () => {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").className = "fas fa-pause";
  mainAudio.play();
};

const pauseMusic = () => {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").className = "fas fa-play";
  mainAudio.pause();
};

// Update progress bar
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");

  mainAudio.addEventListener("loadeddata", () => {
    // Update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      // adding 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // Update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    // adding 0 if sec is less than 10
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Update progress bar width on click
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth; // getting width of progress bar
  let clickedOffsetX = e.offsetX; // getting offset x value
  let songDuration = mainAudio.duration; // getting song total duration

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); // play the music
});

// Song ends event
mainAudio.addEventListener("ended", () => {
  playPauseBtn.querySelector("i").className = "fas fa-play";
  progressBar.style.width = `0%`;
  currentTimeEl.innerText = `0:00`;
  maxDurationEl.innerText = `0:00`;
});

// Seek forward and backward by a few seconds
prevBtn.addEventListener("click", () => {
  mainAudio.currentTime -= 10; // Go back by 10 seconds
});

nextBtn.addEventListener("click", () => {
  mainAudio.currentTime += 10; // Go forward by 10 seconds
});

// Toggle menu visibility
menuBtn.addEventListener("click", () => {
  menu.style.display =
    menu.style.display === "none" || menu.style.display === ""
      ? "block"
      : "none";
});

// Change song when clicking on a menu item
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const audioSrc = e.target.getAttribute("data-audio");
    const songTitle = e.target.getAttribute("data-title");
    const songArtist = e.target.getAttribute("data-artist");

    mainAudio.src = audioSrc;
    wrapper.querySelector(".name").innerText = songTitle;
    wrapper.querySelector(".artist").innerText = songArtist;
    playMusic();
    menu.style.display = "none";
  }
});
