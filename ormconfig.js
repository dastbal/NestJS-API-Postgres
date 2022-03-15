module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/database/entities/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
    // entitiesDir: 'src/database/entities',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
