'use strict';

// не забуваєм, що спочатку має прогрузитись вся DOM структура, 
// і лише тоді будем запускати наші скрипти!
window.addEventListener('DOMContentLoaded', () => {

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



});