# School Bag Alarm

MakeCode Python for the micro:bit app. Use a micro:bit V2 for its built-in speaker.

## Import the project

1. In the micro:bit app, open **Create Code / MakeCode**.
2. Choose **Import → Import URL**.
3. Paste **https://github.com/mr-ilia/bag-alarm** and choose **Go ahead!**.
4. The project opens in **Python**. Download it to your micro:bit.

Use the whole repository link above. To read or copy the Python code separately, open [main.py](main.py).

## Use the alarm

- Press **A** to start the three-second arming wait. A square means arming.
- A diamond means armed. Gently shake the bag to trigger sound and blinking LEDs.
- The alarm keeps going after the shake stops.
- Press **B** to stop the alarm and switch it off. B also cancels the arming wait.
- A happy face means off.

## Try it

Test shaking while off, an armed bag staying still, shaking after arming, stopping the movement, and pressing B. This version detects a **shake** and can miss a slow lift.

Change the pitch, LED pattern or blink timing. Predict the result, test it, then explain your improvement.

The Python code is the same as the School Bag Alarm lesson. This is MakeCode Python, for the app's MakeCode editor.

## Extend it with radio

Build up from one button controlling another micro:bit, then add a remote warning to this bag alarm. [Open the radio lesson, snippets and teacher references](RADIO.md).

| Starter | View the project | Import URL |
| --- | --- | --- |
| Sender | [radio-send branch](https://github.com/mr-ilia/bag-alarm/tree/radio-send) | `https://github.com/mr-ilia/bag-alarm#radio-send` |
| Receiver | [radio-receive branch](https://github.com/mr-ilia/bag-alarm/tree/radio-receive) | `https://github.com/mr-ilia/bag-alarm#radio-receive` |

Use the complete import URL, including the part after `#`. Give both micro:bits the same radio group number. Start with the short sender and receiver projects, then adapt a copy of your existing bag-alarm code using the guided lesson.
