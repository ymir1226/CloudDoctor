// pages/doctorList/doctorList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'',
    doctorList:[],
    typeArray:[
      {type:'心内科',status:1,index:0},
      {type:'儿科',status:0,index:1},
      {type:'眼科',status:0,index:2},
      {type:'妇科',status:0,index:3},
      {type:'骨科',status:0,index:4},
      {type:'呼吸科',status:0,index:5},
      {type:'消化科',status:0,index:6},
      {type:'皮肤科',status:0,index:7}
    ],
    currentChosen:0,//当前选中
    StorageFlag:true,
    searcherStorage:[]
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
      url: 'http://yiwei.run/api/doctor/getDoctorByDepartment',
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
   * 按关键词获取医生列表
   */
  getDoctorByText: function(text){
    var that = this
    //请求医生列表
    wx.request({
      url: 'http://119.45.143.38:80/api/doctor/getDoctorByText',
      data: {
        key: text,
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
    console.log(event.currentTarget.dataset.department)
    var item = event.currentTarget.dataset.department
    var index=this.data.currentChosen
    var oldItem = "typeArray["+index+"].status";
    var newItem = "typeArray["+item.index+"].status";
    this.setData({
      [oldItem]:0,
      [newItem]:1,
      currentChosen:item.index
    })
    // this.data.typeArray[this.data.currentChosen].status=0
    // this.data.typeArray[item.index].status=1
    // this.data.currentChosen=item.index
    // console.log(this.data)
    this.getDoctorByDepartment(item.type)
  },

  /**
       * 获取输入框输入
       */
  bindSearch: function (e) {
    // console.log(e.detail.value)
    var inputValue=e.detail.value
    if(inputValue=='')
    {
      this.setData({
      searcherStorage:[]
    })
   }
    else{
      //查询缓存
    var searchData = wx.getStorageSync(inputValue[0])
    this.setData({
      searcherStorage:searchData
    })
  }

    this.setData({
      search:e.detail.value
    })
  },

  /**
     * 响应搜索点击事件
     */
  onClickSearch: function (event) {
    console.log(this.data.search)
    var searchData=this.data.search
    if(searchData!='')//非空时才调起搜索
    {
      //调用API向本地缓存存入数据
      var searchKey=searchData[0]
      var searchArr = wx.getStorageSync(searchKey) || []
      console.log(searchArr)
      var flag=false;  
      for(var i=0;i<searchArr.length;i++){
          if(searchArr[i]["text"]==searchData)
          {
            searchArr[i]["hot"]+=1;
            flag=true;
          }
        }
        if(!flag){
          var newSearchData={}
          newSearchData["text"]=searchData
          newSearchData["hot"]=1
          searchArr.push(newSearchData)
        }  
      wx.setStorageSync(searchKey,searchArr) 
      this.getDoctorByDepartment(this.data.search)
      this.setData({
        searcherStorage:[]
      })
    }
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
  },
  /**
     * 响应搜索词条响应事件
  */
  tapSearcherStorage:function(event){
    console.log(event.currentTarget.dataset.searchtext)
    var text = event.currentTarget.dataset.searchtext
    this.getDoctorByText(text)
    this.setData({
      searcherStorage:[]
    })
  }
})