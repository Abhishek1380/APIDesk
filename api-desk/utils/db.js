import { MikroORM } from "@mikro-orm/core";
import config from './mikro-orm.config.js'

let orm;
export async function getORM() {
    if (!orm) orm = await MikroORM.init(config);
    return orm;
}