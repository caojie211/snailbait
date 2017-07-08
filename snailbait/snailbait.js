var runner = {
  width: 50,
  height: 50,
  //向右跑图片开始裁剪起始位置
  srx: 0,
  sry: 83,
  //向左跑图片开始裁剪的起始位置
  slx: 464,
  sly: 0,
  //图片裁减宽高
  swidth: 50,
  sheight: 50,
  //图片摆放的起始位置
  x:0,
  y:338,
  //当人物停止运动时确保 人物的截取的图片是双脚站立的
  // stop: true
  flag: "right"
}
// 获取画布
var canvas = document.getElementById('game-canvas');
//设置画布的宽高，和在标签中添加 style="width:800; height:400" 效果一样，但是就是不可以在css样式中定义或者在其后面加px
 canvas.width = 800;
 canvas.height = 400;
//创建2d context画师 参数 2d
var context = canvas.getContext('2d');
//为画布画上背景图片 函数名I大写
var backgroundImg = new Image();
//获取背景图片
backgroundImg.src = './images/background.png';
//把小朋友画到画布上去
var runnerImg = new Image();
runnerImg.src = './images/spritesheet.png';
//图片加载完成之后，调动画师画背景
backgroundImg.onload = function() {
  //drawImage(图片名, 开始加载x坐标, 开始加载y坐标)
  context.drawImage(backgroundImg, 0, 0);
  context.drawImage(runnerImg, runner.srx, runner.sry, runner.swidth, runner.sheight,
    runner.x, runner.y, runner.width, runner.height);
}

//创建监听事件，在监听事件中实现人物的移动
document.addEventListener('keydown',function(e) {
  //按键盘参数e会传递一个keyCode的数值过来，利用数值来确定方向direction
  // console.log(e.keyCode);
  runner.stop = false;
  var keyCode = e.keyCode;
  var direction;
  switch (keyCode) {
    case 38:
      direction = "up";
      break;
    case 40:
      direction = "down";
      break;
    case 37:
      direction = "left";
      break;
    case 39:
      direction = "right";
      break;
  }
  if(direction === "right") {
    //将原画布图像擦除
    context.clearRect(0, 0, canvas.width, canvas.height);
    //控制人物左右切换移动，第一步总是最开始的一步
    if(!(runner.flag == "right")){
      runner.srx = 0;
      runner.flag = "right";
    }
    //修改截图的位置，确定所画人物在画布的位置
    runner.sry = 83;
    runner.srx += 51;
    if(runner.srx >= 450) {
      runner.srx = 0;
    }
    runner.x += 15;
    if(runner.x >= 800) {
      runner.x = 0;
    }
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(runnerImg, runner.srx, runner.sry, runner.swidth, runner.sheight,
       runner.x, runner.y, runner.width, runner.height);
  }
  if(direction === "left") {
    if(!(runner.flag == "left")){
      runner.srx = 413;
      runner.flag = "left";
    }
    //将原画布图像擦除
    context.clearRect(0, 0, canvas.width, canvas.height);
    //修改截图的位置，确定所画人物在画布的位置
    runner.sly = 0;
    runner.slx -= 51;
    // console.log(runner.slx);
    if (runner.slx < 0) {
      runner.slx = 413;
    }
    runner.x -= 15;
    if(runner.x <= 0) {
      runner.x = 800;
    }
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(runnerImg, runner.slx, runner.sly, runner.swidth, runner.sheight,
       runner.x, runner.y, runner.width, runner.height);
  }

  document.addEventListener('keyup',function(e) {
    runner.stop = true;
    if(runner.flag == 'right') {
      runner.srx = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(backgroundImg, 0, 0);
      context.drawImage(runnerImg, runner.srx, runner.sry, runner.swidth, runner.sheight,
         runner.x, runner.y, runner.width, runner.height);
    }else if(runner.flag == 'left'){
      runner.slx = 413;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(backgroundImg, 0, 0);
      context.drawImage(runnerImg, runner.slx, runner.sly, runner.swidth, runner.sheight,
         runner.x, runner.y, runner.width, runner.height);
    }

  })


})
