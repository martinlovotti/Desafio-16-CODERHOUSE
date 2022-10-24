const { Router } = require("express");
const logout = Router();
const User = require('../models/User'); 

//importo el logger
const logger = require("../logs/logger");

logout.get("/", async (req, res) => {
  const datosUsuario = await User.findById(req.user._id); 
  const user = datosUsuario.username;  
  req.session.destroy((err) => { 
    if (!err) { 
    res.render('logout', {user}); 
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/logout' - con metodo: ${method} - time: ${time}`);}
    else res.send("Error");
  });
});

module.exports = logout;