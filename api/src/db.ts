import {Sequelize} from 'sequelize-typescript';
import config from './lib/config';
config;
export const sequelize = new Sequelize({
	dialect: 'postgres',
	database: 'socialclub',
	password: 'password',
	username: 'postgres',
	storage: ':memory:',
	models: [__dirname + '/models'],
});