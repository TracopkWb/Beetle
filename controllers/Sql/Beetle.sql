CREATE TABLE `car` (
    `car_Id` varchar(10) NOT NULL,
    `carModel` varchar(10) NOT NULL,
    `carYear` varchar(10) NOT NULL,
    `carManufacturer` varchar(10) NOT NULL,
    `carVersion` varchar(10) DEFAULT NULL,
    `carLicensePlate` varchar(45) NOT NULL,
    `carVin` varchar(45) DEFAULT NULL,
    `carCurrMilage` int(11) DEFAULT NULL,
    `cos_Id` varchar(10) NOT NULL,
    `car_Registration_Date` date DEFAULT NULL,
    `car_Photo` varchar(255) DEFAULT NULL,
    `car_Entrance_Date` date NOT NULL,
    `car_Exit_Date` date DEFAULT NULL,
    `car_Status` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`car_Id`),
    KEY `cos_Id` (`cos_Id`),
    CONSTRAINT `car_ibfk_2` FOREIGN KEY (`cos_Id`) REFERENCES `costumer` (`cos_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '	'

CREATE TABLE `costumer` (
    `cos_Id` varchar(10) NOT NULL,
    `cosName` varchar(255) NOT NULL,
    `cosPhone` varchar(15) NOT NULL,
    `cosOtherContacts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (
        json_valid(`cosOtherContacts`)
    ),
    PRIMARY KEY (`cos_Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4

CREATE TABLE `materialused` (
    `mat_Id` varchar(10) NOT NULL,
    `serv_Id` varchar(10) NOT NULL,
    `matName` varchar(225) NOT NULL,
    `matQuantity` int(11) NOT NULL,
    `matUnitCost` decimal(10, 0) NOT NULL,
    `matLaborCost` int(11) NOT NULL,
    `matPurchaseDate` date NOT NULL,
    `matSupplier` varchar(45) NOT NULL,
    `matReceipt` varchar(225) DEFAULT 'None',
    `matComment` text DEFAULT 'None',
    PRIMARY KEY (`mat_Id`),
    KEY `serv_Id` (`serv_Id`),
    CONSTRAINT `materialused_ibfk_1` FOREIGN KEY (`serv_Id`) REFERENCES `service_record` (`serv_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4

CREATE TABLE `mechanic` (
    `mec_Id` varchar(45) NOT NULL,
    `mecName` varchar(45) NOT NULL,
    `mecNumber` varchar(45) NOT NULL,
    `mecPhoto` varchar(225) DEFAULT 'None',
    `mecBiometrics` int(10) unsigned zerofill DEFAULT NULL,
    PRIMARY KEY (`mec_Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4

CREATE TABLE `service_record` (
    `serv_Id` varchar(10) NOT NULL,
    `car_Id` varchar(10) NOT NULL,
    `serReName` varchar(255) NOT NULL,
    `serReDate` date NOT NULL,
    `serReDescription` text DEFAULT 'None',
    `serReComments` text DEFAULT 'None',
    `serReWarranty` date NOT NULL,
    `serReStatusWarranty` tinyint(4) DEFAULT NULL,
    `serReDownPayment` int(11) DEFAULT NULL,
    `serReStatus` varchar(45) NOT NULL,
    `serReInitialTotal` decimal(10, 0) NOT NULL,
    `serReTotal` decimal(10, 0) DEFAULT NULL,
    `serReTotalLeft` decimal(10, 0) DEFAULT NULL,
    `serRe_Approved_By` varchar(45) DEFAULT NULL,
    `serRe_milage_at_Service` int(11) DEFAULT NULL,
    `serRe_Finished_Date` date DEFAULT NULL,
    `tic_Id` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`serv_Id`),
    KEY `car_Id` (`car_Id`),
    CONSTRAINT `service_record_ibfk_1` FOREIGN KEY (`car_Id`) REFERENCES `car` (`car_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4


CREATE TABLE `ticket` (
    `tic_Id` varchar(45) NOT NULL,
    `serv_Id` varchar(10) NOT NULL,
    `ticTotal` decimal(10, 2) NOT NULL,
    `ticDate` date NOT NULL,
    PRIMARY KEY (`tic_Id`),
    KEY `serv_Id` (`serv_Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4


/*******************************Car manufactures and models table**************************/


DROP TABLE IF EXISTS models;
DROP TABLE IF EXISTS manufacturers;

CREATE TABLE manufacturers (
    man_Id INT AUTO_INCREMENT PRIMARY KEY,
    manName VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `models` (
    `mod_Id` int(11) NOT NULL AUTO_INCREMENT,
    `modName` varchar(100) NOT NULL,
    `man_Id` int(11) NOT NULL,
    `mod_register_data` datetime NOT NULL,
    PRIMARY KEY (`mod_Id`),
    KEY `man_Id` (`man_Id`),
    CONSTRAINT `models_ibfk_1` FOREIGN KEY (`man_Id`) REFERENCES `manufacturers` (`man_Id`)
) ENGINE = InnoDB AUTO_INCREMENT = 106 DEFAULT CHARSET = utf8mb4

INSERT INTO manufacturers (manName,man_register_data) VALUES ('Honda',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Toyota',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Ford',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Chevrolet',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Nissan',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('BMW',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Mercedes-Benz',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Volkswagen',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Hyundai',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Kia',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Mazda',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Subaru',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Jeep',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Dodge',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Lexus',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Acura',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Infiniti',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Tesla',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Volvo',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Other',NOW());
INSERT INTO manufacturers (manName,man_register_data) VALUES ('Test',NOW());

INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Civic', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Accord', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('CR-V', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('HR-V', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Fit', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Pilot', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Ridgeline', (SELECT man_Id FROM manufacturers WHERE manName = 'Honda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Corolla', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Camry', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('RAV4', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Highlander', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Prius', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Yaris', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Tacoma', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Tundra', (SELECT man_Id FROM manufacturers WHERE manName = 'Toyota'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Focus', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Fusion', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Escape', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Explorer', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('F-150', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Edge', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Mustang', (SELECT man_Id FROM manufacturers WHERE manName = 'Ford'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Malibu', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Impala', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Equinox', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Tahoe', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Silverado', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Suburban', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Camaro', (SELECT man_Id FROM manufacturers WHERE manName = 'Chevrolet'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Sentra', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Altima', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Rogue', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Murano', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Frontier', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Versa', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Pathfinder', (SELECT man_Id FROM manufacturers WHERE manName = 'Nissan'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('3 Series', (SELECT man_Id FROM manufacturers WHERE manName = 'BMW'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('5 Series', (SELECT man_Id FROM manufacturers WHERE manName = 'BMW'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('7 Series', (SELECT man_Id FROM manufacturers WHERE manName = 'BMW'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('X1', (SELECT man_Id FROM manufacturers WHERE manName = 'BMW'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('X3', (SELECT man_Id FROM manufacturers WHERE manName = 'BMW'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('X5', (SELECT man_Id FROM manufacturers WHERE manName = 'BMW'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('C-Class', (SELECT man_Id FROM manufacturers WHERE manName = 'Mercedes-Benz'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('E-Class', (SELECT man_Id FROM manufacturers WHERE manName = 'Mercedes-Benz'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('S-Class', (SELECT man_Id FROM manufacturers WHERE manName = 'Mercedes-Benz'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('GLA', (SELECT man_Id FROM manufacturers WHERE manName = 'Mercedes-Benz'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('GLC', (SELECT man_Id FROM manufacturers WHERE manName = 'Mercedes-Benz'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('GLE', (SELECT man_Id FROM manufacturers WHERE manName = 'Mercedes-Benz'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Golf', (SELECT man_Id FROM manufacturers WHERE manName = 'Volkswagen'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Passat', (SELECT man_Id FROM manufacturers WHERE manName = 'Volkswagen'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Tiguan', (SELECT man_Id FROM manufacturers WHERE manName = 'Volkswagen'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Jetta', (SELECT man_Id FROM manufacturers WHERE manName = 'Volkswagen'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Atlas', (SELECT man_Id FROM manufacturers WHERE manName = 'Volkswagen'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Elantra', (SELECT man_Id FROM manufacturers WHERE manName = 'Hyundai'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Sonata', (SELECT man_Id FROM manufacturers WHERE manName = 'Hyundai'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Tucson', (SELECT man_Id FROM manufacturers WHERE manName = 'Hyundai'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Santa Fe', (SELECT man_Id FROM manufacturers WHERE manName = 'Hyundai'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Kona', (SELECT man_Id FROM manufacturers WHERE manName = 'Hyundai'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Rio', (SELECT man_Id FROM manufacturers WHERE manName = 'Kia'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Forte', (SELECT man_Id FROM manufacturers WHERE manName = 'Kia'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Optima', (SELECT man_Id FROM manufacturers WHERE manName = 'Kia'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Sportage', (SELECT man_Id FROM manufacturers WHERE manName = 'Kia'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Sorento', (SELECT man_Id FROM manufacturers WHERE manName = 'Kia'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Mazda3', (SELECT man_Id FROM manufacturers WHERE manName = 'Mazda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Mazda6', (SELECT man_Id FROM manufacturers WHERE manName = 'Mazda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('CX-3', (SELECT man_Id FROM manufacturers WHERE manName = 'Mazda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('CX-5', (SELECT man_Id FROM manufacturers WHERE manName = 'Mazda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('CX-9', (SELECT man_Id FROM manufacturers WHERE manName = 'Mazda'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Impreza', (SELECT man_Id FROM manufacturers WHERE manName = 'Subaru'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Legacy', (SELECT man_Id FROM manufacturers WHERE manName = 'Subaru'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Outback', (SELECT man_Id FROM manufacturers WHERE manName = 'Subaru'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Forester', (SELECT man_Id FROM manufacturers WHERE manName = 'Subaru'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Crosstrek', (SELECT man_Id FROM manufacturers WHERE manName = 'Subaru'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Cherokee', (SELECT man_Id FROM manufacturers WHERE manName = 'Jeep'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Grand Cherokee', (SELECT man_Id FROM manufacturers WHERE manName = 'Jeep'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Wrangler', (SELECT man_Id FROM manufacturers WHERE manName = 'Jeep'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Compass', (SELECT man_Id FROM manufacturers WHERE manName = 'Jeep'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Renegade', (SELECT man_Id FROM manufacturers WHERE manName = 'Jeep'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Charger', (SELECT man_Id FROM manufacturers WHERE manName = 'Dodge'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Challenger', (SELECT man_Id FROM manufacturers WHERE manName = 'Dodge'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Durango', (SELECT man_Id FROM manufacturers WHERE manName = 'Dodge'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Journey', (SELECT man_Id FROM manufacturers WHERE manName = 'Dodge'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('IS', (SELECT man_Id FROM manufacturers WHERE manName = 'Lexus'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('ES', (SELECT man_Id FROM manufacturers WHERE manName = 'Lexus'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('RX', (SELECT man_Id FROM manufacturers WHERE manName = 'Lexus'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('NX', (SELECT man_Id FROM manufacturers WHERE manName = 'Lexus'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('GX', (SELECT man_Id FROM manufacturers WHERE manName = 'Lexus'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('ILX', (SELECT man_Id FROM manufacturers WHERE manName = 'Acura'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('TLX', (SELECT man_Id FROM manufacturers WHERE manName = 'Acura'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('RDX', (SELECT man_Id FROM manufacturers WHERE manName = 'Acura'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('MDX', (SELECT man_Id FROM manufacturers WHERE manName = 'Acura'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Q50', (SELECT man_Id FROM manufacturers WHERE manName = 'Infiniti'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Q60', (SELECT man_Id FROM manufacturers WHERE manName = 'Infiniti'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('QX50', (SELECT man_Id FROM manufacturers WHERE manName = 'Infiniti'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('QX60', (SELECT man_Id FROM manufacturers WHERE manName = 'Infiniti'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Model S', (SELECT man_Id FROM manufacturers WHERE manName = 'Tesla'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Model 3', (SELECT man_Id FROM manufacturers WHERE manName = 'Tesla'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Model X', (SELECT man_Id FROM manufacturers WHERE manName = 'Tesla'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Model Y', (SELECT man_Id FROM manufacturers WHERE manName = 'Tesla'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('S60', (SELECT man_Id FROM manufacturers WHERE manName = 'Volvo'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('S90', (SELECT man_Id FROM manufacturers WHERE manName = 'Volvo'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('XC40', (SELECT man_Id FROM manufacturers WHERE manName = 'Volvo'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('XC60', (SELECT man_Id FROM manufacturers WHERE manName = 'Volvo'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('XC90', (SELECT man_Id FROM manufacturers WHERE manName = 'Volvo'),NOW());
INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('Other', (SELECT man_Id FROM manufacturers WHERE manName = 'Other'),NOW());

SELECT * FROM manufacturers GROUP BY `manName` ORDER BY `man_Id` ASC;

SELECT * FROM models;
SELECT * FROM manufacturers;

SELECT manufacturers.*, models.modName
FROM manufacturers
JOIN models ON manufacturers.`man_Id` = models.`man_Id` LIMIT 200;

SELECT 'manufacturer', manufacturers.manName, 'model', (SELECT GROUP_CONCAT(modName) FROM models;)
FROM manufacturers
JOIN models ON manufacturers.man_Id = models.man_Id;

SELECT 
    man.`manName`,GROUP_CONCAT('"',mods.modName,'"')
FROM 
    manufacturers AS man
JOIN 
    models AS mods 
ON 
    man.`man_Id` = mods.`man_Id`
GROUP BY 
    man.`man_Id`

SELECT CONCAT('{"manufacturer":', man.manName,',"models": [', GROUP_CONCAT('"', mods.modName, '"'), ']}') AS result FROM manufacturers AS man JOIN models AS mods ON man.man_Id = mods.man_Id GROUP BY man.man_Id

SELECT 
  JSON_OBJECT(
    'manufacturer', m.manName,
    'models', CONCAT('[',(
    SELECT 
        GROUP_CONCAT('"',mods.modName,'"')
    FROM 
        models AS mods
    ),']')
  ) AS manufacturer_json
FROM manufacturers AS m;


SELECT JSON_OBJECT('manufacturer', m.manName,'models', CONCAT('[',(SELECT GROUP_CONCAT(mods.modName) FROM models AS mods),']') ) AS manufacturer_json FROM manufacturers AS m;


DELIMITER $$

CREATE TRIGGER adding_new_man
AFTER INSERT ON manufacturers
FOR EACH ROW
BEGIN
    INSERT INTO models (modName, man_Id)
    VALUES ('------other--------', NEW.man_Id);
END$$

DELIMITER ;
SELECT * FROM car;
SELECT * FROM models ORDER BY mod_register_data DESC;
SELECT * FROM models WHERE `man_Id` = 23;
SELECT * FROM manufacturers ORDER BY man_register_data DESC;
SELECT `man_Id` FROM manufacturers ORDER BY man_register_data DESC LIMIT 1;

INSERT INTO models (modName, man_Id,mod_register_data) VALUES ('--------Other-------', (SELECT man_Id FROM manufacturers WHERE manName = 'Other'),NOW());

INSERT INTO manufacturers (manName,man_register_data) VALUES ('HAVAL',NOW());

/* Deleting other */
DELETE FROM manufacturers WHERE `man_Id` =  24; 

SELECT manufacturers.*, models.modName
FROM manufacturers
JOIN models ON manufacturers.`man_Id` = models.`man_Id` LIMIT 200;

SELECT costumer.*, car.*
FROM costumer
JOIN car ON costumer.`cos_Id` = car.`cos_Id`;





