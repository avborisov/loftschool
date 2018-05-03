/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var result = [];

    for (let i = 0; i < array.length; i++) {
        result[i] = fn(array[i], i, array);
    }

    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var previousValue = initial || array[0];
    var i = 0;

    if (initial === undefined) { 
        i++;
    }

    for (i; i < array.length; i++) {
        previousValue = fn(previousValue, array[i], i, array);
    }

    return previousValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var result = [];
    var i = 0;

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[i] = key.toUpperCase();
            i++;
        }        
    }

    return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    from = normalizeIndex(from, array.length);
    to = normalizeIndex(to, array.length);
    
    var result = [];
    var k = 0;

    for (let i = from; i < to; i++) {
        result[k] = array[i];
        k++;
    }
    
    return result;
}

function normalizeIndex(index, maxIndex) {
    if (index < 0) {
        index = -index > maxIndex ? 0 : maxIndex + index;
    }

    return index > maxIndex ? maxIndex : index;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, { 
        set: function(target, property, value) {
            target[property] = value*value;
            
            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
