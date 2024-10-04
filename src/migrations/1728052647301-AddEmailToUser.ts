import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToUser1728052647301 implements MigrationInterface {
  name = 'AddEmailToUser1728052647301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(255)`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_sex_enum" AS ENUM('FEMALE', 'MALE', 'AMBIGUOUS', 'UNKNOWN', 'NOT APPLICABLE', 'OTHER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "sex" "public"."user_sex_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "mobile_phone" character varying(15)`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying(50)`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying(50)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobile_phone"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sex"`);
    await queryRunner.query(`DROP TYPE "public"."user_sex_enum"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
  }
}
