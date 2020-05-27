// pages/doctorList/doctorList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'',
    doctorList:[],
    typeArray:[
      {type:'心内科'},
      {type:'儿科'},
      {type:'眼科'},
      {type:'妇科'},
      {type:'骨科'},
      {type:'呼吸科'},
      {type:'消化科'},
      {type:'皮肤科'}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDoctorByDepartment('心内科');
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
   * 按科室获取医生列表
   */
  getDoctorByDepartment: function(type){
    var that = this
    //请求医生列表
    wx.request({
      url: 'http://119.45.143.38:80/api/doctor/getDoctorByDepartment',
      data: {
        department: type,
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
   * 响应点击左侧科室列表点击事件
   */
  onClickDepartment: function (event) {
    console.log(event.currentTarget.dataset.departmentname)
    var type = event.currentTarget.dataset.departmentname
    this.getDoctorByDepartment(type)
  },

  /**
       * 获取输入框输入
       */
  bindSearch: function (e) {
    // console.log(e.detail.value)
    this.setData({
      search:e.detail.value
    })
  },

  /**
     * 响应搜索点击事件
     */
  onClickSearch: function (event) {
    console.log(this.data.search)
    this.getDoctorByDepartment(this.data.search)
  },

  /**
     * 响应咨询按钮点击事件
     */
  onClickConsult: function (event) {
    console.log(event.currentTarget.dataset.doctorid)
    var doctorid = event.currentTarget.dataset.doctorid
    wx.navigateTo({
      url: '/pages/doctorHome/doctorHome',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendData', doctorid)
      }
    })
  }
})