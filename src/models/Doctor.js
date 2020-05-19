const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    crm: { type: String, required: true, unique: true },
    speciality: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true, select: false }
})

DoctorSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

module.exports = mongoose.model('Doctor', DoctorSchema)