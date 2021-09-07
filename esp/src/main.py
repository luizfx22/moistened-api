# main.py
import time
import ujson as json
from machine import Pin, ADC
from dht import DHT11
import urequests as requests

sets = None

with open("./settings.json", 'r', encoding="UTF-8") as file:  # Lê o JSON
    sets = json.loads(file.read())
    file.close()

print(sets)

dht = DHT11(Pin(sets["dht-pin"]))
soil = ADC(Pin(sets["soil-pin"]))

while True:
    dht.measure()

    temp = dht.temperature()
    hum = dht.humidity()

    sohum = soil.read()

    print("Temperatura {temperatura:.2f}C :: Humidade {humidate:.2f}% :: Solo {solo:0>d}".format(
        temperatura=temp, humidate=hum, solo=sohum))

    time.sleep(1)
