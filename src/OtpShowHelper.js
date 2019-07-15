'use strict'

const md5 = require('md5')

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60


class OtpShowHelper {

    constructor() {

    }
        
    validateStartTime(show, ticketGateOpeningTime) {
        const currentDate = new Date()
        const dateFields = show.date.split('-')
        const timeFields = show.time.split(':')
    
        return parseInt(dateFields[0]) === currentDate.getFullYear()
            && parseInt(dateFields[1]) === currentDate.getMonth() + 1
            && parseInt(dateFields[2]) === currentDate.getDate()
            && currentDate.getHours() + ticketGateOpeningTime >= parseInt(timeFields[0])
    }

    createSecret(show, sufix) {
        return md5(md5(md5(md5(show.id) + `:${show.uf}-${show.cityId}`) + `:${show.date}-${show.time}`) + sufix)
    }


    // createEpoch(show, ticketGateOpeningTime) {
    //     const dateFields = show.date.split('-')
    //     const timeFields = show.time.split(':')

    //     const date = new Date(dateFields[0], dateFields[1]-1, dateFields[2], timeFields[0], timeFields[1], 0, 0)

    //     return (date.getTime() - (ONE_HOUR * ticketGateOpeningTime)) / 1000
    // }

    createStep(duration, ticketGateOpeningTime) {

        return (ONE_HOUR * (duration + ticketGateOpeningTime))
    }

    buildOptions(show, duration, ticketGateOpeningTime) {
        const  options = { 
            crypto: require('crypto'), 
            step: this.createStep(duration, ticketGateOpeningTime)
            // ,
            // epoch: this.createEpoch(show, ticketGateOpeningTime)
        }
        return options
    }

}

module.exports = OtpShowHelper