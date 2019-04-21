---
title: canvas基础知识小结
date: 2019-04-20 23:07:54
tags: canvas
categories: JS
---

总结一些基础知识

# 画一条直线
- moveTo设置起点，lineTo设置下一坐标
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");
        // 设置状态
        context.beginPath();
        context.moveTo(100, 100);// 起点
        context.lineTo(700, 700);// 下一点坐标
        context.closePath();
        context.lineWidth = 10;// 线宽
        context.strokeStyle = "#0f0";// 颜色
        
        // 绘制
        context.stroke();
    }
</script>
```
- lineCap属性 - 设置线段起始位置的样式，取值如下
butt:(default)默认值
round:圆头
square:方头
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        context.lineWidth = 30;
        context.strokeStyle = "tomato";

        context.beginPath();
        context.moveTo(100, 100);
        context.lineTo(400, 100);
        context.lineCap = "butt";
        context.stroke();

        context.beginPath();
        context.moveTo(100, 200);
        context.lineTo(400, 200);
        context.lineCap = "round";
        context.stroke();

        context.beginPath();
        context.moveTo(100, 300);
        context.lineTo(400, 300);
        context.lineCap = "square";
        context.stroke();
        // 辅助线
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(100, 50);
        context.lineTo(100, 350);
        context.stroke();

        context.beginPath();
        context.moveTo(400, 50);
        context.lineTo(400, 350);
        context.stroke();
    }
</script>
```
结果如下：
![lineCap](https://upload-images.jianshu.io/upload_images/10160199-ca6461aadbd0f94d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240#pic_center)
-  lineJoin属性- 两条直线相交处的样式，可取值如下：
miter：(default)，尖角，miterLimit 默认值10,控制尖角的长度，只有设置miter时生效。
bevel：斜接
round: 圆角
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        context.lineWidth = 50;
        context.strokeStyle = "tomato";

        context.beginPath();
        context.moveTo(300, 300);
        context.lineTo(400, 100);
        context.lineTo(500, 300);
        context.lineJoin = "miter";
        context.miterLimit = 10;
        context.stroke();

        context.beginPath();
        context.moveTo(300, 500);
        context.lineTo(400, 300);
        context.lineTo(500, 500);
        context.lineJoin = "bevel";
        context.miterLimit = 10;
        context.stroke();

        context.beginPath();
        context.moveTo(300, 700);
        context.lineTo(400, 500);
        context.lineTo(500, 700);
        context.lineJoin = "round";
        context.miterLimit = 10;
        context.stroke();
    }
</script>
```
示意图如下：
![lineJoin](https://upload-images.jianshu.io/upload_images/10160199-0f3f6663a8d8a41c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240#pic_center)

# 画一个矩形
(1).直接使用连线的方式画出矩形。
```html
<canvas id="canvas"></canvas>
<script>

    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(100, 100);
        context.lineTo(600, 100);
        context.lineTo(600, 600);
        context.lineTo(100, 600);
        context.lineTo(100, 100);//可以省略，closePath()会自动封闭图形
        context.closePath();

        context.lineWidth = 10;
        context.strokeStyle = "#0f0";

        context.stroke();
    }
</script>
```
(2).使用context.rect(x, y, width, height)规划路径，这里只规划路径，不会绘制。
context.fillRect(x, y, width, height), context.strokeRect(x, y, width, height)不但规划路径，还将矩形直接绘制出来。
```html
<canvas id="canvas"></canvas>
<script>

    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        drawRect(context, 100, 100, 300, 200, 5, "blue", "red");
        drawRect2(context, 250, 200, 300, 200, 5, "blue", "rgba(0, 255, 0, 0.5)");


    }

    function drawRect(cxt, x, y, width, height, borderWidth, borderColor, fillColor){
        cxt.beginPath();
        cxt.rect(x,y, width, height); // 规划路径
        cxt.closePath();

        cxt.lineWidth = borderWidth;
        cxt.fillStyle = fillColor;
        cxt.strokeStyle = borderColor;

        cxt.fill();
        cxt.stroke();
    }
    function drawRect2(cxt, x, y, width, height, borderWidth, borderColor, fillColor){
        cxt.lineWidth = borderWidth;
        cxt.fillStyle = fillColor;
        cxt.strokeStyle = borderColor;

        cxt.fillRect(x, y, width, height); // 填充
        cxt.strokeRect(x, y, width, height);
    }
