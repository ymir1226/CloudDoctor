// pages/schedule/schedule.js
const TmplId = '4SnZohkpw5KAM4rxZYUrUl1TDncs9-RexIfgsNoFIwo';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /***********time picker */
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
    },
    //************推送数据 */
    userOrderId: "a3510731313",
    item: {
      "thing1": {
        "value": "X医生的咨询"
      },
      "thing3": {
        "value": "请在X个工作日以内进入聊天室咨询"
      },//推送文案： 预约时间：this.data.startTime - this.data.endTime
      "character_string5": {
        "value": "a3510731313"
      }
    },
    //********订单数据 */
    groupid:"lEbXFYvNgv",
    patient_openid:"ozQ6_4qgR8emn3uCrSABUCFGt24k",
    doctor_openid:"ozQ6_4ppwIxQiIAk-UDfjlDP7Fqk",
    doctor_name:"钟医生",
    
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
     // 订单支付成功后，发推送：
     // 直接取this.data.groupid, patient_openid, doctor_openid
    this.Subscribe()
  },
  /**
   * 发起订单
   */
  addChatOrder : function(){
    
    var that = this
    //添加订单，订单生成后，返回groupid
    // wx.request({
    //   url: 'http://localhost:8000/api/chatorder/addChatOrder',
    //   data: {
    //     price:2,
    //     id_patient:2,
    //     id_doctor:2,
    //     patient_openid:"ozQ6_4qgR8emn3uCrSABUCFGt24k",
    //     doctor_openid:"ozQ6_4ppwIxQiIAk-UDfjlDP7Fqk",
    //     state:0,
    //     doctor_name:"钟医生",
    //     start_time:
    //     end_time
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

   
  },

  Subscribe: function (e) {
    const self = this
    wx.requestSubscribeMessage({
      tmplIds: [TmplId],
      success(res) {
        //开发文档文档详细对的说明，接口调用返回的结果是什么
    //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          wx.cloud
            .callFunction({
              //通过调用云函数，实现用户点击允许我们发送订阅消息，
              //将该数据订阅保存到数据库，以便在满足条件的时候发送给用户
              name: 'subscribeMessage',
              data: {
                data: self.data.item,
                templateId: TmplId,
                //这个是给用户发送订阅消息后，用户点击订阅消息进入小程序的相关页面，一定要是在线的才可以
                page: '/pages/room/room?id=' + self.data.userOrderId,
              },
            })
            .then(() => {
              self.send();
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000,
              });
            })
            .catch(() => {
              wx.showToast({
                title: '订阅失败',
                icon: 'success',
                duration: 2000,
              });
            });
        }
      },
      fail(re) {
        console.log(re)
      },
    });
  },

  //实现在满足条件的时候给用户发送模板消息
  //像二手物品交易中，将用户的物品信息存储起来，等到其他人购买，提醒用户发货
  //就可以在别人下单的函数中，给卖家发送模板消息。
  send() {
    wx.cloud.callFunction({
      name: 'subscribeMessagesend',
      success(res) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000,
        });
        console.log(res)
      },
      fail(re) {
        console.log(re)
      }
    })

  }

})