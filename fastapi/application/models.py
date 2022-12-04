from pydantic import BaseModel

# # # Utils

# # Set Token


class SetTokenInput(BaseModel):
    phone: str
    token: str


class SetTokenOutput(BaseModel):
    status: bool


# # Check Token


class CheckTokenOutput(BaseModel):
    status: bool


# # # Auth

# # Code


class CodeInput(BaseModel):
    phone: str


class CodeOutput(BaseModel):
    code: int
    status: bool


# # Registration


class UserCreateInput(BaseModel):
    phone: str


class UserCreateOutput(BaseModel):
    status: bool


# # TestAPI

class UserInput(BaseModel):
    login: str
    password: str
    
class UserOutput(BaseModel):
    status: str