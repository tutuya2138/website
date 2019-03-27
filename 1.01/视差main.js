window.onload = function () {
    //登陆界面canvas动画
    rainfall(".canvas1", 1,0.4,2);
    disabledMouseWheel();

};

function disabledMouseWheel() {
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }//W3C
    window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
}
function scrollFunc(evt) {
    evt = evt || window.event;
    if(evt.preventDefault) {
        // Firefox
        evt.preventDefault();
        evt.stopPropagation();
    } else {
        // IE
        evt.cancelBubble=true;
        evt.returnValue = false;
    }
    return false;
}

//快捷姓名密码登录
function count() {
    var userList = document.getElementById("user-list");
    if( userList.style.cssText == "opacity: 0;"){
        userList.style.cssText = "opacity: 1;"
    } else {
        userList.style.cssText = "opacity: 0;"
    }
}
function rtn0() {
    var userList = document.getElementById("user-list");
    userList.style.cssText = "opacity: 0;"
}
function admIn() {
    var userList = document.getElementById("user-list");
    if (userList.style.cssText == "opacity: 1;"){
        document.getElementById("txt").value = 'admin';
        document.getElementById("psd").value = 'admin11';
        userList.style.cssText = "opacity: 0;"
    }
}
function gstIn() {
    var userList = document.getElementById("user-list");
    if (userList.style.cssText == "opacity: 1;"){
        document.getElementById("txt").value = 'guest';
        document.getElementById("psd").value = 'guest12345';
        userList.style.cssText = "opacity: 0;"
    }
}
//这里代码比较重复，比较傻，后续考虑封装
function login() {
    if((document.getElementById("txt").value == 'admin') &&
        (document.getElementById("psd").value == 'admin11')){
        var Div = document.getElementById("login");
        Div.style.cssText = "display:none;";
        rainfall(".canvasRain", 10,0.5,5);
        rainfall(".canvas1", 0,0,0)
    }
    else if((document.getElementById("txt").value == 'guest') &&
        (document.getElementById("psd").value == 'guest12345')){
        var Div = document.getElementById("login");
        Div.style.cssText = "display:none;";
        rainfall(".canvasRain", 10,0.5,5);
        rainfall(".canvas1", 0,0,0)
    } else {
        alert("请输入正确的用户名和密码。")
    }
}

//随机改变当前背景颜色

function changeBg() {
    var Rcor = random(0, 255);
    var Gcor = random(0, 255);
    var Bcor = random(0, 255);
    var currentCor = document.getElementById("photo").style.backgroundColor
        = 'rgba('+ Rcor + "," + Gcor +","+  Bcor+"," + '0.38)';
    document.getElementById("login-photo").style.backgroundColor
        = 'rgba('+ Rcor + "," + Gcor +","+  Bcor+"," + '0.28)';

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
}


    //下雨的方法
function rainfall(selectors, number,minspeed,maxspeed) {
    var canvas = document.querySelector(selectors);
    var w,h;
    //canvas resize
    ~~function setSize () {
        window.onresize =arguments.callee;
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }();

    var ctx = canvas.getContext("2d");
    var aRain = [];
//随机数方法
    function random(min, max) {
        return Math.random()*(max-min) + min;
    }
//从父类中生成雨滴
    function Rain() { }  //parent

    Rain.prototype = {
        init:function () {
            this.x = random(0,w);//雨滴诞生x坐标
            this.y = random(0,300);//雨滴诞生y坐标
            this.vY = random(minspeed,maxspeed);//雨滴下降速度
            this.radius = random(1,3);//雨滴大小
            this.colorR = random(0,255);//雨滴颜色r
            this.colorG = random(0,255);//雨滴颜色g
            this.colorB = random(0,255);//雨滴颜色b
            this.h = random(0.8*h,0.9*h);//雨滴落地化为圆圈位置
            this.r = 1;//圆圈初始半径
            this.vr = 1;//圆圈扩散速度
        },
        draw:function () {
            if (this . y < this .h){
                ctx.beginPath();
                ctx.fillStyle = "rgba("+this.colorR+","+this.colorG+","+this.colorB+",1)";//雨滴
                ctx.fillRect(this.x,this.y,this.radius,10);
            }else{
                ctx.beginPath();
                ctx.strokeStyle = "rgba("+this.colorR+","+this.colorG+","+this.colorB+",1)";
                ctx.arc(this.x,this.y,this.r,0,7);
                ctx.stroke();
            }
        },
        move:function () {
            if(this.y<this.h){
                this. y += this.vY;
            }else {
                if (this.r <20){
                    this.r += this.vr;
                }else {
                    this.init();
                }
            }
            this.draw();
        }
    };

    function createRain(num) {
        for(var i = 0 ; i <num ;i ++ ){
            setTimeout(function () {
                var rain = new Rain();
                rain.init();
                rain.draw();
                aRain.push(rain);
            },200*i)
        }
    }
    createRain(number);
    setInterval(function () {
        ctx.fillStyle = "rgba(0,0,0,0.07)"; //蒙版
        ctx.fillRect(0,0,w,h);
        for(var i = 0 ; i < aRain.length ; i ++){
            aRain[i].move();
        }
    },500/60);
}


