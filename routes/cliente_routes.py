from flask import Blueprint, request, jsonify
from models.cliente import Cliente
from app import baseDatos

cliente_bp = Blueprint('cliente',__name__)

@cliente_bp.route('/clientes', methods=['GET'])
def obtener_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente.to_dict() for cliente in clientes])
@cliente_bp.route('/clientes',methods=['POST'])
def crear_cliente():
    data = request.get_json()
    cliente_nuevo = Cliente(
        nombre=data['nombre'],
        telefono=data['telefono'],
        email=data['email'],
        direccion=data['direccion']

    )
    baseDatos.session.add(cliente_nuevo)
    baseDatos.session.commit()
    return jsonify(cliente_nuevo.to_dict()), 201


