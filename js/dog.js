/*游戏参数配置*/
var bless_speed = 1000 /*福字速度*/
var hb_speed=1800    /*红包速度*/
var bom_speed=2000      /*炸弹速度*/
var all_drop_number=15   /*掉落总数*/
var hb_price=0.2 /*红包价格*/
var safe_price=0.5 /*安全福价格*/
var trust_price=0.5 /*可信福价格*/
var ai_price=0.5 /*智能福价格*/
/*注意概率范围不可重复避免同时出现,l代表范围下限，h代表范围上线，保留一位小数*/
var hb_chance={l:0,h:4} /*红包出现概率*/
var safe_chance={l:4,h:4.5} /*安全福出现概率*/
var trust_chance={l:5,h:5.5} /*可信福出现概率*/
var ai_chance={l:6,h:6.5} /*智能福出现概率*/
/*炸弹若要与福和红包一起出现,范围可以上面的重复*/
var bom_chance={l:4,h:10}
/*倒计时时间,单位秒*/
var dur=15
/*以下是游戏控制*/
var con = window.screen.width / 375
var css = { left: '5.33rem' }
var num=dur
$('.timer-count').text(num)
function rowBack() {
    if (css.left == '5.33rem') {
        css.left = '0px'
    } else if (css.left == '0px') {
        css.left = '5.33rem'
    }
    $('.page2 .cloud').animate(css, 2000, rowBack)
}

//接到红包个数
var score = {
    hb: 0,
    zn: 0,
    aq: 0,
    kx: 0
}

//动态获取当前云的位置

function startGame() {

    $('.page2 .cloud').animate(css, 2000, rowBack)

    var cloud_p = {
        x: parseInt($('.page2 .cloud').css('left')) / 37.5+2.2,
        y: parseInt($('.page2 .cloud').css('top')) / 37.5 + 2.5
    }

    // 随机生成红包和福字
    var ramd = (Math.random() * 10).toFixed(1)

    if (ramd < hb_chance.h) {
        var ram = randomString(8)
        var hb = $("<div  class='rain hb" + ram + "'></div>")
        $('.page2').append(hb)

        $('.page2 .hb' + ram).css('left', cloud_p.x + 'rem')
        $('.page2 .hb' + ram).css('top', cloud_p.y + 'rem')
        var css2 = { top: (document.body.clientHeight - 45 * con) / 37.5 + 'rem' }
        catchMoney($('.page2 .hb' + ram),$('.dog'),score,timer_start,count_timer)
        $('.page2 .hb' + ram).animate(css2, hb_speed, function () {
            $('.page2 .hb' + ram).remove()
        })
    } else if (ai_chance.l < ramd && ramd < ai_chance.h) {
        var ram = randomString(8)
        var hb = $("<div  class='blesszn bless zn" + ram + "'></div>")
        $('.page2').append(hb)

        $('.page2 .zn' + ram).css('left', cloud_p.x + 'rem')
        $('.page2 .zn' + ram).css('top', cloud_p.y + 'rem')
        var css2 = { top: (document.body.clientHeight - 80 * con) / 37.5 + 'rem' }
        catchMoney($('.page2 .zn' + ram),$('.dog'),score,timer_start,count_timer)
        $('.page2 .zn' + ram).animate(css2, bless_speed, function () {
            $('.page2 .zn' + ram).remove()
        })

    } else if (safe_chance.l < ramd && ramd < safe_chance.h) {
        var ram = randomString(8)
        var hb = $("<div  class='blessaq bless aq" + ram + "'></div>")
        $('.page2').append(hb)

        $('.page2 .aq' + ram).css('left', cloud_p.x + 'rem')
        $('.page2 .aq' + ram).css('top', cloud_p.y + 'rem')
        var css2 = { top: (document.body.clientHeight - 80 * con) / 37.5 + 'rem' }
        catchMoney($('.page2 .aq' + ram),$('.dog'),score,timer_start,count_timer)
        $('.page2 .aq' + ram).animate(css2, bless_speed, function () {
            $('.page2 .aq' + ram).remove()
        })

    } else if (trust_chance.l < ramd && ramd < trust_chance.h) {
        var ram = randomString(8)
        var hb = $("<div  class='blesskx bless kx" + ram + "'></div>")
        $('.page2').append(hb)

        $('.page2 .kx' + ram).css('left', cloud_p.x + 'rem')
        $('.page2 .kx' + ram).css('top', cloud_p.y + 'rem')
        var css2 = { top: (document.body.clientHeight - 80 * con) / 37.5 + 'rem' }
        catchMoney($('.page2 .kx' + ram),$('.dog'),score,timer_start,count_timer)
        $('.page2 .kx' + ram).animate(css2, bless_speed, function () {
            $('.page2 .kx' + ram).remove()
        })


    } else if (bom_chance.l < ramd && ramd < bom_chance.h) {
        var ram = randomString(8)
        var hb = $("<div  class='bom zd" + ram + "'></div>")
        $('.page2').append(hb)

        $('.page2 .zd' + ram).css('left', cloud_p.x + 'rem')
        $('.page2 .zd' + ram).css('top', cloud_p.y + 'rem')
        var css2 = { top: (document.body.clientHeight - 80 * con) / 37.5 + 'rem' }
        catchMoney($('.page2 .zd' + ram),$('.dog'),score,timer_start,count_timer)
        $('.page2 .zd' + ram).animate(css2, bom_speed, function () {
            $('.page2 .zd' + ram).remove()
        })

    }



}
//倒计时

