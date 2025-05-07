from flask import Blueprint, request, jsonify
from models.cliente import Cliente
from services.database import baseDatos
from sqlalchemy import func

cliente_bp = Blueprint('cliente', __name__)

# traer clientes - Todo el listado de clientes

@cliente_bp.route('/api/clientes', methods=['GET'])
def obtener_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente.to_dict() for cliente in clientes])

##Crear nuevo cliente

@cliente_bp.route('/api/add_clientes', methods=['POST'])
def crear_cliente():
    data = request.get_json()
    if not all(key in data for key in ['nombre', 'telefono', 'email', 'direccion']):
        return jsonify({"mensaje": "Faltan campos obligatorios"}), 400

    cliente_nuevo = Cliente(
        nombre=data['nombre'],
        telefono=data['telefono'],
        email=data['email'],
        direccion=data['direccion']
    )
    baseDatos.session.add(cliente_nuevo)
    baseDatos.session.commit()
    return jsonify(cliente_nuevo.to_dict()), 201

## Eliminar cliente por id

@cliente_bp.route('/api/clientes/<int:id>', methods=['DELETE'])
def elimina_un_cliente(id):
    cliente = Cliente.query.get(id)
    if not cliente:
        return jsonify({"mensaje": "Cliente no encontrado"}), 404

    baseDatos.session.delete(cliente)
    baseDatos.session.commit()
    return jsonify({"mensaje": "Cliente eliminado correctamente"}), 200

## Buscar cliente por nombre y devolver el id del cliente
@cliente_bp.route('/api/clientes/buscar/<string:nombre>', methods=['GET'])
def buscar_cliente_por_nombre(nombre):
    print(f"Buscando: {nombre}")
    cliente = Cliente.query.filter(func.lower(Cliente.nombre) == nombre.lower()).first()
    if cliente:
       print("Cliente encontrado:", cliente.id)
       return jsonify({"id": cliente.id}), 200
    else:
        print("Cliente no encontrado")
        return jsonify({"mensaje": "Cliente no encontrado"}), 404

## Actualizar cliente por id

@cliente_bp.route('/api/clientes/<int:id>', methods=['PUT'])
def actualizar_cliente(id):
    data = request.get_json()
    if not data:
        return jsonify({"mensaje": "No se enviaron datos para actualizar"}), 400

    cliente = Cliente.query.get(id)
    if cliente:
        cliente.nombre = data.get('nombre', cliente.nombre)
        cliente.telefono = data.get('telefono', cliente.telefono)
        cliente.email = data.get('email', cliente.email)
        cliente.direccion = data.get('direccion', cliente.direccion)
        baseDatos.session.commit()
        return jsonify(cliente.to_dict()), 200
    else:
        return jsonify({"mensaje": "El cliente no se encuentra"}), 404