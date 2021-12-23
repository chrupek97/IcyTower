export default class Character {
    constructor(positionX, positionY, isJumping, img, minLeft, maxLeft) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.isJumping = isJumping;
        this.img = img;
        this.minLeft = minLeft;
        this.maxLeft = maxLeft;
        this.blocks = [];
        this.currLvl = 0;
        this.isRunningLeft = false;
        this.isRunningRight = false;
        this.currLvl = 0;
    }

    positionX() {
        return this.positionX;
    }

    setPositionX = (positionX) => {
        this.positionX = positionX;
    }

    positionY() {
        return this.positionY;
    }

    setPositionY(positionY) {
        this.positionY = positionY;
    }

    isJumping() {
        return this.isJumping;
    }

    setIsJumping = (isJumping) => {
        this.isJumping = isJumping;
    }

    isRunningLeft = () => {
        return this.isRunningLeft;
    }

    setIsRunningLeft = (isRunningLeft) => {
        this.isRunningLeft = isRunningLeft;
    }

    isRunningRight() {
        return this.isRunningRight;
    }

    setIsRunningRight = (isRunningRight) => {
        this.isRunningRight = isRunningRight;
    }

    img() {
        return this.img;
    }

    setImg = (imgUrl) => {
        this.img.src = imgUrl;
    }

    hitColumn() {
        return this.hitColumn;
    }

    setHitColumn = (column) => {
        this.hitColumn = column;
    }

    points() {
        return this.points;
    }

    setPoints = (points) => {
        this.points = points;
    }

    moveLeft = (acc) => {
        this.positionX -= 20 * acc;

        if (this.positionX <= this.minLeft) {
            this.positionX += 60;
            this.hitColumn = 'left';
        } else {
            this.hitColumn = false;
        }

        this.isOnBlock();
        this.updatePosition();
    }

    moveRight = (acc) => {
        this.positionX += 20 * acc;

        if (this.positionX >= this.maxLeft) {
            this.positionX -= 60;
            this.hitColumn = 'right';
        } else {
            this.hitColumn = false;
        }

        this.isOnBlock();
        this.updatePosition();
    }

    moveUp = (boost) => {
        const maxHeight = window.innerHeight;
        this.positionY += maxHeight / boost;

        this.updatePosition();
    }

    moveDown = (blocks) => {
        let characterJumpOnElem = false;

        let blockTop = 0;
        const jumpInterval = setInterval(() => {
            this.positionY -= 10;


            if (!characterJumpOnElem) {
                for (let i = blocks.length - 1; i > 0; i--) {
                    const currBlock = blocks[i];
                    const colContainerWidth = document.querySelector('.left-col').offsetWidth;

                    console.log(this.positionX)
                    console.log(currBlock.positionXStart)
                    console.log(currBlock.positionXEnd)

                    if ((this.positionY >= currBlock.positionY && !currBlock.state)
                        && this.positionX >= currBlock.positionXStart + colContainerWidth
                        && this.positionX <= currBlock.positionXEnd + colContainerWidth) {

                        blockTop = currBlock.positionY;
                        characterJumpOnElem = true;
                        currBlock.state = true;
                        this.currLvl += 1;
                        this.blocks.push(currBlock);
                        break;
                    } else {
                        characterJumpOnElem = false;
                        blockTop = 0;
                        currBlock.state = false;
                    }
                }
            }

            this.img.style.bottom = `${this.positionY}px`;

            if (this.positionY <= blockTop) {
                clearInterval(jumpInterval);
                this.isJumping = false;
                characterJumpOnElem = false;
            }

        }, 10);
    }

    isOnBlock = () => {
        console.log(this.blocks[this.currLvl - 1]);
    }

    updatePosition = () => {
        this.img.style.position = 'fixed';
        this.img.style.left = `${this.positionX}px`;
        this.img.style.bottom = `${this.positionY}px`;
        console.log(this.img)
    }

    addBlock = (block) => {
        this.blocks.push(block);
    }

    removeBlock = (index) => {
        this.blocks.splice(index, 1);
    }
}