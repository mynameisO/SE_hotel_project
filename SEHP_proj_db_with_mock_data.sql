-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: host.docker.internal:3306
-- Generation Time: Dec 11, 2023 at 10:09 AM
-- Server version: 10.5.19-MariaDB-0+deb11u2
-- PHP Version: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SEHP_proj`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `staff_id` int(11) NOT NULL,
  `fname` varchar(64) NOT NULL,
  `lname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`staff_id`, `fname`, `lname`, `email`, `password`) VALUES
(1, 'regulus', 'nomother', 'regulos2000@gmail.com', '$2b$10$.JQQtTXVB3bR8N4WgsXjQOikNHnBdTVSrHx8aft16pKFuqq2D.W3u'),
(6, 'mark', 'evans', 'test1@mail.com', '$2b$10$j9lBThH6vYvFgtSrrI48EeJGj.aDTu.w.Telz5fFUTCh0QBgueBQa'),
(7, 'big', 'virg', 'test2@mail.com', '$2b$10$NFHJMHUaeeOsl6I8TVO1gOIyPOW/.yNqf6noJ5TmAvdn27d3sgLXW');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `checkin_date` datetime DEFAULT NULL,
  `checkout_date` datetime DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `voucher_id` int(11) DEFAULT NULL,
  `booking_status` enum('pending','paid','checked_in','checked_out','pending_check_out','cancel') DEFAULT NULL,
  `booking_note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `checkin_date`, `checkout_date`, `member_id`, `guest_id`, `voucher_id`, `booking_status`, `booking_note`) VALUES
(1, '2023-10-05 12:00:00', '2023-10-07 12:00:00', 711, NULL, NULL, 'checked_in', NULL),
(2, '2023-10-10 12:00:00', '2023-10-31 12:00:00', 555, NULL, NULL, 'checked_out', NULL),
(3, '2023-11-19 12:00:00', '2023-11-20 12:00:00', NULL, 101, NULL, 'checked_out', NULL),
(6949195, '2023-12-20 00:00:00', '2023-12-23 00:00:00', NULL, 96970700, NULL, 'paid', ''),
(11462473, '2023-12-17 00:00:00', '2023-12-18 00:00:00', NULL, 39260564, NULL, 'paid', 'safdasf'),
(17833708, '2023-12-10 00:00:00', '2023-12-11 00:00:00', NULL, 21666914, NULL, 'checked_out', ''),
(18188510, '2023-12-30 00:00:00', '2023-12-31 00:00:00', NULL, 13124513, NULL, 'paid', 'Black'),
(19279922, '2023-12-10 00:00:00', '2023-12-11 00:00:00', NULL, 33874843, NULL, 'cancel', ''),
(30814420, '2023-12-20 00:00:00', '2023-12-21 00:00:00', NULL, 19406771, NULL, 'paid', ''),
(35241093, '2023-12-24 00:00:00', '2023-12-25 00:00:00', NULL, 85506480, NULL, 'paid', 'asdf'),
(39074467, '2023-12-15 00:00:00', '2023-12-18 00:00:00', NULL, 51020049, NULL, 'paid', 'hello'),
(45374649, '2023-12-24 00:00:00', '2023-12-25 00:00:00', NULL, 30468981, NULL, 'paid', 'asdfafsd'),
(68449284, '2023-12-12 00:00:00', '2023-12-14 00:00:00', NULL, 21917082, NULL, 'paid', 'U KNOW LIGMA?'),
(81908889, '2023-12-10 00:00:00', '2023-12-11 00:00:00', NULL, 77775656, NULL, 'checked_in', ''),
(98804901, '2023-12-15 00:00:00', '2023-12-17 00:00:00', NULL, 25317617, NULL, 'paid', 'ery');

-- --------------------------------------------------------

--
-- Table structure for table `booking_room`
--

CREATE TABLE `booking_room` (
  `room_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_room`
--

INSERT INTO `booking_room` (`room_id`, `booking_id`) VALUES
(101, 1),
(510, 2),
(401, 3),
(305, 6949195),
(510, 11462473),
(101, 17833708),
(101, 18188510),
(401, 18188510),
(510, 19279922),
(401, 30814420),
(101, 35241093),
(401, 35241093),
(101, 39074467),
(401, 39074467),
(305, 45374649),
(101, 68449284),
(305, 68449284),
(401, 68449284),
(305, 81908889),
(401, 81908889),
(305, 98804901);

-- --------------------------------------------------------

--
-- Table structure for table `booking_service`
--

CREATE TABLE `booking_service` (
  `booking_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `Count` int(11) NOT NULL DEFAULT 1,
  `room_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_service`
--

INSERT INTO `booking_service` (`booking_id`, `service_id`, `Count`, `room_id`) VALUES
(1, 1, 1, 101);

-- --------------------------------------------------------

