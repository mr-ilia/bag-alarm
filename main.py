# Radio sender | MakeCode Python
# Use the same group on both micro:bits.
radio.set_group(7)

def send_go():
    radio.send_string("GO")
input.on_button_pressed(Button.A, send_go)
