# otp-ticket
Generate an OTP that will be a ticket for a show

## Dependencies

    "dependencies": {
        "crypto": "^1.0.1",
        "md5": "^2.2.1",
        "otplib": "^11.0.1"
    }
    
1) https://www.npmjs.com/package/otplib

2) https://www.npmjs.com/package/md5



## Dev Dependencies

    "devDependencies": {
        "mocha": "^6.1.4"
    }
  
## Test

    npm run test

### Test Results
    OtpShow.js
        √ should create a new instance with empty constroctor
        √ should create a new instance with param "ticketGateOpeningTime" and "duration" passed to constroctor
        √ should be valid: create a six digits OTP
        √ should be invalid: try create a six digits OTP one hour before ticket gate opening time
        √ should be valid: validate a six digits OTP
        √ should be valid: validate a six digits OTP after one hour of show time
        √ should be invalid: validate a six digits OTP next day
        √ should be invalid: create and validate a six digits OTP after show ending

    OtpShowHelper.js
        √ should create a new instance
        √ Should be valid: OtpShowHelper.validateStartTime its two hours for opening
        √ Should be valid: OtpShowHelper.validateStartTime its one hour for opening
        √ Should be invalid: OtpShowHelper.validateStartTime its three hours for opening
        √ Should create a new secrect: OtpShowHelper.createSecret
        √ Should create a new createStep: OtpShowHelper.createStep
        √ Should buildOptions: OtpShowHelper.buildOptions
