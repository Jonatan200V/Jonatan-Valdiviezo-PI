import DataTypes from 'sequelize';
import sequelize from '../database.js';

const Temperament = sequelize.define(
  'temperament',
  {
    temperament_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    temperament_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        // notNull: true,
        is: /^[a-zA-Z]{1,40}$/,
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Temperament;
