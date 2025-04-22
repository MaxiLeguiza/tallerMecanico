from flask import Flask;
from flask_sqlalchemy import SQLAlchemy;
from flask_cors import CORS; 
from routes.cliente_routes import cliente_bp
from routes.vehiculo_routes import vehiculo_bp
from routes.reparaciones_routes import reparacion_bp



app = Flask(__name__)

# Configuración de la base de datos

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Registrar Blueprint

app.register_blueprint(cliente_bp, url_prefix = '/api')
app.register_blueprint(vehiculo_bp, url_prefix = '/api')
app.register_blueprint(reparacion_bp, url_prefix = '/api')

# Inicializar extensiones

baseDatos = SQLAlchemy(app)
CORS(app)

# Ruta de prueba

@app.route('/')
def index():
    return {"mensaje" : "Bienvenidos a nuestro taller mecanico"}

if __name__ == '_main_':
    app.run(debug=True)


    #python
#from app import db
#db.create_all()