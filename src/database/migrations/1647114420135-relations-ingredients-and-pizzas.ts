import {MigrationInterface, QueryRunner} from "typeorm";

export class relationsIngredientsAndPizzas1647114420135 implements MigrationInterface {
    name = 'relationsIngredientsAndPizzas1647114420135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pizza_ingredients_ingredient" ("pizzaId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_0ccb33aa647182d97d0c510d688" PRIMARY KEY ("pizzaId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0bb1511e3c9a3bdaa7f452c70e" ON "pizza_ingredients_ingredient" ("pizzaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_94400b94f05d59187b30935533" ON "pizza_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "pizza_ingredients_ingredient" ADD CONSTRAINT "FK_0bb1511e3c9a3bdaa7f452c70e5" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pizza_ingredients_ingredient" ADD CONSTRAINT "FK_94400b94f05d59187b30935533e" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizza_ingredients_ingredient" DROP CONSTRAINT "FK_94400b94f05d59187b30935533e"`);
        await queryRunner.query(`ALTER TABLE "pizza_ingredients_ingredient" DROP CONSTRAINT "FK_0bb1511e3c9a3bdaa7f452c70e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94400b94f05d59187b30935533"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0bb1511e3c9a3bdaa7f452c70e"`);
        await queryRunner.query(`DROP TABLE "pizza_ingredients_ingredient"`);
    }

}
