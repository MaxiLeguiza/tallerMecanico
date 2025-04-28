from flask import Flask;
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

app.register_blueprint(cliente_bp)
app.register_blueprint(vehiculo_bp)
app.register_blueprint(reparacion_bp)


# Ruta de prueba


@app.route('/')
def index():
    return {"mensaje" : "Bienvenidos a nuestro taller mecanico"}

baseDatos.init_app(app)

with app.app_context():
    baseDatos.create_all()
    print("Tablas creadas exitosamente.")

if __name__ == '__main__':
    app.run(debug=True)

