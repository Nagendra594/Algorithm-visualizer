let genBtn = document.getElementById("gn_btn");
let srtBtn = document.getElementById("srt_btn");
let clrBtn = document.getElementById("cl_btn");
let container = document.getElementById("container");
let msg = document.querySelector(".sort__msg");
let num_of_boxes = document.querySelector("#user__num");
let time = 1200;
let slider = document.getElementById("slider");
slider.oninput = (e) => {
  let prog = document.getElementById("progress-bar");
  let value = e.target.value;
  time = (Number(value) * -1500) / 100 + 2000;
  prog.style.width = value + "%";
};

let colors = [
  "#475569",
  "#6b7280",
  "#78716c",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#ec4899",
  "#f43f5e",
  "#d946ef",
  "#020617",
  "#450a0a",
  "#1a2e05",
  "#164e63",
  "#701a75",
  "#881337",
];
genBtn.addEventListener("click", () => {
  container.innerHTML = "";
  let range = num_of_boxes.value;
  for (let i = 0; i < range; i++) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const color = colors[Math.floor(Math.random() * 23)];
    span.style.color = color;
    span.style.fontWeight = "800";
    span.style.fontSize = "2rem";
    div.style.backgroundImage = `linear-gradient(to top,${color} 50%,#fff 100%)`;
    div.classList.add("box");
    div.style.flex = "1fr";
    span.classList.add("num_value");
    span.innerHTML = Math.floor(Math.random() * 100) + 1;
    container.append(div);
    div.append(span);
    container.style.display = "flex";
    div.style.height = `${Number(span.innerHTML) * 4}px`;
  }
  srtBtn.removeAttribute("disabled");
  srtBtn.style.cursor = "pointer";
  msg.style.fontSize = "0";
});
let delay = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), time));
};
srtBtn.onclick = async function () {
  srtBtn.setAttribute("disabled", "true");
  genBtn.setAttribute("disabled", "true");
  clrBtn.setAttribute("disabled", "true");
  srtBtn.style.cursor = "not-allowed";
  genBtn.style.cursor = "not-allowed";
  clrBtn.style.cursor = "not-allowed";
  const num_value = document.querySelectorAll(".num_value");
  const Boxes = document.querySelectorAll(".box");
  let array_BOX = Array.from(Boxes);
  let array_val = Array.from(num_value);
  let len = array_BOX.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      let Box1 = array_BOX[j],
        Box2 = array_BOX[j + 1];
      Box1.style.transitionDuration = `${time}ms`;
      Box2.style.transitionDuration = `${time}ms`;
      if (Number(array_val[j].innerHTML) > Number(array_val[j + 1].innerHTML)) {
        let width = Box1.offsetWidth;
        Box2.style.transform = "translate(0px,-50px)";
        Box1.style.transform = "translate(0px,-50px)";
        await delay();
        Box1.style.transform = `translate(${width + 16}px,-50px)`;
        Box2.style.transform = `translate(-${width + 16}px,-50px)`;
        await delay();
        Box1.style.transform = `translate(${width + 16}px,0px)`;
        Box2.style.transform = `translate(-${width + 16}px,0px)`;
        await delay();
        Box1.style.transitionDuration = `0ms`;
        Box2.style.transitionDuration = `0ms`;
        Box1.style.transform = `translate(0px,0px)`;
        Box2.style.transform = `translate(0px,0px)`;
        Box2.after(Box1);
        await delay();
        array_BOX = Array.from(document.querySelectorAll(".box"));
        array_val = Array.from(document.querySelectorAll(".num_value"));
      } else {
        Box1.style.transform = "translate(0,-50px)";
        Box2.style.transform = "translate(0,-50px)";
        await delay();
        Box1.style.transform = "translate(0,0)";
        Box2.style.transform = "translate(0,0)";
        await delay();
      }
    }
  }
  msg.style.fontSize = "1.5rem";
  genBtn.removeAttribute("disabled");
  genBtn.style.cursor = "pointer";
  clrBtn.removeAttribute("disabled");
  clrBtn.style.cursor = "pointer";
};
clrBtn.addEventListener("click", () => {
  container.innerHTML = "";
  msg.style.fontSize = "0";
});
