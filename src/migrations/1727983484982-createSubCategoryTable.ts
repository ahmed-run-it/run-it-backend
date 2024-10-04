import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubCategoryTable1727983484982 implements MigrationInterface {
  name = 'CreateSubCategoryTable1727983484982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_d5a2124286dbd762a6daa70f4e1" UNIQUE ("uuid"), CONSTRAINT "UQ_7745a7cea2687ee7b048f828c76" UNIQUE ("name"), CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_59f4461923255f1ce7fc5e7423" ON "sub_category" ("id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d5a2124286dbd762a6daa70f4e" ON "sub_category" ("uuid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d5a2124286dbd762a6daa70f4e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_59f4461923255f1ce7fc5e7423"`,
    );
    await queryRunner.query(`DROP TABLE "sub_category"`);
  }
}
