const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('Link do cluster do MongoDB', {
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
