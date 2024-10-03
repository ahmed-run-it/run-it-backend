import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagTable1727982356620 implements MigrationInterface {
    name = 'CreateTagTable1727982356620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" text, "slug" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_d70de2c1e1a3b52adb904028ea2" UNIQUE ("uuid"), CONSTRAINT "UQ_3413aed3ecde54f832c4f44f045" UNIQUE ("slug"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e4052373c579afc1471f52676" ON "tag" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d70de2c1e1a3b52adb904028ea" ON "tag" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d70de2c1e1a3b52adb904028ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e4052373c579afc1471f52676"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