</script>
```
fillStyle, strokeStyle 可取颜色值如下：
\#ffffff   、#fff、
rgb(255, 255, 100)、rgba(100, 100, 100, 0.8)、 
hsl(20, 62%, 28%)、 hsla(30, 82%, 45%, 0.6)、
red

# 图形变换
- 位移：translate(x, y)
- 旋转：rotate(deg)
- 缩放：scale(sx, sy) , sx - x方向缩放倍数，sy - y方向缩放倍数。
- 变换矩阵
a  c   e    &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;    a - 水平缩放(1) ;&#160;&#160;    b - 水平倾斜(0) 
b  d   f   &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; c - 垂直倾斜(0) ;&#160;&#160;   d - 垂直缩放(1)
0  0  1   &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;   e - 水平位移(0);&#160;&#160;    f - 垂直位移(0)
- 设置变换矩阵：
transform(a, b, c, d, e, f) 
setTransform(a, b, c, d, e, f) 设置变换后的默认值
- canvas状态的保存与恢复
context.save();
context.restore();
 ```html
<canvas id="canvas" style="border: 1px solid #000;"></canvas>
<script>

    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        context.save();
        context.fillStyle = "red";
        context.translate(100, 100);
        context.fillRect(0, 0, 400, 400);
        context.restore();

        context.save();
        context.fillStyle = "green";
        context.translate(300, 300);
        context.fillRect(0, 0, 400, 400);
        context.restore();
    };
</script>
```
```html
<canvas id="canvas"></canvas>
<script>

    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < 200; i++){
            var r = Math.random()*10+10;
            var x = Math.random()*canvas.width;
            var y = Math.random()*canvas.height;
            var a = Math.random()*360;
            drawStar(context, x, y, r, a)
        }
    };

    function drawStar(cxt, x, y, R, rot){
        var rot = rot || 0;

        cxt.fillStyle = "#fb3";
        cxt.strokeStyle = "#fd5";
        cxt.lineWidth = 3;

        cxt.save();
        cxt.transform(R, 0, 0, R, x, y);
        // cxt.translate(x, y);
        cxt.rotate(rot/180*Math.PI);
        // cxt.scale(R, R);

        starPath(cxt);

        cxt.fill();
        cxt.stroke();

        cxt.restore();

    }
    function starPath(cxt){
        cxt.beginPath();

        for(var i = 0; i < 5; i ++){
            cxt.lineTo(Math.cos((18 + i*72 ) / 180 * Math.PI),
                -Math.sin((18 + i*72) / 180 * Math.PI) );
            cxt.lineTo(Math.cos((54 + i*72) / 180 * Math.PI) * 0.5,
                -Math.sin((54 + i*72 ) / 180 * Math.PI) * 0.5);
        }
        cxt.setTransform(1, 0, 0, 1, 0, 0);//清除上一次的影响
        cxt.closePath();
    }
