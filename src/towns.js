/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

var towns;

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const townsURL = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    
    hideAllElements();
    loadingBlock.style.display = 'block';

    return fetch(townsURL).then(function(response) {
        if (response.status !== 200) {           
            hideAllElements();
            errorBlock.style.display = 'block';
            
            return;
        }

        return response.json().then(function(data) {
            hideAllElements();
            filterBlock.style.display = 'block';

            return data.sort(function(a, b) {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                let result = 0;

                if (a < b) {
                    result = -1;
                } else if (a > b) {
                    result = 1;
                }

                return result;
            });
        });
    });
}

function hideAllElements() {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'none';
    errorBlock.style.display = 'none';
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок с ошибкой и кнопкой перезагрузки */
const errorBlock = homeworkContainer.querySelector('#error-block');
/* Кнопка перезагрузки данных */
const reloadBtn = homeworkContainer.querySelector('#reload-input');

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    while (filterResult.hasChildNodes()) {
        filterResult.removeChild(filterResult.firstChild);
    }

    towns.then(function(result) {
        for (const town of result) {
            if (filterInput.value.length > 0 && isMatching(town.name, filterInput.value)) {
                let innerDiv = document.createElement('div');

                innerDiv.textContent = town.name;
                filterResult.appendChild(innerDiv);
            }
        }  
    });
    
});

reloadBtn.addEventListener('click', function() {
    loadTowns();
});

/**
export {
    loadTowns,
    isMatching
};
*/

