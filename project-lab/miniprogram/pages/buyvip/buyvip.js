// pages/buyvip/buyvip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [
      { 'productImg': '../../src/doctor1.png', 'productName': '普通健康卡',
      'productDetail': '专家线上咨询1次，帮助办理挂号1次（仅限平台专家，不含挂号费）',
        'productPrice': 380, 'productId': 1},
      {
        'productImg': '../../src/doctor1.png', 'productName': '普通健康卡',
        'productDetail': '家庭成员享受专家线上咨询5次．送原价值3000元体检1次，健康评估1次，个人定制健康管理方案1个．如需就诊，提供后续办理挂号、住院、手术服务（不含医院费用．仅限平台专家）1次。如不参与体检．本套餐可提供12次线上咨询。',
        'productPrice': 380, 'productId': 2
      }
    ],
    modalHidden: true,
    modalContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从后段获取产品列表
    // this.setData(
    //   {
    //     productList: ...,
    //   }
    // )
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

  onClickVipDetail: function (event) {
    console.log(event.currentTarget.dataset.productid)
    var productid = event.currentTarget.dataset.productid
    // 通过productid向后端获取对应商品信息,然后更新that.modalContent
    this.setData({
      modalContent: {
        'title': '普通健康卡',
        'price': 380,
        'info': '家庭成员享受专家线上咨询5次．送原价值3000元体检1次，健康评估1次，个人定制健康管理方案1个．如需就诊，提供后续办理挂号、住院、手术服务（不含医院费用．仅限平台专家）1次。如不参与体检．本套餐可提供12次线上咨询。',
        'additioninfo': '除在线问诊外，其他服务将由客服主动联系您，请耐心等待。更多信息详讯客服:138-xxxx-xxxx'},
      modalHidden: false
    });
  },

  onClickVipBuy: function (event) {
    console.log(event.currentTarget.dataset.productid)
    var productid = event.currentTarget.dataset.productid
    // 通过productid跳转至付款界面，付款后跳转至会员信息界面

  },

  modalHide: function (e) {
    this.setData({
      modalHidden: true
    })
  }
})