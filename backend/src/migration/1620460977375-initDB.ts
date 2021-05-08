import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1620460977375 implements MigrationInterface {
    name = 'initDB1620460977375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `username` varchar(255) NOT NULL, `password` varchar(3000) NOT NULL, `email` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_638bac731294171648258260ff` (`password`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `review` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `rating` float NOT NULL, `reviewbody` varchar(3072) NOT NULL, `reviewerId` int NULL, `gameId` int NULL, UNIQUE INDEX `IDX_2799a90025bdf6b6bc4f71d95c` (`reviewbody`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `game` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `name` varchar(255) NOT NULL, `genre` enum ('Adventure', 'First_Person_Shooter', 'Massively_Multiplayer_Online', 'Mobile', 'Multiplayer_Online_Battle_Arena', 'Puzzle', 'Real_Time_Strategy', 'Role_Playing', 'Simulation', 'Sports') NOT NULL, `description` varchar(3000) NOT NULL, `imgLink` varchar(3000) NULL DEFAULT '', UNIQUE INDEX `IDX_5d1e08e04b97aa06d671cd5840` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_34413365b39e3bf5bea866569b4` FOREIGN KEY (`reviewerId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_ef6fa2aeb98fd27d0a8d71735b6` FOREIGN KEY (`gameId`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_ef6fa2aeb98fd27d0a8d71735b6`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_34413365b39e3bf5bea866569b4`");
        await queryRunner.query("DROP INDEX `IDX_5d1e08e04b97aa06d671cd5840` ON `game`");
        await queryRunner.query("DROP TABLE `game`");
        await queryRunner.query("DROP INDEX `IDX_2799a90025bdf6b6bc4f71d95c` ON `review`");
        await queryRunner.query("DROP TABLE `review`");
        await queryRunner.query("DROP INDEX `IDX_638bac731294171648258260ff` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
