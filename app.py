from flask import Flask;
from flask_sqlalchemy import SQLAlchemy;
from flask_cors import CORS; 
from routes.cliente_routes import cliente_bp
from routes.vehiculo_routes import vehiculo_bp
from routes.reparaciones_routes import reparacion_bp
from services.config import DATABASE_CONNECTION_URI
from services.database import baseDatos


app = Flask(__name__)

# Configuración de la base de datos

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_CONNECTION_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Registrar Blueprint

app.register_blueprint(cliente_bp, url_prefix = '/api')
app.register_blueprint(vehiculo_bp, url_prefix = '/api')
app.register_blueprint(reparacion_bp, url_prefix = '/api')



# Ruta de prueba

@app.route('/')
def index():
    return {"mensaje" : "Bienvenidos a nuestro taller mecanico"}

if __name__ == '_main_':
    app.run(debug=True)


    #python
#from app import db
#db.create_all()