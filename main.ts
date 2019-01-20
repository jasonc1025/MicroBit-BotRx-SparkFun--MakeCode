let motor_PowerOffset_Straight = 0
let motorRight_PowerOffset_Turn = 0
let motorRight_PowerLevel_Offset_BotToGrid_Quotient = 0
let armForward_Flag = false
let motor_PowerFactor_Hi = 0
let motor_PowerFactor_Mid = 0
let motor_PowerFactor_Lo = 0
let motorLeft_PowerOffset_Turn = 0
let motorLeft_PowerLevel_Offset_BotToGrid_Quotient = 0
let encoderRight_LightValue_Old = 0
let motorRight_PowerLevel_Offset = 0
let motors_PowerBase_Average_Percent = 0
let motor_PowerBase_STEP = 0
let scrollTextDelay_BufferOverrunMinimize_Msec = 0
let groupChannel_Int_Max = 0
let groupChannel_Int_Min = 0
let motorRight_PowerLevel_Offset_BotToGrid_Remainder = 0
let motorRight_PowerBase = 0
let encoderRight_Slope_Old = 0
let encoderRight_Slope_New = 0
let debugOn_Sensors_InfraredLight = false
let idleRequestCount_TRIGGER = 0
let idleRequestCount = 0
let motor_PowerBase_MAX = 0
let motor_PowerBase_MIN = 0
let motors_PowerBase_Average = 0
let debugOn_Sensors_CompassDegrees = false
let compassDegrees = 0
let groupChannelShow_Countdown = 0
let debugOn_Sensors_SonarSound = false
let debugOn_Network = false
let motorLeft_PowerLevel_Offset = 0
let debugOn_Motors = false
let motor_PowerLevel_Neutral = 0
let motorLeft_PowerBase = 0
let ledGridValueMax = 0
let motorLeft_PowerLevel_Offset_BotToGrid_Remainder = 0
let encoderRight_LightValue_New = 0
let sonarSound_Distance_Cm = 0
let infraredLight_Inverted_1003Max = 0
let groupChannelShow_Countdown_Max = 0
let receivedString_Current = ""
let _commentUseOnly = ""
let groupChannel_Int = 0
let receivedNumberIn = 0
/**
 * Version History
 * 
 * 2019-0112-1630
 * 
 * * Compass Sensor not too reliable, lags/drifts, so not use, turn off.  Only way to turn-off is to deactivate it, or will request manual calibration after each flash firmware
 * 
 * * Add new 'GroupChannel_UserCustomize_Before_RadioNetworkSetup'
 */
/**
 * Important Notes
 * 
 * 2019-0112
 * 
 * * Compass Sensor not too reliable, lags/drifts, so not use, turn off.  Only way to turn-off is to deactivate it, or will request manual calibration after each flash firmware
 */
/**
 * TODO
 * 
 *  * Delete obsolete var
 */
/**
 * Cont here
 */
