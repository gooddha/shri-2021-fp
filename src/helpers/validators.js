/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
    all,
    allPass,
    compose,
    converge,
    filter,
    equals,
    length,
    lte,
    partial,
    propEq,
    values,
} from 'ramda';

const isGreen = equals('green');
const isRed = equals('red');
const isBlue = equals('blue');
const isOrange = equals('orange');


const filterGreen = filter(isGreen);
const filterRed = filter(isRed);
const filterBlue = filter(isBlue);
const filterOrange = filter(isOrange);

const getGreenCount = compose(length, filterGreen, values);
const getRedCount = compose(length, filterRed, values);
const getBlueCount = compose(length, filterBlue, values);
const getOrangeCount = compose(length, filterOrange, values);

const atLeastTwo = partial(lte, [2]);
const atLeastOne = partial(lte, [1]);


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }
    return isRed(star) && isGreen(square);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
    return compose(atLeastTwo, getGreenCount)(figures);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    return converge(equals, [getRedCount, getBlueCount])(figures)
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (figures) => {
    const isBlueCircle = propEq('circle', 'blue');
    const isRedStar = propEq('star', 'red');
    const isOrangeSquare = propEq('square', 'orange');

    return allPass([isBlueCircle, isRedStar, isOrangeSquare])(figures);
};


// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => {
    return allPass()
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => {
    const anyRed = compose(atLeastOne, getRedCount);
    const isGreenTriangle = propEq('triangle', 'green');
    const atLeastTwoGreen = compose(atLeastTwo, getGreenCount);

    return allPass([anyRed, atLeastTwoGreen, isGreenTriangle])(figures);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
    return all(getOrangeCount(figures)) === values(figures).length;
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
