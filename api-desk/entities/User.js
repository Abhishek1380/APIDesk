import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {

    @PrimaryKey()
    id;

    @Property()
    username;

    @Property({ unique: true })
    email;

    @Property()
    password;

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
