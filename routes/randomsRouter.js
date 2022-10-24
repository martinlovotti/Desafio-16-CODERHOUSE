const express = require("express");
const { Router } = require("express");
const randoms = Router();
const numCPUs = require("os").cpus().length;

//importo el logger
const logger = require("../logs/logger");

const PORT = parseInt(process.argv[2]) || 8080;

//funcion para generar un numero random entre 1 y 1000
const random = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

randoms.get("/", function (req, res) {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/api/randoms' - con metodo: ${method} - time: ${time}`);
  const randomNum = random();
  const info = {
    puerto: PORT,
    num_random: randomNum,
    procesadores: numCPUs,
  }
  res.send(info);  
});



module.exports = randoms;
