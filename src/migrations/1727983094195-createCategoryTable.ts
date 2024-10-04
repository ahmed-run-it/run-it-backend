import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1727983094195 implements MigrationInterface {
    name = 'CreateCategoryTable1727983094195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_86ee096735ccbfa3fd319af1833" UNIQUE ("uuid"), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c4e4a89e3674fc9f382d733f0" ON "category" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_86ee096735ccbfa3fd319af183" ON "category" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_86ee096735ccbfa3fd319af183"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c4e4a89e3674fc9f382d733f0"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
