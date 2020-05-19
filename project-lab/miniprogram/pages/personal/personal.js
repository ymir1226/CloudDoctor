const TmplId = '4SnZohkpw5KAM4rxZYUrUl1TDncs9-RexIfgsNoFIwo';
Page({
  data: {
    userOrderId: "a3510731313",
    item: {
      "thing1": {
        "value": "X医生的咨询"
      },
      "thing3": {
        "value": "请在X个工作日以内进入聊天室咨询"
      },
      "character_string5": {
        "value": "a3510731313"
      }
    }
  },
  onLoad: function (options) {
    // 应该使用success: res => {} 从后端获取 userOrderId
    // this.setData({

    // })
  },


  goChat: function (e) {
    wx.navigateTo({
      url: '/pages/room/room?id=' + this.data.userOrderId,
    })
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

  },
})