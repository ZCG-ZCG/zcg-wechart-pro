// pages/posts/posts.js
var postsData = require('../../data/posts-data.js')

Page({

  //产生事件  捕获事件  回调函数  事件处理
   
  /**
   * 页面的初始数据
   */
  data: {
    posts_content:[]
  },

  // onSwiperItemTap: function (event) {
  //   var postId = event.currentTarget.dataset.postid
  //   // console.log(postId)
  //   wx.navigateTo({
  //     url: 'post-detail/postdetail?id=' + postId,
  //   })
  // },

  onSwiperTap: function (event) {
    // target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/postdetail?id=' + postId,
    })
  },
  
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/postdetail?id='+postId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_content:postsData.postList
    })
  },

  
})