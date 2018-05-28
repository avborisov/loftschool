/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
// куки с учетом фильтра
var cookies = getCookies();

filterNameInput.addEventListener('keyup', function() {
    reloadTable();
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    reloadTable();
});

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function reloadTable() {
    cookies = getCookies();
    clearTable();

    // eslint-disable-next-line guard-for-in
    for (let cookieName in cookies) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdValue = document.createElement('td');
        const tdDelete = document.createElement('td');
        const deleteButton = document.createElement('input');

        deleteButton.type = 'button';
        deleteButton.value = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteCookie(cookieName);
            reloadTable();
        });

        tdDelete.appendChild(deleteButton);
        tdName.appendChild(document.createTextNode(cookieName));
        tdValue.appendChild(document.createTextNode(cookies[cookieName]));
        tr.appendChild(tdName);
        tr.appendChild(tdValue);
        tr.appendChild(tdDelete);

        listTable.appendChild(tr);
    }
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function clearTable() {
    while (listTable.rows.length>0) {
        listTable.deleteRow(0);
    }
}

function getCookies() {
    const pairs = document.cookie.split(';');
    const filterValue = filterNameInput.value;

    const cookies = {};

    for (let i=0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        let name = (pair[0]+'').trim();

        if (filterValue.length == 0 || (filterValue.length > 0 && isMatching(name, filterValue))) {
            cookies[name] = unescape(pair[1]);
        }
    }

    return cookies;
}