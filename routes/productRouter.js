const express = require("express");
const { Router } = require("express");
const products = Router();

//importo el controller
const Contenedor = require("../controller/products.controller")

//importo el logger
const logger = require("../logs/logger");

products.get("/", (req, res) => {
  const { method } = req;
  const time = new Date().toLocaleString();

  try {
    Contenedor.getAll() //getAll obtiene todos los productos
    .then((productos) => {      
      logger.info(`Ruta '/productos' - con metodo: ${method} - time: ${time}`);
      res.render('products', {productos}); //renderizo el view products.ejs y le paso los productos como parametro
    })   
  } 
  catch (error) {    
    logger.error(`Ruta '/productos' - con metodo: ${method} - time: ${time} - error: ${error}`);
    console.log(error);  
  }
});

products.post("/", (req, res) => { 
  const { method } = req;
  const time = new Date().toLocaleString();
  const {title, price, thumbnail} = req.body 
  try {
    Contenedor.save({title, price, thumbnail})  
    const productos = Contenedor.getAll() 
    res.redirect('/'); 
    logger.info(`Ruta '/productos' - con metodo: ${method} - time: ${time}`);
  }
  catch (error) {
    logger.error(`Ruta '/productos' - con metodo: ${method} - time: ${time} - error: ${error}`);
    console.log(error);  
  }  
});

module.exports = products;
