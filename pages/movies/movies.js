// pages/movies/movies.js
var app = getApp()
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var baseUrl = app.globalData.doubanBase
    var inTheaterUrl = baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = baseUrl + "/v2/movie/top250" + "?start=0&count=3"

    this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(top250Url, "top250", "豆瓣top250")
  },

  onCancelImgTap: function (e) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },

  onBindFocus: function (e) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onBindBlur: function (e) {
    var text = e.detail.value
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text
    this.getMovieListData(searchUrl, "searchResult", "")
  },

  onMoreTap: function (e) {
    var category = e.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this
    // 此时发送请求为异步请求
    wx.request({
      url: url,
      success: function (res) {
        console.log(res, settedKey)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: (error) => {
        console.log("调用失败")
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = util.processData(moviesDouban)
    var readyData = {}
    readyData[settedKey] = {
      movies,
      categoryTitle
    }
    this.setData(readyData)
  },
  
})