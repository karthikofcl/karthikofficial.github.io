let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrls = document.getElementById("ctrl-icon");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrls.classList.contains("fa-pause")) {
    song.pause();
    ctrls.classList.remove("fa-pause");
    ctrls.classList.add("fa-play");
  } else {
    song.play();
    ctrls.classList.remove("fa-play");
    ctrls.classList.add("fa-pause");
  }
}
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrls.classList.remove("fa-play");
  ctrls.classList.add("fa-pause");
};

song.addEventListener("ended", function () {
  alert("Thanks for listening!");
});
