const tokenGenerator = require('../../src/utils/tokenGenerator')

describe('Generate token for Login', () => {
    it('Should generate unique token for sign application', () => {
        const token = tokenGenerator()

        expect.stringContaining(token)
    })
})