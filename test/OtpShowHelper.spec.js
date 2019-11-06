'use strict'

const OtpShowHelper = require('../src/OtpShowHelper')
const assert = require('assert')
const moment = require('moment')

describe('OtpShowHelper.js', () => {

    it('should create a new instance', function() {

        const otpShowHelper = new OtpShowHelper()
        
        assert.notEqual(otpShowHelper, undefined)
    })


    it('Should be valid: OtpShowHelper.validateStartTime its two hours for opening', function() {

        const currentMoment = moment();

        const ticketGateOpeningTime = 2
        const month = currentMoment.month()
        const year = currentMoment.year()
        const day = currentMoment.date()
        const startHour = currentMoment.hour();        

        const startDate = moment([year, month, day, startHour, 0, 0]);
        const endDate = startDate.clone().add(6, 'hours');
        const openGatesDates = startDate.clone().subtract(ticketGateOpeningTime, 'hours' );

        const show = {
            startDate,
            endDate,
            openGatesDates
        }

        const otpShowHelper = new OtpShowHelper()
        
        const valid = otpShowHelper.validateStartTime(show)

        assert.equal(valid, true)
        
    })


    it('Should be valid: OtpShowHelper.validateStartTime its one hour for opening', function() {

        const currentMoment = moment();

        const ticketGateOpeningTime = 2
        const month = currentMoment.month()
        const year = currentMoment.year()
        const day = currentMoment.date()
        const startHour = currentMoment.hour() + (ticketGateOpeningTime - 1);        

        const startDate = moment([year, month, day, startHour, 0, 0]);
        const endDate = startDate.clone().add(6, 'hours');
        const openGatesDates = startDate.clone().subtract(ticketGateOpeningTime, 'hours' );

        const show = {
            startDate,
            endDate,
            openGatesDates
        }

        const otpShowHelper = new OtpShowHelper()
        
        const valid = otpShowHelper.validateStartTime(show)

        assert.equal(valid, true)
        
    })


    it('Should be invalid: OtpShowHelper.validateStartTime its three hours for opening', function() {

        const currentMoment = moment();

        const ticketGateOpeningTime = 2
        const month = currentMoment.month()
        const year = currentMoment.year()
        const day = currentMoment.date()
        const startHour = currentMoment.hour() + (ticketGateOpeningTime + 1);        

        const startDate = moment([year, month, day, startHour, 0, 0]);
        const endDate = startDate.clone().add(6, 'hours');
        const openGatesDates = startDate.clone().subtract(ticketGateOpeningTime, 'hours' );

        const show = {
            startDate,
            endDate,
            openGatesDates
        }

        const otpShowHelper = new OtpShowHelper()
        
        const valid = otpShowHelper.validateStartTime(show)

        assert.equal(valid, false)
        
    })


    it('Should create a new secrect: OtpShowHelper.createSecret', function() {

        const show = {
            id: 1,
            uf: "DF",
            cityId: 530010,
            date: "2019-07-14",
            time: "15:00"
        }

        const otpShowHelper = new OtpShowHelper()
        
        const secrect = otpShowHelper.createSecret(show, "Sufix.spec")

        assert.notEqual(secrect, undefined)
        assert.equal(secrect, '761719c0a40cd312017eb5ef88b38994')
        
    })

    // it('Should create a new createEpoch: OtpShowHelper.createEpoch', function() {

    //     const ticketGateOpeningTime = 2

    //     const show = {
    //         date: "2019-07-14",
    //         time: "15:30"
    //     }

    //     const otpShowHelper = new OtpShowHelper()

    //     const epoch = otpShowHelper.createEpoch(show, ticketGateOpeningTime)

    //     assert.notEqual(epoch, undefined)

    //     const epochRealDate = new Date(epoch * 1000)

    //     assert.notEqual(epoch, undefined)

    //     assert.equal(epochRealDate.getFullYear(), 2019)
    //     assert.equal(epochRealDate.getMonth() + 1, 7)
    //     assert.equal(epochRealDate.getDate(), 14)
    //     assert.equal(epochRealDate.getHours(), 13)
    //     assert.equal(epochRealDate.getMinutes(), 30)
        
    // })

/*
    it('Should create a new createStep: OtpShowHelper.createStep', function() {

        const ticketGateOpeningTime = 2

        const duration = 6
        const step = '28800000'

        const show = {
            date: "2019-07-14",
            time: "15:00"
        }

        const otpShowHelper = new OtpShowHelper()

        const newStep = otpShowHelper.createStep(duration, ticketGateOpeningTime)

        assert.notEqual(newStep, undefined)
        assert.equal(newStep, step)

        
    })

    it('Should buildOptions: OtpShowHelper.buildOptions', function() {

        const ticketGateOpeningTime = 2

        const duration = 6
        const step = 28800000

        const show = {
            date: "2019-07-14",
            time: "15:00"
        }

        const otpShowHelper = new OtpShowHelper()
       
        // const epoch = otpShowHelper.createEpoch(show, ticketGateOpeningTime)
        // assert.notEqual(epoch, undefined)

        const newStep = otpShowHelper.createStep(duration, ticketGateOpeningTime)
        assert.notEqual(newStep, undefined)
        assert.equal(newStep, step)
        
        const opions = otpShowHelper.buildOptions(show, duration, ticketGateOpeningTime)

        assert.notEqual(opions, undefined)
        assert.equal(opions.crypto, require('crypto'))
        assert.equal(opions.step, step)
        // assert.equal(opions.epoch, epoch)
        
    })
    */
})