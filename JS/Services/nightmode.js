const btnDarkMode = document.querySelector(".btn-dark-mode")
let darkMode = false;

const getDarkMode = () => {
    return localStorage.getItem('darkMode');
}



const changeMode = () => {
    darkMode = !darkMode;
    if (darkMode == true) {
        localStorage.setItem('darkMode', 'true')
        document.body.classList.add('darkmode')
        btnDarkMode.innerText = 'Modo Diurno';
        document.querySelector('.logoday').classList.add('dis-n')
        document.querySelector('.logodark').classList.remove('dis-n')
    } else {
        localStorage.removeItem('darkMode', 'true');
        document.body.classList.remove('darkmode')
        btnDarkMode.innerText = 'Modo Nocturno';
        document.querySelector('.logoday').classList.remove('dis-n')
        document.querySelector('.logodark').classList.add('dis-n')
    }
}

const validateNocMode = () => {
    if (getDarkMode() == 'true') {
        changeMode()
    }

}




btnDarkMode.addEventListener('click', changeMode)

validateNocMode()