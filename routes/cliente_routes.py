from flask import Blueprint, request, jsonify
from models.cliente import Cliente
from app import baseDatos

cliente_bp = Blueprint('cliente',__name__)

@cliente_bp.route('/api/clientes', methods=['GET'])
def obtener_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente.to_dict() for cliente in clientes])

@cliente_bp.route('/api/add_clientes',methods=['POST'])
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


@cliente_bp.route('/api/delete_clientes/',methods=['DELETE'])
def eliminar_cliente():
    data = request.get_json()
    cliente_id = data['id']
    cliente = Cliente.query.get(cliente_id) 
    if cliente:
        baseDatos.session.delete(cliente)
        baseDatos.session.commit()
        return jsonify({"mensaje": "Se elimino cliente"}), 200
    else:
        return jsonify({"mensaje": "Cliente no encontrado"}), 404
    
@cliente_bp.route('/api/update_clientes',methods=['PUT'])
def actualizar_cliente():
        data = request.get_json()
        cliente_id = data['id']
        cliente = Cliente.query.get(cliente_id)
        if cliente:
            cliente.nombre = data['nombre']
            cliente.telefono = data['telefono']
            cliente.email = data['email']
            cliente.direccion = data['direccion']
            baseDatos.session.commit()
            return jsonify(cliente.to_dict()), 200
        else:
            return jsonify({"mensaje": "El cliente no se encuentra"}), 404
    

