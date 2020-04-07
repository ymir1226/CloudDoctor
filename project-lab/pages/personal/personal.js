Page({
  data: {
    userOrderId: null,
  },
  onLoad: function (options) {
    // 应该使用success: res => {} 从后端获取 userOrderId
    this.setData({
      userOrderId: "a3510731313",
    })
  },
  goChat: function (e) {
    wx.navigateTo({
      url: '/pages/room/room?id=' + this.data.userOrderId,
    })
  },
})