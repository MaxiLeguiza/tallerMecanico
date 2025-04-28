from services.database import baseDatos

class Vehiculo(baseDatos.Model):  # Cambié el nombre de la clase a mayúscula (convención de Python)
    id = baseDatos.Column(baseDatos.Integer, primary_key=True)
    marca = baseDatos.Column(baseDatos.String(25), nullable=False)
    modelo = baseDatos.Column(baseDatos.String(25), nullable=False)
    patente = baseDatos.Column(baseDatos.String(15), unique=True, nullable=False)
    año = baseDatos.Column(baseDatos.Integer, nullable=False)
    dueno_cliente = baseDatos.Column(baseDatos.Integer, baseDatos.ForeignKey('cliente.id'), nullable=False)
    cliente = baseDatos.relationship('Cliente', backref='vehiculos')

    def to_dict(self):
        return { 
            "id": self.id,
            "marca": self.marca,
            "modelo": self.modelo,
            "patente": self.patente,
            "año": self.año,
            "dueno_cliente": self.dueno_cliente,
            "cliente": self.cliente.to_dict() if self.cliente else None
        }