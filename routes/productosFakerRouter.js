const express = require("express");
const { Router } = require("express");
const productosFaker = Router();

//importo el controller
const Contenedor = require("../controller/faker.controller")

productosFaker.get("/", (req, res) => { 

  Contenedor.getAll() //getAll obtiene todos los productos
  .then((data) => {      
    res.status(200).send(data); 
  })

});

module.exports = productosFaker;
