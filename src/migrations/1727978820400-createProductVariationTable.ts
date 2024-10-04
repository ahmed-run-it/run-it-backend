import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductVariationTable1727978820400
  implements MigrationInterface
{
  name = 'CreateProductVariationTable1727978820400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_variation" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "color" character varying(20) NOT NULL, "taille" character varying(20) NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_7d2cbe05948346dc33b78fed56a" UNIQUE ("uuid"), CONSTRAINT "PK_bfae10232dcbc2c77fb37d0ebf5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfae10232dcbc2c77fb37d0ebf" ON "product_variation" ("id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d2cbe05948346dc33b78fed56" ON "product_variation" ("uuid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7d2cbe05948346dc33b78fed56"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfae10232dcbc2c77fb37d0ebf"`,
    );
    await queryRunner.query(`DROP TABLE "product_variation"`);
  }
}
