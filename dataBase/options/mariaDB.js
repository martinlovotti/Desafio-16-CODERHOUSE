const options = {  
  client: 'mysql',
  connection: {    
    host: 'localhost',    
    user: 'root',    
    password: '',    
    database: 'ecommerce' //crear en http://localhost/phpmyadmin/ la base de datos con ese nombre
  }
}

module.exports = {options};