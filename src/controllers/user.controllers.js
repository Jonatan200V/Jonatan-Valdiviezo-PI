import User from '../models/User.js';

// import { User } from ('../db.js');
User;
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        user_email,
      },
    });
    console.log(user);
    if (!user) {
      throw new Error('Wrong password or email');
    }
    if (user.dataValues.user_password === user_password) {
      return res.json(user);
    }
    throw new Error('Wrong password or email');
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const createUser = async (req, res) => {
  const { user_name, user_surname, user_email, user_password } = req.body;
  console.log(user_name, user_surname, user_email);
  try {
    const userCreated = await User.create({
      user_name,
      user_surname,
      user_email,
      user_password,
    });
    res.json(userCreated);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updateUser = async (req, res) => {
  const { user_favorits } = req.body;
  const { id } = req.params;
  try {
    const userID = await User.findByPk(Number(id));

    if (userID.dataValues.user_favorits === null) {
      const user = await User.update(
        {
          user_favorits: [user_favorits],
        },
        {
          where: {
            user_id: id,
          },
        }
      );
      return res.json(user);
    }
    const dogExist = userID.dataValues.user_favorits.find((dog) => {
      const id = JSON.parse(dog);
      const idSearch = JSON.parse(user_favorits);
      if (Number(id.dog_id) === Number(idSearch)) {
        return id;
      }
    });
    if (dogExist) {
      let newDogFavorits = userID.dataValues.user_favorits.filter((dog) => {
        const id = JSON.parse(dog);
        const idSearch = JSON.parse(user_favorits);
        if (Number(id.dog_id) !== Number(idSearch)) {
          return dog;
        }
        return;
      });
      await User.update(
        {
          user_favorits: [...newDogFavorits],
        },
        {
          where: {
            user_id: id,
          },
        }
      );
      return res.json({ msg: 'Dog delete' });
    }
    const user = await User.update(
      {
        user_favorits: [...userID.dataValues.user_favorits, user_favorits],
      },
      {
        where: {
          user_id: id,
        },
      }
    );
    return res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export { getAllUser, getUser, createUser, updateUser };
