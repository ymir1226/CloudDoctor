// pages/doctorHome/doctorHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {title:'简介'},
      {title:'见解'},
      {title:'关联'},
      {title:'评论'}
    ],
    currentItem:0,
    map:{
      longitude:113.324520,
      latitude:23.099994,
      scale:14,
      markers:[{
        id:0,
        latitude:23.099994,
        longitude:113.324520,
        width:50,
        heigt:50
      }]
    },
    classroomList:[
      {imgurl:'../../src/icon/throat.png',
      name:'xxxxxxxxxx'},
      {imgurl:'../../src/icon/throat.png',
      name:'xxxxxxxxxx'},
      {imgurl:'../../src/icon/throat.png',
      name:'xxxxxxxxxx'}
    ],
    experienceList:[
      {
        title:'执照',
        content:'上海'
      },
      {
        title:'执照',
        content:'上海'
      },
      {
        title:'执照',
        content:'上海'
      }
    ],
    educationList:[
      {
        school:'医学院',
        imgUrl:'../../src/icon/PekingUniversity.png',
        college:'Peking University School of Medicine',
        date:'1985'
      },
      {
        school:'医学院',
        imgUrl:'../../src/icon/PekingUniversity.png',
        college:'Peking University School of Medicine',
        date:'1985'
      },
      {
        school:'医学院',
        imgUrl:'../../src/icon/PekingUniversity.png',
        college:'Peking University School of Medicine',
        date:'1985'
      },
    ]
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
   * tabbar点击事件
   */
  tabBarSelected:function(e){
    let index=e.currentTarget.dataset.key;
    this.setData({
      currentItem:index
    })
  }
})