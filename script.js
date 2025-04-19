const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
  }
});

function setTime() {
  const time = new Date();
  // console.log(time);
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const hoursForClock = hours % 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  const smoothSeconds = seconds + milliseconds / 1000;
  const smoothMinutes = minutes + smoothSeconds / 60;
  const smoothHours = hoursForClock + smoothMinutes / 60;

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    smoothHours,
    0,
    11,
    0,
    360
  )}deg)`;

  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    smoothMinutes,
    0,
    59,
    0,
    360
  )}deg)`; //in this 59 is the minutes and 360 is the degree for each and everyone

  secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    smoothSeconds,
    0,
    59,
    0,
    360
  )}deg)`;

  timeEl.innerHTML = `${hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } / ${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;

  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class='circle'>${date} `;
}
const scale = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

//stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

setTime();

function animate() {
  setTime();
  requestAnimationFrame(animate);
}

animate();
