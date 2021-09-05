import re
from time import sleep
import os
import hashlib
from machine import Pin
import network
import ujson as json
import picoweb
import ubinascii


# Useful fuction
def blink_embeded_led(times: int, delay_ms: int = 500):
    led = Pin(2, Pin.OUT)

    for _ in range(times):
        led.on()
        sleep(delay_ms / 1000)
        led.off()
        sleep(delay_ms / 1000)


# Parte das configurações iniciais
default_settings = {
    "ap-ssid": "",
    "ap-password": "",
    "esp-hookup-code": ""
}

# Se o arquivo JSON não existe, cria um novo
if "settings.json" not in os.listdir("."):
    file = open("settings.json", "w", encoding="UTF-8")
    json.dump(default_settings, file)  # Escreve as configurações padrão
    file.close()

with open("./settings.json", 'r', encoding="UTF-8") as file:  # Lê o JSON
    sets = json.loads(file.read())
    default_settings = sets  # altera o valor da variável de padrões pelo valor do JSON
    file.close()

# Se estiver configurado
if default_settings["ap-ssid"] != "" and default_settings["ap-password"] != "":
    # Conecta no wifi
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)

    print("WiFi is starting, wait...")

    if not wlan.isconnected():
        print("Connecting to", default_settings["ap-ssid"], "...")
        wlan.connect(default_settings["ap-ssid"],
                     default_settings["ap-password"])

        while not wlan.isconnected():
            pass

        print("Connected to", default_settings["ap-ssid"], "!")
        blink_embeded_led(10, 50)

else:
    # Se não
    blink_embeded_led(5, 100)

    # Define a placa como AP
    wlan = network.WLAN(network.AP_IF)
    wlan.config(essid="SOIL-MODULE #")
    wlan.active(True)

    # Lista todas as redes que estão disponíveis para o ESP se conectar
    local_networks = network.WLAN(network.STA_IF)
    local_networks.active(True)
    local_networks = local_networks.scan()

    print("WAITING FOR CONNECTIONS")

    app = picoweb.WebApp(__name__)

    # Parte para gerar o código de vinculação do ESP
    mac = ubinascii.hexlify(wlan.config('mac'), ':').decode()
    mac_hash = hashlib.sha256(mac).digest()
    mac_hash_numbers = re.sub(
        "[^0-9]", "", ubinascii.hexlify(mac_hash).decode("utf-8"))
    esp_hookup_code = mac_hash_numbers[0:7]

    @app.route("/")
    def index(req, resp):
        print(req.method)
        if req.method == 'POST':
            yield from req.read_form_data()

            form = req.form

            with open("./settings.json", 'w', encoding="UTF-8") as _file:  # Lê o JSON
                json.dump({
                    "ap-ssid": form["ap-ssid"],
                    "ap-password": form["ap-password"],
                    "esp-hookup-code": esp_hookup_code
                }, _file)
                _file.close()

            yield from picoweb.start_response(resp)
            yield from resp.awrite(json.dumps({"success": True, "hookup-code": esp_hookup_code}))
            yield from resp.awrite("/?success=true")
            return 2

        app._load_template("index.html")

        available_networks = []
        for network in local_networks:
            available_networks.append(network[0].decode("utf-8"))

        template_args = {
            "networks": available_networks,
            "default-settings": default_settings,
            "esp-hookup-code": esp_hookup_code
        }

        yield from picoweb.start_response(resp, content_type="text/html")
        yield from app.render_template(resp, "index.html", (template_args,))
        return 1

    app.run(debug=True, host="192.168.4.1", port=80)
