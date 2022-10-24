//const productos = require("../utils/productos")
const productos = require("../utils/products")

//controller - Utiliza las funciones declaradas en productos.js
class Contenedor { 
  
  static getAll() {
   return productos.list();
  }

  static save(object) {
    return productos.save(object);    
  }

} 

module.exports = Contenedor;