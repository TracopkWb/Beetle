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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4