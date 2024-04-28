const gameCanvas = document.getElementById("game_canvas");
const ctx = gameCanvas.getContext("2d");

let cvCentreW = gameCanvas.width / 2
let cvCentreH = gameCanvas.height / 2
//居中位置
//加载所有图片的方法
function ImageOnload(imageArrays, DrawFun) {
	console.log(DrawFun);
	imageArrays.forEach((e) => {
		console.log(e);
		if (Array.isArray(e)) {
			e.forEach((i) => {
				i.onload = function () {
					console.log("加载完毕");
					DrawFun();
				};
				// console.log(1);
			});
		} else {
			e.onload = function () {
				console.log("加载完毕");
				DrawFun();
			};
		}
	});
}

let P1scoreE = document.querySelector("#p1");
let P2scoreE = document.querySelector("#p2");

// 两种状态，常规跟张嘴

let P1_State_0 = new Image();
let P1_State_1 = new Image();

P1_State_0.src = "./img/cat/cat1-0.png";
P1_State_1.src = "./img/cat/cat1-1.png";

// --------------------------
let P2_State_0 = new Image();
let P2_State_1 = new Image();

P2_State_0.src = "./img/cat/cat1-0.png";
P2_State_1.src = "./img/cat/cat1-1.png";

//----------------------------
let P1_Image = [P1_State_0, P1_State_1];
let P2_Image = [P2_State_0, P2_State_1]; // 同上

let playerWidth = 100;
let playerHeight = 100;

let playerAll_Y = 720 - playerHeight * 2; //角色在画布上的Y值

let player1X = 1280 / 2 - playerWidth * 5;
let player2X = 1280 / 2 + playerWidth * 3;

// ImageOnload([P1_Image, P2_Image], Draw); // load

let player1 = {
	images: P1_Image, // 假设P1_Image是一个包含默认和张嘴动作图片的数组
	isMouthOpen: false, // 跟踪玩家是否张嘴
	mouthOpenDuration: 0, // 张嘴动作的持续时间
	mouthOpenMaxDuration: 500, // 张嘴动作的最大持续时间，以毫秒为单位
};

let player2 = {
	images: P2_Image, // 假设P1_Image是一个包含默认和张嘴动作图片的数组
	isMouthOpen: false, // 跟踪玩家是否张嘴
	mouthOpenDuration: 0, // 张嘴动作的持续时间
	mouthOpenMaxDuration: 500, // 张嘴动作的最大持续时间，以毫秒为单位
};

let fishArry = [];

let newFishImage = new Image();
newFishImage.src = "./img/fish/yu.png";
newFishImage.onload = function () {
	// 可以在图片加载完成后开始生成鱼
	startGeneratingFish();
};

// 设置鱼的宽度和高度
let fishWidth = 50;
let fishHeight = 50;

let dropSpeed = 3;
//鱼掉落的速度
let refresh = 10;
//画面刷新的速度

let randomNewFishTime = 700;
// 生成鱼的函数
function startGeneratingFish() {
	setInterval(() => {
		let newFish = {
			X: 0,
			Y: 0,
			I: newFishImage,
			sorce: 1,
			m: new Audio('./audio/chicken/j.mp3')
		};
		newFish.X = Math.floor(Math.random() * (gameCanvas.width - fishWidth)); // 确保鱼不会出现在画布之外
		newFish.Y = 0; // 从顶部开始掉落
		// console.log(newFish.m);
		fishArry.push(newFish);
	}, randomNewFishTime); // 每秒生成一个鱼
}

