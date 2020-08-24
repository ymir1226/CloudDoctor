// pages/buyvip/buyvip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    generalExperts: {'availableTimes': 0, 'usedTimes': 0, 'totalTimes': 0},
    specialExperts: { 'availableTimes': 0, 'usedTimes': 0, 'totalTimes': 0 },
    additionInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从后端获取会员信息
    this.setData({
      generalExperts: { 'availableTimes': 5, 'usedTimes': 10, 'totalTimes': 15 },
      specialExperts: { 'availableTimes': 3, 'usedTimes': 2, 'totalTimes': 5 },
      additionInfo: '体检、基因检测、健康筛查、挂号...服务不在此处记录，每次购买对应商品后，客服将在五个工作日内线下联系您，并为您安排相关服务，更多信息详讯客服:138-xxxx-xxxx'
    });
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
})