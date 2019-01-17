require("./styles/index.css");
const { $ } = require("./selector");
const swipeup = require("./swipUp");

const stageEls = $(".stage");
let curIndex = 0;

swipeup(".wrap", () => {
  if (curIndex < stageEls.length - 1) curIndex++;
  stageEls[curIndex].style.opacity = 1;
  stageEls[curIndex].style.zIndex = 1;
  stageEls[curIndex].classList.add("activity");
});