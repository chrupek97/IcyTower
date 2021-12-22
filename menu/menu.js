document.addEventListener("DOMContentLoaded", () => {
    const rightFace = document.querySelector("#right-face");
    const leftFace = document.querySelector("#left-face");
    const gameTitle = document.querySelector(".game-title");
    const navigationTabs = document.querySelectorAll(".navigation a");

    let currOption = 0;

    navigationTabs[currOption].classList.add('active');
    console.log(navigationTabs)

    const facesInterval = setInterval(() => {
        rightFace.classList.toggle('rescale');
        leftFace.classList.toggle('rescale');
        gameTitle.classList.toggle('rescale');
    }, 100);

    control = (e) => {
        let prevCurrOption = currOption;

        if(e.keyCode === 40){
            currOption += 1;
            if(currOption > 3) currOption = 0            
        } else if(e.keyCode === 38){
            currOption -= 1;
            if(currOption < 0) currOption = 3;
        }
        
        navigationTabs[prevCurrOption].classList.remove('active');
        navigationTabs[currOption].classList.add('active')
    }

    document.addEventListener('keydown', control);

    
});