const express = require('express')
const routes = express.Router()
const { celebrate, Joi, Segments } = require('celebrate')
const DoctorController = require('./controllers/DoctorController')
const LoginController = require('./controllers/LoginController')

routes.post('/', LoginController.sigin)

routes.get('/doctors', DoctorController.index)

routes.post('/doctor', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required().min(3),
        crm: Joi.string().required().min(3),
        speciality: Joi.string().required().min(4),
        phone: Joi.string().required().min(10).max(11),
        city: Joi.string().required().min(4),
        password: Joi.string().required().length(6),
    })
}), DoctorController.create)

routes.put('/doctor/:crm', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        crm: Joi.string().required()
    }),

    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required().min(3),
        speciality: Joi.string().required().min(4),
        phone: Joi.string().required().min(10).max(11),
        city: Joi.string().required().min(4),
        password: Joi.string().required().length(6),
    })
}), DoctorController.update)

routes.delete('/doctor/:crm', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        crm: Joi.string().required()
    })
}), DoctorController.delete)

module.exports = routes