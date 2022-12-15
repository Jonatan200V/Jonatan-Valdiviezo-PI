import DataTypes from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The field cannot be empty',
        },
        isAlpha: {
          args: true,
          msg: 'The name can only contain letters',
        },
        len: {
          args: [3, 255],
          msg: 'Name must be between 3 to 255 characters',
        },
      },
    },
    user_surname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'The field must be a valid email',
        },
        notNull: {
          msg: 'The field cannot be empty',
        },
      },
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 255],
          msg: 'The password must be at least 6 characters',
        },
        notNull: {
          msg: 'The field cannot be empty',
        },
      },
    },
    user_favorits: {
      type: DataTypes.ARRAY(DataTypes.STRING(10000)),
    },
    user_role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
