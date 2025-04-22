
from flask import Blueprint, request, jsonify
from models.vehiculo import Vehiculo
from app import baseDatos

Vehiculo.bp = Blueprint('vehiculo', __name__)

@Vehiculo.bp.route('/vehiculos', methods=['GET'])
def obtener_vehiculos():
    vehiculos = Vehiculo.query.all()
    return jsonify([vehiculo.to_dict() for vehiculo in vehiculos])

@Vehiculo.bp.route('/vehiculos', methods=['POST'])
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

@Vehiculo.bp.route('/vehiculos/<int:id>', methods=['GET'])
def obtener_vehiculo(id):
    vehiculo = Vehiculo.query.get(id)
    if vehiculo:
        return jsonify(vehiculo.to_dict())
    else:
        return jsonify({"mensaje": "Vehículo no encontrado"}), 404

@Vehiculo.bp.route('/vehiculos/<int:id>', methods=['PUT'])
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
    
@Vehiculo.bp.route('/vehiculos/<int:id>', methods=['DELETE'])
def eliminar_vehiculo(id):
    vehiculo = Vehiculo.query.get(id)
    if vehiculo:
        baseDatos.session.delete(vehiculo)
        baseDatos.session.commit()
        return jsonify({"mensaje": "Vehículo eliminado"}), 200
    else:
        return jsonify({"mensaje": "Vehículo no encontrado"}), 404