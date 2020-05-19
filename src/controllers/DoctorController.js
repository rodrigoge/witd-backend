const Doctor = require('../models/Doctor')

module.exports = {
    async index(request, response){
        const doctors = await Doctor.find()
        return response.json(doctors)
    },

    async create(request, response){
        const {
            name, 
            crm, 
            speciality, 
            phone, 
            city, 
            password 
        } = request.body;

        try {
            const doctor = await Doctor.findOne({ crm })

            if(!doctor || doctor == ""){
                await Doctor.create({
                    name, crm, speciality, phone, city, password
                })
        
                return response.status(201).json({ message: 'User registered' })
            }

            return response.status(401).json({ message: 'User already exists' })
        } catch (error) {
            return response.status(500).json({ message: 'Error insert user' })
        }
    },

    async update(request, response){
        const { crm } = request.params
        const { 
            name, 
            speciality, 
            phone, 
            city, 
            password 
        } = request.body

        await Doctor.findOneAndUpdate({ crm }, {
            name, speciality, phone, city, password
        })

        return response.status(201).json({ message: 'User updated succesfull' })

    },

    async delete(request, response){
        const { crm } = request.params

        await Doctor.findOne({ crm }).deleteOne()

        return response.status(201).json({ message: 'User deleted succesfull' })
    }
}