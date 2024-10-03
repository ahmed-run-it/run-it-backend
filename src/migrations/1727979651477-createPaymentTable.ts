import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1727979651477 implements MigrationInterface {
    name = 'CreatePaymentTable1727979651477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "amount" numeric(10,2) NOT NULL, "paymentMethod" character varying(50) NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_c386bf9fa50eeada75b7adcc647" UNIQUE ("uuid"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fcaec7df5adf9cac408c686b2a" ON "payment" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c386bf9fa50eeada75b7adcc64" ON "payment" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c386bf9fa50eeada75b7adcc64"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcaec7df5adf9cac408c686b2a"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
