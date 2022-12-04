import os.path
from urllib import request

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import FileResponse

from logic import sendCodeLogic, setTokenLogic, checkTokenLogic

from models import SetTokenInput, SetTokenOutput, CodeInput, CodeOutput, CheckTokenOutput, UserInput, UserOutput

from starlette.middleware.sessions import SessionMiddleware

import uvicorn

app = FastAPI()

app.add_middleware(
    SessionMiddleware, secret_key='3XRAhZxTzilcfvk6rX8-ShqVAc_aWKnO9yw7MuLL6e0'
)


@app.get('/api/image/{item_id}')
def test(item_id: str):
    image_path = f'../images/{item_id}.png'
    if os.path.exists(image_path):
        return FileResponse(image_path)

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f'Image {item_id} not found'
    )


# @app.get('/api/dbtest/{phonk}')
# def dbtest(phonk: int):
#     db = SessionLocal()
#     db_user = {
#         'phone': phonk,
#         'name': 'Ашот'
#     }
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# тестовый рут
@app.post('/api/setToken', response_model=SetTokenOutput)
def setToken(request: Request, params: SetTokenInput):
    return setTokenLogic(request, params)


@app.get('/api/checkToken', response_model=CheckTokenOutput)
def checkToken(request: Request):
    return checkTokenLogic(request)


@app.post('/api/sendcode', response_model=CodeOutput)
def sendCode(params: CodeInput):
    return sendCodeLogic(params)


@app.post('/api/postData', response_model=UserOutput)
def postData(params: UserInput):
    return UserOutput(status='SUCCESS') 


if __name__ == '__main__':
    uvicorn.run(
        'server:app', host='localhost', port=8000, reload=True, debug=True)
