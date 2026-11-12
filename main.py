# Radio receiver | MakeCode Python
# Use the same group on both micro:bits.
radio.set_group(7)

def receive_message(message: str):
    if message == "GO":
        basic.show_icon(IconNames.HEART, 0)
radio.on_received_string(receive_message)

def clear_receiver():
    basic.clear_screen()
input.on_button_pressed(Button.B, clear_receiver)
