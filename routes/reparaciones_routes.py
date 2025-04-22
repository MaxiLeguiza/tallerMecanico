from flask import Blueprint, request, jsonify
from models.reparaciones import reparacion
from app import baseDatos

reparacion_bp = Blueprint('reparacion', __name__)

@reparacion_bp.route('/api/reparaciones', methods=['GET'])
def obtener_reparaciones():
    reparaciones = reparacion.query.all()
    return jsonify([reparacion.to_dict() for reparacion in reparaciones])

@reparacion_bp.route('/api/reparaciones/<int:id>', methods=['GET'])
def obtener_reparacion(id):
     reparacion = reparacion.query.get(id)
     if reparacion:
         return jsonify(reparacion.to_dict())
     else:
         return jsonify({"mensaje": "Reparacion no encontrada"}), 404

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
@reparacion_bp.route('/api/delete_reaparaciones',methods=['DELETE'])
def eliminar_reparacion():
    data = request.get_json()
    reparacion_id = data['id']
    reparacion = reparacion.query.get(reparacion_id) 
    if reparacion:
        baseDatos.session.delete(reparacion)
        baseDatos.session.commit()
        return jsonify({"mensaje": "Se elimino la reparacion"}), 200
    else:
        return jsonify({"mensaje": "Reparacion no encontrada"}), 404
    
@reparacion_bp.route('/api/update_reparaciones',methods=['PUT'])
def actualizar_reparacion():
        data = request.get_json()
        reparacion_id = data['id']
        reparacion = reparacion.query.get(reparacion_id)
        if reparacion:
            reparacion.vehiculo_id = data['vehiculo_id']
            reparacion.fecha = data['fecha']
            reparacion.descripcion = data['descripcion']
            reparacion.trabajos_realizados = data['trabajos_realizados']
            reparacion.costo = data['costo']
            baseDatos.session.commit()
            return jsonify(reparacion.to_dict()), 200
        else:
            return jsonify({"mensaje": "La reparacion no se encuentra"}), 404
