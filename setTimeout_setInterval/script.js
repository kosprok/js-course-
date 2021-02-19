'use strict';

// const timerId = setTimeout(
//     // сюди приймається або назва ф-ї, або її декларування одразу
//     // другим аргументом ми прописуєм час, через який ф-я виконається, 2000мс(2с)
//     function() {
//         console.log('Hi!');
//     }, 2000);


// можна ще так
// const timerId = setTimeout(function (text) {
//     console.log(text);
// }, 2000, 'Hi!');


// або так
// const timeoutId = setTimeout(logger, 3000);


// function logger() {
//     console.log('hello');
// }


// очистити інтервал (якщо користувач, наприклад, виконав необхідні нам дії),
// і не запускати певну ф-ю
// clearInterval(timeoutId);


// ф-ю таймаут можна задавати і без змінних, але коли ми передаєм її через змінну,
// ми записуєм унікальний (числовий) ідентифікатор цього таймера, для того,
// щоб могли чітко оприділяти різні setTimeout, так як їх може бути дуже багато,
// і можливо буде потрібно їх зупиняти


const btn = document.querySelector('.btn');
// так як змінна в лістенері локальна, і clearInterval її не буде бачити,
// ми можем зробити її глобальною, а в самій ф-ї після кліку 
// в неї запишеться унікальний локальний ідентифікатор
let timerId;
let i = 0;

btn.addEventListener('click', () => {
    // const timerId = setTimeout(logger, 2000);
    timerId = setInterval(logger, 2000);
});

function logger () {
    if (i === 2) {
        // очистити інтервал глобальною ф-ю ми не зможем, бо в нас значення андефайнд,
        // тому помістили clearInterval в цю ф-ю, і задаєм умову, наприклад, 
        // що після 3 повторень, ми її зупиняємо
        clearInterval(timerId);
    }
    console.log('text');
    i++;
}


// ЧИМ РЕКУРСИВНИЙ (САМ СЕБЕ ВИЗИВАЄ В СЕРЕДИНІ Ф-Ї) setTimeout КРАЩИЙ НІЖ  setInterval?
// Рекурсивний setTimeout дозволяє задати затримку між виконаннями більш точно, ніж setInterval.
// якщо ф-я тяжка, і наприклад, буде виконуватись більше 2 секунд, setInterval не буде чекати
// після вик. ф-ї ще 2 сек, а зразу запустить ф-ю ще раз (буде думати, що інтервал вже пройшов),
// таким чином може нарушитись цикл
// в такому варіанті наш код завжди буде чекати завершення і строго відведений час перед виконанням
let n = 0;
let ids = setTimeout(function log() {
    console.log('Hi!');
    ids = setTimeout(log, 500);
    console.log('text-text');
    n++;
    if (n === 3) {
        clearTimeout(ids);
        console.log('stop');
    }
}, 1000);


function animatedSquare() {
    const elem = document.querySelector('.box');
    let pos = 0;

    const idFr = setInterval(frame, 10);
    function frame() {
        if (pos == 300) {
            clearInterval(idFr);
        } else {
            pos++;
            elem.style.top = `${pos}px`;
            elem.style.left = `${pos}px`;
        }
    }
}

btn.addEventListener('click', animatedSquare);