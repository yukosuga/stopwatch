const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;
let timeOutId;
let elapsedTime = 0;

const countUp = () => {
  const d = new Date(Date.now() - startTime + elapsedTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");

  timer.textContent = `${m}:${s}.${ms}`;

  timeOutId = setTimeout(() => {
    countUp();
  }, 10);
};

const setButtonInitial = () => {
  start.classList.remove("inactive");
  stop.classList.add("inactive");
  reset.classList.add("inactive");
};
const setButtonRunning = () => {
  start.classList.add("inactive");
  stop.classList.remove("inactive");
  reset.classList.add("inactive");
};
const setButtonStopped = () => {
  start.classList.remove("inactive");
  stop.classList.add("inactive");
  reset.classList.remove("inactive");
};

setButtonInitial();

start.addEventListener("click", () => {
  if (start.classList.contains("inactive") === true) {
    return;
  }
  setButtonRunning();
  startTime = Date.now();
  countUp();
});

stop.addEventListener("click", () => {
  if (stop.classList.contains("inactive") === true) {
    return;
  }
  setButtonStopped();
  clearTimeout(timeOutId);
  elapsedTime += Date.now() - startTime;
});

reset.addEventListener("click", () => {
  if (reset.classList.contains("inactive") === true) {
    return;
  }
  setButtonInitial();
  timer.textContent = "00:00.000";
  elapsedTime = 0;
});
