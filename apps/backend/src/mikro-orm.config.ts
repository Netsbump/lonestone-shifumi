import { defineConfig, Options, SqliteDriver } from '@mikro-orm/sqlite';
import { Player } from './entities/player.entity';

const ormConfig: Options = defineConfig({
    entities: [Player],
    entitiesTs: ['./src/entities'],
    dbName: 'shifumi-db.sqlite3',
    driver: SqliteDriver,
})

export default ormConfig;