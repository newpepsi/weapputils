//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputs:'微信',
    result: [],
    userInfo: {}
  },

  //事件处理函数
  bindSearchInput: function (e) {
    this.inputs = e.detail.value;
    console.log('inputs',this.inputs);
    this.data.inputs = e.detail.value;
    this.setData(this.data);
  },
  bindSearchTap: function () {
    this.search_databse();
  },
  search_databse: function () {
    let hilight_word = function (key, word) {
        let idx = word.indexOf(key);
        let t = [];
        if (idx > -1) {
            if (idx == 0) {
                t = hilight_word(key, word.substr(key.length));
                t.unshift({key:true,str:key});
                return t;
            }
            if (idx > 0) {
                t = hilight_word(key, word.substr(idx));
                t.unshift({key:false,str:word.substring(0, idx)});
                return t;
            }
        }
        return [{key:false,str:word}];
    };
    
    let database= [
      '小程序_百度百科', '微信小程序正式上线', '微信小程序有哪些?微信小程序最全汇总?',
      '公众号出售-公众号价格-公众号买卖-A5公众号交易平台',
      '如何运营出一个有吸引力的微信公众号? - 微信公众平台号 - 知乎'
    ];
    let searched = [];
    let inputs = this.data.inputs;
    for (let i = 0; i < database.length; i++) {
      var current_word = database[i];
      if (current_word.indexOf(inputs) > -1) {
        searched.push(hilight_word(inputs, current_word))
      }
    }
    // console.log(searched);
    this.data.result=searched;
    console.log('this data',this.data);
    this.setData(this.data);
  },
  onLoad: function () {
    console.log('onLoad')
    // var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  }
})
