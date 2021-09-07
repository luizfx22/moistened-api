# main.py
import random
import time
import ujson
import urequests
import network
import ubinascii
from machine import Pin

led = Pin(2, Pin.OUT)


class Module:
    def __init__(self):
        self.wlan = network.WLAN(network.STA_IF)
        self.wlan.active(True)

    def getMAC(self):
        mac = ubinascii.hexlify(self.wlan.config('mac'), ':').decode()
        return mac


class Emulator:
    def __init__(self):
        self.api_uri = "http://192.168.0.2:3001/api"
        self.now = urequests.get(self.api_uri + '/sync').json()

    def sendData(self, data: dict):
        response = urequests.post(
            self.api_uri + '/data',
            headers={'content-type': 'application/json'},
            data=ujson.dumps(data)
        )

        return response

    def generateData(self):
        self.now = urequests.get(self.api_uri + '/sync').json()
        mod = Module()
        data = {
            "air_temperature": random.randrange(20, 40),
            "air_humidity": random.randrange(5, 100),
            "soil_humidity": random.randint(1000, 4000),
            "readed_by": mod.getMAC(),
            "readed_at": self.now["time"]
        }

        led.on()

        resp = self.sendData(data)
        print(resp.json())

        led.off()


if __name__ == '__main__':
    emu = Emulator()
