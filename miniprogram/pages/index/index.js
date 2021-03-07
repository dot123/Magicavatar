//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util")

Page({
  data: {
    inputValue: "",
    newIdenticon: null,
    getNewIdenticon: null,
    stopDemo: false,
    canvas: null,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {}
          })
        } else {}
      }
    })
    this.multiavatar()
  },
  showSVG: function (iSVG) {
    iSVG = unescape(decodeURIComponent(iSVG))
    var imgData = util.stringToArrayBuffer(iSVG)
    imgData = wx.arrayBufferToBase64(imgData)
    this.setData({
      imgData: imgData,
    });
  },
  multiavatar: function () {
    let multiavatar = require("../../utils/multiavatar").multiavatar;
    // Demo avatars for home page
    let demoAvatars = [
      "Clementine",
      "Morty",
      "Rodion Raskolnikov",
      "Sam Solo",
      "Starcrasher",
      "Shack",
      "Desmond",
      "Snake Harrison",
      "Pandemonium",
      "Broomhilda",
      "Cosmo Blue",
      "Blue Meal Shake",
      "Cryptonaut",
      "Lancaster",
      "Maggot",
      "Matrix",
      "Hiro",
      "Mavericat",
      "Huxley",
      "Elton David-Black",
      "Katerina Zoo",
      "Bloomdalf",
      "Emma",
      "The Elephant's Cat",
      "Nigel Ziemssen",
      "Sir Henchard",
      "Philip Klaus",
      "Daniel Marlowe",
      "Joachim Molesworth",
      "Molly Deronda",
      "Protagonist",
      "Lancelot",
      "Pechorin Bloom",
      "Kim",
      "Kim Patel",
      "Lorelei",
      "Battle Wooster",
      "Horatius",
      "Rhett James",
      "Moby Dick",
      "James Bolling",
      "Binx Bond",
      "Patrick Gatsby",
      "Inigo Argo",
      "Jay Bateman",
      "Victor Montoya",
      "Angela Flagg",
      "Randall Zone",
      "Major Salt",
      "Milo Minderbender",
      "Major Machine",
      "Skeleto",
      "Heep Starr",
      "11th Monster",
      "Wunderlick",
      "Big Brother",
      "Gonlithli",
      "Ebenezer Dimmsdale",
      "Hester Vega",
      "Honey Bunny",
      "Vincent Plant",
      "Butch Wallace",
      "Marsellus Coolidge",
      "Tuco",
      "Angel Boy",
      "Pablo Grimes",
      "Bounty Hunter",
      "Agent Smith",
      "Oracle",
      "Apoc State",
      "Switch",
      "Choi",
      "Angel Eyes",
      "Spoon Eyes",
      "Papillon",
      "Snooze 11",
      "Projectionist",
      "Landlady",
      "Ned Ramirez",
      "Michael Shimada",
      "Sonny Zen",
      "Bruno Fox",
      "Joker",
      "Lucius Tattaglia",
      "Scareblow",
      "Sugar Crash",
      "Neurostatic",
      "Kambei Corleone",
      "Shichiroji Karatoza",
      "Kuninori Bun Lord",
      "Bun Pusher",
      "Etno",
      "Wiggly Corleone",
      "Magnetofon",
      "Hitpagadee",
      "Doge",
      "Doge Panda",
      "Doge Locamotiv",
      "Doge Bulls",
      "Doge Lavrinovich",
      "Weeberblitz",
      "Arkadion",
      "Ninesouls",
      "Psycat",
      "Indoqueen",
      "DoubleDanceDragon",
      "Kinestetic Moves",
      "Zen Flash",
      "Orbit Escape",
      "Sin Azucar",
      "Particle Machine",
      "Spanglinga",
      "Pandalion",
      "Music Razor",
      "Bugzilla",
      "Bugz Bunuel",
      "Satoshi",
      "Nakamoto",
      "МЦ ДРУИД",
      "Jekaterina",
      "Quito",
      "Buenos Aires",
      "Ouarzazate",
      "Bogota",
      "Essaouira",
      "Extremadura",
      "Guadalajara",
      "Aphex",
      "Squarepusher",
      "Orbital",
      "Mozart",
      "Tesla",
      "Linux",
      "Ki",
      "Eshkoshka",
      "Aphex Maiden",
      "Iron Twin",
    ];

    var randomDemo = demoAvatars[Math.floor(Math.random() * demoAvatars.length)];
    demoAvatars.splice(demoAvatars.indexOf(randomDemo), 1);

    // Individual page
    let url = "";
    var customUrl = url.split("/").pop();
    customUrl = customUrl.replace(/%20/g, " ");
    if (customUrl.indexOf("?") >= 0) {
      customUrl = customUrl.substring(0, customUrl.indexOf("?"));
    }
    if (customUrl.length > 0) {
      randomDemo = customUrl;
    }

    this.setData({
      inputValue: randomDemo,
    });
    let iSVG = multiavatar(randomDemo);
    this.showSVG(iSVG);

    // Default demo to generate random avatars
    let that = this;
    var liAddress = randomDemo;

    function identiconDemo() {
      if (liAddress.length > 0) {
        setTimeout(function () {
          liAddress = liAddress.substring(0, liAddress.length - 1);
          that.setData({
            inputValue: liAddress,
          });
          var iSVG = multiavatar(liAddress);
          that.showSVG(iSVG);
          identiconDemo();
        }, 30);
      } else {
        createNew();
      }
    }

    let liNewAddress = "";
    let newA = "";
    let liNewAddressLength = 0;

    function createNew() {
      if (newA.length != liNewAddressLength) {
        setTimeout(function () {
          newA += liNewAddress.substring(1, 0);
          liNewAddress = liNewAddress.substring(1);
          that.setData({
            inputValue: newA,
          });
          var iSVG = multiavatar(newA);
          that.showSVG(iSVG);
          createNew();
        }, 30);
      } else {
        liAddress = newA;
        newA = "";
        runDemo();
      }
    }

    function getNewIdenticon(str) {
      if (str == "") {} else {
        var iSVG = multiavatar(str);
        liAddress = str;
        that.showSVG(iSVG);
      }
    }

    that.data.stopDemo = false;

    function runDemo() {
      if (that.data.stopDemo) {
        return;
      }
      setTimeout(function () {
        if (that.data.stopDemo) {
          return;
        }
        if (demoAvatars.length != 0) {
          liNewAddress = demoAvatars[Math.floor(Math.random() * demoAvatars.length)];
          liNewAddressLength = liNewAddress.length;
          identiconDemo();
          demoAvatars.splice(demoAvatars.indexOf(liNewAddress), 1);
        }
      }, 3000);
    }

    if (customUrl.length == 0) {
      runDemo();
    }

    function newIdenticon() {
      that.data.stopDemo = true;
      var CryptoJS = require("../../utils/multiavatar").CryptoJS;
      var randomHash = CryptoJS.SHA256("" + Math.random())
        .toString()
        .substring(0, 20);
      var randomHashConstructed = "";

      function runIt() {
        setTimeout(function () {
          if (randomHashConstructed.length < 20) {
            var lastChar = randomHash.substring(randomHash.length - 1);
            randomHash = randomHash.slice(0, -1);
            randomHashConstructed += lastChar;
            getNewIdenticon(randomHashConstructed);
            that.setData({
              inputValue: randomHashConstructed,
            });
            runIt();
          }
        }, 3);
      }
      runIt();
    }

    this.data.newIdenticon = newIdenticon;
    this.data.getNewIdenticon = getNewIdenticon;
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.data.getNewIdenticon(e.detail.value);
  },
  onRefresh: function () {
    this.data.newIdenticon()
  },
  onFocus: function () {
    this.data.stopDemo = true
  },
  onShareAppMessage: function () {},
  onSave: function () {
    wx.downloadFile({
      url: 'http://127.0.0.1:3000/sharp?str=' + this.data.inputValue,
      success: function (res) {
        //判断是否保存图片
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存图片成功！',
              })
            },
            fail(res) {
              wx.showToast({
                title: '保存图片失败！' + res,
              })
            }
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '保存图片失败！',
        })
      }
    })
  },
})