</script>
```

# fillStyle - 线性渐变&径向渐变
- 线性渐变
    //step1
    var grd = context.createLinearGradient(xstart, ystart, xend, yend);
    //step2
    grd.addColorStop(stop, color);
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function () {
        var canvas = document.getElementById("canvas");
        canvas.width = 800;
        canvas.height = 800;
        var context = canvas.getContext("2d");

        var linearGrad = context.createLinearGradient(0, 0, 800, 800);
        linearGrad.addColorStop(0.0, 'white');
        linearGrad.addColorStop(0.25, 'yellow');
        linearGrad.addColorStop(0.5, 'green');
        linearGrad.addColorStop(0.75, 'blue');
        linearGrad.addColorStop(1.0, 'black');

        context.fillStyle = linearGrad;
        context.fillRect(0, 0, 800, 800);
    }
</script>
```
- 径向渐变
    //step1
    var grd = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
    //step2
    grd.addColorStop(stop, color);
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function () {
        var canvas = document.getElementById("canvas");
        canvas.width = 800;
        canvas.height = 800;
        var context = canvas.getContext("2d");

        var linearGrad = context.createRadialGradient(400, 400, 100, 400, 400, 400);
        linearGrad.addColorStop(0.0, 'white');
        linearGrad.addColorStop(0.25, 'yellow');
        linearGrad.addColorStop(0.5, 'green');
        linearGrad.addColorStop(0.75, 'blue');
        linearGrad.addColorStop(1.0, 'black');

        context.fillStyle = linearGrad;
        context.fillRect(0, 0, 800, 800);
    }
