DROP TABLE IF EXISTS `PERSON` CASCADE;
DROP TABLE IF EXISTS `TO_DO_LIST` CASCADE;

CREATE TABLE IF NOT EXISTS PERSON (
	`id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NULL DEFAULT NULL
    );
    
CREATE TABLE IF NOT EXISTS TO_DO_LIST (
	`id` BIGINT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(255)	NULL DEFAULT NULL,
	PERSON_ID BIGINT);