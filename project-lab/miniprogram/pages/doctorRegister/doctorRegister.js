// miniprogram/pages/doctorRegister/doctorRegister.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'请输入您的姓名',
    title:'健康管理',
    department:'如：神经内科',
    contact_number:'请输入您的手机号',
    address:'请输入您的联系地址',
    expert:'',
    introduction:'',
    images:[],
    avatar:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 输入框获取医生姓名
   */
  getName: function (e) {
    //console.log(e.detail.value)
    this.data.name = e.detail.value
  },
    /**
   * 输入框获取医生职称
   */
  getTitle:function(e){
    this.data.title = e.detail.value
  },
    /**
   * 输入框获取医生科室
   */
  getDepartment: function (e) {
    //console.log(e.detail.value)
    this.data.department = e.detail.value
  },
    /**
   * 输入框获取医生联系方式
   */
  getContactNumber: function (e) {
    //console.log(e.detail.value)
    this.data.contact_number = e.detail.value
  },
    /**
   * 输入框获取医生地址
   */
  getAddress: function (e) {
    //console.log(e.detail.value)
    this.data.address = e.detail.value
  },
    /**
   * 输入框获取医生擅长
   */
  getExpert: function (e) {
    //console.log(e.detail.value)
    this.data.expert = e.detail.value
  },

   /**
   * 输入框获取自我介绍
   */
  getIntroduction: function (e) {
    //console.log(e.detail.value)
    this.data.introduction = e.detail.value
  },
  /**
  * 提交注册
  */
  Submit(){
   console.log("submit")
   this.addDoctor()
   //this.redirectToPersonal()
  },
  /**
  * 添加医生
  */
  addDoctor(){
    console.log("addDoctor")
    this.uploadImagesToCloud()
    //添加医生
    wx.request({
    //  url: 'https://yiwei.run/api/doctor/addDoctor',
    url: 'https://yiwei.run/api/doctor/addDoctor',
     data: {
      openid:app.globalData.openid,
      doctor_name:this.data.name,
      title:this.data.title,
      department:this.data.department,
      contact_number:this.data.contact_number,
      address:this.data.address,
      expert:this.data.expert,
      introduction:this.data.introduction,
      avatar:this.data.avatar,
      score:5,
      reviews:100,
      patient_num:100,
      quiry_num:100,
      rate:100,
      inquiry_price:10,
      chat_price:50,

     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     method: 'POST',
     success(res) {
       console.log(res)
     }
   })
  },
   /**
  * 上传图片
  */
 uploadPic : function () {
  var that = this
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {   
      // tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      var list=[]
      list.push(tempFilePaths)
      that.setData({
        images:tempFilePaths
      })
      console.log(that.data.images)
  }
})
},
//删除图片
deleteImage : function(event){
  var index = event.currentTarget.dataset.idx
  let that = this
  that.data.images.splice(index, 1)
  that.setData({
    images: that.data.images
  })
},
//上传图片到云端
uploadImagesToCloud()
{ 
  // 云函数上传
  var that=this
  let timestamp = (new Date()).valueOf();
  let pics='doctor/'+timestamp + '.png'
  console.log("pics="+pics)
  wx.cloud.uploadFile({
    cloudPath: pics,
    filePath: that.data.images[0],
    success: res => {
      console.log('上传成功', res)
    },
    fail: e => {
      console.error('[上传文件] 失败：', e)
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    }
  })
  that.setData({
    avatar:pics
  })
},
// 我的界面
redirectToPersonal(){
  wx.switchTab({
    url: '/pages/personal/personal'
  })
 },

})