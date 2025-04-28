from services.database import baseDatos

class Reparacion(baseDatos.Model):
    id = baseDatos.Column(baseDatos.Integer, primary_key=True)
    vehiculo_id = baseDatos.Column(baseDatos.Integer, baseDatos.ForeignKey('vehiculo.id'))
    vehiculo = baseDatos.relationship('Vehiculo', backref='reparaciones')
    fecha = baseDatos.Column(baseDatos.Date)
    descripcion = baseDatos.Column(baseDatos.String(100))
    trabajos_realizados= baseDatos.Column(baseDatos.String(100))
    costo = baseDatos.Column(baseDatos.Float)

    def to_dict(self):
        return {
            "id": self.id,
            "vehiculo_id": self.vehiculo_id,
            "fecha": self.fecha,
            "descripcion": self.descripcion,
            "trabajos_realizados": self.trabajos_realizados,
            "costo": self.costo,
            "vehiculo": self.vehiculo.to_dict() if self.vehiculo else None
        }





    