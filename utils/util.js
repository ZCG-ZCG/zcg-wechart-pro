function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1)
  var arr = []
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr
}

function http(url, callback) {
  wx.request({
    url: url,
    method: "GET",
    success: (res) => {
      callback(res.data)
    },
    fail: (error) => {
      console.log(error)
    }
  })
}

function processData(moviesDouban) {
  var that = this
  var movies = []
  for (var i in moviesDouban.subjects) {
    var subject = moviesDouban.subjects[i]

    // 处理标题 如果长于6个字就截取出来
    var title = subject.title
    if (title.length >= 6) {
      title = title.substring(0, 6) + "..."
    }

    var tmp = {
      stars: that.convertToStarsArray(subject.rating.stars),
      title: title,
      average: subject.rating.average,
      coverageUrl: subject.images.large,
      movieId: subject.id
    }
    movies.push(tmp)
  }
  return movies
}
module.exports = {
  convertToStarsArray,
  http,
  processData
}