import { defineConfig } from "@mikro-orm/postgresql";
import { User } from '../entities/User.js';

export default defineConfig({
    clientUrl: process.env.DATABASE_URL,
    entities: [User],
    debug: true,
});