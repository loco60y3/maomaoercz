// function isImage(obj) {  
//     return obj && obj.constructor === Image;  
// }  

// 玩家分数（暂时）
let p1score = 0;
let p2score = 0;
const playerscore = document.querySelector("#playerscore");
const title = document.querySelector('#title');
let pattern;

//移动方向在此定义，原因是元素绘制朝向需要

let P1_direction = 0;
let P2_direction = 0;
// -1表示向左移动，1表示向右移动，0表示停止
let P1_directionLast = 0
let P2_directionLast = 0
// 用于储存最后一次的朝向

//游戏模式，0是积分模式+无尽
let gameMode = 0
let islevel = true;
//是否使用关卡内容？
let isleveloop = true;
//是否无限循环关卡内容
let gameinvincible = true
//是否无敌
let gameupdatesetInterval;
//总刷新器
let iswall = false;
//画布中间，玩家是否有间隔


// console.log(innerHeight);

//横向像素反转
function imageDataHRevert(sourceData, newData) {
    for (var i = 0, h = sourceData.height; i < h; i++) {
        for (j = 0, w = sourceData.width; j < w; j++) {
            newData.data[i * w * 4 + j * 4 + 0] =
                sourceData.data[i * w * 4 + (w - j) * 4 + 0];
            newData.data[i * w * 4 + j * 4 + 1] =
                sourceData.data[i * w * 4 + (w - j) * 4 + 1];
            newData.data[i * w * 4 + j * 4 + 2] =
                sourceData.data[i * w * 4 + (w - j) * 4 + 2];
            newData.data[i * w * 4 + j * 4 + 3] =
                sourceData.data[i * w * 4 + (w - j) * 4 + 3];
        }
    }
    return newData;
}

const mbox = document.querySelector("#MBox");
const myos = document.querySelector("#myos");
const exp = document.querySelector("#exp");

var os = function () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();

let myosType = 0
//设备检测
if (os.isAndroid || os.isPhone) {
    mbox.classList.add("crosswise")
    myos.innerText = "手机端"
    playerscore.parentNode.removeChild(playerscore);
    exp.classList.add("phone")
    exp.innerHTML = `
     难玩模式：<input id="pattern" checked="true" class="bty-switch" type="checkbox" />
    长按这里左滑到侧栏，右滑回来（以后用于参数调整）
     `
    myosType = 0
    pattern = document.querySelector("#pattern")

    pattern.addEventListener("change", () => {
        if (!pattern.checked) {
            setTimeout(() => {
                pattern.checked = true
            }, 600);
            
        }
    })

    console.log(pattern);
} else if (os.isTablet) {
    mbox.classList.add("crosswise")
    myos.innerText = "平板"
    myosType = 1
    // exp.parentNode.removeChild(exp);
} else if (os.isPc) {
    console.log(myos);
    myos.innerText = "电脑端"
    myosType = 2
    touch.parentNode.removeChild(touch)
    // tabls.innerText= "客户端：PC"
} else {
    tabls.innerText = "客户端：无法识别"
    myosType = 3
}



