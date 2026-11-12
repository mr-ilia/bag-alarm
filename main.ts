// Radio receiver | MakeCode JavaScript
// Use the same group on both micro:bits.
radio.setGroup(7)

function receiveMessage(message: string) {
    if (message == "GO") {
        basic.showIcon(IconNames.Heart, 0)
    }
}
radio.onReceivedString(receiveMessage)

function clearReceiver() {
    basic.clearScreen()
}
input.onButtonPressed(Button.B, clearReceiver)
