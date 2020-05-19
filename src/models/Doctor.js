const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    crm: { type: String, required: true, unique: true },
    speciality: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('Doctor', DoctorSchema)