const Doctor = require('../models/Doctor')

module.exports = {
    async sigin(request, response){
        const { crm, password } = request.body

        try {
            const doctorCrm = await Doctor.findOne({ crm })
            const doctorPassword = await Doctor.findOne({ password })

            if(!doctorCrm || doctorCrm == ""){
                return response.status(404).json({ error: 'CRM not found' })
            }

            if(!doctorPassword || doctorPassword == ""){
                return response.status(404).json({ error: 'Password incorrect' })
            }

            return response.status(201).json({ message: 'User sign-in succesfull' })

        } catch (error) {
            return response.status(404).json({ error: 'Sigin error' })
        }
    }
}