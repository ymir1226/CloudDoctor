const app=getApp()
Page({
  data: {
   is_doctor: 0,
  },
  onLoad: function (options) {
    // 应该使用success: res => {} 从后端获取 userOrderId
    this.setData({
      is_doctor:app.globalData.is_doctor
    })
    
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
  },
  redirectToDoctorRegister:function(){
    wx.navigateTo({
      url: '/pages/doctorRegister/doctorRegister',
    })
  }
})