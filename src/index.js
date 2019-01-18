const axios = require("axios").default;
const { $, $$ } = require("./selector");
const swipeup = require("./swipUp");
const getWechatInfo = require("./getWechatInfo");
const store = require("./store");
require("./styles/index.css");

window.onload = () => {
  getWechatInfo(entry);
};

// 获取微信登录后的操作
function entry({ nickname, headimgurl, unionid }) {

  $(".headimg").forEach(el => el.src = headimgurl);

  $(".p3 .img-btn").forEach(el => {
    el.addEventListener("touchend", () => {
      if (el.dataset.value === "custom") {
        const party = $$("#party-input").value;
        if (party.trim() === "") return;
        store.party = party;
        $$(".party-name").innerText = store.party;
        axios.post("https://server.wenliaokeji.com/share/table/create", { unionId: unionid, nickname: nickname, headImage: headimgurl, name: store.party }).then(res => {
          next();
        });
      } else {
        store.party = el.dataset.value;
        $$(".party-name").innerText = store.party;
        axios.post("https://server.wenliaokeji.com/share/table/create", { unionId: unionid, nickname: nickname, headImage: headimgurl, name: store.party }).then(res => {
          next();
        });
      }
    })
  });

  swipeup(".wrap", (focus) => {
    if (curIndex === 2) return;
    next();
  });
}

let curIndex = 0;
const stageEls = $(".stage");

function next() {
  if (curIndex < stageEls.length - 1) curIndex++;
  stageEls[curIndex].style.opacity = 1;
  stageEls[curIndex].style.zIndex = 1;
  stageEls[curIndex].classList.add("activity");
}