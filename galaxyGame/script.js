let inputData = document.body.querySelectorAll(".input__data");
let inputStarSize = inputData[1].value;

// Отсчёт до конца игры в мс (1000мс = 1с)
let countdown = inputData[0].value * 1000;

//переменная с массивом адресов звёзд, для смены цвета
let starsArray =   ["starYellow.png",
                    "starBlue.png",
                    "starPurple.png"];

//переменная для линковки с html Элементом для подсчёта очков и вывода счёта на экран
let score = document.querySelector(".count");
score = 0;

// Функция для начисления очков за клик по звёздочке.
function addScore() {
    score++;

    //перезапись счёта в связанный html элемент
    document.getElementsByClassName("count")[0].innerHTML = score;
}

// Функция передвижения звёздочки по таймеру и по клику на неё
function moveStar(){

    // перемещение звёздочки происходит путём перезаписи её координат в CSS (top, left - px)
    let starPosition = document.body.querySelector("#stars");

    //изменение позиции звёздочки относительно её родитея по вертикали и горизонтали
    starPosition.style.top = Math.random()*500+'px';
    starPosition.style.left = Math.random()*1300+'px';

    // генерация случайного числа для смены цвета звёздочки
    // ----------------------------------------------------------
    let randomNum = Math.floor(Math.random()*starsArray.length);
    let newStar = starsArray[randomNum];
    // ----------------------------------------------------------

    //присвоение звёздочки нового цвета
    starPosition.setAttribute('src', "starsImg/" + newStar);
}

// ГЛОБАЛЬНАЯ переменная с интервалом смены положения звёздочки.
let interval = setInterval(moveStar, 2000); 

// ГЛАВНАЯ ФУНКЦИЯ. Обработчик события КЛИК по звёздочке, вызов функций передвижения и начисления очков
// ----------------------------------------------------------------------------------------------------
function mainFunc(){
    addScore();
    moveStar();
}
// ----------------------------------------------------------------------------------------------------

//Функция начала игры. Срабатывает после установленного setTimeout в 2000 мс. В функциии restartMenu.
function gameStart(){
    console.log(stars);
    document.querySelector("#stars").addEventListener("click", mainFunc);
    document.querySelector(".count").style.visibility = "initial";
    setTimeout(gameOverFn, inputData[0].value * 1000);
}

// Функция. Окончание игры, скрытие звёздочки и вывод сообщения "Game Over!"
function gameOverFn() {
    //Убираем звёздочки перезаписывая значение CSS свойства - display
    document.body.querySelector("#stars").style.display = "initial";
    document.body.querySelector("#stars").removeEventListener("click", mainFunc);
    score = 0;
    document.getElementsByClassName("count")[0].innerHTML = score;
    
    //Линкуем переменную с HTML элементом
    let gameOver = document.body.querySelector("#game__over");
    // и делаем его видимым
    gameOver.style.visibility = 'initial';

    //убираем счётчик очков
    document.body.querySelector(".count").style.visibility = "hidden";
    //устанавливаем звёздочку слева от окон ввода (для контроля размера звёздочки)
    document.body.querySelector("#stars").style.top = 500 + "px";
    document.body.querySelector("#stars").style.left = 420 + "px";

    //проверка на корректность ввода данных в поле "время игры"
    inputData[0].addEventListener("input", function(){
       if(inputData[0].value <= 0 || inputData[0].value == "e"){
         return false;
       } sessionStorage.setItem("inputCountdown", inputData[0].value * 1000);
    })

    // Взаимодействие input type = "range" с размером звёздочки
    let rangeStarSize = document.body.querySelector(".input__star-size");
    rangeStarSize.addEventListener("input", function() {
        sessionStorage.setItem("starWidth", document.body.querySelector("#stars").style.width = rangeStarSize.value * 3 + "px");
        sessionStorage.setItem("starHeight", document.body.querySelector("#stars").style.height = rangeStarSize.value * 3 + "px");
    })

    //Убираем обрабочтчик событий, иначе кол-во обработчиков на кнопке будет увеличиваться.
    function removeListenerRestartButton (){
        restartButton.removeEventListener("click", restartMenu)
    }

    //Функция начала игры (кнопка "Старт")
    function restartMenu (){
        gameOver.style.visibility = "hidden";
        setTimeout(gameStart, 2000);
        setTimeout(removeListenerRestartButton, 2000);    
    }

    //Вешаем обработчик на кнопку начала игры "Старт"
    let restartButton = document.body.querySelector(".reset__button");
            restartButton.addEventListener("click", restartMenu);
    //Очищаем интервал.
    clearInterval(interval);

    // location.reload(); перезагрузка страницы
    return gameOver;
}
//Таймер игры.
setTimeout(gameOverFn, inputData[0].value * 1000);