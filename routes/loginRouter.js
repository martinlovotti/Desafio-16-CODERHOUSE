const { Router } = require("express");
const login = Router();
const auth = require('../middleware/auth');

const passport = require("../middleware/passport");

//importo el logger
const logger = require("../logs/logger");

login.get("/", (req, res) => {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/login' - con metodo: ${method} - time: ${time}`); 
  res.render('login'); 
});

login.post("/", passport.authenticate("local", { failureRedirect: "/loginerror" }),
  (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/login' - con metodo: ${method} - time: ${time}`);
    res.redirect("/");
  }
);

/* login.get("/privada", auth, (req, res) => { 
  res.send("Estoy en una ruta privada");
});
 */
module.exports = login;