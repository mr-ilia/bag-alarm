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
