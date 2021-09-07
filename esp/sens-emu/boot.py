# Conecta no wifi
from time import sleep
import network
from machine import Pin

ssid = "Luiz"
password = "/*/luizgomes/*/"

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

print("WiFi is starting, wait...")


# Useful fuction
def blink_embeded_led(times: int, delay_ms: int = 500):
    led = Pin(2, Pin.OUT)

    for _ in range(times):
        led.on()
        sleep(delay_ms / 1000)
        led.off()
        sleep(delay_ms / 1000)


if not wlan.isconnected():
    print("Connecting to", ssid, "...")
    wlan.connect(ssid, password)

    while not wlan.isconnected():
        pass

    print("Connected to", ssid, "!")
    blink_embeded_led(10, 50)
