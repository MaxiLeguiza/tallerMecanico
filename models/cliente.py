
# Crea un archivo models/C.py 
# para definir un modelo de ejemplo, como los clientes del taller:
from services.database import baseDatos

class Cliente(baseDatos.Model):
    id = baseDatos.Column(baseDatos.Integer, primary_key=True)
    nombre = baseDatos.Column(baseDatos.String(20))
    telefono = baseDatos.Column(baseDatos.String(9))
    email = baseDatos.Column(baseDatos.String(30))
    direccion = baseDatos.Column(baseDatos.String(50))

    def to_dict(self):
        return{
            "id": self.id,
            "nombre": self.nombre,
            "telefono":self.telefono,
           "email":self.email,
           "direccion":self.direccion}
    
    