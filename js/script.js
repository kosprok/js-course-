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
    let deadline = '2021-04-07';

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


    // -----Modal Window-----
    //1) спочатку на кнопках, які будуть визивати одне і те саме модальне вікно, 
    // нам треба назначити дата-атрибути (кнопки можуть мати різні назви, класи і тд,
    // тому саме краще буде назначити їм всім один дата-атрибут, наприклад data-modal
    // для відкриття модального вікна, і data-close іншій кнопці, яка буд закривати мод вікно)

    // 2) далі об'явим змінні які будем використовувати
    // так як кнопок для відкриття вікна в нас 2, використовуєм querySelectorAll
    const modalOpen = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelector('[data-close]');
    const modal = document.querySelector('.modal');

    // 3) при нажиманні на будь яку кнопк з дата-атрибутом, відкриваєм мод вікно
    modalOpen.forEach (btn => {
        // 8.3) переписуєм обробник, щоб він при кліку передавав ф-ю відкр вікна
        btn.addEventListener('click', openModalWindow);
        // btn.addEventListener('click', () => {
        // можем зробити вікриття-закриття через додавання і видалення класів, або через тогл
        // modal.classList.add('show');
        // modal.classList.remove('hide');
        // modal.classList.toggle('show');
        //3.1) для того щоб відключити прокрутку на сторінці коли відкрито мод вікно, міняєм значення overflow
        // document.body.style.overflow = 'hidden';
        // });
    });

    // 8.2) так як відкривання мод вікна будем використовувати і в інших подіяк, окрім як
    // відкривання через кнопку, то логічно переписати код в ф-ю, щоб не копіпастити кучу коду 
    function openModalWindow() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        // 8.5) якщо юзер відкрив вікно сам до того як воно з'явиться, по таймеру,
        // ми зупиняєм таймер, щоб воно повторно не відкривалось
        clearTimeout(modalTimer);
        // 9.5) при відкр мод вікна змінюєм значення змінної на правду
        modalOpened = true;
    }

    // 4) закриття модального вікн. можна зробити і простіше - повішати лістенер на кнопку закриття,
    // яле якщо ми хочем щоб закрити вікно можна було через кнопку закр, просто клікнувши будь куди 
    // за модальним вікном, або клавішою Еск, то простіше написати ф-ю і передавати або визивати її
    // в кожному із варіантів, щоб не копіювати кучу коду
    // 4.1) створюєм ф-ю яка буде закривати вікно
    function closeModalWindow() {
        // можем зробити вікриття-закриття через додавання і видалення класів, або через тогл
        // modal.classList.remove('show');
        // modal.classList.add('hide');
        modal.classList.toggle('show');
        //4.2) не забуваєм включити прокрутку на сторінці, коли мод вікно закривається
        document.body.style.overflow = '';
    }

    // 5) навішуєм обробник подій на кнопку закриття мод вікна, і ПЕРЕДАЄМ ф-ю закриття вікна
    modalClose.addEventListener('click', closeModalWindow);

    // 6) навішуєм обробник подій на "піложку" (контейнер "modal") модальн вікна - коли клацнути мишкою 
    // де небуть, крім самого мод вікна, в нас при виконанні умови, що ми клацнули мишкою по "підложці"
    //  ВИЗИВАЄТЬСЯ ф-я закриття мод вікна, і воно в нас закриється
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

    // 7) в нас є подія, яка спрацьовує при нажиманні будь яких клавіш, тому навішуєм обробник подій
    // на цілу сторінку, і коли відбулась подія - натиснули кнопку, в даному випадку прописуєм в умові
    // що натиснули саме клавішу з key/code "Еск", ми ВИЗИВАЄМ ф-ю закриття мод вікна
    document.addEventListener('keydown', (event) => {
        // 7.1) для того, щоб модальне вікно не визивалось-закривалось щоразу при натиск "Еск", 
        // (так як в нас ф-я працює через тогл, вікно бкде щоразу відкр і закр при настиск "Еск"
        // а ЛИШЕ ЗАКРИВАЛО мод вікно, дописуєм додаткову умову "&& modal.classList.contains('show')"
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });

    // 8) додаєм функціонал до модального вікна - щоб воно визивалось через деякий час
    // 8.1) спочатку об'явимо змінну
    // 8.4) і далі всередину таймаута поміщаємо ф-ю відкр мод вікна, через 5 секунд 
    const modalTimer = setTimeout(openModalWindow, 5000);

    // 9) додаєм функціонал до модального вікна - щоб воно визивалось 
    // коли сторінка прогорнута до самого низу сторнки
    // 9.2) передаєм ф-ю в обробник події - при прогорнені докінця стор, відкрив мод вікно
    window.addEventListener('scroll', openModalWindowByScroll);
    // window.addEventListener('scroll', () => {
        // умова => якщо висота переглянутого + висота відображеного на сторнці >= аніж вся висота сторінки, 
        // тоді виконується умова і відкр мод вікно через визов ф-ї
        // if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        //     openModalWindow();
        // }
    // });

    // 9.1) для того щоб модальне вікно з'явилось лише один раз, коли ми прогорнем 
    // сторніку до самого низу, нам потрібно переписати лістенер по цій події в ф-ю,
    // яка буде слідкувати => після пешого відкриття мод вікна, ми видалимо цей лістенер 
    function openModalWindowByScroll() {
        // 9.6 додаєм до умови ще одну - якщо мод вікно відкрилось по таймеру, або по кнопці, то вже повторно не відкривалось при прокрутці 
        // (&& (modalOpened === false))
        if((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) && (modalOpened === false)) {
            openModalWindow();
            // 9.3) якщо спрацювало відкрив мод вікна при прогорнені стор до кінця,
            // після першого разу відаляєм лістенер, щоб він не спрацьовував при 
            // повторному гортанні сторнки до кінця
            window.removeEventListener('scroll', openModalWindowByScroll);
        }
    }

    // 9.4) додаєм перевірку - якщо мод вікно відкрилось по таймеру чи по кнопці, то вже 
    // повторно не відкривалось при прокрутці до кінця сторінки
    // спочатку створимо змінну, яка буде зберігати значення, чи відкривалось мод вікно, 
    // якщо не відкривалось => false, як тільки відкрилось, міняє значення на true
    let modalOpened = false;













});