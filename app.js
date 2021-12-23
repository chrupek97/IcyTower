import Block from "./classes/Block.js";
import Character from "./classes/Character.js";

function keyUpControl(e, acc, keyPressed, character, blocks) {
    keyPressed[`keyCode${e.keyCode}`] = false;

    if (e.keyCode === 32 && !character.isJumping) {
        character.setIsJumping(true);
        character.moveUp(3);
        character.moveDown(blocks);
    }
}

function keyDownControl(e, acc, keyPressed, character, blocks) {
    keyPressed[`keyCode${e.keyCode}`] = true;

    if (keyPressed.keyCode32 && keyPressed.keyCode39 && character.isJumping == false) {
        character.setIsJumping(true);
        character.moveRight(6);
        character.moveUp(2);
        character.moveDown(blocks);
    } else if (keyPressed.keyCode32 && keyPressed.keyCode37 && character.isJumping == false) {
        character.setIsJumping(true);
        character.moveLeft(6);
        character.moveUp(2);
        character.moveDown(blocks);
    } else if (keyPressed.keyCode39) {
        character.setIsRunningRight(true);
        character.moveRight(acc);
        console.log(character.positionX)

        if (character.isRunningRight) {
            setTimeout(() => { 
                character.setImg('images/hero-right-run-1.png');
            }, 20);
        }

        character.setImg('images/hero-right.png');
        character.setIsRunningLeft(false);
    } else if (keyPressed.keyCode37) {
        character.setIsRunningLeft(true);
        character.moveLeft(acc);
        console.log(character.positionX)

        if (character.isRunningLeft) {
            setTimeout(() => { 
                character.setImg('images/hero-left-run-1.png');
            }, 20);
        }

        character.setImg('images/hero-left.png');
        character.setIsRunningRight(false);
    } else {
        character.setIsRunningRight(false);
        character.setIsRunningLeft(false);
    }
}

function isColumnHit(hitColumn) {
    if (hitColumn != false) {
        var audio = new Audio('music/column-hit.wav');
        audio.volume = 1;
        audio.play();

        if (hitColumn == 'right') {
            hitColumn = false;
            left -= 100;
            img.style.left = `${left}px`;
        }
        if (hitColumn == 'left') {
            hitColumn = false;
            left += 100;
            img.style.left = `${left}px`;
        }
    }
}


// function moveRight(acc) {
//     if (left < Math.ceil(mainWidth / 2) - colWidth - 50) {
//         left += 20 * acc;
//         img.style.left = `${left}px`;
//         hitColumn = false;
//     } else {
//         hitColumn = 'right';
//     }
// }

// function moveLeft(acc){
//     if (left > colWidth - Math.floor(mainWidth / 2) + 50) {
//         left -= 20 * acc;
//         img.style.left = `${left}px`;
//         hitColumn = false;
//     } else {
//         hitColumn = 'left';
//     }
// }

// function moveUp(boost) {
//     const maxHeight = window.innerHeight;
//     bottom += maxHeight / boost;
//     left += 20;
//     img.style.bottom = `${bottom}px`;
// }

// function moveDown() {
//     let characterJumpOnElem = false;

//     blockTop = 0;
//     let jumpInterval = setInterval(() => {
//         bottom -= 10;

//         if (!characterJumpOnElem) {
//             for (let i = blocks.length - 1; i > 0; i--) {
//                 const currBlock = blocks[i];

//                 const colContainerWidth = document.querySelector('.left-col').offsetWidth;
//                 const mainContainerWidth = mainContainer.offsetWidth - (2 * colContainerWidth);

//                 console.log((Math.floor(mainContainerWidth / 2) + left - 50));
//                 console.log(currBlock.positionXStart);
//                 console.log(currBlock.positionXEnd)
//                 if ((bottom >= currBlock.positionY && !currBlock.state)
//                     && ((Math.floor(mainContainerWidth / 2) + left) >= currBlock.positionXStart)
//                     && ((Math.floor(mainContainerWidth / 2) + left) <= currBlock.positionXEnd)) {
//                     console.log('xd')
//                     minPositionCharacter = currBlock.positionXStart;
//                     maxPostionCharacter = currBlock.positionXEnd;
//                     blockTop = currBlock.positionY;
//                     characterJumpOnElem = true;
//                     currBlock.state = true;
//                     currLvl += 1;
//                     break;
//                 } else {
//                     characterJumpOnElem = false;
//                     blockTop = 0;
//                     currBlock.state = false;
//                 }
//             }
//         }
//         img.style.bottom = `${bottom}px`;

//         //const playerIsOnBlock = checkBlock();

//         if (bottom <= blockTop) {
//             clearInterval(jumpInterval);
//             isJumping = false;
//             characterJumpOnElem = false;
//         }

