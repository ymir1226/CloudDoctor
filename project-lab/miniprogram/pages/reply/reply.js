const app = getApp()
Page({
  data:{
    replyList:[],
    images:[],
    ifInquiry:0,
    id_inquiry:1,
    doctor_id:1,
    patient_id:1,
    user_id:1,
    doctor_avatar: "",
    doctor_name: "吴医生",
    state:0,
    department:'',
    score:5,
   

    patient_name:'',
    illness_history:'',
    medicine_history:'',
    allergen:'',
    
    comment:'',
    starArray:[],
    unstarArray:[],
    prescription:'',
    hasPrescription:0,
    newReply:'',
    picurlList:''
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
        id_inquiry: data   
      });
    
      this.getInquiry(that.data.id_inquiry)
      this.getReplyList(that.data.id_inquiry)
      this.getPrescription(that.data.id_inquiry)

    })
  },
 /**
  * 获取回复详细信息
  */
  getReplyList: function (id) {
    var that = this;
    //请求回复信息
    wx.request({
      url: 'http://119.45.143.38:80/api/reply/getReplyListByInquiryId',
      data: {
        id_inquiry:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
       
       
        let resp=res.data.data
        for(var t in resp)
        {
          let display_time = resp[t].created_at
          let year = display_time.substring(0,4)+"年"
          let month = display_time.substring(5,7) + "月"
          let day = display_time.substring(8,10) + "日"
          let hour_minute = display_time.substring(11, 16)
          resp[t].created_at=year+month+day+"  "+hour_minute
        }
        that.setData({
          replyList:res.data.data
        })
        console.log(res.data.data)
      }
    })
  },
   /**
  * 获取处方详细信息
  */
 getPrescription: function (id) {
  var that = this;
  //请求回复信息
  wx.request({
    url: 'http://119.45.143.38:80/api/prescription/getPrescriptionByInquiry',
    data: {
      id_inquiry:id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success(res) {
      
      that.setData({
        prescription:res.data.data[0],
        hasPrescription:1
      })
    }
  })
},
  /**
  * 获取问诊详细信息
  */
  getInquiry: function (id_inquiry) {
    var that = this;
    //请求问诊信息
    wx.request({
      url: 'http://119.45.143.38:80/api/inquiry/getInquiryByInquiryId',
      data: {
        id:id_inquiry
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data[0])
        let resp = res.data.data[0]
        that.setData({
          doctor_id:resp.id_doctor,
          user_id:resp.id_user,
          patient_id: resp.id_patient,
          doctor_avatar: resp.doctor_avatar,
          doctor_name: resp.doctor_name,
          state: resp.state,
          department:resp.department
        })
        that.getPatient(resp.id_patient)
        if(resp.state==1)
        {
          that.getComment(resp.id)
        }
      }
    })
  },
  /**
  * 获取就诊人信息
  */
 getPatient: function (patient_id) {
  var that = this;
  //请求问诊信息
  wx.request({
    url: 'http://119.45.143.38:80/api/patient/getPatientById',
    data: {
      id:patient_id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success(res) {
      console.log(res.data.data[0])
      let resp = res.data.data[0]
      that.setData({
        patient_name:resp.name,
        illness_history:resp.illness_history,
        medicine_history:resp.medicine_history,
        allergen:resp.allergen
      })
    },
    fail(res){
      console.log(res)
    }
  })
},
/**
  * 继续问诊
*/
  continueInquiry:function(event){
    this.setData({
      ifInquiry:1
    })
  },
/**
  * 结束问诊
*/
  finishInquiry(){
    //先更新问诊状态：
    var that=this
    //请求评论信息
    wx.request({
     url: 'http://119.45.143.38:80/api/inquiry/updateInquiry',
     data: {
       id:that.data.id_inquiry,
      state:1
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     method: 'POST',
     success(res) {
       console.log(res)
     }
   })
    wx.redirectTo({
      url: '/pages/comment/comment',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        //res.eventChannel.emit('sendData', inquiryid)
      }
    })
  },
  /**提交问诊 */
  onClickCommit(){
    var that=this
    this.uploadImagesToCloud()
    this.AddReply()
    // let pages = getCurrentPages() //获取页面数组
    // let curPage = pages[pages.length - 1]  //获取当前页
    // curPage.onShow() //手动调用生命周期函数
    wx.redirectTo({
      url:'/pages/inquiryHistory/inquiryHistory',
       success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('sendData', that.data.user_id)
      }
    })
  },
  /**
  * 提交新回复
  */
 AddReply(){
   var that=this
   console.log(that.data.id_inquiry)
   //请求评论信息
   wx.request({
    url: 'http://119.45.143.38:80/api/reply/addReply',
    data: {
      id_inquiry:that.data.id_inquiry,
      content:that.data.newReply,
      pic_url:that.data.picurlList,
      floor:that.data.replyList.length+1,
      id_patient:that.data.patient_id,
      id_doctor:that.data.doctor_id,
      from_user:1

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
  * 获取评论信息
  */
 getComment: function (id) {
  var that = this;
  //请求评论信息
  wx.request({
    url: 'http://119.45.143.38:80/api/comment/getCommentByInquiryId',
    data: {
      id_inquiry:id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success(res) {
      console.log(res.data.data[0])
      let resp = res.data.data[0]
      that.setData({
        comment:resp.content,
        score:resp.score
      })
      var star=[]
      var unstar=[]
      for(var i=1;i<=resp.score;i++)
      {
        star.push(i)
      }
      for(var j=resp.score+1;j<=5;j++){
        unstar.push(j)
      }
      that.setData({
        starArray:star,
        unstarArray:unstar
      })
    }
  })
}, 
 /**
   * 处理输入
   */
  handleInput: function (event) {
    this.setData({
    newReply:event.detail.value
    })
    //console.log(this.data.content)
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
    var that=this
    var pics=''
    for(var i=0;i<that.data.images.length;i++){
    let timestamp = (new Date()).valueOf();
    let path=timestamp + '.png'
    pics=pics+path+';'
   
    wx.cloud.uploadFile({
      cloudPath: path,
      // filePath: tempFilePaths[0],
      filePath: that.data.images[i],
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
      picurlList:pics
    })
  }
    },
})