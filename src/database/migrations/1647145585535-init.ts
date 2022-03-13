import {MigrationInterface, QueryRunner} from "typeorm";

export class init1647145585535 implements MigrationInterface {
    name = 'init1647145585535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE ("name"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "image" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "UQ_9138d4819c8577c4805a029427f" UNIQUE ("name"), CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_682b959c8faeb4debb6bab7d3f" ON "pizzas" ("price") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_pizza" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "pizzaId" integer, "orderId" integer, CONSTRAINT "PK_2a5df2e7202390f5f661e32a3a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas_ingredients" ("pizza_id" integer NOT NULL, "ingredient_id" integer NOT NULL, CONSTRAINT "PK_1cb7077a5b7233b6ebce3f5f379" PRIMARY KEY ("pizza_id", "ingredient_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c1c1d63d0c82af57a2ba5e054" ON "pizzas_ingredients" ("pizza_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6365657654083138a000468b8a" ON "pizzas_ingredients" ("ingredient_id") `);
        await queryRunner.query(`ALTER TABLE "pizzas" ADD CONSTRAINT "FK_5f0fa3fdb7e47072848c5831942" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_pizza" ADD CONSTRAINT "FK_db28e4bd9aa86503cd12524e674" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_pizza" ADD CONSTRAINT "FK_2ebe3abd78188ad63abaa9352c2" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients" ADD CONSTRAINT "FK_2c1c1d63d0c82af57a2ba5e054d" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients" ADD CONSTRAINT "FK_6365657654083138a000468b8ac" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients" DROP CONSTRAINT "FK_6365657654083138a000468b8ac"`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients" DROP CONSTRAINT "FK_2c1c1d63d0c82af57a2ba5e054d"`);
        await queryRunner.query(`ALTER TABLE "order_pizza" DROP CONSTRAINT "FK_2ebe3abd78188ad63abaa9352c2"`);
        await queryRunner.query(`ALTER TABLE "order_pizza" DROP CONSTRAINT "FK_db28e4bd9aa86503cd12524e674"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`ALTER TABLE "pizzas" DROP CONSTRAINT "FK_5f0fa3fdb7e47072848c5831942"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6365657654083138a000468b8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c1c1d63d0c82af57a2ba5e054"`);
        await queryRunner.query(`DROP TABLE "pizzas_ingredients"`);
        await queryRunner.query(`DROP TABLE "order_pizza"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_682b959c8faeb4debb6bab7d3f"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
