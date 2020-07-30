// miniprogram/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    starArray:[1,2,3],
    unstarArray:[4,5],
    score:5,
    id_doctor:1,
    id_patient:1,
    id_inquiry:1
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
        id_inquiry: data.id_inquiry,
        id_doctor:data.id_doctor,
        id_patient:data.id_patient
      });
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
   * 用户点击星星评分
   */
  onClickStar: function (event) {
    var score = event.currentTarget.dataset.star
    var star=[]
    var unstar=[]
    for(var i=1;i<=score;i++){
      star.push(i)
    }
    for(var j=score+1;j<=5;j++){
      unstar.push(j)
    }
    this.setData({
      starArray:star,
      unstarArray:unstar,
      score:starArray.length                            

    })
  },
   /**
  * 新增病历
 */
addComment: function () {
  var that = this;
  //请求医生信息
  wx.request({
    url: 'https://yiwei.run/api/comment/addComment',
    data: {
     score:this.data.score,
     content:this.data.content,
     id_patient:this.data.id_patient,
     id_doctor:this.data.id_doctor,
     id_inquiry:this.data.id_inquiry
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success(res) {
      console.log(res.data.data)
      that.redirectToInquiryHistory()
    }
  })
 
},
redirectToInquiryHistory(){
  wx.redirectTo({
    url: '/pages/inquiryHistory/inquiryHistory',
  })
 },
 handleInput: function (event) {
  this.setData({
  content:event.detail.value
  })
  //console.log(this.data.content)
},
commit(){
  this.addComment()

}

})