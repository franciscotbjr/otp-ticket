'use strict'

const OtpShow = require('../src/OtpShow')
const assert = require('assert')


describe('OtpShow.js', () => {

    it('should create a new instance with empty constroctor', function() {

        const otpShow = new OtpShow()
        
        assert.notEqual(undefined, otpShow)

        assert.notEqual(undefined, otpShow.helper)
        assert.equal(2, otpShow.ticketGateOpeningTime)
        assert.equal(4, otpShow.duration)
    })


    it('should create a new instance with param "ticketGateOpeningTime" and "duration" passed to constroctor', function() {

        const ticketGateOpeningTime = 3
        const duration = 5

        const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
        assert.notEqual(undefined, otpShow)

        assert.notEqual(undefined, otpShow.helper)
        assert.equal(ticketGateOpeningTime, otpShow.ticketGateOpeningTime)
        assert.equal(duration, otpShow.duration)
    })


    it('should valid: create a six digits OTP', function() {

        const ticketGateOpeningTime = 3
        const duration = 5
        const month = 7
        const year = 2019
        const day = 14
        const hours = 15

        const date = `${year}-${month}-${day}`
        const time = `${hours}:00`

        const showOtp = '693046'

        const show = {
            id: 1,
            uf: "DF",
            cityId: 530010,
            date: date,
            time: time
        }

        const getHours = Date.prototype.getHours
        const getFullYear = Date.prototype.getFullYear
        const getMonth = Date.prototype.getMonth
        const getDate = Date.prototype.getDate

        Date.prototype.getHours = () => {
            return hours - ticketGateOpeningTime
        }

        Date.prototype.getFullYear = () => {
            return year
        }

        Date.prototype.getMonth = () => {
            return month - 1
        }

        Date.prototype.getDate = () => {
            return day
        }

        const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
        const otp = otpShow.create(show)

        Date.prototype.getHours = getHours
        Date.prototype.getFullYear = getFullYear
        Date.prototype.getMonth = getMonth
        Date.prototype.getDate = getDate

        assert.equal(showOtp, otp)
    })


    it('should invalid: try create a six digits OTP one hour before ticket gate opening time', function() {

        const ticketGateOpeningTime = 3
        const duration = 5
        const hours = 15

        const showOtp = undefined

        const show = {
            id: 1,
            uf: "DF",
            cityId: 530010,
            date: "2019-07-14",
            time: `${hours}:00`
        }

        const getHours = Date.prototype.getHours
        const getFullYear = Date.prototype.getFullYear
        const getMonth = Date.prototype.getMonth
        const getDate = Date.prototype.getDate

        Date.prototype.getHours = () => {
            return hours - (ticketGateOpeningTime + 1)
        }

        Date.prototype.getFullYear = () => {
            return 2019
        }

        Date.prototype.getMonth = () => {
            return 6
        }

        Date.prototype.getDate = () => {
            return 14
        }

        const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
        const otp = otpShow.create(show)

        Date.prototype.getHours = getHours
        Date.prototype.getFullYear = getFullYear
        Date.prototype.getMonth = getMonth
        Date.prototype.getDate = getDate

        assert.equal(showOtp, otp)
    })
    

    it('should valid: validate a six digits OTP', function() {

        const ticketGateOpeningTime = 3
        const duration = 5
        const month = 7
        const year = 2019
        const day = 14
        const hours = 15

        const date = `${year}-${month}-${day}`
        const time = `${hours}:00`

        const showOtp = '693046'

        const show = {
            id: 1,
            uf: "DF",
            cityId: 530010,
            date: date,
            time: time
        }


        const getHours = Date.prototype.getHours
        const getFullYear = Date.prototype.getFullYear
        const getMonth = Date.prototype.getMonth
        const getDate = Date.prototype.getDate

        Date.prototype.getHours = () => {
            return hours - ticketGateOpeningTime
        }

        Date.prototype.getFullYear = () => {
            return year
        }

        Date.prototype.getMonth = () => {
            return month - 1
        }

        Date.prototype.getDate = () => {
            return day
        }

        const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
        const valid = otpShow.validate(showOtp, show)

        Date.prototype.getHours = getHours
        Date.prototype.getFullYear = getFullYear
        Date.prototype.getMonth = getMonth
        Date.prototype.getDate = getDate

        assert.equal(true, valid)
    })    


    it('should valid: validate a six digits OTP after one hour of show time', function() {

        const ticketGateOpeningTime = 3
        const duration = 5
        const month = 7
        const year = 2019
        const day = 14
        const hours = 15

        const date = `${year}-${month}-${day}`
        const time = `${hours}:00`

        const showOtp = '693046'

        const show = {
            id: 1,
            uf: "DF",
            cityId: 530010,
            date: date,
            time: time
        }

        const getHours = Date.prototype.getHours
        const getFullYear = Date.prototype.getFullYear
        const getMonth = Date.prototype.getMonth
        const getDate = Date.prototype.getDate

        Date.prototype.getHours = () => {
            return hours + 1
        }

        Date.prototype.getFullYear = () => {
            return year
        }

        Date.prototype.getMonth = () => {
            return month - 1
        }

        Date.prototype.getDate = () => {
            return day
        }

        const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
        const valid = otpShow.validate(showOtp, show)

        Date.prototype.getHours = getHours
        Date.prototype.getFullYear = getFullYear
        Date.prototype.getMonth = getMonth
        Date.prototype.getDate = getDate

        assert.equal(true, valid)
    })    


    it('should invalid: validate a six digits OTP next day', function() {

        const ticketGateOpeningTime = 3
        const duration = 5

        const month = 7
        const year = 2019
        const day = 14
        const hours = 15

        const date = `${year}-${month}-${day}`
        const time = `${hours}:00`

        const showOtp = '089043'

        const show = {
            id: 1,
            uf: "DF",
            cityId: 530010,
            date: date,
            time: time
        }

        const getHours = Date.prototype.getHours
        const getFullYear = Date.prototype.getFullYear
        const getMonth = Date.prototype.getMonth
        const getDate = Date.prototype.getDate

        Date.prototype.getHours = () => {
            return hours
        }

        Date.prototype.getFullYear = () => {
            return year
        }

        Date.prototype.getMonth = () => {
            return month - 1
        }

        Date.prototype.getDate = () => {
            return day + 1
        }

        const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
        const valid = otpShow.validate(showOtp, show)

        Date.prototype.getHours = getHours
        Date.prototype.getFullYear = getFullYear
        Date.prototype.getMonth = getMonth
        Date.prototype.getDate = getDate

        assert.equal(false, valid)
    })   
    
    


    // it('should valid: create and validate a six digits OTP after midnight', function() {

    //     const currentDate = new Date()

    //     const ticketGateOpeningTime = 1
    //     const duration = 3

    //     const year = currentDate.getFullYear()
    //     const month = currentDate.getMonth() + 1
    //     const day = currentDate.getDate()
    //     const hours = currentDate.getHours() - duration

    //     const date = `${year}-${month}-${day}`
    //     const time = `${hours}:00`

    //     const show = {
    //         id: 1,
    //         uf: "DF",
    //         cityId: 530010,
    //         date: date,
    //         time: time
    //     }

    //     const getHours = Date.prototype.getHours
    //     const getFullYear = Date.prototype.getFullYear
    //     const getMonth = Date.prototype.getMonth
    //     const getDate = Date.prototype.getDate

    //     Date.prototype.getHours = () => {
    //         return hours - ticketGateOpeningTime - duratio
    //     }

    //     Date.prototype.getFullYear = () => {
    //         return year
    //     }

    //     Date.prototype.getMonth = () => {
    //         return month - 1
    //     }

    //     Date.prototype.getDate = () => {
    //         return day
    //     }

    //     const otpShow = new OtpShow(ticketGateOpeningTime, duration)
        
    //     const otp = otpShow.create(show)

    //     Date.prototype.getHours = getHours
    //     Date.prototype.getFullYear = getFullYear
    //     Date.prototype.getMonth = getMonth
    //     Date.prototype.getDate = getDate

    //     assert.notEqual(otp, undefined)

    //     const otpValidation = new OtpShow(ticketGateOpeningTime, duration)

    //     const valid = otpValidation.validate(otp, show)

    //     assert.equal(valid, true)
        
    // })
})