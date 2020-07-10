// pages/inquiryHistory/inquiryHistory.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inquiryList: [],
    picurlList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstance = getApp()
    this.getInquiryListById(appInstance.globalData.id)
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
   * 获取问诊列表
  */
  getInquiryListById: function (id) {
    var that = this;
    //请求问诊信息
    wx.request({
      //url: 'http://119.45.143.38:80/api/inquiry/getInquiryByPatientId',
      url: 'http://localhost:8080/api/inquiry/getInquiryByPatientId',
      data: {
      id_user: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data)
        let resp=res.data.data
        for(var t in resp)
        {
          let display_time = resp[t].created_at
          let year = display_time.substring(0,4)+"年"
          let month = display_time.substring(5,7) + "月"
          let day = display_time.substring(8,10) + "日"
          let hour_minute = display_time.substring(11, 16)
          resp[t].created_at=year+month+day+"  "+hour_minute
        }
        //todo:异常处理
        that.setData(
          {
            inquiryList: res.data.data
          }
        )
        
      }
    })
  },

    /**
     * 响应问诊卡片点击事件
     */
    onClickInquiry: function (event) {
    console.log(event.currentTarget.dataset.id)
    var inquiryid = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/reply/reply',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendData', inquiryid)
      }
    })
  },
   
  
})