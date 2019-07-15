'use strict'

const OtpShowHelper = require('./OtpShowHelper')

const SUFIX = ':::pass-seguranca-topt-show'

class OtpShow {

    constructor(ticketGateOpeningTime, duration) {
        this.helper = new OtpShowHelper()
        if(ticketGateOpeningTime) {
            this.ticketGateOpeningTime = ticketGateOpeningTime
        } else {
            this.ticketGateOpeningTime = 2
        }
        if(duration) {
            this.duration = duration
        } else {
            this.duration = 4
        }
    }

    create(show) {

        let otp = undefined

        if(this.helper.validateStartTime(show, this.ticketGateOpeningTime)) {

            const secrect = this.helper.createSecret(show, SUFIX)

            otp = buildTOTP(this.helper.buildOptions(show, this.duration, this.ticketGateOpeningTime)).generate(secrect)

        }

        return otp

    }

    validate(tokeToValidade, show) {

        let result = false

        if(this.helper.validateStartTime(show, this.ticketGateOpeningTime)) {

            const secrect = this.helper.createSecret(show, SUFIX)

            result = buildTOTP(this.helper.buildOptions(show, this.duration, this.ticketGateOpeningTime)).verify({
                token: tokeToValidade, 
                secret: secrect
            })
        }

        return result
    }
    
}


function buildTOTP(options) {
    const totp = require('otplib/totp')
    totp.options = options
    return totp
}

module.exports = OtpShow