function square() {

    var canvas2 = document.querySelector(".canvas2");
    var ctx2 = canvas2.getContext("2d");
    var w,h;
            //canvas resize
            ~~function setSize () {
                window.onresize =arguments.callee;
                w = window.innerWidth;
                h = window.innerHeight;
                canvas2.width = w;
                canvas2.height = h;
            }();
ctx2.clearRect(0,0,w,h);

            var y1 = 0,
                x1 = 0.1*w,
                y2 = 1.1*h,
                x2 = 0.9*w;
        setInterval(function () {
            ctx2.beginPath();
            ctx2.fillStyle = "white";

            if(y1 <= 0.9*h) {
                ctx2.fillRect(x1, y1+=4, 2, 5);
            }else  if (y1 >= 0.9*h){
                ctx2.fillRect(x1 +=4, y1, 5, 2);
            }else  if(x1 >= w){
                return   y1 = 0,
                         x1 = 0.1*w;
            }

            if(y2 >= 0.2*h) {
                ctx2.fillRect(x2, y2 -=4, 2, 5);
            }else  if (y2 <= 0.2*h){
                ctx2.fillRect(x2 -=4, y2 , 5, 2);
            }else  if(x2 <=-0){
                return  y2 = h,
                        x2 = 0.9*w
            }
    },1);
}
//3d css
$("#cell1").click(function () {
    $(".containerOfMain").css("transform","translateZ(-300px) rotateX(-90deg)")
    });
$("#cell2").click(function () {
    $(".containerOfMain").css("transform","translateZ(-300px) rotateX(0deg)")
});
$("#cell3").click(function () {
    $(".containerOfMain").css("transform","translateZ(-300px) rotateX(90deg)")
});
$("#cell4").click(function () {
    $(".containerOfMain").css("transform","translateZ(-300px) rotateX(180deg)")
});

//3d图切换左右按钮
var move = true;
$(".leftBtn").click(function () {
    if(move){
        move = false;
        tab(false);
    }
});

$(".rightBtn").click(function () {
    if(move){
        move = false;
        tab(true);
    }
});

function tab(dir) {
    var arrW=[],arrH=[],arrL=[],arrT=[],arrZ=[],arrS=[];
    $("#upBoard ul li").each(function (i) {
        arrW[i] = $(this).css("width");
        arrH[i] = $(this).css("height");
        arrL[i] = $(this).css("left");
        arrT[i] = $(this).css("top");
        arrZ[i] = $(this).css("z-index");
    });

    $("#upBoard ul li").each(function (i) {
        var n;
        if(dir){
            n = i-1;
            if(n<0)n=7;
        }else{
            n = i+1;
            if(n>7)n=0;
        }
        $(this).animate({
            "width":arrW[n],
            "height":arrH[n],
            "left":arrL[n],
            "top":arrT[n],
        },500,function () {
            move = true;
        });
        $(this).css("z-index",arrZ[n]);
    });
}

$(function () {
    var _index = 0;
    $(".aVideo").hover(function () {
        _index = $(this).index();
        $(this).stop().stop().animate({width:331.2},500);
    },function (){
        $(this).stop().stop().animate({width:55.2},500);
    });
});




