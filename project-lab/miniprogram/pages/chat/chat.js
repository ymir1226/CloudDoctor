// pages/chat/chat.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    val: '',
    // orderList: [{ name: '吴医生', src: 'http://img1.imgtn.bdimg.com/it/u=105692044,3597038919&fm=27&gp=0.jpg', cue: '血糖控制异常', heart: 1 }, { name: '张医生', src: 'http://img1.imgtn.bdimg.com/it/u=105692044,3597038919&fm=27&gp=0.jpg', heart: 1 }],
    orderList: [],
    toView: 1
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getChatRooms()
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
   * 获取订单列表
   */
  getChatRooms:function()
  {
    var that = this
    //请求医生列表
    wx.request({
      // url: 'http://119.45.143.38:80/api/chatorder/getChatOrderByPatientId',
      url: 'http://localhost:8000/api/chatorder/getChatOrderByPatientId',
      data: {
        // id_patient: app.globalData.id
        id_patient: 2
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
            orderList: resp,
          }
        )
      }
    })
  },
  /**
   * 跳转至对应聊天界面
   */
  redirectToChatRoom: function (event) {
    console.log(event.currentTarget.dataset.groupid)
    var groupid = event.currentTarget.dataset.groupid
    //var doctorinfo = {group_id:groupid,}
    wx.navigateTo({
      url: '/pages/room/room',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        //res.eventChannel.emit('sendData', roomid)
        res.eventChannel.emit('sendData', groupid)
      }
    })
  },

})