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
    anyPass,
    compose,
    converge,
    filter,
    equals,
    length,
    lte,
    not,
    partial,
    prop,
    propEq,
    values,
} from 'ramda';

const isGreen = equals('green');
const isRed = equals('red');
const isBlue = equals('blue');
const isOrange = equals('orange');
const isWhite = equals('white');

const filterWhite = filter(isWhite);
const filterGreen = filter(isGreen);
const filterRed = filter(isRed);
const filterBlue = filter(isBlue);
const filterOrange = filter(isOrange);

const getWhiteCount = compose(length, filterWhite, values);
const getGreenCount = compose(length, filterGreen, values);
const getRedCount = compose(length, filterRed, values);
const getBlueCount = compose(length, filterBlue, values);
const getOrangeCount = compose(length, filterOrange, values);

const single = partial(equals, [1]);
const double = partial(equals, [2]);
const atLeastTwo = partial(lte, [2]);
const atLeastThree = partial(lte, [3]);

const singleRed = compose(single, getRedCount);
const doubleGreen = compose(double, getGreenCount);
const atLeastTwoGreen = compose(atLeastTwo, getGreenCount);
const atLeastTwoWhite = compose(atLeastTwo, getWhiteCount);
const atLeastThreeGreen = compose(atLeastThree, getGreenCount);
const atLeastThreeRed = compose(atLeastThree, getRedCount);
const atLeastThreeBlue = compose(atLeastThree, getBlueCount);
const atLeastThreeOrange = compose(atLeastThree, getOrangeCount);

const isTriangleGreen = propEq('triangle', 'green');
const isSquareGreen = propEq('square', 'green');
const isAllOrange = all(isOrange);
const isAllGreen = all(isGreen);

const isCircleBlue = propEq('circle', 'blue');
const isStarRed = propEq('star', 'red');
const isStarWhite = propEq('star', 'white');
const isOrangeSquare = propEq('square', 'orange');
const isSquareWhite = propEq('square', 'white');
const isTriangleWhite = propEq('triangle', 'white');
const isStarNotRed = compose(not, isStarRed);

const isSquareNotWhite = compose(not, isSquareWhite);
const isStarNotWhite = compose(not, isStarWhite);
const isTriangleNotWhite = compose(not, isTriangleWhite);


const getSquareColor = prop('square');
const getTriangleColor = prop('triangle');
const isSquareHasSameColorAsTriangle = converge(equals, [getSquareColor, getTriangleColor]);
const isSquareAndTriangleNotWhite = allPass([isSquareNotWhite, isTriangleNotWhite]);



// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([atLeastTwoWhite, isStarRed, isSquareGreen])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = atLeastTwoGreen;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [getRedCount, getBlueCount])

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isCircleBlue, isStarRed, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([atLeastThreeGreen, atLeastThreeRed, atLeastThreeBlue, atLeastThreeOrange]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([singleRed, doubleGreen, isTriangleGreen]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(isAllOrange, values);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([isStarNotRed, isStarNotWhite])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(isAllGreen, values);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([isSquareHasSameColorAsTriangle, isSquareAndTriangleNotWhite])