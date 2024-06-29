const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

function update() {
  const currentYear = new Date().getFullYear();
  const newYear = new Date(`January 1 ${currentYear + 1} 00:00:00 `);
  /* ticks Symbol(shift+tab) */

  const currentDate = new Date();

  const diff = newYear - currentDate;
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);

  const h = Math.floor((diff / 1000 / 60 / 60) % 24);

  const m = Math.floor((diff / 1000 / 60) % 60);

  const s = Math.floor((diff / 1000) % 60);

  days.innerHTML = d < 10 ? "0" + d : d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;

  //console.log(d + " " + h + " " + m + " " + s);
}

setInterval(update, 1000);

/* 
 1000 ms = 1sec
 60sec = 1min
 60 min = 1 hr
 24 hrs = 1 day

*/
