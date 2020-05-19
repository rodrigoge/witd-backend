const jwt = require('jsonwebtoken')
const auth = require('../config/auth.json');

module.exports = (request, response, next) => {
    const header = request.headers.authorization;

    if(!header){
        return response.status(401).send({ error: 'No token provided' });
    }

    const parts = header.split(' ');

    if(!parts.length === 2){
        return response.status(402).send({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return response.status(403).send({ error: 'Token bad-formatted' });
    }

    jwt.verify(token, auth.secret, (err, decoded) => {
        if(err) 
            return response.status(404).send({ error: 'Invalid token' });

        request.doctorCrm = decoded.crm;
        return next();
    });
}