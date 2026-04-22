-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2026 at 03:27 PM
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
-- Database: `botydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategori_properti`
--

CREATE TABLE `kategori_properti` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `kategori_properti`
--

INSERT INTO `kategori_properti` (`id`, `nama_kategori`) VALUES
(1, 'Rumah'),
(2, 'Ruko'),
(3, 'Tanah'),
(4, 'Apartemen');

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

CREATE TABLE `komentar` (
  `id` int(11) NOT NULL,
  `komentar` text NOT NULL,
  `properti_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `komentar_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `id` int(11) NOT NULL,
  `keterangan` text NOT NULL,
  `pelapor_id` int(11) NOT NULL,
  `properti_id` int(11) NOT NULL,
  `status` enum('pending','diterima','ditolak') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paket_iklan`
--

CREATE TABLE `paket_iklan` (
  `id` int(11) NOT NULL,
  `nama_paket` varchar(20) NOT NULL,
  `durasi_iklan` char(10) NOT NULL,
  `harga` char(10) NOT NULL,
  `deskripsi` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `paket_iklan`
--

INSERT INTO `paket_iklan` (`id`, `nama_paket`, `durasi_iklan`, `harga`, `deskripsi`) VALUES
(1, 'Bronze', '7 Hari', '50000', 'Paket hemat untuk pemula'),
(2, 'Silver', '30 Hari', '150000', 'Paket populer untuk agen'),
(3, 'Gold', '90 Hari', '400000', 'Paket premium dengan fitur highlight');

-- --------------------------------------------------------

--
-- Table structure for table `properti`
--

CREATE TABLE `properti` (
  `id` int(11) NOT NULL,
  `judul` varchar(20) NOT NULL,
  `deskripsi` text NOT NULL,
  `alamat` text NOT NULL,
  `luas_properti` char(10) NOT NULL,
  `harga` char(15) NOT NULL,
  `tanggal_tayang` date NOT NULL,
  `tanggal_kadaluarsa` date NOT NULL,
  `kategori_properti_id` int(11) NOT NULL,
  `paket_iklan_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `properti`
--

INSERT INTO `properti` (`id`, `judul`, `deskripsi`, `alamat`, `luas_properti`, `harga`, `tanggal_tayang`, `tanggal_kadaluarsa`, `kategori_properti_id`, `paket_iklan_id`, `user_id`) VALUES
(1, 'Properti Dummy', 'Untuk testing', 'Alamat Test', '100', '500jt', '0000-00-00', '0000-00-00', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `no_hp` char(13) NOT NULL,
  `email` varchar(35) NOT NULL,
  `password` varchar(70) NOT NULL,
  `role` enum('Admin','User') NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `no_hp`, `email`, `password`, `role`) VALUES
(1, 'Saya', '088321', 'saya@gmail.com', 'admin123', 'User'),
(2, 'tes', '087642344', 'tes@example.com', 'test1234', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `properti_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `properti_id`) VALUES
(6, 1, 1),
(5, 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori_properti`
--
ALTER TABLE `kategori_properti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_komentar_properti_idx` (`properti_id`),
  ADD KEY `fk_komentar_user_idx` (`user_id`),
  ADD KEY `fk_komentar_idx` (`komentar_id`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_laporan_pelapor_idx` (`pelapor_id`),
  ADD KEY `fk_laporan_properti_idx` (`properti_id`);

--
-- Indexes for table `paket_iklan`
--
ALTER TABLE `paket_iklan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properti`
--
ALTER TABLE `properti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_properti_kategori_properti1_idx` (`kategori_properti_id`),
  ADD KEY `fk_properti_paket_iklan1_idx` (`paket_iklan_id`),
  ADD KEY `fk_properti_user_idx` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_properti` (`user_id`,`properti_id`),
  ADD KEY `fk_wishlist_user1_idx` (`user_id`),
  ADD KEY `fk_wishlist_properti1_idx` (`properti_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategori_properti`
--
ALTER TABLE `kategori_properti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `komentar`
--
ALTER TABLE `komentar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paket_iklan`
--
ALTER TABLE `paket_iklan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `properti`
--
ALTER TABLE `properti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `fk_komentar` FOREIGN KEY (`komentar_id`) REFERENCES `komentar` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_komentar_properti` FOREIGN KEY (`properti_id`) REFERENCES `properti` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_komentar_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `laporan`
--
ALTER TABLE `laporan`
  ADD CONSTRAINT `fk_laporan_pelapor` FOREIGN KEY (`pelapor_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_laporan_properti` FOREIGN KEY (`properti_id`) REFERENCES `properti` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `properti`
--
ALTER TABLE `properti`
  ADD CONSTRAINT `fk_properti_kategori_properti1` FOREIGN KEY (`kategori_properti_id`) REFERENCES `kategori_properti` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_properti_paket_iklan1` FOREIGN KEY (`paket_iklan_id`) REFERENCES `paket_iklan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_properti_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `fk_wishlist_properti1` FOREIGN KEY (`properti_id`) REFERENCES `properti` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_wishlist_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
