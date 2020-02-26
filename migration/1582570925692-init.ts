import {MigrationInterface, QueryRunner} from "typeorm";
import {isNullOrUndefined} from "util";

export class init1582570925692 implements MigrationInterface {
    name = 'init1582570925692'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "is_banned" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "flag" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_17b74257294fdfd221178a132d4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "salt" character varying(255) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`insert into category(name, "is_banned") values ('programming', DEFAULT), ('miscellaneous', DEFAULT), ('dark', true)`, undefined);
        await queryRunner.query(`insert into flag(name, "is_active") values ('nsfw', DEFAULT), ('religious', DEFAULT), ('political', DEFAULT ), ('racist', DEFAULT ), ('sexist', DEFAULT )`, undefined);
        await queryRunner.query(`INSERT INTO "user"(username, "password", salt) VALUES('admin', '$2b$10$5PUveO8RNwFYmVgsCiwm8exyla9oh10fgNmGTs9wFNVQBTj9ugYcW', '$2b$10$5PUveO8RNwFYmVgsCiwm8e')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "flag"`, undefined);
        await queryRunner.query(`DROP TABLE "category"`, undefined);
    }

}
