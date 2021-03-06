# main.py
import time
import ujson as json
import urequests as requests
from machine import Pin, ADC
from dht import DHT11

sets = None

with open("./settings.json", 'r', encoding="UTF-8") as file:  # Lê o JSON
    sets = json.loads(file.read())
    file.close()

dht = DHT11(Pin(sets["dht-pin"]))
soil = ADC(Pin(sets["soil-pin"]))
soil.atten(ADC.ATTN_11DB)

# DEV_API_ADDR = "http://192.168.0.2:3001/api"
DEV_API_ADDR = "https://api.moistened.luizg.dev/api"
PROD_API_ADDR = "https://api.moistened.luizg.dev/api"

while True:
    dht.measure()

    temp = dht.temperature()
    hum = dht.humidity()

    sohum = soil.read()

    nowTime = requests.get(DEV_API_ADDR + "/now").text

    payload = {
        "sensor_id": sets["sensor-id"],
        "air_temperature": temp,
        "air_humidity": hum,
        "soil_humidity": sohum,
        "readed_at": nowTime
    }

    result = requests.post(DEV_API_ADDR + "/dados", data=json.dumps(payload),
                           headers={"Content-Type": "application/json"}).text

    print(result)

    time.sleep(10)
