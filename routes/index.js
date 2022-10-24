const express = require("express");
const router = express.Router();

const products = require("./productRouter");
const productsList = require("./productListRouter");
const home = require("./homeRouter");
const login = require("./loginRouter");
const loginError = require("./loginErrorRouter");
const register = require("./registerRouter");;
const logout = require("./logoutRouter");
const info = require("./infoRouter");
const randoms = require("./randomsRouter");
const error = require("./errorRouter");

//middlewares
router.use("/productos", products);
router.use("/lista-productos", productsList);
router.use("/", home);
router.use("/login", login);
router.use("/loginerror", loginError);
router.use("/register", register);
router.use("/logout", logout);


/* desafio 14 */
router.use("/info", info);
/* desafio 15 */
router.use("/api/randoms", randoms);

router.use("*", error);

module.exports = router;
