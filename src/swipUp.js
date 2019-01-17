const { $$ } = require("./selector");
/**
 * 监听上划操作
 * @param {String} selector 
 * @param {Function} fn 
 */
const swipUp = (selector, fn) => {
  const el = $$(selector);
  // touchstart
  // touchend
  let startX = 0;
  let startY = 0;
  el.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  });
  el.addEventListener("touchend", (e) => {
    e.preventDefault();
    const spanX = e.changedTouches[0].pageX - startX;
    const spanY = e.changedTouches[0].pageY - startY;
    if (spanY < 0 && Math.abs(spanX) < Math.abs(spanY) && Math.abs(spanY) > 40) {
      fn && fn(e);
    }
  });
}

module.exports = swipUp;