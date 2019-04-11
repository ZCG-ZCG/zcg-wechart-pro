// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle:"",
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    console.log(category)
    this.setData({
      navigateTitle:category
    })
    var dataUrl = ""
    var baseUrl = app.globalData.doubanBase
    switch (category) {
      case "正在热映":
        dataUrl = baseUrl + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = baseUrl + "/v2/movie/coming_soon"
        break;
      case "豆瓣top250":
        dataUrl = baseUrl + "/v2/movie/top250"
        break;
    }
    this.setData({requestUrl: dataUrl})
    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesDouban) {
    var movies = util.processData(moviesDouban)

    // 如果要绑定新加载的数据，那么需要与旧有的数据合并在一起
    var totalMovies = {}
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      totalMovies = movies
      this.data.isEmpty = false
    }
    this.setData({movies: totalMovies})
    this.data.totalCount += 20
    wx.hideNavigationBarLoading()
  },


  onScrollLower: function (e) {
    var nextUrl = `${this.data.requestUrl}?start=${this.data.totalCount}&count=20`
    util.http(nextUrl,this.processDoubanData)
    wx.showNavigationBarLoading()
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var refreshUrl = `${this.data.requestUrl}?start=0&count=20`
    wx.showNavigationBarLoading()
    this.setData({
      movies: {},
      isEmpty: true
    })
    util.http(refreshUrl, this.processDoubanData)
    wx.hideNavigationBarLoading()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onScrollLower()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})