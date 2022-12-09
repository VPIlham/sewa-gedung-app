-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_sewa_gedung.gedungs
CREATE TABLE IF NOT EXISTS `gedungs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `fasilitas` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `jam_siang` varchar(255) DEFAULT NULL,
  `jam_siang_akhir` varchar(255) DEFAULT NULL,
  `jam_malam` varchar(255) DEFAULT NULL,
  `jam_malam_akhir` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table db_sewa_gedung.gedungs: ~0 rows (approximately)
/*!40000 ALTER TABLE `gedungs` DISABLE KEYS */;
/*!40000 ALTER TABLE `gedungs` ENABLE KEYS */;

-- Dumping structure for table db_sewa_gedung.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_sewa_gedung.migrations: ~6 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2012_11_04_225353_create_roles_table', 1),
	(2, '2014_10_12_000000_create_users_table', 1),
	(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(4, '2022_01_22_011142_create_sessions_table', 1),
	(5, '2022_11_05_095115_create_branch_table', 1),
	(6, '2022_11_06_094706_create_mechanics_table', 1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table db_sewa_gedung.pemesanans
CREATE TABLE IF NOT EXISTS `pemesanans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gedungId` int(11) NOT NULL,
  `usersId` int(11) NOT NULL,
  `kode_transaksi` varchar(255) DEFAULT NULL,
  `typeBayar` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table db_sewa_gedung.pemesanans: ~0 rows (approximately)
/*!40000 ALTER TABLE `pemesanans` DISABLE KEYS */;
/*!40000 ALTER TABLE `pemesanans` ENABLE KEYS */;

-- Dumping structure for table db_sewa_gedung.pemesanan_gedungs
CREATE TABLE IF NOT EXISTS `pemesanan_gedungs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gedungId` int(11) NOT NULL,
  `pemesananId` int(11) NOT NULL,
  `usersId` int(11) NOT NULL,
  `kode_transaksi` varchar(255) DEFAULT NULL,
  `nama_pemesan` varchar(255) DEFAULT NULL,
  `nama_gedung` varchar(255) DEFAULT NULL,
  `nomor_hp` varchar(255) DEFAULT NULL,
  `sewaTgl` date DEFAULT NULL,
  `sewaJam` varchar(255) DEFAULT NULL,
  `sewaWaktu` varchar(255) DEFAULT NULL,
  `no_ktp` varchar(255) DEFAULT NULL,
  `total_harga` int(11) DEFAULT NULL,
  `typeBayar` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table db_sewa_gedung.pemesanan_gedungs: ~0 rows (approximately)
/*!40000 ALTER TABLE `pemesanan_gedungs` DISABLE KEYS */;
/*!40000 ALTER TABLE `pemesanan_gedungs` ENABLE KEYS */;

-- Dumping structure for table db_sewa_gedung.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table db_sewa_gedung.sequelizemeta: ~4 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20221031085549-create-users.js'),
	('20221101035559-create-gedung.js'),
	('20221102095627-create-pemesanan.js'),
	('20221102095941-create-pemesanan-gedung.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table db_sewa_gedung.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nomor_hp` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `jk` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table db_sewa_gedung.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `name`, `nomor_hp`, `alamat`, `level`, `jk`, `createdAt`, `updatedAt`) VALUES
	(2, 'admin@mail.com', '$2b$05$SNxb1XDyjb9trnIwliZZXOqs7fTwfqZ2iYo7b//tH9B9j56FDqSKq', 'Admin', '08977166220', 'Jl TB Simatupang', 'admin', 0, '2022-10-31 10:03:57', '2022-10-31 10:03:57'),
	(3, 'erik@mail.com', '$2b$05$DvYqus28Ipc2UtYCyd6ot.nbgjtf0ne97.ed6euj7Ewn4KWDokGiG', 'Erik Thohir', '08312312322', 'Jl Medan Merdeka', 'user', 1, '2022-10-31 14:21:44', '2022-10-31 14:21:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
