// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorid:1,
    isPickerRender: false,
    isPickerShow: false,
    startTime: "2020-05-20 12:32:44",
    endTime: "2020-05-20 14:32:44",
    pickerConfig: {
      endDate: true,
      column: "second",
      dateLimit: true,
      initStartTime: "2020-05-20 12:32:44",
      initEndTime: "2020-05-20 14:32:44",
      limitStartTime: "2015-05-06 12:32:44",
      limitEndTime: "2055-05-06 12:32:44"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    var that = this
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('sendData', data => {
      that.setData({
        doctorid: data
      });
      console.log(that.data.doctorid, ' from doctorList');
      this.getScheduleByDoctorId(that.data.doctorid)
    })

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
   * 获取医生排班表
   */
  getScheduleByDoctorId: function () {

  },
   /**
   * 时间选择器
   */
  pickerShow: function () {
    this.setData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function () {
    this.setData({
      isPickerShow: false,
      chartHide: false
    });
  },
  bindPickerChange: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    console.log(this.data.sensorList);

    this.getData(this.data.sensorList[e.detail.value].id);
    // let startDate = util.formatTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7));
    // let endDate = util.formatTime(new Date());
    this.setData({
      index: e.detail.value,
      sensorId: this.data.sensorList[e.detail.value].id
      // startDate,
      // endDate
    });
  },
  setPickerTime: function (val) {
    console.log(val);
    let data = val.detail;
    this.setData({
      startTime: data.startTime,
      endTime: data.endTime
    });
  },
   /**
   * 支付诊费按钮响应事件
   */
  payForChat:function()
  {
    this.addChatOrder()
  },
  /**
   * 发起订单
   */
  addChatOrder : function(){
    
    var that = this
    //添加订单
    // wx.request({
    //   url: 'http://localhost:8000/api/chatorder/addChatOrder',
    //   data: {
    //     price:2,
    //     id_patient:2,
    //     id_doctor:2,
    //     patient_openid:"ozQ6_4qgR8emn3uCrSABUCFGt24k",
    //     doctor_openid:"ozQ6_4ppwIxQiIAk-UDfjlDP7Fqk",
    //     state:0,
    //     doctor_name:"钟医生"
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: 'POST',
    //   success(res) {
    //     console.log(res.data.data)
    //     let resp = res.data.data
    //     //异常处理
    //     that.setData(
    //       {
           
    //       }
    //     )
    //   }
    // })

    // 订单支付成功后，发推送：
  }

})