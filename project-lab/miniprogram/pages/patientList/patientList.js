// pages/patientList/patientList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  patientList:[],
  modalHidden: true,
  currentPatientId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPatientByAuthor(1)
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

  modalTap: function (e) {
    console.log(e)
    this.setData({
      modalHidden: false,
      currentPatientId: e.currentTarget.dataset.patientid
    })
  },
  /**
   * 收起弹窗
   */
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  /**
   * 添加病历
  */
  addPatient: function(e){
    wx.navigateTo({
      url: '/pages/editPatient/editPatient',
    })
  },

  /**
   * 编辑病历
  */
  editPatient: function (event) {
    console.log(event)
    let patientid = event.currentTarget.dataset.patientid
    wx.navigateTo({
      url: '/pages/editPatient/editPatient',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendData', patientid)
      }
    })

  },
  

  /**
   * 删除病历
  */
  deletePatient: function (event) {
    console.log(this.data.currentPatientId)
    let patientid = this.data.currentPatientId
    var that = this
    //删除病人信息
    wx.request({
      url: 'https://yiwei.run/api/patient/deletePatient',
      data: {
        id: patientid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data)
        that.setData({
          modalHidden: true
        })
        that.onLoad();//刷新页面
      }
    })
  },

  /**
   * 获取病历
  */
  getPatientByAuthor: function (author) {
    var that = this;
    //请求病人信息
    wx.request({
      url: 'https://yiwei.run/api/patient/getPatientByAuthor',
      data: {
        author_id: author,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data)
        //todo:异常处理
        that.setData(
          {
            patientList:res.data.data
          }
        )
      }
    })
  }
})