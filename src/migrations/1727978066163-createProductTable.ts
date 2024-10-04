import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1727978066163 implements MigrationInterface {
    name = 'CreateProductTable1727978066163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, CONSTRAINT "UQ_1442fd7cb5e0b32ff5d0b6c13d0" UNIQUE ("uuid"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bebc9158e480b949565b4dc7a8" ON "product" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1442fd7cb5e0b32ff5d0b6c13d" ON "product" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1442fd7cb5e0b32ff5d0b6c13d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bebc9158e480b949565b4dc7a8"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