--
-- Stand-in structure for view `free_rooms`
-- (See below for the actual view)
--
CREATE TABLE `free_rooms` (
`room_type_id` int(11)
,`room_id` int(11)
,`room_status` enum('free','occupined','cleaning','out_of_order','check_in','check_out')
,`price` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `free_rooms_count`
-- (See below for the actual view)
--
CREATE TABLE `free_rooms_count` (
`COUNT(room_id)` bigint(21)
,`room_type_id` int(11)
,`room_type_name` varchar(64)
);

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `guest_id` int(11) NOT NULL,
  `guest_title` enum('Mr','Ms') DEFAULT NULL,
  `guest_first_name` varchar(64) DEFAULT NULL,
  `guest_middle_name` varchar(64) DEFAULT NULL,
  `guest_last_name` varchar(64) DEFAULT NULL,
  `guest_cardnumber` int(11) DEFAULT NULL,
  `guest_cardholder_name` varchar(64) DEFAULT NULL,
  `guest_expired_date` varchar(11) DEFAULT NULL,
  `guest_telnum` int(11) DEFAULT NULL,
  `guest_email` varchar(64) DEFAULT NULL,
  `guest_address` text DEFAULT NULL,
  `guest_dob` date DEFAULT NULL,
  `adult_num` int(11) DEFAULT NULL,
  `child_num` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`guest_id`, `guest_title`, `guest_first_name`, `guest_middle_name`, `guest_last_name`, `guest_cardnumber`, `guest_cardholder_name`, `guest_expired_date`, `guest_telnum`, `guest_email`, `guest_address`, `guest_dob`, `adult_num`, `child_num`) VALUES
(101, 'Ms', 'Black', 'Mermaid', 'Aerial', 598845316, 'Black Aerial', '11/25', 845699955, 'niginatlantis@gmail.com', '115/1 ROYAL DISTRICT ROYAL CURRENT ATLANTIS 480506', '1970-01-01', 1, 0),
(13124513, 'Mr', 'Black', NULL, 'White', NULL, NULL, NULL, 1234567890, 'BW@mail.com', 'Black, White, Black, Black, 12345', NULL, NULL, NULL),
(19406771, 'Mr', 'Gong', NULL, 'KingKeaw', NULL, NULL, NULL, 223334444, 'gogo@mail.com', 'tasdas, asd[, asdood, Thailand, 10140', NULL, NULL, NULL),
(21666914, 'Mr', 'ทักษ์ดนัย', NULL, 'อุรัมภรณ์', NULL, NULL, NULL, 826249968, 'test@mail.com', 'Loft 17 residence เลขที่ 8 ซอยประชาอุทิศ 17 แยก 6 เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพฯ 10140, กรุงเทพมหานคร, test, Thailand, 10140', NULL, NULL, NULL),
(21917082, 'Mr', 'Pee', NULL, 'Poo', NULL, NULL, NULL, 123456789, 'Peepoo@gmail.com', '125/26 slum land, bangkok, undefined, Thailand, 11111', NULL, NULL, NULL),
(25317617, 'Ms', '124', NULL, '142', NULL, NULL, NULL, 5135, '51@mail.com', '5133, 135, 5135, et, yery', NULL, NULL, NULL),
(30468981, 'Mr', 'asdf', NULL, 'asdf', NULL, NULL, NULL, 1234567890, 'asdf@mail.com', 'agfadg, sagfads, asdgf, asfsdf, 12345', NULL, NULL, NULL),
(33874843, 'Mr', 'ทักษ์ดนัย', NULL, 'อุรัมภรณ์', NULL, NULL, NULL, 826249968, 'tset@mail.com', 'Loft 17 residence เลขที่ 8 ซอยประชาอุทิศ 17 แยก 6 เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพฯ 10140, กรุงเทพมหานคร, asda, Thailand, 10140', NULL, NULL, NULL),
(39260564, 'Mr', 'Omar', NULL, 'Omar', NULL, NULL, NULL, 123456789, 'Omar@mail.com', 'fasdf, asf, asdf, afs, asdf', NULL, NULL, NULL),
(51020049, 'Mr', 'Omar', NULL, 'Yusoh', NULL, NULL, NULL, 1234567890, 'Omar1234555@gmail.com', 'BlaBla, BlaBla, BlaBla, Pakistan, 123456', NULL, NULL, NULL),
(77775656, 'Ms', 'ทักษ์ดนัย', NULL, 'อุรัมภรณ์', NULL, NULL, NULL, 826249968, 'ms@mail.com', 'Loft 17 residence เลขที่ 8 ซอยประชาอุทิศ 17 แยก 6 เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพฯ 10140, กรุงเทพมหานคร, test, Thailand, 10140', NULL, NULL, NULL),
(85506480, 'Ms', 'asfd', NULL, 'sadf', NULL, NULL, NULL, 912341243, 'asdf@mail.com', 'gfad, gsag, gsdag, asfd, 12345', NULL, NULL, NULL),
(96970700, 'Mr', 'Tanuthum', NULL, 'Kingkaew', NULL, NULL, NULL, 934417711, 'tanuthumkingkaew@gmail.com', '627 ซอย 1 ซอยประชาอุทิศ 44 ถนนประชาอุทิศ, d, a, Thailand, 10140', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `member_id` int(11) NOT NULL,
  `member_role` enum('staff','customer') DEFAULT NULL,
  `member_title` enum('MR','MS') DEFAULT NULL,
  `member_first_name` varchar(64) DEFAULT NULL,
  `member_middle_name` varchar(64) DEFAULT NULL,
  `member_last_name` varchar(64) DEFAULT NULL,
  `member_cardnumber` varchar(12) DEFAULT NULL,
  `member_cardholder_name` varchar(64) DEFAULT NULL,
  `member_expired_date` varchar(11) DEFAULT NULL,
  `member_telnum` int(11) DEFAULT NULL,
  `member_email` varchar(64) DEFAULT NULL,
  `member_address` text DEFAULT NULL,
  `member_dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`member_id`, `member_role`, `member_title`, `member_first_name`, `member_middle_name`, `member_last_name`, `member_cardnumber`, `member_cardholder_name`, `member_expired_date`, `member_telnum`, `member_email`, `member_address`, `member_dob`) VALUES
(1, 'staff', 'MR', 'Omar', 'Kingkaew', 'Yusoh', '0237068841', 'Omar Yusoh', '12/23', 614586985, 'omarkrab123@gmail.com', '103/2 BETONG BETONG DISTRICT, YALA THAILAND 95110', '2001-12-18'),
(555, 'customer', 'MR', 'Jarell', 'George', 'Quansah', '0551899977', 'Jarell Quansah', '03/30', 805069954, 'j.quansah78@gmail.com', '879 South Street OLDHAM OL3 4DB UNITED KINGDOM', '2003-01-29'),
(711, 'customer', 'MR', 'Dominik', NULL, 'Szoboszlai', '0115548754', 'Dominik Szoboszlai', '01/27', 898561123, 'szoboszlai.liv@gmail.com', '9159 Church Road REDHILL RH98 8JC HUNGARY', '2000-10-25');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  `room_status` enum('free','occupined','cleaning','out_of_order','check_in','check_out') DEFAULT NULL,
  `room_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `room_type_id`, `room_status`, `room_description`) VALUES
