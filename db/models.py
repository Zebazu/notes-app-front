from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime

# Definir la base de SQLAlchemy
Base = declarative_base()

# Modelo de usuario
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    
    # Relación con las notas
    notes = relationship("Note", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"User(id={self.id}, username='{self.username}')"

# Modelo de nota
class Note(Base):
    __tablename__ = 'notes'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"))
    
    # Relación con el usuario
    user = relationship("User", back_populates="notes")

    def __repr__(self):
        return f"Note(id={self.id}, title='{self.title}', timestamp={self.timestamp})"

# Crear la base de datos en memoria (puedes cambiarla a un archivo)
DATABASE_URL = "postgresql+psycopg2://postgres:admin@localhost:5432/notesdb"

engine = create_engine(DATABASE_URL, echo=True)
Base.metadata.create_all(engine)

# Crear una sesión
Session = sessionmaker(bind=engine)
session = Session()

# Crear un usuario y algunas notas como ejemplo
new_user = User(username="test_user", password="secure_password")
note1 = Note(title="First Note", description="This is the first note.", user=new_user)
note2 = Note(title="Second Note", description="This is the second note.", user=new_user)

# Agregar y guardar en la base de datos
session.add(new_user)
session.commit()

# Consultar la base de datos
users = session.query(User).all()
for user in users:
    print(user)
    for note in user.notes:
        print(f"  {note}")

# Cerrar la sesión
session.close()
