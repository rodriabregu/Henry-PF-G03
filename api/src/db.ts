import { Sequelize } from 'sequelize-typescript';
import config from './lib/config';

export const sequelize = new Sequelize({
  logging: false,
  native: false,
  dialect: 'postgres',
  database: config.dbName,
  password: config.dbPassword,
  username: config.dbUser,
  storage: ':memory:',
  models: [__dirname + '/models'],
});

const { Product, Category, ProductCategory } = sequelize.models

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

/*

COMANDO PARA LEER LOS DATOS DE LAS
TABLAS DESDE LA CONSOLA postgres

SELECT * FROM public."TablaName";

 */
