const Doctor = require('../models/Doctor')
const bcrypt = require('bcryptjs')
const tokenGenerator = require('../utils/tokenGenerator')

module.exports = {
    async sigin(request, response){
        const { crm, password } = request.body

        try {
            const doctor = await Doctor.findOne({ crm }).select('+password')

            if(!doctor || doctor == ""){
                return response.status(404).json({ error: 'CRM not found' })
            }

            if(!await bcrypt.compare(password, doctor.password)){
                return response.status(404).json({ error: 'Password incorrect' })
            }

            return response.send({ 
                doctor, 
                token: tokenGenerator({ crm: doctor.crm }) 
            })

        } catch (error) {
            return response.status(404).json({ error: 'Sigin error' })
        }

        
    }
}