function Before_RadioNetworkSetup__GroupChannel_UserCustomize_Setup2() {
    // User Can Change/Customize as Needed for Both RcTx
    // and BotRx
    groupChannel_Int = 25
}
input.onButtonPressed(Button.A, function () {
    groupChannel_Int += -1
    if (groupChannel_Int < groupChannel_Int_Min) {
        groupChannel_Int = groupChannel_Int_Max
    }
    radio.setGroup(groupChannel_Int)
    _commentUseOnly = "To Force Display Show"
    groupChannelShow_Countdown = 0
})
function ArmServo_Setup2() {
    pins.servoSetPulse(AnalogPin.P16, 1500)
    pins.servoWritePin(AnalogPin.P16, 180)
}
function GearMotor_Setup2() {
    motobit.enable(MotorPower.On)
    motobit.invert(Motor.Left, false)
    motobit.invert(Motor.Right, true)
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 0)
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 0)
    motor_PowerBase_MIN = 40
    motor_PowerBase_MAX = 80
    motor_PowerBase_STEP = 20
    motorLeft_PowerBase = motor_PowerBase_MIN
    motorRight_PowerBase = motor_PowerBase_MIN
    // Was 1, 2 yet seems too slow, try 5
    motor_PowerOffset_Straight = 5
    // -10 :)+, try -15 (seems better)
    motorLeft_PowerOffset_Turn = -10
    // -10 :)+, try -15 (seems better)
    motorRight_PowerOffset_Turn = -10
    idleRequestCount_TRIGGER = 0
    motor_PowerFactor_Lo = 1
    motor_PowerFactor_Mid = 2
    motor_PowerFactor_Hi = 4
    motor_PowerLevel_Neutral = 0
    motorLeft_PowerLevel_Offset = motor_PowerLevel_Neutral
    motorRight_PowerLevel_Offset = motor_PowerLevel_Neutral
}
input.onButtonPressed(Button.B, function () {
    groupChannel_Int += 1
    if (groupChannel_Int > groupChannel_Int_Max) {
        groupChannel_Int = groupChannel_Int_Min
    }
    radio.setGroup(groupChannel_Int)
    _commentUseOnly = "To Force Display Show"
    groupChannelShow_Countdown = 0
})
function Before_EverythingElse__General_Setup2() {
    _commentUseOnly = "'idleRequestCount_TRIGGER' accomodates for Dropped Packets/Msgs: 0 = Real-time but vulnerable to dropped packets interruptions"
    debugOn_Network = false
    debugOn_Motors = false
    debugOn_Sensors_SonarSound = false
    debugOn_Sensors_InfraredLight = false
    debugOn_Sensors_CompassDegrees = false
    ledGridValueMax = 4
    // Pause to allow 'show string' to finish scroll text
    // and not be clobbered out
    //
    // * 500 ms: 0.5 sec seems sufficient for basic status
    // granularity/frequency
    //
    scrollTextDelay_BufferOverrunMinimize_Msec = 500
    groupChannel_Int_Min = 1
    groupChannel_Int_Max = 25
}
radio.onDataPacketReceived(function ({ receivedString: receivedStringIn, receivedNumber: receivedNumberIn }) {
    receivedString_Current = receivedStringIn
    _commentUseOnly = "To Compensate for Dropped Command Packets to Continue Prior Operation"
    idleRequestCount = 0
    if (receivedNumberIn > 0) {
        _commentUseOnly = "No longer do this auto-check, since will interfere with other bots with same default."
    }
    if (debugOn_Motors) {
        basic.showString("]" + receivedString_Current + "[")
    }
})
function GroupChannelShow_Fn2() {
    basic.clearScreen()
    _commentUseOnly = "'groupChannel_Int' is Base-1 while 'index' and 'plot' is Base-0"
    for (let index = 0; index <= groupChannel_Int - 1; index++) {
        led.plot(index % 5, Math.idiv(index, 5))
    }
}
function RadioNetwork_Setup2() {
    groupChannelShow_Countdown_Max = 5
    groupChannelShow_Countdown = groupChannelShow_Countdown_Max
    radio.setGroup(groupChannel_Int)
    _commentUseOnly = "Following \" \" is actually null (\"\") :)"
    receivedString_Current = ""
    armForward_Flag = true
    radio.sendNumber(groupChannel_Int)
}
function reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2() {
    _commentUseOnly = "Immediately clear 'receivedString_Current' to \"\", since even after 'show leds' causes unpredictable errors"
    _commentUseOnly = "\" \" below is a null blank as \"\""
    receivedString_Current = ""
}
function MotorLeft_PowerLevel_Offset_BotToGrid_Convert_Fn2() {
    _commentUseOnly = "Negative applied since Grid coordinate-system vertically increases from top to bottom, yet Bot/UI is he reverse/opposite"
    _commentUseOnly = "Offset of '2' since Grid coordinate-system origin is top-left, yet Bot/UI has origin to be dead-center"
    motorLeft_PowerLevel_Offset_BotToGrid_Remainder = (2 - motorLeft_PowerLevel_Offset) % 5
    if (motorLeft_PowerLevel_Offset_BotToGrid_Remainder < 0) {
        _commentUseOnly = "Mod(Remainder) above can still produce a negative value, so if it is negative, then add the mod(remainder) value of '5' to ensure positive"
        motorLeft_PowerLevel_Offset_BotToGrid_Remainder = motorLeft_PowerLevel_Offset_BotToGrid_Remainder + 5
    }
    if (2 - motorLeft_PowerLevel_Offset <= 0) {
        motorLeft_PowerLevel_Offset_BotToGrid_Quotient = 2 - Math.idiv(2 + motorLeft_PowerLevel_Offset, 5)
    } else {
        motorLeft_PowerLevel_Offset_BotToGrid_Quotient = 2 + Math.idiv(2 - motorLeft_PowerLevel_Offset, 5)
    }
    led.plot(3, motorLeft_PowerLevel_Offset_BotToGrid_Remainder)
    led.plot(4, motorLeft_PowerLevel_Offset_BotToGrid_Remainder)
    led.plot(0, motorLeft_PowerLevel_Offset_BotToGrid_Quotient)
    basic.pause(1000)
}
function MotorRight_PowerLevel_Offset_BotToGrid_Convert_Fn2() {
    _commentUseOnly = "Negative applied since Grid coordinate-system vertically increases from top to bottom, yet Bot/UI is he reverse/opposite"
    _commentUseOnly = "Offset of '2' since Grid coordinate-system origin is top-left, yet Bot/UI has origin to be dead-center"
    motorRight_PowerLevel_Offset_BotToGrid_Remainder = (2 - motorRight_PowerLevel_Offset) % 5
    if (motorRight_PowerLevel_Offset_BotToGrid_Remainder < 0) {
        _commentUseOnly = "Mod(Remainder) above can still produce a negative value, so if it is negative, then add the mod(remainder) value of '5' to ensure positive"
        motorRight_PowerLevel_Offset_BotToGrid_Remainder = motorRight_PowerLevel_Offset_BotToGrid_Remainder + 5
    }
    if (2 - motorRight_PowerLevel_Offset <= 0) {
        motorRight_PowerLevel_Offset_BotToGrid_Quotient = 2 - Math.idiv(2 + motorRight_PowerLevel_Offset, 5)
    } else {
        motorRight_PowerLevel_Offset_BotToGrid_Quotient = 2 + Math.idiv(2 - motorRight_PowerLevel_Offset, 5)
    }
    led.plot(0, motorRight_PowerLevel_Offset_BotToGrid_Remainder)
    led.plot(1, motorRight_PowerLevel_Offset_BotToGrid_Remainder)
    led.plot(4, motorRight_PowerLevel_Offset_BotToGrid_Quotient)
    basic.pause(1000)
}
Before_EverythingElse__General_Setup2()
Before_RadioNetworkSetup__GroupChannel_UserCustomize_Setup2()
RadioNetwork_Setup2()
GearMotor_Setup2()
ArmServo_Setup2()
basic.showIcon(IconNames.Happy)
basic.pause(3000)
// Cycle
basic.forever(function () {
    if (receivedString_Current.compare("s") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 0)
        basic.showIcon(IconNames.No)
    } else if (receivedString_Current.compare("f") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + 0)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (receivedString_Current.compare("fl") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + motorLeft_PowerOffset_Turn * motor_PowerFactor_Lo)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + 0)
        basic.showLeds(`
            # # # . .
            # # . . .
            # . # . .
            . . . # .
            . . . . .
            `)
    } else if (receivedString_Current.compare("fr") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + motorRight_PowerOffset_Turn * motor_PowerFactor_Lo)
        basic.showLeds(`
            . . # # #
            . . . # #
            . . # . #
            . # . . .
            . . . . .
            `)
    } else if (receivedString_Current.compare("l") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + motorLeft_PowerOffset_Turn * motor_PowerFactor_Mid)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + 0)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (receivedString_Current.compare("r") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + motorRight_PowerOffset_Turn * motor_PowerFactor_Mid)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (receivedString_Current.compare("fld") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + motorLeft_PowerOffset_Turn * motor_PowerFactor_Hi)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + 0)
        basic.showLeds(`
            . . # . .
            . # # . #
            # # # # #
            . # # . #
            . . # . .
            `)
    } else if (receivedString_Current.compare("frd") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase + 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase + motorRight_PowerOffset_Turn * motor_PowerFactor_Hi)
        basic.showLeds(`
            . . # . .
            # . # # .
            # # # # #
            # . # # .
            . . # . .
            `)
    } else if (receivedString_Current.compare("d") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        pins.servoWritePin(AnalogPin.P16, 180)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # # .
            # . . . .
            `)
    } else if (receivedString_Current.compare("u") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        pins.servoWritePin(AnalogPin.P16, 45)
        basic.showLeds(`
            . . # # .
            . . . # .
            . . . # .
            . . . # .
            . . . . .
            `)
    } else if (receivedString_Current.compare("tr") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        if (motorLeft_PowerBase <= motor_PowerBase_MAX - motor_PowerBase_STEP && motorRight_PowerBase <= motor_PowerBase_MAX - motor_PowerBase_STEP) {
            // +20 seems more noticeable than +05
            motorLeft_PowerBase += motor_PowerBase_STEP
            // +20 seems more noticeable than +05
            motorRight_PowerBase += motor_PowerBase_STEP
        }
        motors_PowerBase_Average = Math.idiv(motorLeft_PowerBase + motorRight_PowerBase, 2)
        motors_PowerBase_Average_Percent = (motors_PowerBase_Average - motor_PowerBase_MIN) / (motor_PowerBase_MAX - motor_PowerBase_MIN)
        basic.clearScreen()
        _commentUseOnly = "Map to [-4,0] then abs() reverses for inverted y on led-grid"
        led.plot(1, Math.abs(Math.map(motors_PowerBase_Average_Percent, 0, 1, -4, 0)))
        led.plot(2, Math.abs(Math.map(motors_PowerBase_Average_Percent, 0, 1, -4, 0)))
        led.plot(3, Math.abs(Math.map(motors_PowerBase_Average_Percent, 0, 1, -4, 0)))
        basic.pause(1000)
    } else if (receivedString_Current.compare("tl") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        if (motorLeft_PowerBase > motor_PowerBase_MIN && motorRight_PowerBase > motor_PowerBase_MIN) {
            // +20 seems more noticeable than +05
            motorLeft_PowerBase += -1 * motor_PowerBase_STEP
            // +20 seems more noticeable than +05
            motorRight_PowerBase += -1 * motor_PowerBase_STEP
        }
        motors_PowerBase_Average = Math.idiv(motorLeft_PowerBase + motorRight_PowerBase, 2)
        motors_PowerBase_Average_Percent = (motors_PowerBase_Average - motor_PowerBase_MIN) / (motor_PowerBase_MAX - motor_PowerBase_MIN)
        basic.clearScreen()
        _commentUseOnly = "Map to [-4,0] then abs() reverses for inverted y on led-grid"
        led.plot(1, Math.abs(Math.map(motors_PowerBase_Average_Percent, 0, 1, -4, 0)))
        led.plot(2, Math.abs(Math.map(motors_PowerBase_Average_Percent, 0, 1, -4, 0)))
        led.plot(3, Math.abs(Math.map(motors_PowerBase_Average_Percent, 0, 1, -4, 0)))
        basic.pause(1000)
    } else if (receivedString_Current.compare("cl") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        for (let i = 0; i < 1; i++) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . # . . .
                . . . . .
                . . . . .
                `)
            for (let i = 0; i < 1; i++) {
                _commentUseOnly = "'show leds' must preceed or will clobber following led plots"
                MotorLeft_PowerLevel_Offset_BotToGrid_Convert_Fn2()
                if (debugOn_Motors) {
                    basic.showNumber(motorLeft_PowerLevel_Offset)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorLeft_PowerLevel_Offset_BotToGrid_Remainder)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorLeft_PowerLevel_Offset_BotToGrid_Quotient)
                }
            }
        }
    } else if (receivedString_Current.compare("clu") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        for (let i = 0; i < 1; i++) {
            basic.showLeds(`
                . # . . .
                . # . . .
                . # . . .
                . . . . .
                . . . . .
                `)
            motorLeft_PowerLevel_Offset += 1
            motorLeft_PowerBase = motor_PowerBase_MIN + motor_PowerOffset_Straight * motorLeft_PowerLevel_Offset
            for (let i = 0; i < 1; i++) {
                _commentUseOnly = "'show leds' must preceed or will clobber following led plots"
                MotorLeft_PowerLevel_Offset_BotToGrid_Convert_Fn2()
                if (debugOn_Motors) {
                    basic.showNumber(motorLeft_PowerLevel_Offset)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorLeft_PowerLevel_Offset_BotToGrid_Remainder)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorLeft_PowerLevel_Offset_BotToGrid_Quotient)
                }
            }
        }
    } else if (receivedString_Current.compare("cld") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        for (let i = 0; i < 1; i++) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . # . . .
                . # . . .
                . # . . .
                `)
            motorLeft_PowerLevel_Offset += -1
            motorLeft_PowerBase = motor_PowerBase_MIN + motor_PowerOffset_Straight * motorLeft_PowerLevel_Offset
            for (let i = 0; i < 1; i++) {
                _commentUseOnly = "'show leds' must preceed or will clobber following led plots"
                MotorLeft_PowerLevel_Offset_BotToGrid_Convert_Fn2()
                if (debugOn_Motors) {
                    basic.showNumber(motorLeft_PowerLevel_Offset)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorLeft_PowerLevel_Offset_BotToGrid_Remainder)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorLeft_PowerLevel_Offset_BotToGrid_Quotient)
                }
            }
        }
    } else if (receivedString_Current.compare("cr") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        for (let i = 0; i < 1; i++) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . # .
                . . . . .
                . . . . .
                `)
            for (let i = 0; i < 1; i++) {
                _commentUseOnly = "'show leds' must preceed or will clobber following led plots"
                MotorRight_PowerLevel_Offset_BotToGrid_Convert_Fn2()
                if (debugOn_Motors) {
                    basic.showNumber(motorRight_PowerLevel_Offset)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorRight_PowerLevel_Offset_BotToGrid_Remainder)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorRight_PowerLevel_Offset_BotToGrid_Quotient)
                }
            }
        }
    } else if (receivedString_Current.compare("cru") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        for (let i = 0; i < 1; i++) {
            basic.showLeds(`
                . . . # .
                . . . # .
                . . . # .
                . . . . .
                . . . . .
                `)
            motorRight_PowerLevel_Offset += 1
            motorRight_PowerBase = motor_PowerBase_MIN + motor_PowerOffset_Straight * motorRight_PowerLevel_Offset
            for (let i = 0; i < 1; i++) {
                _commentUseOnly = "'show leds' must preceed or will clobber following led plots"
                MotorRight_PowerLevel_Offset_BotToGrid_Convert_Fn2()
                if (debugOn_Motors) {
                    basic.showNumber(motorRight_PowerLevel_Offset)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorRight_PowerLevel_Offset_BotToGrid_Remainder)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorRight_PowerLevel_Offset_BotToGrid_Quotient)
                }
            }
        }
    } else if (receivedString_Current.compare("crd") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        for (let i = 0; i < 1; i++) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . # .
                . . . # .
                . . . # .
                `)
            motorRight_PowerLevel_Offset += -1
            motorRight_PowerBase = motor_PowerBase_MIN + motor_PowerOffset_Straight * motorRight_PowerLevel_Offset
            for (let i = 0; i < 1; i++) {
                _commentUseOnly = "'show leds' must preceed or will clobber following led plots"
                MotorRight_PowerLevel_Offset_BotToGrid_Convert_Fn2()
                if (debugOn_Motors) {
                    basic.showNumber(motorRight_PowerLevel_Offset)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorRight_PowerLevel_Offset_BotToGrid_Remainder)
                    basic.showIcon(IconNames.SmallSquare)
                    basic.showNumber(motorRight_PowerLevel_Offset_BotToGrid_Quotient)
                }
            }
        }
    } else if (receivedString_Current.compare("cx") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        idleRequestCount_TRIGGER += -1
        basic.showString("NetLagMax:" + idleRequestCount_TRIGGER + ":")
    } else if (receivedString_Current.compare("cy") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        idleRequestCount_TRIGGER += 1
        basic.showString("NetLagMax:" + idleRequestCount_TRIGGER + ":")
    } else if (receivedString_Current.compare("b") == 0) {
        _commentUseOnly = "'Following not a high priority motion, so process later here"
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, motorLeft_PowerBase + 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, motorRight_PowerBase + 0)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (receivedString_Current.compare("bl") == 0) {
        _commentUseOnly = "'Following not a high priority motion, so process later here"
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, motorLeft_PowerBase + motorLeft_PowerOffset_Turn * motor_PowerFactor_Lo)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, motorRight_PowerBase + 0)
        basic.showLeds(`
            . . . . .
            . . . # .
            # . # . .
            # # . . .
            # # # . .
            `)
    } else if (receivedString_Current.compare("br") == 0) {
        _commentUseOnly = "'Following not a high priority motion, so process later here"
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, motorLeft_PowerBase + 0)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, motorRight_PowerBase + motorRight_PowerOffset_Turn * motor_PowerFactor_Lo)
        basic.showLeds(`
            . . . . .
            . # . . .
            . . # . #
            . . . # #
            . . # # #
            `)
    } else if (receivedString_Current.compare("cu") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, motorLeft_PowerBase)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, motorRight_PowerBase)
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . # . .
            `)
    } else if (receivedString_Current.compare("cd") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, motorLeft_PowerBase)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, motorRight_PowerBase)
        basic.showLeds(`
            . . # . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
    } else if (receivedString_Current.compare("cab") == 0) {
        reset__ReceiveString_Current__ToPreventInifiteLoopOnCurrentMessage_Fn2()
        basic.showLeds(`
            . . . . .
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            `)
        basic.showString("Pwr:" + motorLeft_PowerBase + ":" + motorRight_PowerBase)
    } else {
        // If no incoming remote codes, then default to Idle
        if (true) {
            idleRequestCount += 1
            _commentUseOnly = "'idleRequestCount' reaches a threshold of 2 for idle state, accommodating for 1 Dropped Packet/Msg Max"
            if (idleRequestCount > idleRequestCount_TRIGGER) {
                _commentUseOnly = "If no incoming remote codes, then default to Idle"
                motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 0)
                motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 0)
                for (let i = 0; i < 1; i++) {
                    _commentUseOnly = "To not clobber 'debugOn_Sensors' visuals, insure such not active when accommodating for 'GroupChannelShow_Fn'"
                    if (!(debugOn_Sensors_SonarSound)) {
                        groupChannelShow_Countdown += -1
                        if (groupChannelShow_Countdown <= 0) {
                            _commentUseOnly = "Only Call this Function once-in-a-while to prevent clobbering other graphics, thus this countdown used"
                            GroupChannelShow_Fn2()
                            groupChannelShow_Countdown = groupChannelShow_Countdown_Max
                        } else {
                            _commentUseOnly = "Since no sound capability, not override above 'GroupChannelShow_Fn' since real-time visual feedback needed for Ch Inc/Dec"
                        }
                    }
                }
            } else {
                _commentUseOnly = "'Debug: idleRequestCount' to monitor Dropped Packet/Msg"
                basic.showNumber(idleRequestCount % 10)
            }
        }
    }
})
basic.forever(function () {
    if (debugOn_Sensors_SonarSound) {
        // Range 0cm to ~100cm (~1m)
        led.plotBarGraph(
        sonarSound_Distance_Cm,
        100
        )
        basic.pause(scrollTextDelay_BufferOverrunMinimize_Msec)
        _commentUseOnly = "Following 'Sonar' Block auto serial prints distance(cm) w/o title"
        _commentUseOnly = "Thus, prefix title using following 'serial write string' w/o newline"
        serial.writeString("*** Sonar_Sound :")
    }
    // Micro:Bit: Servo Vcc-Gnd = 5.14v
    //
    //
    // P0: v3.3-Gnd = 3.3v
    //
    //
    // Battery-Pack: 1.5v 1AA, 3.0v 2AA, 4.5v 3AA, 6.0v
    // 4AA
    //
    // * but need to share same grounding on both
    // battery-pack and micro:bit.
    //
    //
    // For UltraSonic Sonar: 3.3v not enough, 4.5v Battery
    // Pack :)+, 5.14v Servo :)+
    //
    //
    // total distance = 34,3000 cm/s (sound v at sea
    // level)  * round_trip_time
    //
    //
    // distance between sensor and obstacle = 34,300 cm/s
    // * (round_trip_time * 0.5)
    //
    // = 17,150 cm/s * one_way_trip_time(s)
    //
    //
    // = 17,150 cm/s * one_way_trip_time(s) = 58.3 x10^-6
    // cm/s = 1/58.3 cm/usec
    //
    // >> * (1 s / 1 x 10^6 usec)
    //
    sonarSound_Distance_Cm = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
})
basic.forever(function () {
    // Seems best that sensor is 3mm (0.3cm) max away from
    // floor
    //
    // * SparkFun IR Sensor Line Follower (SEN-11769,
    // QRE1113)
    //
    // * SparkFun 1/8-3/16" range
    //
    infraredLight_Inverted_1003Max = pins.analogReadPin(AnalogPin.P2)
    if (debugOn_Sensors_InfraredLight) {
        serial.writeValue("** Infrared_Light ", infraredLight_Inverted_1003Max)
        if (infraredLight_Inverted_1003Max >= 800) {
            basic.showLeds(`
                . . . . #
                . . . . .
                . . . . .
                . . # # #
                # # # # #
                `)
        } else if (infraredLight_Inverted_1003Max >= 600) {
            basic.showLeds(`
                . . . . #
                . . . . .
                . . . . .
                . . . . #
                # # # # #
                `)
        } else if (infraredLight_Inverted_1003Max >= 400) {
            basic.showLeds(`
                . . . . #
                . . . . .
                . . . . .
                . . . . .
                . # # # #
                `)
        } else if (infraredLight_Inverted_1003Max >= 200) {
            basic.showLeds(`
                . . . . #
                . . . . .
                . . . . .
                . . . . .
                . . . # #
                `)
        } else {
            basic.showLeds(`
                . . . . #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
        basic.pause(scrollTextDelay_BufferOverrunMinimize_Msec)
    }
})
// * Remove 'set 'compassDegrees' to 'compass
// heading'', to prevent manual calibration after each
// flash firmware
basic.forever(function () {
    // * The calibration will ask you to draw a circle or
    // fill the LED screen by tilting the micro:bit around
    // the center dot.
    //
    // * For MS-MakeBlock, re-callibrate only occurs upon
    // re-download/re-flash.  Reset or power on/off keeps
    // callibration in volatile memory. :)  Unlike Python.
    //
    // * 2018-1225-0710 TYJ orientation appears accurate
    // with +/- 10-20 degrees.  Callibration is important
    // over the center dot. :)+
    //
    if (debugOn_Sensors_CompassDegrees) {
        serial.writeValue("* Compass_Degrees", compassDegrees)
        // *North can e >= 275 or < 45.
        if (compassDegrees >= 275 && compassDegrees <= 360) {
            basic.showArrow(ArrowNames.North)
        } else if (compassDegrees >= 235) {
            basic.showArrow(ArrowNames.West)
        } else if (compassDegrees >= 135) {
            basic.showArrow(ArrowNames.South)
        } else if (compassDegrees >= 45) {
            basic.showArrow(ArrowNames.East)
        } else if (compassDegrees >= 0 && compassDegrees < 45) {
            basic.showArrow(ArrowNames.North)
        }
        basic.pause(scrollTextDelay_BufferOverrunMinimize_Msec)
    }
})
