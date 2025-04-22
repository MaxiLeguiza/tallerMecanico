
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