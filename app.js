const express = require("express");
const session = require("express-session"); 
const passport = require("passport"); 
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const minimist = require("minimist");

const compression = require("compression");

const { fork } = require("child_process");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
dotenv.config();

if (cluster.isPrimary) {
  console.log("num CPUs: " + numCPUs);
  console.log(`I am a master ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {

  //inicializo express
  const app = express();

  //inicalizo el socket.io
  const { Server: HttpServer } = require("http");
  const { Server: IOServer } = require("socket.io");
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  //inicioalizo MongoAtlas
  const MongoStore = require("connect-mongo");
  const advanceOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  //inicializo conexion a la base de datos para las sessiones
  app.use(cookieParser());
  let mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

  //middleware para manejar las sesiones
  app.use(
    session({
      store: new MongoStore({ 
        mongoUrl: mongoUrl,
        mongoOptions: advanceOptions   
      }),     
      secret: "coderhouse",
      resave: true,
      saveUninitialized: true,
      rolling: true, //cada vez que se hace una petición se renueva el tiempo de expiración
      cookie: { maxAge: 60000 }, //tiempo de expiración de la cookie
    })
  );
  
  //compression con gzip
  app.use(compression());

  //middleware para manejar la autenticación
  app.use(passport.initialize());
  app.use(passport.session());

  //importo el router (index.js)
  const router = require("./routes")

  //seteo de plantilla
  app.set('views', './views');
  app.set('view engine', 'ejs');

  //middlewares
  app.use(express.static(__dirname + "/public"));
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true }));
  app.use("/", router);

  //importo el logger para el Chat
  const logger = require("./logs/logger");

  //conexion
  const chat = require("./utils/chat");
  io.on('connection', async function(socket) {
    //mensaje en consola cuando se conecta un usuario
    //console.log('Un cliente se ha conectado'); 
    //primera conexion del usuario recibe los mensajes de la DB
    const messages = await chat.list();  
    socket.emit('messages', messages);
  
    //cada vez que se agrega un producto, se le envia a todos los usuarios para renderizarlo
    io.sockets.emit('productos');

    //escucho el los mensajes del cliente, lo agrego a la db  y le paso a TODOS (io.sockets.emit) los clientes los mensajes
    socket.on ('new-message', async function (data){
      try {
        chat.save(data);
        logger.info(`Mensaje: Nuevo mensaje - time: ${new Date().toLocaleString()}`);        
        const messages = await chat.list();      
        io.sockets.emit('messages', messages);
      } catch (err) {
        logger.error(`Mensaje: Error al guardar el mensaje - time: ${new Date().toLocaleString()}`);
        //console.log(err);
      }
      
    });

  });

  //let puerto = minimist(["-p",process.argv.slice(2)]).p || 8080
  let PORT = 8080
  let data = minimist(["-p",process.argv.slice(2)])
  if(typeof(data.p) === "number"){
    PORT = data.p
  }
  httpServer.listen(PORT, function() {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  })

  console.log(`Worker ${process.pid} started`);
}


