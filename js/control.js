

let playerSpeed = 10;
let playerMaxX = 1280;
let playerMinX = 0;
let player1MinX = 0;
let player2MinX = iswall ? playerMaxX / 2 : 0; // 玩家2可以移动到的最小X值

let player1MaxX = iswall ? playerMaxX / 2 - playerWidth : playerMaxX - playerWidth;
let player2MaxX = playerMaxX - playerWidth;


let P1_intervalId = null;
let P2_intervalId = null;
let p1move = {
    isTouch: false,
    TouchMove: 0,
    beginTouchMove: 0
}
let p2move = {
    TouchMove: 0,
    beginTouchMove: 0,
    isTouch: false,
}

const touchPoints = [];
if (myosType != 2) {
    const touch = document.querySelector("#touch");
    touch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            if (i < 2) {
                const touchPoint = document.createElement('div');
                // console.log(touches[i].pageY);

                //在这就知道p1p2了
                if (touches[i].pageY < innerHeight / 2) {
                    touchPoint.classList.add('touchPointP1');
                    p1move.beginTouchMove = touches[i].pageY
                    p1move.TouchMove = 0;
                    touchPoint.setAttribute('data-playerid', "p1");
                    p1move.isTouch = true;
                } else {
                    touchPoint.classList.add('touchPointP2');
                    p2move.TouchMove = 0;
                    p2move.beginTouchMove = touches[i].pageY
                    touchPoint.setAttribute('data-playerid', "p2");
                    p2move.isTouch = true;
                }
                // touchPoint.classList.add('touchPointP1');
                touchPoint.style.left = touches[i].pageX - 15 + 'px';
                touchPoint.style.top = touches[i].pageY - 15 + 'px';
                touch.appendChild(touchPoint);
                touchPoints.push(touchPoint);
            }
        }
    });
    touch.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touches = e.touches;
        const validTouches = [];
    
        for (let i = 0; i < touches.length; i++) {
            if (validTouches.length < 2) {
                validTouches.push(touches[i]);
            }
        }
    
        for (let i = 0; i < validTouches.length; i++) {
            touchPoints[i].style.left = validTouches[i].pageX - 15 + 'px';
            touchPoints[i].style.top = validTouches[i].pageY - 15 + 'px';
    
            if (touchPoints[i].getAttribute("data-playerid") == "p1") {
                if (validTouches[i].pageY < p1move.TouchMove) {
                    // Finger moved left
                    player1X-=playerSpeed; // Decrease playe1rx when moving left
                } else if (validTouches[i].pageY > p1move.TouchMove) {
                    // Finger moved right
                    player1X+=playerSpeed; // Increase playe1rx when moving right
                }
                p1move.TouchMove = validTouches[i].pageX;
            }
        }
    
        // Perform any additional actions based on the movement direction if needed
    });

    touch.addEventListener('touchend', (e) => {
        const currentTouches = e.changedTouches;
        const touchPointsToRemove = [];
        // 遍历当前的触摸点  
        for (let i = 0; i < currentTouches.length; i++) {
            // 检查每个触摸点是否在我们的列表中  
            const touchPointIndex = touchPoints.findIndex(tp => tp === touchPoints[i]);

            // 如果找到了对应的触摸点，并且它是需要移除的（即，不再触摸屏幕）  
            if (touchPointIndex !== -1) {
                touchPointsToRemove.push(touchPointIndex);
            }
        }
        // 移除那些不再触摸屏幕的触摸点  
        for (let i = touchPointsToRemove.length - 1; i >= 0; i--) {
            const index = touchPointsToRemove[i];
            touchPoints[index].remove();
            // title.innerText = index
            console.log(touchPoints[index].getAttribute("data-playerid"))
            if (touchPoints[index].getAttribute("data-playerid") == "p1") {
                console.log("p1离开了");
                p1move.isTouch = false;
            } else if (touchPoints[index].getAttribute("data-playerid") == "p2") {
                console.log("p2离开了");
                p2move.isTouch = false;
            }
            touchPoints.splice(index, 1); // 从数组中移除元素  
        }
    });
}
//手指触摸


//但是还是会有越界的情况，放一个检测是否越界的

setInterval(() => {
    if (player1X < player1MinX) player1X = playerMinX
    if (player1X > player1MaxX) player1X = player1MaxX
    if (player2X < player2MinX) player2X = player2MinX
    if (player2X > player2MaxX) player2X = player2MaxX
}, 50);


document.addEventListener("keydown", function (e) {
    // console.log(player1MaxX,player1MinX);
    e.preventDefault();
    switch (e.key) {
        case 'a':
            P1_direction = -1;
            P1_directionLast = -1
            if (!P1_intervalId) {
                P1_intervalId = setInterval(function () {
                    if (player1X + P1_direction * playerSpeed >= player1MinX) {
                        player1X += P1_direction * playerSpeed;

                        Draw();
                    }
                }, 10);
            }
            break;
        case 'd':
            P1_direction = 1;
            P1_directionLast = 1
            if (!P1_intervalId) {
                P1_intervalId = setInterval(function () {
                    if (player1X + P1_direction * playerSpeed <= player1MaxX) {
                        player1X += P1_direction * playerSpeed;
                        Draw();
                    }
                }, 10);
            }
            break;
        case 'ArrowLeft':
            P2_direction = -1;
            P2_directionLast = -1;
            if (!P2_intervalId) {
                P2_intervalId = setInterval(function () {
                    if (player2X + P2_direction * playerSpeed >= player2MinX) {
                        player2X += P2_direction * playerSpeed;
                        Draw();
                    }
                }, 10);
            }
            break;
        case 'ArrowRight':
            P2_direction = 1;
            P2_directionLast = 1;
            if (!P2_intervalId) {
                P2_intervalId = setInterval(function () {
                    if (player2X + P2_direction * playerSpeed <= player2MaxX) {
                        player2X += P2_direction * playerSpeed;
                        Draw();
                    }
                }, 10);
            }
            break;
        case "F5":
            location.reload();
            break;
        default:
            // 其他按键不做处理
            break;
    }
});

document.addEventListener("keyup", function (e) {
    e.preventDefault();
    switch (e.key) {
        case 'a':
            if (P1_direction === -1) {
                P1_direction = 0;
                clearInterval(P1_intervalId);
                P1_intervalId = null;
            }
            break;
        case 'd':
            if (P1_direction === 1) {
                P1_direction = 0;
                clearInterval(P1_intervalId);
                P1_intervalId = null;
            }
            break;
        case 'ArrowLeft':
            if (P2_direction === -1) {
                P2_direction = 0;
                clearInterval(P2_intervalId);
                P2_intervalId = null;
            }
            break;
        case 'ArrowRight':
            if (P2_direction === 1) {
                P2_direction = 0;
                clearInterval(P2_intervalId);
                P2_intervalId = null;
            }
            break;
        default:
            // 其他按键不做处理
            break;
    }
});