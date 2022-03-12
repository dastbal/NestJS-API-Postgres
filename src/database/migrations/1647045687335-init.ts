import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1647045687335 implements MigrationInterface {
  name = 'init1647045687335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pizza" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "UQ_a6feeec55588d8a53fe776f8f81" UNIQUE ("name"), CONSTRAINT "PK_cb1970bd1d17619fd6bc1ec7414" PRIMARY KEY ("id"))`,
    );
  } 

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pizza"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
