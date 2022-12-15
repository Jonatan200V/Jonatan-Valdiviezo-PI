// import { Temperament } from '../db';
import Temperament from '../models/Temperament.js';
import getApiDogs from '../utils/dogsApi.js';
const getAllTemperaments = async (req, res) => {
  try {
    const temperaments = await Temperament.findAll();

    if (temperaments.length <= 0) {
      const data = await getApiDogs();
      let listTemperament = [];

      data.forEach((dog) => {
        listTemperament.push(...dog.temperament);
      });

      let addPropertyTemperamentName = [];

      const filterTemperaments = [...new Set(listTemperament)];

      filterTemperaments.forEach((temperament) => {
        addPropertyTemperamentName.push({ temperament_name: temperament });
      });

      const temperamentedCreated = await Temperament.bulkCreate(
        addPropertyTemperamentName
      );

      return res.json(temperamentedCreated);
    }

    res.json(temperaments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export { getAllTemperaments };