//     }, 10);
// }

function generateBlock(mainContainer, blocks, max, min, containerNumber) {
    const width = Math.random() * (max - min) + min;
    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;
    const containerSize = Math.floor(maxHeight / 5);
    const maxTop = containerNumber * containerSize + 1;
    const minTop = containerNumber * containerSize;

    const minLeft = document.querySelector('.left-col').offsetWidth + 100;
    const maxLeft = maxWidth - minLeft - width - 100;

    const positionTop = Math.random() * (maxTop - minTop) + minTop;
    const positionLeft = Math.random() * (maxLeft - minLeft) + minLeft;

    const block = document.createElement('div');

    block.classList.add('block');
    block.style.width = `${width}px`;
    block.style.top = `${positionTop}px`;
    block.style.left = `${positionLeft}px`;
    mainContainer.appendChild(block);

    blocks.push(new Block(positionLeft - minLeft, positionLeft + width - minLeft, maxHeight - positionTop, false));
}


document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.querySelector('.character');
    const imgContainer = document.createElement('img');
    const mainContainer = document.querySelector('.main');

    const mainWidth = document.querySelector('.main').offsetWidth;
    const colWidth = document.querySelector('.left-col').offsetWidth;
    const charWidth = document.querySelector('.character').offsetWidth;

    const positionX = (mainWidth - 2 * colWidth) / 2 - charWidth / 2;
    imgContainer.src = 'images/hero-right-run-1.png';
    imgContainer.height = '100';

    const character = new Character(positionX, 0, false, imgContainer, colWidth - charWidth / 2, mainWidth - colWidth - charWidth);
    character.updatePosition();

    const blocks = [];

    // let minPositionCharacter = 0;
    // let maxPostionCharacter = 0;
    let keyPressed = [];
    let blockTop = 0;

    let hitColumn = false;
    let left = 0;
    let bottom = 0;
    let isRightRunning = false;
    let isLeftRunning = false;
    let isJumping = false;

    // img.classList.add('character-container');
    // img.src = 'images/hero-right.png';
    // img.height = '100'

    // var audio = new Audio('music/main-music.mp3');
    // audio.volume = 0.1;
    // audio.play();

    characterContainer.appendChild(imgContainer);

    document.addEventListener('keyup', (e) => keyUpControl(e, 0.8, keyPressed, character, blocks));
    document.addEventListener('keydown', (e) => keyDownControl(e, 1.5, keyPressed, character, blocks));
    document.addEventListener('keyup', (e) => isColumnHit(hitColumn))


    generateBlock(mainContainer, blocks, 400, 150, 0);
    generateBlock(mainContainer, blocks, 400, 150, 1);
    generateBlock(mainContainer, blocks, 400, 150, 2);
    generateBlock(mainContainer, blocks, 400, 150, 3);
    generateBlock(mainContainer, blocks, 400, 150, 4);

    // let width = 50
    // let height = 50
    // mainContainer.width=600;
    // mainContainer.height=600;
    // let bottom = 0;
    // let left = 0;
    // let gravity = 0.9;
    // let isJumping = false;
    // let isGoingLeft = false;
    // let isGoingRight = false;
    // let rightTimerId = null;
    // let leftTimerId = null;

    // const game = {
    //     gravity: 0.2, // strength per frame of gravity
    //     drag: 0.999, // play with this value to change drag
    //     groundDrag: 0.9, // play with this value to change ground movement
    //     ground: mainContainer.height
    // }
    // const moveflag = false
    // const gameOver = false;

    // class Character {
    //     constructor(x, y, width, height) {
    //         this.x1 = x;
    //         this.y1 = y;
    //         this.boy = 1;
    //         this.width = width;
    //         this.height = height;
    //         this.dx = 0;
    //         this.dy = 0;
    //         this.moveSpeed = 2; //new
    //         this.jumpPower = -7, // power of jump
    //         this.onGround = true
    //         this.numberOfbarriers = 0 // willbe used to calculate score
    //     }

    //     draw() {
    //         var boy = new Image()

    //         if (this.onGround == false && this.dy < 0) {
    //             boy.src = '/images/jump_up' + char1.boy + '.png'
    //         } else if (this.onGround == false && this.dy > 0) {
    //             boy.src = '/images/jump_fall' + char1.boy + '.png'
    //         } else {
    //             if (moveflag == false) {
    //                 boy.src = '/images/standing_frame' + char1.boy + '-' + Math.floor(1 / 10 + 1) + '.png'
    //             } else {
    //                 boy.src = '/images/running_frame' + char1.boy + '-' + Math.floor(1 / 10 + 1) + '.png'
    //             }
    //         }
    //         if (gameOver == true) {
    //             boy.src = '/images/frame-got-hit' + char1.boy + '.png'
    //         }
    //         context.drawImage(boy, this.x1, this.y1, this.width, this.height); // draw image 
    //         j += 1
    //         i += 1
    //         if (Math.floor(i / 10 + 1) >= 7) {
    //             i = 1
    //         }
    //         if (Math.floor(j / 10 + 1) >= 3) {
    //             j = 1
    //         }
    //         // context.fillText(currentScore,250,250);
    //         updateScore.innerHTML = currentScore;
    //         if(currentScore === 1000) {
    //             document.querySelector(".first-badge").style.opacity = "1";
    //         }
    //         if (currentScore === 2000){
    //             document.querySelector(".second-badge").style.opacity = "1";
    //         }
    //         if (currentScore === 3000){
    //             document.querySelector(".third-badge").style.opacity = "1";
    //         }
    //     }

    //     updatePosition() {
    //         // apply gravity drag and move player

    //         if (this.x1 + this.width + this.dx > canvas.width || this.x1 + this.dx < 0) { //detect collision
    //             this.dx = -this.dx;
    //         }
    //         this.x1 += this.dx;
    //         this.y1 += this.dy;

    //         // test ground contact and left and right limits
    //         if (this.y1 + this.height >= game.ground) {
    //             this.y1 = game.ground - this.height;
    //             this.dy = 0;
    //             this.onGround = true;
    //         } else {
    //             this.onGround = false;
    //         }

    //     }
    //     align(x) {

    //         this.y1=this.y1+x;

    //     }
    //     gravity() {
    //         if (this.onGround == false) {
    //             this.dy += game.gravity;
    //             this.dy *= game.drag;
    //         } else {
    //             this.dy = 0
    //         }
    //         this.dx *= this.onGround ? game.groundDrag : game.drag;
    //     }
    //     up() {
    //         this.onGround = false
    //         this.dy = this.jumpPower // to be called when  up arrow is pressed with hight 
    //     }

    //     runLeft() {
    //         this.dx = -this.moveSpeed // to be called when  up arrow is pressed with hight 
    //         moveflag = true
    //     }
    //     runRight() {
    //         this.dx = this.moveSpeed
    //         moveflag = true
    //     }

    // }

    // let char1 = new Character(mainContainer.width / 2 - width / 2, game.ground - height, width, height);
    // char1.draw()

    // const keyboard = (() => {
    //     document.addEventListener("keydown", keyHandler);
    //     document.addEventListener("keyup", keyHandler);
    //     const keyboard = {
    //         right: false,
    //         left: false,
    //         up: false,
    //         esc: false,
    //         any: false,
    //     };

    //     function keyHandler(e) {
    //         const state = e.type === "keydown";
    //         console.log(state)
    //         if (e.keyCode == 39) {
    //             keyboard.right = state;
    //         } else if (e.keyCode == 37) {
    //             moveLeft();
    //             keyboard.left = state;
    //         } else if (e.keyCode == 38) {
    //             keyboard.up = state;
    //             e.preventDefault();
    //         } else if (e.keyCode == 27) {
    //             keyboard.esc = state;
    //             e.preventDefault();
    //         }
    //         if (state) {
    //             keyboard.any = true
    //         } // must reset when used
    //     }
    //     return keyboard;
    // })();






    // moveLeft = () => {
    //     // if (isGoingRight) {
    //     //     clearInterval(rightTimerId);

    //     //     isGoingRight = false;
    //     // }
    //     left -= 20;

    //     isGoingLeft = true;
    //     //character.style.left = `${left}px`;
    // }

    // moveRight = () => {
    //     if (isGoingLeft) {
    //         clearInterval(leftTimerId);
    //         isGoingLeft = false;
    //     }

    //     isGoingRight = true;
    //     rightTimerId = setInterval(() => {
    //         left += 20;
    //         if(left > window.innerWidth - 550){
    //             clearInterval(rightTimerId);
    //         }
    //         character.style.left = `${left}px`;
    //     }, 20);
    // }


    // jump = () => {
    //     if (isJumping) return;
    //     let timerUpId = setInterval(() => {
    //         if (bottom > 250) {
    //             clearInterval(timerUpId);
    //             let timerDownId = setInterval(() => {
    //                 bottom -= 5;

    //                 if (bottom < 0) {
    //                     clearInterval(timerDownId);
    //                     isJumping = false;
    //                     bottom = 0;
    //                 }
    //                 character.style.bottom = `${bottom}px`;
    //             }, 20)
    //         }

    //         isJumping = true;
    //         bottom += 30;
    //         bottom = bottom * gravity;
    //         character.style.bottom = `${bottom}px`;
    //     }, 20);
    // }

    // document.addEventListener('keyup', control);


})