
# Crea un archivo models/cliente.py 
# para definir un modelo de ejemplo, como los clientes del taller:
from app import baseDatos

class Cliente(baseDatos.Model):
    id = baseDatos.column(baseDatos.integer, primary_key=True)
    nombre = baseDatos.column(baseDatos.string(20))
    telefono = baseDatos.column(baseDatos.string(9))
    email = baseDatos.column(baseDatos.string(30))
    direccion = baseDatos.column(baseDatos.string(50))

    def to_dict(self):
        return{
            "id": self.id,
            "nombre": self.nombre,
            "telefono":self.telefono,
           "email":self.email,
           "direccion":self.direccion}
    
    