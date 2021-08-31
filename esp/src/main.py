# main.py
import ujson as json

with open("./settings.json", 'r', encoding="UTF-8") as file:  # Lê o JSON
    sets = json.loads(file.read())
    print(sets)
    file.close()
