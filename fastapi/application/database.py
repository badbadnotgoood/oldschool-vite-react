from sqlalchemy import Column, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

METHOD = 'mysql+pymysql'
LOGIN = 'u1221769_default'
PASSWORD = 'zU!8Puti'
HOST = '31.31.198.39'
DATA_BASE = 'u1221769_userdatabase'
SQLALCHEMY_DATABASE_URL = f'{METHOD}://{LOGIN}:{PASSWORD}@{HOST}/{DATA_BASE}'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class User(Base):
    __tablename__ = 'test_users'
    phone = Column(String(10), primary_key=True, nullable=False, index=True)
    name = Column(Text, nullable=True)
    token = Column(Text, nullable=True)


Base.metadata.create_all(engine)

# session =  SessionLocal()
# newUser = User(phone='9187060981', name='Ашот')
# session.add(newUser)
# session.commit()
# session.close()
