// 处理

// let levelFile = [
//     { X: 123, Y: 0, sorce: 1, m: -1 },
//     { X: 123, Y: 0, sorce: 1, m: -2 },
//     { X: 155, Y: 0, sorce: 1, m: -3 },
//     { X: 156, Y: 0, sorce: 1, m: -4 },
//     { X: 123, Y: 0, sorce: 1, m: -5 },
//     { X: 500, Y: 0, sorce: 1, m: -6 },
//     { X: 588, Y: 0, sorce: 1, m: -7 },
//     { X: 588, Y: 0, sorce: 1, m: 1 },
//     { X: 588, Y: 0, sorce: 1, m: 2 },
//     { X: 588, Y: 0, sorce: 1, m: 3 },
//     { X: 12, Y: 0, sorce: 1, m: 4 },
//     { X: 32, Y: 0, sorce: 1, m: 5 },
//     { X: 23, Y: 0, sorce: 1, m: 6 },
//     { X: 2, Y: 0, sorce: 1, m: 7 },
// ]

let levelFile = [
    { X: 500, Y: 0, sorce: 1, m: -5, l: true },
    { X: 500, Y: 0, sorce: 1, m: -5, l: true },
    { X: 500, Y: 0, sorce: 1, m: -6, l: true },
    { X: 500, Y: 0, sorce: 1, m: -5, l: true },
    { X: 500, Y: 0, sorce: 1, m: 1, l: true },
    { X: 500, Y: 0, sorce: 1, m: -7, l: true },
    { X: 500, Y: 0, sorce: 1, m: -5, l: true },
    { X: 500, Y: 0, sorce: 1, m: -5, l: true },
    { X: 500, Y: 0, sorce: 1, m: -6, l: true },
    { X: 500, Y: 0, sorce: 1, m: -5, l: true },
    { X: 500, Y: 0, sorce: 1, m: 2, l: true },
    { X: 500, Y: 0, sorce: 1, m: 1, l: true },
]

//在这进来先看一遍m

levelFile.forEach(e => {
    let audioPath = `./audio/chicken/j${e.m}.wav`
    e.m = new Audio(audioPath)
});


// let newFish = {
//     X: 0,
//     Y: 0,
//     I: newFishImage,
//     sorce: 1,
//     m:new Audio('./audio/chicken/j.mp3')
//   };