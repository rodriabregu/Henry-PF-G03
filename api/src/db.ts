import {Sequelize} from 'sequelize-typescript';
import config from './lib/config';

export const sequelize = new Sequelize({
	dialect: 'postgres',
	database: config.dbName,
	password: config.dbPassword,
	username: config.dbUser,
	storage: ':memory:',
	models: [__dirname + '/models'],
});

/*

COMANDO PARA LEER LOS DATOS DE LAS 
TABLAS DESDE LA CONSOLA postgres

SELECT * FROM public."Tabla";

 */
