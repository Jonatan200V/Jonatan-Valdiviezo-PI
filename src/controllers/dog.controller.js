import Dog from '../models/Dog.js';
import Temperament from '../models/Temperament.js';
import getApiDogs from '../utils/dogsApi.js';
// import { Temperament, Dog } from '../db.js';
const getAllDogs = async (req, res) => {
  const { name } = req.query;
  const data = await getApiDogs();
  const dbDog = await Dog.findAll({ include: Temperament });
  const dbDogMap = dbDog?.map((dog) => {
    const temperaments = [];
    for (let index = 0; index < dog?.temperaments.length; index++) {
      temperaments.push(dog?.temperaments[index]?.temperament_name);
    }
    return {
      dog_id: dog.dog_id,
      dog_name: dog.dog_name,
      dog_weight: dog.dog_weight,
      dog_height: dog.dog_height,
      dog_lifeSpan: dog.dog_lifeSpan,
      dog_image: dog.dog_image,
      dog_db: true,
      favorits: false,
      temperament: [...temperaments],
    };
  });
  const dbApi = data?.concat(dbDogMap);
  try {
    if (!name) {
      return res.json(dbApi);
    }

    const nameFiltered = dbApi.filter(
      (dog) => dog.dog_name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
    console.log(nameFiltered);
    if (nameFiltered.length <= 0)
      return res.status(404).json({
        msg: 'Name not found please enter an existing breed name',
      });

    res.json(nameFiltered);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getOneDog = async (req, res) => {
  const { id } = req.params;

  try {
    if (typeof parseInt(id) !== 'number') {
      throw new Error(
        'The indicated parameter is not a number, please enter a number'
      );
    }
    const data = await getApiDogs();

    const dbDog = await Dog.findAll({ include: Temperament });

    const dbApi = data?.concat(dbDog);

    const dogID = dbApi.find((dog) => dog.dog_id === parseInt(id));

    if (dogID.length <= 0)
      throw new Error(
        `The id ${id} placed does not correspond to any race, please write another one and try again`
      );

    res.json(dogID);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const postCreateDog = async (req, res) => {
  const {
    dog_name,
    dog_height,
    dog_weight,
    dog_lifeSpan,
    dog_image,
    dog_db,
    temperament_name,
  } = req.body;
  try {
    const data = await getApiDogs();
    let temperament = false;
    //Busca el temperamento o lo crea
    for (let index = 0; index <= temperament_name.length - 1; index++) {
      temperament = await Temperament.findOrCreate({
        where: {
          temperament_name: temperament_name[index],
        },
        defaults: {
          temperament_name: temperament_name[index],
        },
      });
    }
    //Creado y cambiando el nombre por el id correspondiente que se guarda en la Db
    const allTemperament = await Temperament.findAll();
    const allDogs = await Dog.findAll();
    for (
      let indexTAdd = 0;
      indexTAdd <= temperament_name.length - 1;
      indexTAdd++
    ) {
      for (
        let indexTDB = 0;
        indexTDB <= allTemperament.length - 1;
        indexTDB++
      ) {
        // allTemperament[indexTDB].dataValues.temperament_name porque la DB devuelve un objeto con muchas propiedades
        if (
          temperament_name[indexTAdd] ===
          allTemperament[indexTDB].dataValues.temperament_name
        ) {
          temperament_name[indexTAdd] =
            allTemperament[indexTDB].dataValues.temperament_id;
        }
      }
    }
    const ID = Math.max(...allDogs.map((dog) => dog.dog_id)) + 1;

    const dog = await Dog.create({
      dog_id:
        ID === -Infinity ? Math.max(...data.map((dog) => dog.dog_id)) + 1 : ID,
      dog_name,
      dog_height,
      dog_weight,
      dog_lifeSpan: `${dog_lifeSpan} years`,
      dog_image,
      dog_db,
    });
    await dog.addTemperaments(temperament_name);
    //temperament me da un true o false en el segundo lugar esta si es true o false
    if (temperament[1]) {
      return res
        .status(201)
        .json({ msg: 'Breed and temperament successfully created' });
    }
    return res.status(201).json({ msg: 'Breed successfully created' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updateDog = async (req, res) => {
  const { id } = req.params;
  const { dog_name, dog_weight, dog_height, dog_lifeSpan } = req.body;
  console.log(dog_lifeSpan.includes('years'));
  try {
    await Dog.update(
      {
        dog_name,
        dog_weight,
        dog_height,
        dog_lifeSpan:
          dog_lifeSpan.indexOf('years') !== -1
            ? dog_lifeSpan
            : `${dog_lifeSpan} years`,
      },
      { where: { dog_id: id } }
    );
    res.status(201).json({ msg: 'Updated information' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const deleteDog = async (req, res) => {
  const { id } = req.params;
  try {
    await Dog.destroy({ where: { dog_id: id } });
    res.status(201).json({ msg: 'Dog removed' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export { getAllDogs, getOneDog, updateDog, deleteDog, postCreateDog };
