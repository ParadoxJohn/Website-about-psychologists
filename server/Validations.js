import { body } from 'express-validator'

export const loginrValidation = [
    body('email', 'Неправильна пошта').isEmail(),
    body('password','закороткий пароль').isLength({min: 5}),
];


export const registerValidation = [
    body('email', 'Неправильна пошта').isEmail(),
    body('password','закороткий пароль').isLength({min: 5}),
    body('fullName', 'мінімум 3 букви в імені').isLength({min: 3}),
]

export const postValidation = [
    body('imageUrl', 'Неправильна силка на зображення').isString(),
    body('Contact', 'Неправильні дані для контакту').isString(),
    body('Description','неправильний опис').isString(),
    body('fullName', 'мінімум 3 букви в імені').isLength({min: 3}),
]