import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1727977890516 implements MigrationInterface {
    name = 'CreateAddressTable1727977890516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "street" character varying(100) NOT NULL, "city" character varying(50) NOT NULL, "postalCode" character varying(20) NOT NULL, "country" character varying(50) NOT NULL, CONSTRAINT "UQ_496d4a29b0dfa82ede19a4bcad0" UNIQUE ("uuid"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d92de1f82754668b5f5f5dd4fd" ON "address" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_496d4a29b0dfa82ede19a4bcad" ON "address" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_496d4a29b0dfa82ede19a4bcad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d92de1f82754668b5f5f5dd4fd"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
