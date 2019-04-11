Page({
  // 冒泡和非冒泡
  // onContainerTap: function () {
  //   console.log("containerTap")
  // },

  // onSubTap: function () {
  //   console.log("subTap")
  // },


  onTap:function () {
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })

    // wx.redirectTo({
    //   url: '../posts/posts',
    // })
    
    wx.switchTab({
      url: '../posts/posts',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

})