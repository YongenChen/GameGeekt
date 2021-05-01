-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: GameGeekt_Database
-- Source Schemata: GameGeekt_Database
-- Created: Sat May  1 00:36:09 2021
-- Workbench Version: 8.0.24
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema GameGeekt_Database
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `GameGeekt_Database` ;
CREATE SCHEMA IF NOT EXISTS `GameGeekt_Database` ;

-- ----------------------------------------------------------------------------
-- Table GameGeekt_Database.game
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `GameGeekt_Database`.`game` (
  `gameid` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `imglink` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`gameid`),
  UNIQUE INDEX `gameid_UNIQUE` (`gameid` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table GameGeekt_Database.review
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `GameGeekt_Database`.`review` (
  `reviewid` INT(11) NOT NULL AUTO_INCREMENT,
  `gameid` INT(11) NOT NULL,
  `reviewerid` INT(11) NOT NULL,
  `rating` INT(11) NOT NULL,
  `reviewbody` LONGTEXT NOT NULL,
  PRIMARY KEY (`reviewid`),
  UNIQUE INDEX `reviewid_UNIQUE` (`reviewid` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table GameGeekt_Database.user
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `GameGeekt_Database`.`user` (
  `userid` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;
SET FOREIGN_KEY_CHECKS = 1;
