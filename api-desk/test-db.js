import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import config from './utils/mikro-orm.config.js';
import { User } from './entities/User.js';

async function testConnection() {
    try {
        const orm = await MikroORM.init(config);
        console.log("Connected to PostgreSQL via MikroORM");

        const em = orm.em.fork();
        const user = new User("TestUser", "test@example.com", "12345");
        await em.persistAndFlush(user);
        console.log("Dummy user inserted!");

        await orm.close(true);
    } catch (err) {
        console.error("Connection failed:", err.message);
    }
}

testConnection();
