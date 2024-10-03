import { Sequelize } from "sequelize-typescript";
import * as path from "path";
import * as fs from "fs";
import { loadEnvFile } from 'process';
import type { DB } from './models/type';

class PostgresProvider {
  private sequelize: Sequelize;
  private db: DB = {} as DB;

  constructor() {
    loadEnvFile(path.join(process.cwd(), '/.env'));
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.PG_HOST as string,
      port: (process.env.PG_PORT || 6543) as number,
      username: process.env.PG_USERNAME as string,
      password: process.env.PG_PASSWORD as string,
      database: process.env.PG_DBNAME as string,
      define: {
        underscored: true, // Sử dụng underscored
      },
      pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 30000,
      }
    });
  }

  private loadModels() {
    if (!this.sequelize) {
      throw new Error('- Sequelize instance is not created!');
    }

    const modelsPath: string = path.join(__dirname, 'models');
    const fileNames: string[] = fs
      .readdirSync(modelsPath)
      .filter((fileName) => fileName.endsWith('model.ts')); // filter out all model.ts file

    for (const fileName of fileNames) {
      const modelPath = path.join(modelsPath, fileName);
      
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const model = require(modelPath).default;

      this.sequelize.addModels([model]);

      const modelName = model.name as keyof DB;
      this.db[modelName] = model;
    }
  }

  private loadRelationships() {
    if (!this.sequelize) {
      throw new Error('- Sequelize instance is not created!');
    }

    // Load all relationship between models from here
  }

  public getDB() {
    return this.db;
  }

  public async init() {
    try {
      this.loadModels();
      this.loadRelationships();

      await this.sequelize.authenticate();
      console.log('- Connect to Postgres successful!');

      await this.sequelize.sync();
      console.log('- All models synchronized successfully!');
    } catch (error) {
      throw new Error(`- Connect to Postgres failed: ${error}`);
    }
  }
};

const instance = new PostgresProvider();
export default instance;
export const db = instance.getDB();