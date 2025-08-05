CREATE TABLE `materialused` (
  `mat_Id` varchar(10) NOT NULL,
  `serv_Id` varchar(10) NOT NULL,
  `matName` varchar(225) NOT NULL,
  `matQuantity` int(11) NOT NULL,
  `matUnitCost` decimal(10,0) NOT NULL,
  `matLaborCost` int(11) NOT NULL,
  `matPurchaseDate` date NOT NULL,
  `matSupplier` varchar(45) NOT NULL,
  `matReceipt` varchar(225) DEFAULT 'None',
  `matComment` text DEFAULT 'None',
  PRIMARY KEY (`mat_Id`),
  KEY `serv_Id` (`serv_Id`),
  CONSTRAINT `materialused_ibfk_1` FOREIGN KEY (`serv_Id`) REFERENCES `service_record` (`serv_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4