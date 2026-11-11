// School Bag Alarm | MakeCode for the micro:bit app
// A = arm after 3 seconds. B = stop and switch off.
let state = "off"
music.setVolume(80)
basic.showIcon(IconNames.Happy, 0)

function arm_alarm() {
    if (state == "off") {
        state = "arming"
        basic.showIcon(IconNames.Square, 0)
        basic.pause(3000)
        if (state == "arming") {
            state = "armed"
            basic.showIcon(IconNames.Diamond, 0)
        }
    }
}
input.onButtonPressed(Button.A, arm_alarm)

function detect_shake() {
    if (state == "armed") {
        state = "alarm"
    }
}
input.onGesture(Gesture.Shake, detect_shake)

function stop_alarm() {
    state = "off"
    music.stopAllSounds()
    basic.showIcon(IconNames.Happy, 0)
}
input.onButtonPressed(Button.B, stop_alarm)

function sound_and_flash() {
    if (state == "alarm") {
        basic.showIcon(IconNames.Chessboard, 0)
        music.playTone(880, 200)
        if (state == "alarm") {
            basic.clearScreen()
            basic.pause(200)
        }
    }
    basic.pause(20)
}
basic.forever(sound_and_flash)
