import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFamilyProductTable1727986060145
  implements MigrationInterface
{
  name = 'CreateFamilyProductTable1727986060145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_family" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_8a3e87b194d8f695334eef6da48" UNIQUE ("uuid"), CONSTRAINT "UQ_1577ae130e3a8b44cb16a8a7642" UNIQUE ("name"), CONSTRAINT "PK_8feaa8e0119c4749efd738b5688" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8feaa8e0119c4749efd738b568" ON "product_family" ("id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a3e87b194d8f695334eef6da4" ON "product_family" ("uuid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a3e87b194d8f695334eef6da4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8feaa8e0119c4749efd738b568"`,
    );
    await queryRunner.query(`DROP TABLE "product_family"`);
  }
}