(101, 1, 'free', NULL),
(305, 2, 'free', NULL),
(401, 3, 'free', NULL),
(510, 3, 'free', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE `room_type` (
  `room_type_id` int(11) NOT NULL,
  `room_type_name` varchar(64) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`room_type_id`, `room_type_name`, `price`) VALUES
(1, 'Standard', 3000),
(2, 'Deluxe', 5500),
(3, 'Luxury', 8000);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `service_price` int(11) DEFAULT NULL,
  `service_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_price`, `service_description`) VALUES
(1, 500, 'Add one bed'),
(2, 100, 'Add breakfast'),
(3, 0, 'Add parking'),
(4, 400, 'Add spa'),
(5, 1500, 'Add champagne'),
(6, 300, 'Add bedding set');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `voucher_id` int(11) NOT NULL,
  `voucher_code` varchar(11) DEFAULT NULL,
  `voucher_discount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`voucher_id`, `voucher_code`, `voucher_discount`) VALUES
(100, '876592', 500),
(200, '331645', 1000);

-- --------------------------------------------------------

--
-- Structure for view `free_rooms`
--
DROP TABLE IF EXISTS `free_rooms`;
-- Error reading structure for table SEHP_proj.free_rooms: #1142 - SHOW VIEW command denied to user &#039;om-monitor&#039;@&#039;172.17.0.2&#039; for table `SEHP_proj`.`free_rooms`

-- --------------------------------------------------------

--
-- Structure for view `free_rooms_count`
--
DROP TABLE IF EXISTS `free_rooms_count`;
-- Error reading structure for table SEHP_proj.free_rooms_count: #1142 - SHOW VIEW command denied to user &#039;om-monitor&#039;@&#039;172.17.0.2&#039; for table `SEHP_proj`.`free_rooms_count`

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `guest_id` (`guest_id`),
  ADD KEY `voucher_id` (`voucher_id`);

--
-- Indexes for table `booking_room`
--
ALTER TABLE `booking_room`
  ADD PRIMARY KEY (`booking_id`,`room_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `booking_service`
--
ALTER TABLE `booking_service`
  ADD PRIMARY KEY (`booking_id`,`service_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`guest_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `room_type_id` (`room_type_id`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`room_type_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`voucher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`guest_id`),
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`voucher_id`);

--
-- Constraints for table `booking_room`
--
ALTER TABLE `booking_room`
  ADD CONSTRAINT `booking_room_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  ADD CONSTRAINT `booking_room_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`);

--
-- Constraints for table `booking_service`
--
ALTER TABLE `booking_service`
  ADD CONSTRAINT `booking_service_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`),
  ADD CONSTRAINT `booking_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`),
  ADD CONSTRAINT `booking_service_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`room_type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
