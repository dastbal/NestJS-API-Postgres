import {MigrationInterface, QueryRunner} from "typeorm";

export class addFilds1647048172389 implements MigrationInterface {
    name = 'addFilds1647048172389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizza" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pizza" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizza" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "pizza" DROP COLUMN "createAt"`);
    }

}
