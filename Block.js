export default class Block {
    
    constructor(positionXStart, positionXEnd, positionY){
        this.positionXStart = positionXStart;
        this.positionXEnd = positionXEnd;
        this.positionY = positionY;
    }

    positionXStart(){
        return this.positionXStart;
    }

    
    positionXEnd(){
        return this.positionXEnd;
    }

    
    positionY(){
        return this.positionY;
    }
}