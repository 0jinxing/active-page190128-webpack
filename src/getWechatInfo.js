const axios = require("axios").default;
const store = require("./store");

const getWechatInfo = (cb) => {

  axios.get(`https://api.wenliaokeji.com/wechat?url=${encodeURIComponent(location.href.split('#')[0])}`).then(res => {
    const { appId, timestamp, nonceStr, signature, } = res.data;
    wx.config({
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名
      jsApiList: ['updateAppMessageShareData',
        'updateTimelineShareData',
        "onMenuShareAppMessage",
        "onMenuShareTimeline"
      ]
    });
  });

  const search = new URLSearchParams(location.search);
  const code = search.get("code");
  const appid = "wx37434a8957180abe";
  const secret = "1ffec864e21e6a0dc23e0d23f4925777";
  const accessUrl = "https://bird.ioliu.cn/v2?url="
  axios.get(`${accessUrl}https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`)
    .then(res => {
      const { access_token, openid } = res.data;
      return axios.get(`${accessUrl}https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`);
    }).then(res => {
      const { nickname, headimgurl, unionid } = res.data;
      Reflect.set(store, "nickname", nickname);
      Reflect.set(store, "headimgurl", headimgurl);
      Reflect.set(store, "unionid", unionid);
      cb({ nickname, headimgurl, unionid });
    })
}

module.exports = getWechatInfo;