Page({
  data: {
   
  },
  onLoad: function (options) {
    // 应该使用success: res => {} 从后端获取 userOrderId
    // this.setData({

    // })
  },


  // goChat: function (e) {
  //   wx.navigateTo({
  //     url: '/pages/room/room?id=' + this.data.userOrderId,
  //   })
  // },

  redirectToCollect:function(e){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  redirectToPatientList: function (e) {
    wx.navigateTo({
      url: '/pages/patientList/patientList',
    })
  },
  redirectToInquiryHistory: function (e) {
    wx.navigateTo({
      url: '/pages/inquiryHistory/inquiryHistory',
    })
  },
  redirectToChat: function (e) {
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },
  redirectToPrescription: function (e) {
    wx.navigateTo({
      url: '/pages/prescription/prescription',
    })
  }
})