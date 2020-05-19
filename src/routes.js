const express = require('express')
const routes = express.Router()
const { celebrate, Joi, Segments } = require('celebrate')
const DoctorController = require('./controllers/DoctorController')

routes.get('/doctors', DoctorController.index)

routes.post('/doctor', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        crm: Joi.string().required(),
        speciality: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        password: Joi.string().required(),
    })
}), DoctorController.create)

routes.put('/doctor/:crm', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        crm: Joi.string().required()
    }),

    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        speciality: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        password: Joi.string().required(),
    })
}), DoctorController.update)

routes.delete('/doctor/:crm', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        crm: Joi.string().required()
    })
}), DoctorController.delete)

module.exports = routes