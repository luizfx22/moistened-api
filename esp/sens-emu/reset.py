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

print(os.listdir())
