# From bag alarm to radio alarm

**Year 7 · MakeCode Python · Digital Explorer**

Build the project in small steps: make a button on one micro:bit control a second micro:bit, add another command, then adapt your existing bag alarm.

## Open the two starter projects

| Board | Import URL | Starting behaviour |
| --- | --- | --- |
| Sender | https://github.com/mr-ilia/bag-alarm#radio-send | Press A to send `GO` |
| Receiver | https://github.com/mr-ilia/bag-alarm#radio-receive | Receive `GO`, show a heart; local B clears |

Copy the **whole URL**, including `#radio-send` or `#radio-receive`, into the micro:bit app's repository import field or MakeCode's Import URL option. The part after `#` selects the starter branch. The ordinary [bag-alarm repository URL](https://github.com/mr-ilia/bag-alarm) still opens the original bag-alarm project.

Use the **Python tab in [MakeCode](https://makecode.microbit.org/)**. These projects use MakeCode Python. The separate MicroPython editor uses different commands. `main.ts` is the matching JavaScript version that MakeCode uses; do not paste it below the Python program.

Each starter branch needs only four files: `main.py`, `main.ts`, `pxt.json`, and this `README.md`. All hints and completed examples are included below.

## Suggested 55-minute lesson

| Time | Task |
| --- | --- |
| 0–5 minutes | Recall the bag alarm's input, processing, and outputs |
| 5–10 minutes | Assign sender/receiver roles and matching groups |
| 10–20 minutes | Make A send GO; show the heart; clear locally |
| 20–28 minutes | Add the remote CLEAR command |
| 28–33 minutes | Locate the original alarm activation point |
| 33–47 minutes | Adapt the bag sender and the receiver |
| 47–52 minutes | Test, acknowledge, stop, and rearm |
| 52–55 minutes | Demonstrate the system and explain a code change |

## 1. Make the first connection

1. Work in pairs with two powered micro:bits. Label one **sender** and the other **receiver**.
2. Use the same radio group on both boards. The example uses `7`; change it to the number your teacher assigns your pair. Each pair should have a different group from 0 to 255.
3. Load the correct starter onto each board and keep them nearby.
4. Press and release **A on the sender**. The receiver should show a heart.
5. Press **B on the receiver**. Its LEDs should clear. Try the sequence again.

Predict: what would happen if just one partner changed the radio group? Try it, then restore the matching groups.

### Complete sender starter

```python
# Radio sender | MakeCode Python
# Use the same group on both micro:bits.
radio.set_group(7)

def send_go():
    radio.send_string("GO")
input.on_button_pressed(Button.A, send_go)
```

### Complete receiver starter

```python
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
```

`message` holds the text that arrived. The condition `message == "GO"` checks the exact word. The code underneath runs only when it matches.

The radio transmission is an **output from the sender** and an **input to the receiver**. Both devices need a program.

## 2. Make the sender clear the distant screen

Challenge: **B on the sender** should clear the receiver's heart.

Before opening the hints, decide what must change on each board. The sender will send the word `CLEAR`; the receiver must choose what to do when that word arrives.

<details>
<summary>Hint: add the sender B command</summary>

Add this below the existing sender program. Keep the A event and group line.

```python
# ADD this below the existing sender program.
# B on the sender will ask the receiver to clear its LEDs.
def send_clear():
    radio.send_string("CLEAR")
input.on_button_pressed(Button.B, send_clear)
```

</details>

<details>
<summary>Hint: extend the receiver with CLEAR</summary>

Replace the old `receive_message` function and its registration with this block. Keep the group setup and local B-clear function. Use only **one** `radio.on_received_string` registration.

```python
# REPLACE the existing receive_message function and its registration
# with this block. Keep just ONE on_received_string registration.
def receive_message(message: str):
    if message == "GO":
        basic.show_icon(IconNames.HEART, 0)
    elif message == "CLEAR":
        basic.clear_screen()
radio.on_received_string(receive_message)
```

</details>

Test from the sender: A should show the heart; B should clear it. A message is data; the receiver's code decides the response.

Try `clear` instead of `CLEAR` on the sender. Predict the result, then restore the matching spelling and capital letters.

## 3. Adapt your own bag alarm

Open a separate copy of your working bag-alarm project on the sender. Keep its original behaviour:

- A starts the three-second arming delay.
- A shake triggers the alarm only when it is armed.
- B stops the alarm and switches it off.

The original bag alarm uses the accelerometer's **shake gesture**, not a light threshold.

### Add the group setup

Add this once near the top of the bag-alarm program, using your pair's group number:

```python
radio.set_group(7)
```

### Find the alarm activation point

Locate this existing function in your bag code:

```python
def detect_shake():
    global state
    if state == "armed":
        state = "alarm"
input.on_gesture(Gesture.SHAKE, detect_shake)
```

Add `radio.send_string("ALARM")` **immediately after** `state = "alarm"`, at the same indentation level. Keep the send command inside the `if`.

<details>
<summary>Check the bag-alarm change</summary>

Replace the existing `detect_shake` function and its registration with this version. Keep the rest of your bag program.

```python
# REPLACE the existing detect_shake function and its registration
# with this block. The one added line sends ALARM on activation.
def detect_shake():
    global state
    if state == "armed":
        state = "alarm"
        radio.send_string("ALARM")
input.on_gesture(Gesture.SHAKE, detect_shake)
```

</details>

This sends the message when the armed bag first enters the alarm state. Later shakes while it is already alarming do not send another message.

Do not put the send command in `sound_and_flash()` or in a forever loop: that would repeatedly send while the alarm is sounding.

### Change the receiver's expected message

On the receiver, change `"GO"` to `"ALARM"`. Change the output icon from `HEART` to `CHESSBOARD` for a clear warning. Keep the radio group and local B-clear code.

<details>
<summary>Check the receiver change</summary>

Replace the existing receive function and registration with this version. Keep one string-received handler.

```python
# REPLACE the existing receive_message function and its registration.
# Keep the group setup and the local Button B clear function.
def receive_message(message: str):
    if message == "ALARM":
        basic.show_icon(IconNames.CHESSBOARD, 0)
radio.on_received_string(receive_message)
```

</details>

The warning stays visible until cleared. **B on the receiver clears only its display; it does not stop or disarm the bag.** B on the bag stops the bag alarm. Press A on the bag and wait three seconds to arm it again.

## 4. Test the complete system

Clear the receiver before starting. Then compare your results with the predictions.

| Test | Expected result |
| --- | --- |
| Shake the bag while it is off | No new bag alarm or remote warning |
| Press A, wait three seconds, keep the bag still | No new remote warning |
| Gently shake the armed bag | Bag sounds/flashes and receiver shows the warning |
| Shake again while the bag is already alarming | No additional `ALARM` transmission from the shake handler |
| Stop moving the bag | The warning remains visible |
| Press B on the receiver | Its warning clears; the bag keeps alarming |
| Press B on the bag, then A, wait three seconds, and shake | A new alarm is sent |

The introductory version sends one event message per alarm activation. If the receiver is off or misses the message, it does not recover the old event automatically. Stop, rearm, and trigger again to retest. Acknowledgements or periodic state updates can be a later challenge.

## 5. Extension: clear the receiver from the bag

Could B on the bag stop the local alarm **and** clear the distant display?

Use the word `CLEAR`. Choose the function that already handles B on the bag. Extend the receiver's existing handler to recognise the command.

<details>
<summary>Extension answer: sender stop function</summary>

Replace the existing `stop_alarm` function and its registration with this version. It preserves local stop behavior and adds the radio command.

```python
# OPTIONAL: replace the existing stop_alarm function and registration.
# This stops the bag alarm AND asks the receiver to clear its warning.
# The receiver must also recognise CLEAR for this extension to work.
def stop_alarm():
    global state
    state = "off"
    radio.send_string("CLEAR")
    music.stop_all_sounds()
    basic.show_icon(IconNames.HAPPY, 0)
input.on_button_pressed(Button.B, stop_alarm)
```

</details>

<details>
<summary>Extension answer: receiver CLEAR branch</summary>

Replace the existing receive handler and registration with this version.

```python
# OPTIONAL: replace the existing receive_message function and registration.
# Keep just ONE on_received_string registration.
def receive_message(message: str):
    if message == "ALARM":
        basic.show_icon(IconNames.CHESSBOARD, 0)
    elif message == "CLEAR":
        basic.clear_screen()
radio.on_received_string(receive_message)
```

</details>

Test the reset, then rearm the bag and trigger it again. Optional extra: on a micro:bit V2 receiver, add `music.play_tone(880, 200)` after the warning icon to play a short beep through its built-in speaker. The main activity uses LEDs and does not need sound on the receiver.

## Explain your system

- Why do both micro:bits need the same group?
- Which event sends the alarm message?
- What must match on the sender and receiver?
- Why send at activation instead of on every flash?
- Why does clearing the receiver not stop the bag alarm?

Show the working system and explain one code change.

## If the second board does not react

Check both boards are powered and running the intended programs. Check the group number, spelling, and capital letters. Test close together. `send_string` needs a string-received handler; a number-received handler does not handle the same message type. Keep one string-received handler and put the different choices inside it.

Radio sends broadcasts to nearby boards in the same group. A group filters classroom traffic; it is not encrypted or exclusive pairing.

## Teacher reference: completed programs

These are checking references for **after** students attempt the adaptation. They are not loaded automatically by the starter projects. The base references include local receiver acknowledgement; the optional remote `CLEAR` changes are shown separately above.

<details>
<summary>Completed bag sender — MakeCode Python</summary>

```python
# TEACHER REFERENCE: School Bag Alarm with radio | MakeCode Python
# Paste into the PYTHON editor at https://makecode.microbit.org/
# A = arm after 3 seconds. B = stop and switch off.

radio.set_group(7)
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
        radio.send_string("ALARM")
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
```

</details>

<details>
<summary>Completed alarm receiver — MakeCode Python</summary>

```python
# TEACHER REFERENCE: remote bag-alarm warning | MakeCode Python
# B clears this receiver only. It does not stop or disarm the bag.
radio.set_group(7)

def receive_message(message: str):
    if message == "ALARM":
        basic.show_icon(IconNames.CHESSBOARD, 0)
radio.on_received_string(receive_message)

def clear_receiver():
    basic.clear_screen()
input.on_button_pressed(Button.B, clear_receiver)
```

</details>

<details>
<summary>Matching completed programs — MakeCode JavaScript</summary>

### Bag sender

```typescript
// TEACHER REFERENCE: School Bag Alarm with radio | MakeCode JavaScript
// A = arm after 3 seconds. B = stop and switch off.
radio.setGroup(7)
let state = "off"
music.setVolume(80)
basic.showIcon(IconNames.Happy, 0)

function armAlarm() {
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
input.onButtonPressed(Button.A, armAlarm)

function detectShake() {
    if (state == "armed") {
        state = "alarm"
        radio.sendString("ALARM")
    }
}
input.onGesture(Gesture.Shake, detectShake)

function stopAlarm() {
    state = "off"
    music.stopAllSounds()
    basic.showIcon(IconNames.Happy, 0)
}
input.onButtonPressed(Button.B, stopAlarm)

function soundAndFlash() {
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
basic.forever(soundAndFlash)
```

### Alarm receiver

```typescript
// TEACHER REFERENCE: remote bag-alarm warning | MakeCode JavaScript
// B clears this receiver only. It does not stop or disarm the bag.
radio.setGroup(7)

function receiveMessage(message: string) {
    if (message == "ALARM") {
        basic.showIcon(IconNames.Chessboard, 0)
    }
}
radio.onReceivedString(receiveMessage)

function clearReceiver() {
    basic.clearScreen()
}
input.onButtonPressed(Button.B, clearReceiver)
```

</details>

## Official references

- [Radio group](https://makecode.microbit.org/reference/radio/set-group)
- [Send string](https://makecode.microbit.org/reference/radio/send-string)
- [Receive string](https://makecode.microbit.org/reference/radio/on-received-string)
- [Button events](https://makecode.microbit.org/reference/input/on-button-pressed)
- [MakeCode Python and MicroPython](https://support.microbit.org/support/solutions/articles/19000111744-makecode-python-and-micropython)
