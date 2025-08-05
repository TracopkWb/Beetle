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
    `serv_Id` varchar(10) NOT NULL,
    `car_Photo` varchar(255) DEFAULT NULL,
    `car_Entrance_Date` date NOT NULL,
    `car_Exit_Date` date DEFAULT NULL,
    `car_Status` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`car_Id`),
    KEY `serv_Id` (`serv_Id`),
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
    `car_Id` varchar(10) NOT NULL,
    PRIMARY KEY (`cos_Id`),
    KEY `car_Id` (`car_Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4

CREATE TABLE `ticket` (
    `tic_Id` varchar(45) NOT NULL,
    `serv_Id` varchar(10) NOT NULL,
    `ticTotal` int(11) NOT NULL,
    `ticLabor` int(11) NOT NULL,
    `ticMaterial` int(11) NOT NULL,
    `ticOther` int(11) NOT NULL,
    PRIMARY KEY (`tic_Id`),
    KEY `serv_Id` (`serv_Id`),
    CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`serv_Id`) REFERENCES `service_record` (`serv_Id`) ON DELETE CASCADE ON UPDATE CASCADE
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
    `mat_Id` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`serv_Id`),
    KEY `car_Id` (`car_Id`),
    KEY `mat_Id` (`mat_Id`),
    CONSTRAINT `service_record_ibfk_1` FOREIGN KEY (`car_Id`) REFERENCES `car` (`car_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4