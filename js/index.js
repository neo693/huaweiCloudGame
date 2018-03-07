$('.btn').on('touchstart', function () {
  $(this).addClass('active')
})
$('.btn').on('touchend', function () {
  $(this).removeClass('active')
})

/*// 首先将起始页的图片全部加载才进入起始页
  var loading = weui.loading('loading', {
    content: '加载中...'
  });
  // 加载启动页的资源
  var origin = location.origin
  var loader1 = new resLoader({
    resources: [
      origin + '/imgs/logo.png',
      origin + '/imgs/bg.jpg',
      origin + '/imgs/cloud1.png',
      origin + '/imgs/music1.png'
    ],
    onStart: function (total) {},
    onProgress: function (current, total) {},
    onComplete: function (total) {
      loading.hide(function () {
        $('.page1').show()
        // 进入启动页
        startLoading()
      })
    }
  });
  loader1.start();*/

// 启动页
  var origin = location.origin
  var audioLoaded = false
  $('.page1 audio').on('canplaythrough', function (e) {
    audioLoaded = true
  })
  function startLoading() {
    var start, complete
    var loader2 = new resLoader({
      resources: [
        origin + '/imgs/logo.png',
        origin + '/imgs/bg.jpg',
        origin + '/imgs/cloud1.png',
        origin + '/imgs/music1.png',
        origin + '/imgs/bg2.png',
        origin + '/imgs/boom.png',
        origin + '/imgs/card_ai.png',
        origin + '/imgs/card_sage.png',
        origin + '/imgs/card_trust.png',
        origin + '/imgs/cloud2.png',
        origin + '/imgs/cloud3.png',
        origin + '/imgs/cloud4.png',
        origin + '/imgs/dog.png',
        origin + '/imgs/dog2.png',
        origin + '/imgs/failed.png',
        origin + '/imgs/hb1.png',
        origin + '/imgs/hb2.png',
        origin + '/imgs/logo2.png',
        origin + '/imgs/muusic2.png',
        origin + '/imgs/rule.png',
        origin + '/imgs/shake.png',
        origin + '/imgs/start.png',
        origin + '/imgs/success.png',
        origin + '/imgs/nomusic1.png',
        origin + '/imgs/2018.png',
        origin + '/imgs/b1.png',
        origin + '/imgs/b2.png',
        origin + '/imgs/b3.png',
        origin + '/imgs/b4.png',
        origin + '/imgs/btn1.png',
        origin + '/imgs/btn2.png',
        origin + '/imgs/btn3.png',
        origin + '/imgs/btn4.png'
      ],
      onStart: function (total) {
        console.log('start:' + total);
        start = Date.now()
      },
      onProgress: function (current, total) {
        console.log(current + '/' + total);
        var percent = current / (total+3) * 100;
        $('.progressbar').css('width', percent + '%');
        var per = parseInt(percent);
        $('.wrapper1 .percent').text(per + '%');
      },
      onComplete: function (total) {
        function go() {
          if (audioLoaded) {
            $('.wrapper1 .percent').text('100%');
            complete = Date.now()
            if (complete - start < 1000) {
              setTimeout(function () {
                // 进入摇一摇
                $('.page1 .wrapper1').hide()
                $('.page1 .wrapper2').show().addClass('yaoyiyao')
              }, 1000 - complete + start)
            } else {
              // 进入摇一摇
              $('.page1 .wrapper1').hide()
              $('.page1 .wrapper2').show().addClass('yaoyiyao')
            }
          } else {
            $('.page1 audio').on('canplaythrough', function (e) {
              $('.wrapper1 .percent').text('100%');
              complete = Date.now()
              if (complete - start < 1000) {
                setTimeout(function () {
                  // 进入摇一摇
                  $('.page1 .wrapper1').hide()
                  $('.page1 .wrapper2').show().addClass('yaoyiyao')
                }, 1000 - complete + start)
              } else {
                // 进入摇一摇
                $('.page1 .wrapper1').hide()
                $('.page1 .wrapper2').show().addClass('yaoyiyao')
              }
            })
          }
        }
        var count = 0
        createjs.Sound.on("fileload", handleLoadComplete1);
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSound({src:"/libs/audio/coin.mp3", id:"sound1"});
        function handleLoadComplete1(event) {
          count ++
          if (count == 2) {
            go()
          }
          window.playCoin = function () {
            createjs.Sound.play("sound1");
          }
        }
        createjs.Sound.on("fileload", handleLoadComplete);
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSound({src:"/libs/audio/bom.mp3", id:"sound2"});
        function handleLoadComplete(event) {
          count ++
          if (count == 2) {
            go()
          }
          window.playBoom = function () {
            createjs.Sound.play("sound2");
          }
        }
      }
    });
    // 点击音乐
    $('.playing').click(function () {
      $('audio')[0].pause()
      $('.play.playing').hide()
      $('.play.play-stop').show()
    })
    $('.play-stop').click(function () {
      $('audio')[0].play()
      $('.play.playing').show()
      $('.play.play-stop').hide()
    })

    loader2.start();
  }

  startLoading()

// 摇一摇
  function toBeginGame() {
    // 去掉类，再摇设备就不需要处理
    $('.page1 .wrapper2').removeClass('yaoyiyao')
    $('.page1 .wrapper2').hide()
    $('.page1 .wrapper3').show()
    $('.startgame').click(function () {
      $('.page1').hide()
      // 进入游戏页面
      $('.page2').show()
      // 规则弹窗出现
      $('.mask').show()
      $('.rule-wrapper').show()
    })
  }
  // 点击开始游戏，则蒙层消失
var timer_start
  $('.rule-btn').click(function (e) {
    $('.mask').hide()
    $('.rule-wrapper').hide()
    // 开始游戏函数执行
      startGame();
      timer_start=setInterval(startGame,num*1000/all_drop_number)
      countTime()

  })

  
  var lastTime = 0;
  var x = y = z = lastX = lastY = lastZ = 0;
  var shakeSpeed = 800;
  if(window.DeviceMotionEvent){
    window.addEventListener('devicemotion', shake, false);
  }else{
    alert('本设备不支持摇一摇功能');
  }
  function shake(eventDate){
    //获取设备加速度信息
    var acceleration = eventDate.accelerationIncludingGravity;
    var nowTime = new Date().getTime();
    //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
    if(nowTime - lastTime > 100){
      var diffTime = nowTime - lastTime;
      lastTime = nowTime;
      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;
      var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 6000;
      if(speed > shakeSpeed){
        // 点击按钮进入游戏
        if ($('.page1 .wrapper2').hasClass('yaoyiyao')) {
          toBeginGame();
        }
      }
      lastX = x;
      lastY = y;
      lastZ = z;
    }
  }
  
  // 重新开始按钮点击

  $('.re-start').click(function () {
    $('.mask').hide()
    $('.game-over').hide()
    $('.good-luck').hide()
    // 重新开始的函数执行
      // 开始游戏函数执行
       score = {
          hb: 0,
          zn: 0,
          aq: 0,
          kx: 0
      }
      num=dur

      clearInterval(count_timer)
      clearInterval(timer_start)
      startGame();
      timer_start=setInterval(startGame,num*1000/all_drop_number)
      countTime()
      /*setTimeout(function () {
          clearInterval(timer_start)
          clearInterval(count_timer)
      },15000)*/
  })

  // 立即兑换
  $('.duihuan').click(function () {
    // 以下这个值为总金额
    // $('.all-money').text()
    // var loading = weui.loading('兑换中...');
    // 兑换完成关闭loading
    //loading.hide();
    // 提示兑换成功
    // weui.toast('兑换成功', 3000)
  })
