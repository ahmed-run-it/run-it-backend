import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDelivryTable1727980323699 implements MigrationInterface {
    name = 'CreateDelivryTable1727980323699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "deliveryMethod" character varying(100) NOT NULL, "deliveryCost" numeric(5,2) NOT NULL, "expectedDeliveryDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL DEFAULT 'Pending', CONSTRAINT "UQ_20337244cbee201320f2b1f7b01" UNIQUE ("uuid"), CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ffad7bf84e68716cd9af89003b" ON "delivery" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_20337244cbee201320f2b1f7b0" ON "delivery" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_20337244cbee201320f2b1f7b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ffad7bf84e68716cd9af89003b"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
    }

}
