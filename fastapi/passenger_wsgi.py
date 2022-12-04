from a2wsgi import ASGIMiddleware
from application.server import app
import sys

import os

INTERP = os.path.expanduser("/var/www/u1221769/data/flaskenv/bin/python")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

sys.path.append(os.getcwd())

application = ASGIMiddleware(app)
