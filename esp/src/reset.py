import os

try:
    os.remove("templates/index.html")
except Exception:
    pass

try:
    os.remove("templates/index_html.py")
except Exception:
    pass

try:
    os.remove("project.pymakr")
except Exception:
    pass

try:
    os.remove("boot.py")
except Exception:
    pass

try:
    os.remove("main.py")
except Exception:
    pass

try:
    os.remove("settings.json")
except Exception:
    pass

print(os.listdir())
