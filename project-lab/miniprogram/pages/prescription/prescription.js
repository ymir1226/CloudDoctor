// pages/prescription/prescription.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prescriptionList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstance = getApp()
    this.getPrescriptionList(appInstance.globalData.id)
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
   * 获取用户收藏医生列表
   */
  getPrescriptionList: function (id) {
    var that = this
    //请求医生列表
    wx.request({
      url: 'https://yiwei.run/api/prescription/getPrescriptionByPatientId',
      data: {
        id_patient: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data)
        let resp = res.data.data
        //异常处理
        that.setData(
          {
            prescriptionList: resp,
          }
        )
        if(that.data. prescriptionList.length==0){
          wx.showToast({
            title: '还没有建议哦，去发起咨询吧~',
            icon: 'none',
            duration: 5000
            })
        }
      }
    })
  },
  /**
     * 响应处方卡片点击事件
     */
  onClickPrescription: function (event) {
    console.log(event.currentTarget.dataset.id_inquiry)
    var inquiryid = event.currentTarget.dataset.id_inquiry
    wx.navigateTo({
      url: '/pages/reply/reply',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendData', inquiryid)
      }
    })
  }
})