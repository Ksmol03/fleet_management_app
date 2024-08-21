-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2024 at 03:21 PM
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
('f1840a84c622c3cbc9a1d980ac2d488e94b95ca9', 'admin123', '2024-08-20 13:03:30');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `organization_id` int(11) NOT NULL,
  `organization_name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`organization_id`, `organization_name`) VALUES
(38, 'IKEA2');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'viewer'),
(2, 'user'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `role_in_organization`
--

CREATE TABLE `role_in_organization` (
  `username` varchar(30) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_in_organization`
--

INSERT INTO `role_in_organization` (`username`, `organization_id`, `role_id`) VALUES
('admin123', 38, 1),
('admin123', 36, 3),
('admin123', 37, 3);

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

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_key`, `username`, `ip`, `last_used`, `created_at`) VALUES
('16fd607f51b464fd5526ec1747c6d90d5af610cece7f627d39fdf461c12a2825', 'admin1234', '::ffff:127.0.0.1', '2024-08-21 09:39:55', '2024-08-21 09:39:35'),
('2307dd99733e1f68c6a07034439d320ff5ebe6b02c7712b413060b2b262bd980', 'admin123', '::ffff:127.0.0.1', '2024-08-21 09:38:53', '2024-08-20 13:04:03'),
('751eb8017aac2db1282d9d19a28068132dcf397a49f8ba9eab915c1e96072df2', 'admin123', '::ffff:127.0.0.1', '2024-08-20 13:04:01', '2024-08-20 13:04:01'),
('918d21e84f1c902e54013941eb0412f714c5fa9b4d5429d1894c165a70240d83', 'admin1234', '::ffff:127.0.0.1', '2024-08-21 09:39:33', '2024-08-21 09:39:33'),
('cfc494e76583548d07f2e857b5a5829b240387274b2cc2c0da0d936b057b38f2', 'admin123', '::ffff:127.0.0.1', '2024-08-21 10:59:07', '2024-08-21 09:40:11');

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
  `activated` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `first_hashed_password`, `second_hashed_password`, `third_hashed_password`, `fourth_hashed_password`, `fifth_hashed_password`, `password_change_date`, `activated`) VALUES
('admin123', 'admin@example.com', '$2b$12$3XsMtUQu3y8LYVRPZ2/LBujqt7SFg/3g.8YD/tENm0QIpNvXbeS1O', '$2b$12$IV1jiuWaSMwhZOrBo5YgOOllzOsOVDTZ0X/p4Lga4Avo96W1PJG7K', NULL, NULL, NULL, '2024-08-20', 1),
('admin1234', 'admin2@example.com', '$2b$12$OIq6qvDU7Eq89./nFcZEge0VKx2ruBN9/oO7OF2Ipp7.8/FKIqXSy', NULL, NULL, NULL, NULL, '2024-08-21', 1);

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
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`organization_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `role_in_organization`
--
ALTER TABLE `role_in_organization`
  ADD PRIMARY KEY (`username`,`organization_id`),
  ADD KEY `role_id` (`role_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `organization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activations`
--
ALTER TABLE `activations`
  ADD CONSTRAINT `activations_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `role_in_organization`
--
ALTER TABLE `role_in_organization`
  ADD CONSTRAINT `role_in_organization_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
