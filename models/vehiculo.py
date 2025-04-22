from app import baseDatos

class Vehiculo(baseDatos.Model):
    id = baseDatos.columm(baseDatos.integer, primary_key=True)
    marca = baseDatos.column(baseDatos.string(25))
    modelo = baseDatos.column(baseDatos.string(25))
    patente = baseDatos.column(baseDatos.string(15))
    año = baseDatos.column(baseDatos.integer)
    dueno_cliente = baseDatos.column(baseDatos.integer, baseDatos.foreign_key('cliente.id'))
    cliente = baseDatos.relationship('Cliente', backref='vehiculos')

    def to_dict(self):
        return { 
            "id": self.id,
            "marca":self.marca,
            "modelo":self.modelo,
            "patente":self.patente,
            "año":self.año,
            "dueno_cliente":self.dueno_cliente,
            "cliente":self.cliente.to_dict() if self.cliente else None
        }
   