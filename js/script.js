'use strict';

// не забуваєм, що спочатку має прогрузитись вся DOM структура, 
// і лише тоді будем запускати наші скрипти!
window.addEventListener('DOMContentLoaded', () => {
        
    // -----Tabs-----
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    // приховаєм спочатку всі непотрібні таби
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // показуєм лише один, активний, таб
    function showTabContent(i = 0) {
        // в ES6+ якщо визивається функція без аргументу, 
        // ми можемо задати значення по дефолту в самій функії
        // і додаєм анімацію при перемиканні табів класом 'fade'
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    // не забувати визивати функції!
    hideTabContent();
    showTabContent();

    // робим так, щоб при нажиманні на таб, він ставав активним (перемикався)
    // використовуєм делегування події, і назначаєм лістенер для кліка миші
    tabsParent.addEventListener('click', function(event) {
		// так як event.target може часто використовуватись в проекті, 
        // легше його зразу визначити в змінну
        const target = event.target;
        // далі, переіряється умова - що ми точно клікнули на кнопку, 
        // а не в батьківський елемент (пусте місце, промахнулись по кнопці)
		if(target && target.classList.contains('tabheader__item')) {
            // далі перебираєм весь псевдомасив і визиваєм коллбек ф-ю,
            tabs.forEach((item, i) => {
                // і ставим умову, якщо той елемент, в який ми клікнули, 
                // буде співпадати з елементом, який ми зараз перебираєм,
                if (target === item) {
                    // то ми визиваєм наші дві ф-ї:
                    hideTabContent();
                    showTabContent(i);
                    // таким чином ми перемикаєм наші таби
                }
            });
		}
	});

    // -----Timer-----
    //1) створим змінну з дедлайном (може задаватись в скрипті, а може братись з адмінпанелі, наприклад)
    let deadline = '2021-04-06';

    //2) спочатку створим функцію, яка рахує різницю між дедлайном і поточним часом 
    function getTimeRemaining(endtime) {
        // загальний час що залишився в мс (спочатку перетворюєм строки в цифри і тоді віднімаєм)
        const totalMs = Date.parse(endtime) - Date.parse(new Date());
        // загальний час що залишився в мс ділим на к-ть мс в добі
        const days = Math.floor(totalMs / (1000 * 60 * 60 *24));
        // загальний час що залишився в мс ділим на к-ть мс в годині, отримуєм загальну к-ть годин,
        // а потім отримуєм скільки годин, яких не хватає до повної доби (24год)
        const hours = Math.floor((totalMs / (1000 * 60 * 60) % 24));
        // загальний час що залишився в мс ділим на к-ть мс в секунді, отримаєм загальну к-ть секунд, 
        // потім ділимо на на 60 секунд, і отримаємо загалну к-ть хвилин, 
        // а тоді отримуєм скільки хвилин, яких не хватає до повної години (60хв)
        const minutes = Math.floor((totalMs / 1000 / 60) % 60);
        // загальний час що залишився в мс ділим на к-ть мс в секунді, отримаєм загальну к-ть секунд,
        // а тоді отримуєм скільки секунд, яких не хватає до повної хвилини (60с)
        const seconds = Math.floor((totalMs / 1000) % 60);
        // повертаєм назовні залишиок часу до встановленої дати в вигляді об'єкту
        // так надалі буде легше працювати з цими даними і плюс ще тре буде зробити перевірку, чи дедлайн не пройшов,
        // щоб в нас таймер не показував мінус
        return {
            'totalMs': totalMs,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //3) функція, яка буде передавати дані об'єкту напряму на сторінку
    function setTimer(selector, endtime) {
        // створюєм змінні, в які будем розміщати елементи зі сторінки
        // створюєм спочатку змінну, за допомогою якої будем шукати потрібний нам блок/клас '.timer',
        // АБО можем зробити універсальну ф-ю, за допомогою якої буде можливість зробити ще додатково
        // якісь таймери на сторнці, через визов різних селекторів (блоків/класів/селекторів і тд)
        // const timer = document.querySelector('.timer');
        const timer = document.querySelector(selector);
        // далі, в вибраному блоці, через ід вибираєм які значення будем підміняти
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        //3.2) задаєм інтервал, через який буде запускатись ф-я (оновлювати наш таймер)
        const timeInterval = setInterval(updateTimer, 1000);
        //3.3) далі, в вибраному блоці, через ід вибираєм який текст будем підміняти
        const textDays = document.querySelector('#text-days');
        const textHours = document.querySelector('#text-hours');
        const textMinutes = document.querySelector('#text-minutes');
        const textSeconds = document.querySelector('#text-seconds');

        //5) якщо таймер буде вгорі сторінки, то ми можем бачити, що наш таймер запускається після 1 секунди,
        // тому, зразу при загрузці сторінки визиваєм ф-ю оновлення залишкового часу
        updateTimer();

        //6) якщо потрібно, щоб на сторінці відображалось "09 днів" замість "9 днів" і тд, 
        // можем скористатись таким варіатом, і підставити цю ф-ю в updateTimer
        function getZero(num) {
            // 7) для того щоб коли дата буде досягнута і таймер не показував мінус, додаєм цю умову
            if (num < 0) {
                return `00`;
            //тепер якщо дата буде мінусова, буде відображатись "00" днів, кінець 7 пункту
            } else if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        //3.1) ф-я, яка буде оновляти наш таймер щосекунди на сторнці
        function updateTimer() {

            // розрахунок часу, який залишився, прямо на цей момент
            const t = getTimeRemaining(endtime);
            // далі берем дані які ми передали на сторнку, і підміняємо ними дані які є на сторінці
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //3.4) відміняєм текст відповідно до цифр
            function dateCreater(days, hours, minutes, seconds) {
                let daysText = ((((days % 100) >= 11 && days <= 19) || (days = days % 10) >= 5 || days == 0 || days < 0) ?
                    textDays.innerHTML = ('Днів') : (days === 1 ? textDays.innerHTML = ('День') : textDays.innerHTML = ('Дні')));
                
                let hoursText = ((((hours % 100) >= 11 && hours <= 19) || (hours = hours % 10) >= 5 || hours == 0 || hours < 0) ?
                    textHours.innerHTML = ('Годин') : (hours === 1 ? textHours.innerHTML = ('Година') : textHours.innerHTML = ('Години')));

                let minutesText = ((((minutes % 100) >= 11 && minutes <= 19) || (minutes = minutes % 10) >= 5 || minutes == 0 || minutes < 0) ?
                    textMinutes.innerHTML = ('Хвилин') : (minutes === 1 ? textMinutes.innerHTML = ('Хвилина') : textMinutes.innerHTML = ('Хвилини')));

                let secondsText = ((((seconds % 100) >= 11 && seconds <= 19) || (seconds = seconds % 10) >= 5 || seconds == 0 || seconds < 0) ?
                    textSeconds.innerHTML = ('Секунд') : (seconds === 1 ? textSeconds.innerHTML = ('Секунда') : textSeconds.innerHTML = ('Секунди')));
            }

            // не забувати визивати функції!
            dateCreater(t.days, t.hours, t.minutes, t.seconds);

            //3.5) якщо дедлайн настав, ми зупиняєм наш таймер
            if (t.totalMs <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // не забувати визивати функції!
    //4) передаєм в якості аргументів наш клас і другий - кінцева дата
    setTimer('.timer', deadline);



});