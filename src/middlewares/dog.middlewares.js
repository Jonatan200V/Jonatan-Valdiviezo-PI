import Dog from '../models/Dog.js';

// import { Dog } from ('../db.js');
const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  height: /^[0-9]{1,3}\-[0-9]{1,3}$/,
  weight: /^[0-9]{1,3}\-[0-9]{1,3}$/,
  lifeSpan: /^[0-9]{1,2}\-[0-9]{1,2}$/,
};
const existRace = async (req, res, next) => {
  const { dog_name, dog_height, dog_weight, dog_lifeSpan } = req.body;
  const { name, height, weight, lifeSpan } = expresiones;
  // let temperament = false;
  try {
    if (!name.test(dog_name))
      throw new Error(
        'The name must contain between 1 to 40 letters without numbers'
      );

    if (!height.test(dog_height))
      throw new Error(
        'The height must contain a minimum and a maximum only numbers'
      );

    if (!weight.test(dog_weight))
      throw new Error(
        'The weight must have a minimum and a maximum only numbers'
      );

    if (!lifeSpan.test(dog_lifeSpan))
      throw new Error('Years of life cannot be less than 0 or greater than 99');
    const nameExist = await Dog.findOne({ where: { dog_name } });
    //Si el nombre existe damos un error
    if (nameExist !== null) {
      throw new Error('We are sorry the race that I indicate already exists');
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updateRace = async (req, res, next) => {
  const { dog_name, dog_height, dog_weight, dog_lifeSpan } = req.body;
  console.log(dog_lifeSpan);
  const { name, height, weight, lifeSpan } = expresiones;
  try {
    if (!name.test(dog_name))
      throw new Error(
        'The name must contain between 1 to 40 letters without numbers'
      );

    if (!height.test(dog_height))
      throw new Error(
        'The height must contain a minimum and a maximum only numbers'
      );

    if (!weight.test(dog_weight))
      throw new Error(
        'The weight must have a minimum and a maximum only numbers'
      );

    if (!lifeSpan.test(dog_lifeSpan))
      throw new Error('Years of life cannot be less than 0 or greater than 99');
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export { existRace, updateRace };
