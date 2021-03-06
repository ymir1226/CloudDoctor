const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: '',
    chatRoomGroupName: '吴医生',
    ifChatroomEnd:false,
    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,
    chatRoomStatus:false,
  },

  onLoad: function (opentions) {
     const eventChannel = this.getOpenerEventChannel()
     var that = this
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('sendData', data => {
      that.setData({
        //chatRoomGroupId: "asdfghjkll"
        chatRoomGroupId: data.groupid,
        chatRoomGroupName:data.doctor_name,
        chatRoomStatus:data.room_status
      });
      console.log(this.data.chatRoomGroupId)
    })
   
    if(app.globalData.is_doctor==1){
      this.setData(
        {
          ifChatroomEnd:true
        }
      )
     
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    this.setData({
      //chatRoomGroupId: opentions.id,
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },

  getOpenID: async function () {
    if (this.openid) {
      return this.openid
    }
  
    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })
    return result.openid
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '聊天室',
      path: '/pages/room/room',
    }
  },
})