var count_timer
function countTime() {

    count_timer=setInterval(function () {
        if(num>0){
            num--
            $('.timer-count').text(num)
        }else{
            $('.timer-count').text(0)

            clearInterval(count_timer)
            clearInterval(timer_start)
            $('.page2 .bom').remove()
            $('.page2 .rain').remove()
            $('.page2 .bless').remove()
            $('.hb-mark').text(score.hb)
            $('.aq-mark').text(score.aq)
            $('.kx-mark').text(score.kx)
            $('.zn-mark').text(score.zn)
            //var total=score.hb*0.2+(score.aq+score.kx+score.zn)*0.5
            var total=score.hb*hb_price+score.aq*safe_price+score.kx*trust_price+score.zn*ai_price
            $('.all-money').text(total.toFixed(1))
            $('.mask').show()
            $('.good-luck').show()
        }
    },1000)
}

//碰撞检测
function catchMoney(target,dog,score,start_timer,count_timer) {
    //接红包阀值
    var range
    if(target.attr('class').indexOf('rain hb')!=-1){
        range=1.6
    }else if(target.attr('class').indexOf('bless zn')!=-1){
        range=2
    }else if(target.attr('class').indexOf('bless aq')!=-1){
        range=2
    }else if(target.attr('class').indexOf('bless kx')!=-1){
        range=2
    }else if(target.attr('class').indexOf('bom zd')!=-1){
        range=2
    }
    //暂时未考虑高度检测，暂时不需要用
    var dog_head=(document.body.clientHeight - 77*con)/37.5

    var timer1=setInterval(function () {
        var dis_y=parseInt(target.css('top')+40)/37.5-dog_head
        var dis_x=(parseInt(target.css('left'))+0.5*parseInt(target.css('width')))/37.5-(parseInt(dog.css('left'))+0.5*parseInt(dog.css('width')))/37.5
        var diss=Math.sqrt(Math.pow(dis_y,2)+Math.pow(dis_x,2))
        if(diss<range){
            target.remove()
            console.log(target.attr('class').indexOf('rain hb')!=-1)
            if(target.attr('class').indexOf('rain hb')!=-1){

                $('.l-dog').show()
                $('.r-dog').hide()
                setTimeout(function () {
                    $('.l-dog').hide()
                    $('.r-dog').show()
                },500)
                score.hb++
              playCoin()

            }else if(target.attr('class').indexOf('bless zn')!=-1){

                $('.l-dog').show()
                $('.r-dog').hide()
                setTimeout(function () {
                    $('.l-dog').hide()
                    $('.r-dog').show()
                },500)
                score.zn++
              playCoin()

            }else if(target.attr('class').indexOf('bless aq')!=-1){

                $('.l-dog').show()
                $('.r-dog').hide()
                setTimeout(function () {
                    $('.l-dog').hide()
                    $('.r-dog').show()
                },500)
                score.aq++
              playCoin()

            }else if(target.attr('class').indexOf('bless kx')!=-1){

                $('.l-dog').show()
                $('.r-dog').hide()
                setTimeout(function () {
                    $('.l-dog').hide()
                    $('.r-dog').show()
                },500)
                score.kx++
                playCoin()

            }else if(target.attr('class').indexOf('bom zd')!=-1){

                clearInterval(start_timer)
                clearInterval(count_timer)
                $('.page2 .bom').remove()
                $('.page2 .rain').remove()
                $('.page2 .bless').remove()
                $('.mask').show()
                $('.game-over').show()
                playBoom()

            }
        }
    },50)
}




//拖动
move()

function move() {
    var $pick = $('.page2 .dog');
    // 初始状态距离元素左侧的距离
    var tx;
    var st;
    $pick.on('touchstart', function (e) {
        tx = e.touches[0].clientX - $pick[0].offsetLeft
        st = e.touches[0].clientX
    })
    $pick.on('touchmove', function (e) {
        window.targetX = e.target.offsetLeft;
        $pick.css({
            left: (e.touches[0].clientX - tx) < 0
                ? 0
                : (e.touches[0].clientX - tx) > $(window).width() - e.target.offsetWidth
                    ? ($(window).width() - e.target.offsetWidth) / 37.5 + 'rem'
                    : (e.touches[0].clientX - tx) / 37.5 + 'rem'
        })


        /* var dir = st - e.touches[0].clientX
         if (dir < 0) {
           $('.dog .r-dog').show()
           $('.dog .l-dog').hide()
         } else {
           $('.dog .l-dog').show()
           $('.dog .r-dog').hide()

         }*/


    })


}

//随机字母串

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}