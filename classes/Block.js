export default class Block {
    constructor(positionXStart, positionXEnd, positionY, state) {
        this.positionXStart = positionXStart;
        this.positionXEnd = positionXEnd;
        this.positionY = positionY;
        this.state = state;
    }

    positionXStart() {
        return this.positionXStart;
    }


    positionXEnd() {
        return this.positionXEnd;
    }


    positionY() {
        return this.positionY;
    }

    state() {
        return this.state;
    }
}
