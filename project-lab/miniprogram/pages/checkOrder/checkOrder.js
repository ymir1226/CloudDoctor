// miniprogram/pages/checkOrder/checkOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 确认支付
   */
  payForChat: function(){
    console.log("pay...")
     //预支付
 wx.request({
  url: 'https://yiwei.run/api/chatorder/addChatOrder', 
  data: {
   id_patient:1,
   id_doctor:1,
   patient_openid:"olNFt5WTT2m0YRK2SdXtGz3Mv2mA"
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  method: 'POST',
  success(res) {
    console.log("response...")
    console.log(res.data)
    var prePayInfo=res.data.prePayInfo
    // 调起支付
    wx.requestPayment(
    {
      'timeStamp': prePayInfo.timeStamp,
      'nonceStr': prePayInfo.nonceStr,
      'package': prePayInfo.package,
      'signType': 'MD5',
      'paySign': prePayInfo.paySign,
      'success': function (res) {
        console.log(res)
       },
      'fail': function (res) {
        console.log(res)
       }
    })
  },
  fail(res){
    console.log("response...")
    console.log(res.data)
  },
})
   }
  
})