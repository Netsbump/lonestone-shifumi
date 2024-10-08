import { defineConfig, Options, SqliteDriver } from '@mikro-orm/sqlite';

const ormConfig: Options = defineConfig({
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: './db/shifumi-db.sqlite3',
    debug: true,
    driver: SqliteDriver,
})

export default ormConfig;