import dotenv from 'dotenv';
import pg from 'pg';
import { Sequelize } from 'sequelize';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOSTPG, DB_PORT, DB_DATABASE } = process.env;

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOSTPG}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectModule: pg,
  }
);
export default sequelize;
