-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2024 at 03:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fleet_management_app_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `activations`
--

CREATE TABLE `activations` (
  `activation_token` varchar(40) NOT NULL,
  `username` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activations`
--

INSERT INTO `activations` (`activation_token`, `username`, `created_at`) VALUES
('a6dd2fd2be95923863f733fede41c3032127ab7a', 'gorath71', '2024-08-19 06:39:46');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_key` varchar(64) NOT NULL,
  `username` varchar(30) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `last_used` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_hashed_password` varchar(60) NOT NULL,
  `second_hashed_password` varchar(60) DEFAULT NULL,
  `third_hashed_password` varchar(60) DEFAULT NULL,
  `fourth_hashed_password` varchar(60) DEFAULT NULL,
  `fifth_hashed_password` varchar(60) DEFAULT NULL,
  `password_change_date` date NOT NULL DEFAULT curdate(),
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  `accept_terms` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `first_hashed_password`, `second_hashed_password`, `third_hashed_password`, `fourth_hashed_password`, `fifth_hashed_password`, `password_change_date`, `activated`, `accept_terms`) VALUES
('admin', 'admin@example.com', '$2a$12$J3iwEKpRkUJ1sEUc37MTXeP28l1UPt09l0jIflUxAzZ/XU3Vjz4Iu', NULL, NULL, NULL, NULL, '2024-08-14', 1, 1),
('gorath71', 'gorath@examdwplea2.com', '$2b$12$yeJ4ryc0KDez7zAwkL7vAODzUnZAcMN5jLOY34hsZ0RyhIIppfGsC', '$2a$12$5b3I9IAkugxCS6IWLK7.F.hscRuk.3NNMJ97xL2lwBad77SuZ2hkO', NULL, NULL, NULL, '2024-08-19', 1, 1),
('gorath711', 'gorath@examdwplea21.com', '$2b$12$IlU6Xvlp3iHE7NO2/lsGLeVThsxtJQh3TjbMZjfvFmylgxxlLHnR.', NULL, NULL, NULL, NULL, '2024-08-19', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activations`
--
ALTER TABLE `activations`
  ADD PRIMARY KEY (`activation_token`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activations`
--
ALTER TABLE `activations`
  ADD CONSTRAINT `activations_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
