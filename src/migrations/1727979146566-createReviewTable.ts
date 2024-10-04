import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReviewTable1727979146566 implements MigrationInterface {
  name = 'CreateReviewTable1727979146566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "content" text NOT NULL, "rating" integer NOT NULL, CONSTRAINT "UQ_bec4685f00ab29945bfe61825a4" UNIQUE ("uuid"), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e4299a343a81574217255c00c" ON "review" ("id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bec4685f00ab29945bfe61825a" ON "review" ("uuid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bec4685f00ab29945bfe61825a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e4299a343a81574217255c00c"`,
    );
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
