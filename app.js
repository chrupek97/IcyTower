document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character');
    const blocks = document.querySelector('.block');
    const img = document.createElement('img');
    let mainContainer = document.querySelector('.main');

    let hitColumn = false;

    let left = 0;
    let bottom = 0;
    let isRightRunning = false;
    let isLeftRunning = false;
    let isJumping = false;

    img.classList.add('character-container');
    img.src = 'images/hero-right.png';
    img.height = '100'

    // var audio = new Audio('music/main-music.mp3');
    // audio.volume = 0.1;
    // audio.play();

    character.appendChild(img);

    keyUpControl = (e, acc) => {
        if (e.keyCode === 39) {
            img.src = 'images/hero-right.png'
            moveRight(acc);
        } else if (e.keyCode === 32) {
            isJumping = true;
            moveUp(1);
        } else if (e.keyCode === 37) {
            img.src = 'images/hero-left.png'
            moveLeft(acc);
        } else {
            isRightRunning = false;
            isLeftRunning = false;
        }
    }

    keyDownControl = (e, acc) => {
        if (e.keyCode === 39) {
            isRightRunning = true;
            moveRight(acc);

            if (isRightRunning) {
                setTimeout(() => { img.src = `images/hero-right-run-1.png` }, 20);
            }
            img.src = 'images/hero-right.png'
        } else if (e.keyCode === 37) {
            isLeftRunning = true;
            moveLeft(acc);

            if (isLeftRunning) {
                setTimeout(() => { img.src = `images/hero-left-run-1.png` }, 20);
            }
            img.src = 'images/hero-left.png'

            isRightRunning = false;
        } else {
            isRightRunning = false;
            isLeftRunning = false;
        }
    }

    isColumnHit = () => {
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

    document.addEventListener('keyup', (e) => keyUpControl(e, 0.8));
    document.addEventListener('keydown', (e) => keyDownControl(e, 1.5));
    document.addEventListener('keyup', isColumnHit)

    moveRight = (acc) => {
        if (left < window.innerWidth - 1250) {
            left += 20 * acc;
            img.style.left = `${left}px`;
            hitColumn = false;
        } else {
            hitColumn = 'right';
        }
    }

    moveLeft = (acc) => {
        if (left > 1240 - window.innerWidth) {
            console.log(left)
            left -= 20 * acc;
            img.style.left = `${left}px`;
            hitColumn = false;
        } else {
            hitColumn = 'left';
        }
    }

    //podwójny skok
    moveUp = (boost) => {
        if (isJumping == true) {
            bottom += 400;
            left += 10;
            img.style.bottom = `${bottom}px`;
            isJumping = false;
        }

        let jumpInterval = setInterval(() => {
            bottom -= 20;
            img.style.bottom = `${bottom}px`;

            if (bottom < 20) {
                clearInterval(jumpInterval);
            }
        }, 20);
    }



    generateBlock = (max, min, containerNumber) => {
        const width = Math.random() * (max - min) + min;
        const maxHeight = window.innerHeight;
        const maxWidth = window.innerWidth;
        const containerSize = Math.floor(maxHeight / 5);
        const maxTop = containerNumber * containerSize + 1;
        const minTop = containerNumber * containerSize;

        const maxLeft = maxWidth - 800;
        const minLeft = maxWidth - 1600;

        const positionTop = Math.random() * (maxTop - minTop) + minTop;
        const positionLeft = Math.random() * (maxLeft - minLeft) + minLeft;

        const block = document.createElement('div');

        block.classList.add('block');
        block.style.width = `${width}px`;
        block.style.top = `${positionTop}px`;
        block.style.left = `${positionLeft}px`;
        mainContainer.appendChild(block);
    }

    generateBlock(400, 150, 0);
    generateBlock(400, 150, 1);
    generateBlock(400, 150, 2);
    generateBlock(400, 150, 3);
    generateBlock(400, 150, 4);

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