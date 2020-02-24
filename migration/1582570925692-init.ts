import {MigrationInterface, QueryRunner} from "typeorm";

export class init1582570925692 implements MigrationInterface {
    name = 'init1582570925692'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "is_banned" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "flag" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_17b74257294fdfd221178a132d4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`insert into category(name, "is_banned") values ('programming', DEFAULT), ('miscellaneous', DEFAULT), ('dark', true)`, undefined);
        await queryRunner.query(`insert into flag(name, "is_active") values ('nsfw', DEFAULT), ('religious', DEFAULT), ('political', DEFAULT ), ('racist', DEFAULT ), ('sexist', DEFAULT )`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "flag"`, undefined);
        await queryRunner.query(`DROP TABLE "category"`, undefined);
    }

}
