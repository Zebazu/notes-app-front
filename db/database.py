import psycopg2

conn = psycopg2.connect(
    dbname="postgres", 
    user="postgres",
    password="admin",
    host="localhost",
    port=5432
)
conn.autocommit = True 
cursor = conn.cursor()
cursor.execute("CREATE DATABASE notesDB;")

print("Base de datos creada exitosamente")

cursor.close()
conn.close()

