const express = require("express");
const { Router } = require("express");
const productsList = Router();

//importo el controller
const Contenedor = require("../controller/products.controller") 

//importo el logger
const logger = require("../logs/logger");

productsList.get("/", (req, res) => { 
  try {
    Contenedor.getAll() //getAll obtiene todos los productos
    .then((data) => {  
      res.status(200).send(data);  
    })
  }
  catch (error) {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.error(`Ruta '/productosp - con metodo: ${method} - time: ${time} - error: ${error}`);
    console.log(error);  
  }

});

module.exports = productsList;
