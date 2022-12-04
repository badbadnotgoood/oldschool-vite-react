from fastapi import Request
import random
import time

# from timer import Timer

from database import User, SessionLocal
from models import SetTokenInput, SetTokenOutput, CheckTokenOutput, CodeInput, CodeOutput


# def periodic_task():
#     print(time.current_timestamp())
    

# timer = Timer()


def setTokenLogic(request: Request, params: SetTokenInput):
    phone, token = params.phone, params.token
    request.session['session_token'] = token
    with SessionLocal() as session:
        user = session.query(User).filter_by(phone=phone).scalar()
        user.token = token
        session.commit()
    return SetTokenOutput(status=True)


def checkTokenLogic(request: Request):
    if 'session_token' in request.session:
        session_token = request.session['session_token']
        with SessionLocal() as session:
            if user := session.query(User).filter_by(token=session_token).scalar():
                if user.token == session_token:
                    return CheckTokenOutput(status=True)
    return CheckTokenOutput(status=False)


def sendCodeLogic(params: CodeInput):
    code = random.randrange(100000, 999999)
    return CodeOutput(code=code, status=True)


