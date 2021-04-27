import express from "express";
import fetch from "node-fetch";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import prodRoutes from "./routes/ProductRoutes.js";
import frontRoutes from "./routes/FrontRoutes.js";

const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado!");

	/* Escucho los mensajes enviado por el cliente y se los propago a todos */
	socket.on("postProduct", () => {
		fetch("http://localhost:8080/api/productos")
			.then((res) => res.json())
			.then(function (data) {
				io.sockets.emit("listProducts", data);
			});
	}).on('disconnect', () => {
		console.log('Usuario desconectado')
	});
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", frontRoutes);
app.use("/api/productos", prodRoutes);

app.set("views", "./views");
app.set("view engine", "ejs");

// Conexion a server con callback avisando de conexion exitosa
const server = httpServer
	.listen(PORT, () => {
		console.log(`Ya me conecte al puerto ${PORT}.`);
	})
	.on("error", (error) =>
		console.log("Hubo un error inicializando el servidor.")
	);
