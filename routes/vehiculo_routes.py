
from flask import Blueprint, request, jsonify
from models.vehiculo import Vehiculo
from services.database import baseDatos

vehiculo_bp = Blueprint('vehiculo', __name__)

@vehiculo_bp.route('/vehiculos', methods=['GET'])
def obtener_vehiculos():
    vehiculos = Vehiculo.query.all()
    return jsonify([vehiculo.to_dict() for vehiculo in vehiculos])

@vehiculo_bp.route('/vehiculos', methods=['POST'])
def crear_vehiculo():
    data = request.get_json()
    vehiculo_nuevo = Vehiculo(
        marca=data['marca'],
        modelo=data['modelo'],
        anio=data['anio'],
        color=data['color'],
        cliente_id=data['cliente_id']
    )
    baseDatos.session.add(vehiculo_nuevo)
    baseDatos.session.commit()
    return jsonify(vehiculo_nuevo.to_dict()), 201

@vehiculo_bp.route('/vehiculos/<int:id>', methods=['GET'])
def obtener_vehiculo(id):
    vehiculo = Vehiculo.query.get(id)
    if vehiculo:
        return jsonify(vehiculo.to_dict())
    else:
        return jsonify({"mensaje": "Vehículo no encontrado"}), 404

@vehiculo_bp.route('/vehiculos/<int:id>', methods=['PUT'])
def actualizar_vehiculo(id):
    data = request.get_json()
    vehiculo = Vehiculo.query.get(id)
    if vehiculo:
        vehiculo.marca = data['marca']
        vehiculo.modelo = data['modelo']
        vehiculo.anio = data['anio']
        vehiculo.color = data['color']
        vehiculo.cliente_id = data['cliente_id']
        baseDatos.session.commit()
        return jsonify(vehiculo.to_dict()), 200
    else:
        return jsonify({"mensaje": "Vehículo no encontrado"}), 404
    
@vehiculo_bp.route('/vehiculos/<int:id>', methods=['DELETE'])
def eliminar_vehiculo(id):
    vehiculo = Vehiculo.query.get(id)
    if vehiculo:
        baseDatos.session.delete(vehiculo)
        baseDatos.session.commit()
        return jsonify({"mensaje": "Vehículo eliminado"}), 200
    else:
        return jsonify({"mensaje": "Vehículo no encontrado"}), 404
    
@vehiculo_bp.route('/vehiculos/patente/<string:patente>', methods=['GET'])
def obtener_vehiculo_por_matricula(patente):
    vehiculo = Vehiculo.query.filter_by(patente=patente).first()
    if vehiculo:
        cliente = vehiculo.cliente.to_dict() if vehiculo.cliente else None
        reparaciones = [reparacion.to_dict() for reparacion in vehiculo.reparaciones]
        return jsonify({
            "vehiculo": vehiculo.to_dict(),
            "cliente": cliente,
            "reparaciones": reparaciones
        }), 200
    else:
        return jsonify({"mensaje": "Vehículo no encontrado"}), 404