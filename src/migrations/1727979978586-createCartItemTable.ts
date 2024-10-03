import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartItemTable1727979978586 implements MigrationInterface {
    name = 'CreateCartItemTable1727979978586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "quantity" integer NOT NULL, CONSTRAINT "UQ_ecaa63378763d1a178ca62141c6" UNIQUE ("uuid"), CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bd94725aa84f8cf37632bcde99" ON "cart_item" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ecaa63378763d1a178ca62141c" ON "cart_item" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ecaa63378763d1a178ca62141c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd94725aa84f8cf37632bcde99"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
    }

}
