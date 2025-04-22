from app import baseDatos

class reparacion(baseDatos.Model):
    id = baseDatos.column(baseDatos.integer, primary_key=True)
    vehiculo_id = baseDatos.column(baseDatos.integer, baseDatos.foreign_key('vehiculo.id'))
    vehiculo = baseDatos.relationship('Vehiculo', backref='reparaciones')
    fecha = baseDatos.column(baseDatos.date)
    descripcion = baseDatos.column(baseDatos.string(100))
    trabajos_realizados= baseDatos.column(baseDatos.string(100))
    costo = baseDatos.column(baseDatos.float)

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





    