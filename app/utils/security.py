from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def check_encrypted_password(password, hashed):
    print(pwd_context.verify(password, hashed))
    return pwd_context.verify(password, hashed)