CREATE TABLE `costumer` (
  `cos_Id` varchar(10) NOT NULL,
  `cosName` varchar(255) NOT NULL,
  `cosPhone` varchar(15) NOT NULL,
  `cosOtherContacts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cosOtherContacts`)),
  `car_Id` varchar(10) NOT NULL,
  PRIMARY KEY (`cos_Id`),
  KEY `car_Id` (`car_Id`),
  CONSTRAINT `costumer_ibfk_1` FOREIGN KEY (`car_Id`) REFERENCES `car` (`car_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
