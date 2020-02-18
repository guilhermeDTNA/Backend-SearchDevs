const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb://guilherme:starwars6@cluster0-shard-00-00-ihnuw.mongodb.net:27017,cluster0-shard-00-01-ihnuw.mongodb.net:27017,cluster0-shard-00-02-ihnuw.mongodb.net:27017/banco?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(cors());
//Configuração que vai ser válida para todas as rotas da aplicação, nesse caso, todas irão reconhecer formato JSON
app.use(express.json());

app.use(routes);

server.listen(1234);


//Momento 1:06:00 Aula 2
//https://rocketseat.com.br/week-10/aulas?aula=2