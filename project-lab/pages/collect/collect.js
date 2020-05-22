// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectDoctorList(1)
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
  getCollectDoctorList: function (userid) {
    var that = this
    //请求医生列表
    wx.request({
      url: 'http://119.45.143.38:80/api/collect/getCollectByUid',
      data: {
        uid: userid,
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
            doctorList: resp,
          }
        )
      }
    })
  },
  
  /**
     * 响应取消收藏按钮点击事件
     */
  onClickCancelCollect: function (event) {
    this.deleteCollect(event.currentTarget.dataset.id)
    this.getCollectDoctorList(1)
  },

  /**
     * 取消收藏
     */
  deleteCollect: function (collect_id) {
    var that = this
    //请求医生列表
    wx.request({
      url: 'http://119.45.143.38:80/api/collect/deleteCollect',
      data: {
        id: collect_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data)
      }
    })
  }
})