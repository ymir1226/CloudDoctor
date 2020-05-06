// pages/components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width:{
      type:String,
      value:'70%'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {title:'简介'},
      {title:'见解'},
      {title:'关联'},
      {title:'评论'}
    ],
    currentItem:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabBarSelected:function(e){
      let index=e.currentTarget.dataset.key;
      this.setData({
        currentItem:index
      })
    }
  }
})
