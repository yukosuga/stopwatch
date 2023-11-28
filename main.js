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
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = true;
};
const setButtonRunning = () => {
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = true;
};
const setButtonStopped = () => {
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = false;
};

setButtonInitial();

start.addEventListener("click", () => {
  setButtonRunning();
  startTime = Date.now();
  countUp();
});

stop.addEventListener("click", () => {
  setButtonStopped();
  clearTimeout(timeOutId);
  elapsedTime += Date.now() - startTime;
});

reset.addEventListener("click", () => {
  setButtonInitial();
  timer.textContent = "00:00.000";
  elapsedTime = 0;
});