</script>
```
## 5. createPattern
- createPattern(img, repeat-style)
repeat-style:no-repeat; repeat-x; repeat-y; repeat
- createPattern(canvas, repeat-style)
- createPattern(video, repeat-style)

# 曲线绘制

## 圆或圆弧
context.arc(context, center, radius, startingAngle, endingAngle, anticlockwiae)
anticlockwiae = false 顺时针
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function(){
        var canvas = document.getElementById("canvas");

        canvas.width = 1024;
        canvas.height = 768;

        var context = canvas.getContext("2d");

        context.lineWidth = 2;
        context.strokeStyle = "#058";

        for(var i = 0; i < 10; i ++){
            context.beginPath();
            context.arc(50 + i*100, 60, 40, 0,2*Math.PI*(i+1)/10);
            context.closePath();//会自动闭合

            context.stroke()
        }

        for(var i = 0; i < 10; i ++){
            context.beginPath();
            context.arc(50 + i*100, 180, 40, 0,2*Math.PI*(i+1)/10);

            context.stroke()
        }

        for(var i = 0; i < 10; i ++){
            context.beginPath();
            context.arc(50 + i*100, 300, 40, 0,2*Math.PI*(i+1)/10, true);
            context.closePath();//会自动闭合

            context.stroke()
        }

        for(var i = 0; i < 10; i ++){
            context.beginPath();
            context.arc(50 + i*100, 420, 40, 0,2*Math.PI*(i+1)/10, true);

            context.stroke()
        }

        context.fillStyle = "#0f0";

        for(var i = 0; i < 10; i ++){
            context.beginPath();
            context.arc(50 + i*100, 540, 40, 0,2*Math.PI*(i+1)/10, true);
            context.closePath();//会自动闭合

            context.fill()
        }

        for(var i = 0; i < 10; i ++){
            context.beginPath();
            context.arc(50 + i*100, 660, 40, 0,2*Math.PI*(i+1)/10, true);

            context.fill()
        }
    }
</script>
```
## arcTo
context.arcTo(x1, y1, x2, y2, radius)
```html
<canvas id="canvas"></canvas>
<script>
    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 1800;
        canvas.height = 1800;

        var context = canvas.getContext("2d");
        context.moveTo(400,100)
        context.arcTo(1200,400,400,700,400);
        context.strokeStyle= "red"
        context.stroke()
    }
</script>
```
## 贝赛尔曲线 Bezier
（1）QuadraticCurveTo(二次)
context.moveTo(x0, y0); //初始点
contextquadraticCurveTo(x1, y1, x2, y2)//控制点、结束点
（2）BezierCurveTo(三次)
context.moveTo(x0, y0);
context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
```js
    function drawLand(cxt){
        cxt.save();

        cxt.beginPath();
        cxt.moveTo(0, 600);
        cxt.bezierCurveTo(540, 400, 660, 800, 1200, 600);
        cxt.lineTo(1200, 800);
        cxt.lineTo(0, 800);
        cxt.closePath();

        var lanStyle = cxt.createLinearGradient(0, 800, 0, 0);
        lanStyle.addColorStop(0.0, "#030");
        lanStyle.addColorStop(1.0, "#580");
        cxt.fillStyle = lanStyle;

        cxt.fill();

        cxt.restore();
    }
```
# 文字渲染基础
context.font = "bold 40px Arial";
context.fillText(String, x, y, [maxlen]);
context.StrokeText(String, x, y, [maclen])
```html
<canvas id="canvas"></canvas>
<script>

    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        context.font = "bold 40px Arial";
        context.fillStyle = "#058";
        context.fillText("欢迎学习Canvas！欢迎学习Canvas！", 40, 100);
        context.lineWidth = 1;

        context.strokeStyle = "#058";
        context.strokeText("欢迎学习Canvas！欢迎学习Canvas！", 40, 200);

        context.fillText("欢迎学习Canvas！欢迎学习Canvas！", 40, 300, 400);
        context.strokeText("欢迎学习Canvas！欢迎学习Canvas！", 40, 400, 400);
    }
</script>
```
## font
默认值"20px sans-serif"
（1）font-style:
normal(default);
italic(斜体字);
oblique(倾斜字体)
（2）font-variant:
normal;
small-caps(以小型形式显示大写字母)
（3）font-weight:
lighter;
normal;
bold;
bolder;
100,200,300,400(normal),500,600,700(bold),800,900
（4）font-size:
20px;
2em;
150%;
（5）font-family:
设置多种字体备选；
支持@font-face
web安全字体
```html
<canvas id="canvas"></canvas>
<script>

    window.onload = function () {
        var canvas = document.getElementById("canvas");

        canvas.width = 800;
        canvas.height = 800;

        var context = canvas.getContext("2d");

        context.font = "bold 40px Arial";

        var linearGrad = context.createLinearGradient(0, 0, 700, 0);
        linearGrad.addColorStop(0.0, 'tomato');
        linearGrad.addColorStop(0.25, 'yellow');
        linearGrad.addColorStop(0.5, 'green');
        linearGrad.addColorStop(0.75, 'pink');
        linearGrad.addColorStop(1.0, 'red');

        context.fillStyle = linearGrad;
        // context.fillStyle = "#058";
        context.fillText("欢迎学习Canvas！欢迎学习Canvas！", 40, 100);
        context.lineWidth = 1;

        context.strokeStyle = "#058";
        context.strokeText("欢迎学习Canvas！欢迎学习Canvas！", 40, 200);

        context.fillText("欢迎学习Canvas！欢迎学习Canvas！", 40, 300, 400);
        context.strokeText("欢迎学习Canvas！欢迎学习Canvas！", 40, 400, 400);
    }
</script>
```
## 文本对齐
context.textAlign = left/center/right
cotext.textBaseline = top/middle/bottom  (alphabetic拉丁/ideographic汉，日/hanging印)
- ####  文本度量
context.measureText(String).width

# 阴影

context.shadowColor;
context.shadowOffsetX;//x位移值
context.shadowOffsetY;//y位移值
xontext.shadowBlur; //模糊值

# global

- globalAlpha = 1(default)  //使全局具有透明度
- glibalCompositeOperation//绘制的图像在重叠时产生的效果
"sourece-over" -  后绘制的图像在先绘制的图形上面
"destination-over" - 先绘制的图形在后悔值的上面
·······················································································
source-over
source-atop
source-in
source-out
·················································································
destination-over
destination-atop
destination-in
destination-out
·················································································
lighter
copy
xor

# 剪辑区域

context.clip();
# 剪纸效果

非零环绕原则

# 其他

- clearRect
context.clearRect(x, y, width, height)
- isPointInPath
context.isPointInPath(x, y)
var x = event.clientX - canvas.getBoundingClientRect().left
var y = event.clientY - canvas.getBoundingClientRect().Right

# 兼容性

explorecanvas https://code.google.con/p/explorecanvas/
canvas 图形库：canvasplus/ArtisanJS/Rgraph







