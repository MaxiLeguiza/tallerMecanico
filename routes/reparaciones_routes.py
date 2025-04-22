from flask import Blueprint, request, jsonify
from models.reparaciones import reparacion
from app import baseDatos

reparacion_bp = Blueprint('reparacion', __name__)

@reparacion_bp.route('/reparaciones', methods=['GET'])
def obtener_reparaciones():
    reparaciones = reparacion.query.all()
    return jsonify([reparacion.to_dict() for reparacion in reparaciones])

@reparacion_bp.route('/reparaciones', methods=['POST'])
def crear_reparacion():
    data = request.get_json()
    reparacion_nueva = reparacion(
        vehiculo_id=data['vehiculo_id'],
        fecha=data['fecha'],
        descripcion=data['descripcion'],
        trabajos_realizados=data['trabajos_realizados'],
        costo=data['costo']
    )
    baseDatos.session.add(reparacion_nueva)
    baseDatos.session.commit()
    return jsonify(reparacion_nueva.to_dict()), 201