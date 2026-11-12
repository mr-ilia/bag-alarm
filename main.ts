// Radio sender | MakeCode JavaScript
// Use the same group on both micro:bits.
radio.setGroup(7)

function sendGo() {
    radio.sendString("GO")
}
input.onButtonPressed(Button.A, sendGo)
