const Dev = require('../models/Devs');
const parseStringAsArray = require ('../utils/ParseStringAsArray');

module.exports = {
	
	//Método que busca
	async index(request, response){
		
		const {latitude, longitude, techs} = request.query;

		const techsArray = parseStringAsArray(techs);

		const devs = await Dev.find({
			techs:{
				//$in é um operador lógico do mongoDB
				$in: techsArray
			},
			location:{
				//retorna valores perto da localização
				$near:{
					$geometry:{
						type: 'Point',
						coordinates: [longitude, latitude]
					},
					//Distância máxima
					$maxDistance: 100000
				},
			},
		});

		return response.json({devs});
	}
}