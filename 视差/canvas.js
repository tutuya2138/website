window.onload = function () { var canvas = document.querySelector(".canvasRain");
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
            this.vY = random(0.5,6);//雨滴下降速度
            this.radius = random(2,10);//雨滴大小
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
    createRain(200);
    setInterval(function () {
        ctx.fillStyle = "rgba(0,0,0,0.05)"; //蒙版
        ctx.fillRect(0,0,w,h);
        for(var i = 0 ; i < aRain.length ; i ++){
            aRain[i].move();
        }
    },500/60);
}
