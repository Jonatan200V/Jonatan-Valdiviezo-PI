import fetch from 'node-fetch';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
const { API_KEY } = process.env;
const getApiDogs = async () => {
  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const data = await response.json();
    const dataApi = data.map((dog, index) => {
      return {
        dog_id: index + 1,
        dog_name: dog.name,
        dog_height: dog.height.imperial,
        dog_weight: dog.weight.imperial,
        dog_lifeSpan: dog.life_span,
        dog_image: dog.image.url,
        dog_db: false,
        temperament: dog.temperament
          ?.split(',')
          .map((dogs) => dogs?.trimStart()),
      };
    });
    return dataApi.slice(0, 100);
  } catch (error) {
    return error.message;
  }
};

export default getApiDogs;
