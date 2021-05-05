'use strict';

// function showThis(a, b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }
// showThis(4, 5);

// 1) Звичайна функція: this = window, але якщо use strict - undefined
// навіть якщо функція використовується всередині іншої функції, контекст в неї не міняється


// const obj = {
//     a: 20,
//     b: 15,
//     sum: function() {
//         function shout () {
//             console.log(this);
//         }
//         shout();
//     }
// };
// obj.sum();

// 2) Контекст в методів об'єкта - сам об'єкт
// В даному випадку ф-я shout вже не буде відноситись до методу об'єкта, і це буде звичайний визов 
// функції, яка запускається всередині метода, контекст визова був "загублений"


// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log("Hello! " + this.name);
//     };
// }
// let ivan = new User('Ivan', 23);

// 3) this в конструкторах і класах - це новий екземпляр об'єкта!


// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }

// const user = {
//     name: 'John'
// };

// sayName.call(user, 'Smith');
// sayName.apply(user, ['Smith']);
// // тут ми нову ф-ю не створювали, а просто контекст встановили

// function count(num) {
//     return this*num;
// }

// const double = count.bind(2);
// console.log(double(3));
// console.log(double(13));
// // тут double - нова ф-я, в якої є прив'язаний контекст

// 4) Ручна прив'язка this: call, apply, bind


const btn = document.querySelector('button');

btn.addEventListener('click', function() {
    console.log(this);
    this.style.backgroundColor = 'red';
}) ;
// якщо коллбек ф-я записана в класичному вигляді, то контекстом визову буде сам елемент, на якому відбулась подія (кнопка)

btn.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'black';
}) ;
// зі стрілочною ф-ю можем використовувати наприклад івент таргет

const obj = {
    num: 5,
    sayNumber: function() {
        const say = () => {
            console.log(this);
            console.log(this.num);
        };

        say();
    }
};
obj.sayNumber();
// В СТРІЛОЧНОЇ Ф-Ї НЕМАЄ СВОГО КОНТЕКСТУ ВИЗОВУ, вона завжди буде брати його в своїх предків

const double = a => a * 2;
console.log(double(4));
// якщо стрілочна ф-я приймає лише 1 аргумент, ми можем записати її в такому короченому вигляді