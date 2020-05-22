const express = require('express')
const routes = express.Router()
const { celebrate, Joi, Segments } = require('celebrate')
const authMiddleware = require('./middlewares/authMiddleware')
const DoctorController = require('./controllers/DoctorController')
const LoginController = require('./controllers/LoginController')

routes.post('/', LoginController.sigin)

routes.get('/doctors', DoctorController.index)

routes.post('/doctor', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required().min(3),
        crm: Joi.string().required().min(3),
        speciality: Joi.string().required().min(4),
        phone: Joi.string().required().min(10).max(12),
        city: Joi.string().required().min(4),
        password: Joi.string().required().length(6),
    })
}), DoctorController.create)

routes.put('/doctor/:crm', authMiddleware, celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        crm: Joi.string().required().min(7)
    }),

    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required().min(3),
        speciality: Joi.string().required().min(4),
        phone: Joi.string().required().min(10).max(12),
        city: Joi.string().required().min(4),
        password: Joi.string().required().length(6),
    })
}), DoctorController.update)

routes.delete('/doctor/:crm', authMiddleware, celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        crm: Joi.string().required()
    })
}), DoctorController.delete)

module.exports = routes