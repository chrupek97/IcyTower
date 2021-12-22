const OPTIONS = {
    musicOn: false,
    level: 1,
    characterSpeed: 1,
    character: 1
};

window.addEventListener("DOMContentLoaded", async () => {
    const rightFace = document.querySelector("#right-face");
    const leftFace = document.querySelector("#left-face");
    const pageTitle = document.querySelector(".page-title");
    const navigationTabs = document.querySelectorAll(".left-side");

    /**** OPTIONS ****/
    changeLvl = () => {
        for (let i = 1; i <= 3; i++) {
            const currLvlContainer = document.querySelector(`#lvl-${i}`);
            currLvlContainer.classList.remove('active');
        }

        document.querySelector(`#lvl-${OPTIONS.level}`).classList.add('active');
    }

    changeCharacterSpeed = () => {
        for (let i = 1; i <= 3; i++) {
            const currCharacterSpeedContainer = document.querySelector(`#character-speed-${i}`);
            currCharacterSpeedContainer.classList.remove('active');
        }

        document.querySelector(`#character-speed-${OPTIONS.characterSpeed}`).classList.add('active');
    }

    const musicStatus = document.querySelector("#music-status");
    changeLvl();
    changeCharacterSpeed();

    let currOption = 0;

    navigationTabs[currOption].classList.add('active');

    const facesInterval = setInterval(() => {
        rightFace.classList.toggle('rescale');
        leftFace.classList.toggle('rescale');
        pageTitle.classList.toggle('rescale');
    }, 100);


    control = (e) => {
        let prevCurrOption = currOption;

        if (e.keyCode === 40) {
            currOption += 1;
            if (currOption > 4) currOption = 0
        } else if (e.keyCode === 38) {
            currOption -= 1;
            if (currOption < 0) currOption = 4;
        } else if (e.keyCode === 13) {
            switch (currOption) {
                case 0:
                    musicStatus.innerHTML == "ON" ? OPTIONS.musicOn = true : OPTIONS.musicOn = false;
                    musicStatus.innerHTML == "ON" ? musicStatus.innerHTML = "OFF" : musicStatus.innerHTML = "ON"
                    break;
                case 1:
                    if (OPTIONS.level === 3) OPTIONS.level = 0;
                    OPTIONS.level += 1;
                    changeLvl();
                    break;
                case 2:
                    if (OPTIONS.characterSpeed === 3) OPTIONS.characterSpeed = 0;
                    OPTIONS.characterSpeed += 1;
                    changeCharacterSpeed();
                    break;
                case 4:
                    clearInterval(facesInterval);
                    localStorage.setItem("options", JSON.stringify(OPTIONS));
                    window.location.href = "../menu/menu.html";
                    break;
            }
        }

        navigationTabs[prevCurrOption].classList.remove('active');
        navigationTabs[currOption].classList.add('active');
    }

    document.addEventListener('keydown', control);
});
