Page({
  
  data:{
    nameList: [],
    patientList:[],
    index:0,
    content:'',
    name:'请输入就诊人姓名或昵称',
    age:'请输入就诊人岁数',
    illness_history:'请输入就诊人病史',
    medicine_history:'请输入就诊人用药史',
    allergen:'请输入就诊人过敏药物',
    medHistory:true,
    medicine:true,
    allergy:true,
    images:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    // const eventChannel = this.getOpenerEventChannel()
    // var that = this
    // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('sendData', data => {
    //   that.setData({
    //     doctorid: data
    //   });
    //   console.log(that.data.doctorid, ' from doctorList');
    //   this.getDoctorDetailById(that.data.doctorid)
    // })


    this.getPatientByAuthor(1)

    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 提交问诊
   */
  createInquiry: function () {
    var that = this;
    //请求医生信息
    wx.request({
      url: 'http://119.45.143.38:80/api/inquiry/addInquiry',
      data: {
        doctor_id:this.data.doctorid,
        patient_id:this.data.patientid,
        content:this.data.content,
        pre_illness: this.data.illness,
        pre_medicine: this.data.medicine,
        guomin: this.data.guomin
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        
        
      }
    })
  },
  /**
   * 输入框获取就诊人姓名
   */
  getName: function (e) {
    //console.log(e.detail.value)
    this.data.name = e.detail.value
  },
  /**
  * 输入框获取就诊人年龄
  */
  getAge: function (e) {
    //console.log(e.detail.value)
    this.data.age = parseInt(e.detail.value)
  },
  /**
  * 输入框获取就诊人病史
  */
  getIllnessHistory: function (e) {
    //console.log(e.detail.value)
    this.data.illness_history = e.detail.value
  },
  /**
  * 输入框获取就诊人用药史
  */
  getMedicineHistory: function (e) {
    //console.log(e.detail.value)
    this.data.medicine_history = e.detail.value
  },
  /**
  * 输入框获取就诊人过敏药物
  */
  getAllergen: function (e) {
    //console.log(e.detail.value)
    this.data.allergen = e.detail.value
  },

  /**
  * 选择保存
  */
  onClickSave: function (e) {
    if (this.data.state == 0) {
      this.addPatient()
    }
    else if (this.data.state == 1) {
      this.editPatient()
    }

  },

  /**
  * 单选框radio
  */
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == 'r1') {
      this.setData({
        sex: 0
      })
    }
    else if (e.detail.value == 'r2') {
      this.setData({
        sex: 1
      })
    }
  },

  /**
   * 处理输入
   */
  handleInput: function (event) {
    this.data.content=event.detail.value
    console.log(this.data.content)
  },

  medHistoryChange:function(){
    let temp = this.data.medHistory
    this.setData({medHistory:!temp})
  },
  medicineChange:function(){
    let temp = this.data.medicine
    this.setData({medicine:!temp})
  },
  allergyChange:function(){
    let temp = this.data.allergy
    this.setData({allergy:!temp})
  },
  /**
 * 获取病历
*/
  getPatientByAuthor: function (author) {
    var that = this;
    //请求病人信息
    wx.request({
      url: 'http://119.45.143.38:80/api/patient/getPatientByAuthor',
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
            patientList: res.data.data
          }
        )
        let plist = that.data.patientList
        let list =[]
        for (var i=0;i<plist.length;i++)
        {
         list.push(plist[i].name)
        }
        that.setData(
          {
            nameList:list
          }
        )
        console.log(that.data.nameList)
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
        const tempFilePaths = res.tempFilePaths
        that.setData({
          images:that.data.images.concat(res.tempFilePaths)
        })
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
  {   // 云函数上传
    let timestamp = (new Date()).valueOf();
    wx.cloud.uploadFile({
      cloudPath: timestamp + '.png',
      filePath: tempFilePaths[0],
      success: res => {
        console.log('上传成功', res)
        wx.hideLoading()
        wx.showToast({
          title: '上传图片成功',
        })
        // app.globalData.fileID = res.fileID
        // app.globalData.cloudPath = cloudPath
        // app.globalData.imagePath = filePath

      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      }
    })
    }
})