// pages/posts/post-detail/postdetail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    var postData = postsData.postList[postId]
    this.setData({postData,postId})
    
    var postsCollected = wx.getStorageSync("postsCollected")
    if (postsCollected) {
      var postcollected = postsCollected[postId]
      if (postcollected) {
        this.setData({
          collected:postcollected
        })
      } 
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync("postsCollected",postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()
  },
 
  setMusicMonitor: function () {
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = this.data.postId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },

  onCollectionTap:function () {
    this.getPostCollectedSyc()
    // this.getPostCollectedAsy()
  },
  
  getPostCollectedSyc: function () {
    var postsCollected = wx.getStorageSync("postsCollected")
    var postCollected = postsCollected[this.data.postId]
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected
    postsCollected[this.data.postId] = postCollected
    this.showToast(postsCollected, postCollected)
  },

  getPostCollectedAsy: function () {
    var that = this
    wx.getStorage({
      key: "postsCollected",
      success: function (res) {
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.postId]
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected
        postsCollected[that.data.postId] = postCollected
        that.showToast(postsCollected, postCollected)
      }
    })
  },

  showModal: function (postsCollected, postCollected) {
    var that = this
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : "取消收藏该文章？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          // 更新文章是否的缓存值
          wx.setStorageSync("postsCollected", postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postsCollected[that.data.postId]
          })  
        }
      }
    })
  },

  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync("postsCollected", postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postsCollected[this.data.postId]
    })  
    wx.showToast({
      title: postCollected ? '收藏成功' : "取消成功",
      duration: 1500,
      icon: "success"
    })
  },

  onShareTap: function (event) {
    wx.showActionSheet({
      itemList: [
        "分享到微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到QQ空间"
      ],
      itemColor: "#405f80",
      success: function (res) {
        // console.log(res.cancel) 用户是不是点击了取消按钮
        // console.log(res.tapIndex) 数组元素的序号，从0开始
      }
    })
  },

  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic
    var postId = this.data.postId
    var postData = postsData.postList[postId]
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  
  }
})