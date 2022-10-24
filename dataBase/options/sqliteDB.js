//creo un objeto Options
const options = {
  //cliente sqlite3 para este caso
  client: "sqlite3",
  connection: {
    //La ruta de la base de datos
    filename: "./dataBase/db/ecommerce.db3",
  },
};

module.exports = { options };
