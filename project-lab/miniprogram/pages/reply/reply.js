const app = getApp()
Page({
  data:{
    doctorName:'',
    department:'',
    score:0,
    replyTime:0,
    createTime:0,
    content:'',
    reply:'',
    star:0,
    comment:'',
    ifInquiry:0
  },

 /**
  * 获取回复详细信息
  */
  getInquiry: function () {
    var that = this;
    //请求回复信息
    wx.request({
      url: 'http://119.45.143.38:80/api/reply/GetReplyListByInquiryId',
      data: {
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data[0])
        let resp = res.data.data[0]
        this.setData({
          doctor_id:resp.data.doctorid,
          patient_id: resp.data.patientid,
          content: resp.data.content,
          reply: resp.data.reply,
        })
      }
    })
  },
  /**
  * 获取问诊详细信息
  */
  getInquiry: function () {
    var that = this;
    //请求问诊信息
    wx.request({
      url: 'http://119.45.143.38:80/api/inquiry/getInquiry',
      data: {
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data[0])
        let resp = res.data.data[0]
        this.setData({
          doctor_id:resp.data.doctorid,
          patient_id: resp.data.patientid,
          content: resp.data.content,
          reply: resp.data.reply,
          comment: resp.data.comment
        })
      }
    })
  },

  continueInquiry:function(event){
    this.setData({
      ifInquiry:1
    })
  }
})