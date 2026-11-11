# School Bag Alarm | MakeCode Python for the micro:bit app
# Paste into the PYTHON editor at https://makecode.microbit.org/
# A = arm after 3 seconds. B = stop and switch off.

state = "off"
music.set_volume(80)
basic.show_icon(IconNames.HAPPY, 0)

def arm_alarm():
    global state
    if state == "off":
        state = "arming"
        basic.show_icon(IconNames.SQUARE, 0)
        basic.pause(3000)
        if state == "arming":
            state = "armed"
            basic.show_icon(IconNames.DIAMOND, 0)
input.on_button_pressed(Button.A, arm_alarm)

def detect_shake():
    global state
    if state == "armed":
        state = "alarm"
input.on_gesture(Gesture.SHAKE, detect_shake)

def stop_alarm():
    global state
    state = "off"
    music.stop_all_sounds()
    basic.show_icon(IconNames.HAPPY, 0)
input.on_button_pressed(Button.B, stop_alarm)

def sound_and_flash():
    if state == "alarm":
        basic.show_icon(IconNames.CHESSBOARD, 0)
        music.play_tone(880, 200)
        if state == "alarm":
            basic.clear_screen()
            basic.pause(200)
    basic.pause(20)
basic.forever(sound_and_flash)
