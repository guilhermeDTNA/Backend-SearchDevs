const axios = require('axios');
const Dev = require('../models/Devs');
const parseStringAsArray = require ('../utils/ParseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
	
	//Função que vai retornar todos os devs do banco
	async index(request, response){
		const devs = await Dev.find();

		return response.json(devs);
	},

	//Função que vai cadastrar 
	async store(request, response){
	//return response.send('Hello World');
	
	const {github_username, techs, latitude, longitude} = request.body;

	let dev = await Dev.findOne({github_username});

	if (!dev){
		//await e async significa que pode demorar para a API retornar o usuário solicitado, aí o código não dá problema
		const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

		const {name = login, avatar_url, bio} = apiResponse.data;

	//map: percorre um array e para cada posição ele executa algo
	//trim(): remove espaçamento antes e depois de strings 
	const techsArray = parseStringAsArray(techs);

	const location ={
		type: 'Point',
		coordinates: [longitude, latitude]
	}

	let dev = await Dev.create({
		//Não precisamos colocar o dois pontos porque o nome passado é o mesmo das variáveis (exceto o techs)
		github_username,
		name,
		avatar_url,
		bio,
		techs: techsArray,
		location
	});

	const sendSocketMessageTo = findConnections(
		{latitude, longitude},
		techsArray
		);

	sendMessage(sendSocketMessageTo, 'new-dev', dev);
}



return response.json(dev);
} 
}