// 更新画面
function updateAndDrawFish() {
	// ctx.scale(-1, 1);
	ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	//画p1 默认位置
	// ctx.drawImage(P1_Image[0], player1X, playerAll_Y, playerWidth, playerWidth);
	//画p2 默认位置
	// ctx.drawImage(P2_Image[0], player2X, playerAll_Y, playerWidth, playerWidth);
	fishArry.forEach((fish, index) => {
		fish.Y += dropSpeed; // 更新鱼的位置，使其往下掉落（你可以调整这个值来改变掉落速度）
		if (fish.Y > gameCanvas.height - fishHeight) {
			// 当鱼掉落到画布底部时
			fishArry = fishArry.filter((f) => f !== fish); // 从数组中移除鱼
			if (!gameinvincible) {
				//判断是否是无敌模式，如果是的话就算了否则输
				console.log("输了"); // 当任何一个鱼掉落到画布底部时打印"输了"
				clearInterval(gameupdatesetInterval)
				ctx.font = "50px Arial"
				ctx.textAlign = "center"
				let text = "你鱼掉了"
				let bw = 120;
				let bh = 60;
				ctx.fillText(text, cvCentreW, cvCentreH)

				// 绘制按钮背景  
				ctx.fillStyle = '#fff'; // 设置按钮背景颜色  
				ctx.fillRect(cvCentreW - bw / 2, cvCentreH + bh, bw, bh);

				// 绘制按钮边框（可选）  
				ctx.strokeStyle = '#000'; // 设置边框颜色  
				ctx.setLineDash([5, 10]);
				ctx.lineWidth = 2; // 设置边框宽度  
				ctx.strokeRect(cvCentreW - bw / 2, cvCentreH + bh, bw, bh);

				// 设置字体样式  
				ctx.font = '16px Arial'; // 设置字体和大小  
				ctx.fillStyle = '#000'; // 设置文本颜色  
				ctx.textAlign = 'center'; // 文本水平居中  
				ctx.textBaseline = 'middle'; // 文本垂直居中  

				// 填写按钮上的文本  
				var buttonText = '重新开始(X)';
				ctx.fillText(buttonText, cvCentreW - bw / 2 + bw / 2, cvCentreH + bh + bh / 2);
				document.addEventListener("keydown", (e) => {
					if (e.key == "x") {
						location.reload()
					}
				})
			}
		}
		//判断一号玩家的
		else if (
			fish.Y > playerAll_Y - 20 &&
			fish.X > player1X &&
			fish.X < player1X + playerWidth
		) {
			//如果x等于玩家的
			player1.isMouthOpen = true;
			player1.mouthOpenDuration = 0;
			fish.m.play()
			// console.log();
			fishArry.splice(index, 1)
			// P1scoreE.innerHTML = p1score += fish.sorce;

		}
		//判断二号
		else if (
			fish.Y > playerAll_Y - 20 &&
			fish.X > player2X &&
			fish.X < player2X + playerWidth
		) {
			player2.isMouthOpen = true;
			player2.mouthOpenDuration = 0
			fish.m.play();
			fishArry.splice(index, 1)
			// P2scoreE.innerHTML = p2score += fish.sorce;
		} else {
			ctx.drawImage(fish.I, fish.X, fish.Y, fishWidth, fishHeight); // 绘制鱼
		}
	});

	if (player1.isMouthOpen) {
		DrawPlayerD(1);
		// ctx.drawImage(player1.images[1], player1X, playerAll_Y, playerWidth, playerHeight);
		player1.mouthOpenDuration += 30;
		if (player1.mouthOpenDuration >= player1.mouthOpenMaxDuration) {
			player1.isMouthOpen = false;
		}
	} else {
		// 非张嘴状态，绘制默认图片
		// ctx.drawImage(player1.images[0], player1X, playerAll_Y, playerWidth, playerHeight);
		DrawPlayerD(1);
	}

	if (player2.isMouthOpen) {
		DrawPlayerD(2);
		player2.mouthOpenDuration += 30;
		if (player2.mouthOpenDuration >= player1.mouthOpenMaxDuration) {
			player2.isMouthOpen = false;
		}
	} else {
		DrawPlayerD(2);
	}

	if (iswall) {
		ctx.beginPath();
		ctx.moveTo(gameCanvas.width / 2, gameCanvas.height / 2);
		ctx.lineTo(gameCanvas.width / 2, gameCanvas.height / 2 + 100);
		ctx.setLineDash([5, 10]);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}

	//  ctx.drawImage(P1_Image[0], player1X, playerAll_Y, playerWidth, playerWidth);
}

gameupdatesetInterval = setInterval(updateAndDrawFish, refresh); //



function Draw() {
	// console.log("p1x位置", player1X);
}


function DrawPlayerD(playerid) {
	let PlayerIamageindex = 0;//玩家的图片id
	if (playerid == 1) {
		PlayerIamageindex = player1.isMouthOpen ? 1 : 0;
		//直接判断id
		if (P1_direction == 1 || P1_directionLast == 1) {
			ctx.drawImage(player1.images[PlayerIamageindex], player1X, playerAll_Y, playerWidth, playerHeight);
		} else
			if (P1_direction == -1 || P1_directionLast == -1) {
				//如果左边朝向
				ctx.save();
				ctx.translate(player1X, playerAll_Y);
				ctx.scale(-1, 1);
				ctx.translate(-playerWidth, 0);
				ctx.drawImage(player1.images[PlayerIamageindex], 0, 0, playerWidth, playerHeight);
				ctx.restore();
			} else {
				//正常绘制
				ctx.drawImage(player1.images[PlayerIamageindex], player1X, playerAll_Y, playerWidth, playerHeight);

			}
	} else if (playerid == 2) {
		PlayerIamageindex = player2.isMouthOpen ? 1 : 0;
		//直接判断id
		if (P2_direction == 1 || P2_directionLast == 1) {
			ctx.drawImage(player2.images[PlayerIamageindex], player2X, playerAll_Y, playerWidth, playerHeight);
		} else
			if (P2_direction == -1 || P2_directionLast == -1) {
				//如果左边朝向
				ctx.save();
				ctx.translate(player2X, playerAll_Y);
				ctx.scale(-1, 1);
				ctx.translate(-playerWidth, 0);
				ctx.drawImage(player2.images[PlayerIamageindex], 0, 0, playerWidth, playerHeight);
				ctx.restore();
			} else {
				//正常绘制
				// console.log("p2正常");
				ctx.drawImage(player2.images[PlayerIamageindex], player2X, playerAll_Y, playerWidth, playerHeight);

			}
	}


	// if(P1_direction==-1){

	// }else if (P1_direction==1){
	//     s
	// }
}
// ctx.scale(1, -1);
// ctx.save(); // 保存当前canvas状态
// ctx.scale(-1, 1); // 水平翻转，x轴缩放为-1，y轴不变
// ctx.drawImage(player2.images[0], -player2X - playerWidth, playerAll_Y, playerWidth, playerHeight); // 注意调整x坐标位置
// ctx.restore(); // 恢复canvas状态
//绘制正向反向


//像素级翻转

// var sourceImageData = ctx.getImageData(player1X, playerAll_Y, playerWidth, playerHeight); // 获取原始图像的像素数据
// var newData = ctx.createImageData(playerWidth, playerHeight); // 创建新的 ImageData 对象

// // 调用函数翻转像素数据
// imageDataHRevert(sourceImageData, newData);

// // 绘制翻转后的图像到 Canvas 上
// ctx.putImageData(newData, 20, playerAll_Y);



/*
翻转
ctx.save();  
ctx.translate(player1X, playerAll_Y);  
ctx.scale(-1, 1);  
ctx.translate(-playerWidth, 0);  
ctx.drawImage(player1.images[0], 0, 0, playerWidth, playerHeight);  
ctx.restore();

*/