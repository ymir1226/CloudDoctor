Page({
  data:{
    medHistory:true,
    medicine:true,
    allergy:true
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
  }
})