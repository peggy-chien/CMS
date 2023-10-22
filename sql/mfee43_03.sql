-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 22, 2023 at 11:34 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mfee43_03`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(6) DEFAULT NULL,
  `u_acco` varchar(12) DEFAULT NULL,
  `u_brith` varchar(7) DEFAULT NULL,
  `u_email` varchar(40) DEFAULT NULL,
  `u_pw` char(40) NOT NULL,
  `u_tel` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`u_id`, `u_name`, `u_acco`, `u_brith`, `u_email`, `u_pw`, `u_tel`) VALUES
(1, '董正恩', '1fsdoag1f3', '0321', 'bwfefy@gmail.com', '6c447a8fe7677ddc4c4cd2efddcfe650e4e6c706', '0961651151'),
(2, '董孟芃', 'gfvvvd326', '1205', 'ghgefqe@gmail.com', '6918d3fd8cd96f921bc242f76538d2d6f8078380', '0945434523'),
(3, '池涵祺', 'hbdf6544n', '0831', 'fsafrdrsfhtr@gmail.com', '7643e4d0eae0b6a8756f5422899e99068937bd36', '0954654376'),
(4, '張員靖', 'jy923yf', '0129', 'ghgedsaqe@gmail.com', 'b1e3a7b120744b675ef1f6bd9d1e2600ead582a5', '0976874534'),
(5, '吳佳鈴', 'fcwc3v43', '0921', 'bwegdsfy@gmail.com', '398110d39a3920d08f5314627a9ef3416d012d9d', '0956325656'),
(6, '顏羿碩', 'r7f6t7df', '0910', 'ghgefqe@gmail.com', '5ba786f7b3d6e10d4fba044d8c340ce62d1e4232', '0987456453'),
(7, '華俊喆', 'd6ydt65t', '0610', 'bwsasassafy@gmail.com', '23e37122c24e36db421fbacd5bce322358ddf24e', '0932653469'),
(8, '許家詮', '5w4y5w', '1022', 'ghgsdsad3aefqe@gmail.com', 'b5b28dd02d9479f293785a39f3cf7bbf0f9c4d8e', '0954235432'),
(9, '阮瑞丞', 'htsryjt14', '0122', 'bwefEFEWy@gmail.com', '11f73103d6da5faf85bc74a23d78ca0022955353', '0974654654'),
(10, '樊安稘', '6y34gr543fhf', '1225', 'ghgfrfrwefqe@gmail.com', 'a06eba4f4cd830977bc5defe804b413dd08b03c7', '0932465346'),
(11, '石柏慶', 'g3g4rqeg41', '0309', 'fsafrdrsfhtr@gmail.com', '4421f21a6ffc98f5020a1a0306a6cee056dcceb0', '0916161161'),
(12, '梁佑振', 'qafhyde24', '1216', 'fdghbgcxzv@gmail.com', '6c6becb63e08bffc6891cd805a29ac7d57309fb3', '0948942234'),
(13, '歐陽品越', 'rths35thre', '1104', 'ghf1isdhij@gmail.com', '60ead37b803cfebbec1b462e5975c770d38a4c77', '0954658761'),
(14, '顏羿碩', '542hfdj5hg', '0831', 'ifg1dhs@gmail.com', '3c13ae0869364bb3d84746d9b212cdc86fb80aa9', '0943567898'),
(15, '葛柏浩', '45hrte43fs', '0531', 'ghfdisn@gmail.com', '877dddd51d852ff23edaabb3bd97ca854fc1a56a', '0978756564'),
(16, '馮瑩襄', 'gfdsyrge45h', '1009', '46jfdb93@gmail.com', 'b29540a4dcb9b3f384cd7c2b2543e9e1b94cc279', '0976534634'),
(17, '華俊喆', 'fgdsjy34', '0304', 'hdsr3y291@gmail.com', 'f08fe27f2c8cdcc57244976d2d4729a4974fe774', '0954352772'),
(18, '管芊宥', 'gershfr542', '0603', 'gdgb3266gfd@gmail.com', '2873f44497f65baba98314657dd46b8859ffdcdb', '0968676765'),
(19, '辛巧非', 'ghshwt34dsf', '0721', 'n1iwn14365@yahoo.com', '129c2b583f2288d70bd10840a4a340246e53cd8e', '0964563474'),
(20, '連妍庭', 'sadfhgsdg24', '0630', 'h18ifsh@gmail.com', '241b15d79283968b5fc9b6cc13645afe423db65c', '0976354521'),
(21, '吳詠立', '35tge4ews', '0123', '109109222@mail.oit.edu.tw', 'd43a17ae60c5098f231f02c439c59d498346c34f', '0986546345'),
(22, '崔星偉', '34r3443rrhew', '1205', 'dsa89dsa@yahoo.com', '9a308f667d911a7faecd72c453972f23e70c112d', '0986534353'),
(23, '伍詩旂', '43re34reds', '0126', '32132141@mail.ntu.edu.tw', '0b3306dd2ca4c9d968547e3fb668de76c22232d0', '0985674263'),
(24, '錢廷益', '3454eyjt', '0417', 'masidao1@gmail.com', 'b32ae0937be981ba82077ab15529796fba8090e2', '0954642536'),
(25, '任築盈', '6thdf2e', '0826', '382r1enij@gmail.com', '180155564eed6f91ffb9463763d1b9f82ce9a2b3', '0998643232'),
(26, '丁慈妏', '32e23refd', '0526', '65ytgfgfrye4@gmail.com', '850c14f953833682ef36d98eccee59b513a30888', '0986534234'),
(27, '侯榆睎', '2r3efdv3r', '0322', '23qwercrqd@gmail.com', '550c2b1d08fbb83cdbac60e5748ed7e9b5ab6dd3', '0984564315'),
(28, '翁貴涵', '32ewfd2ew', '1022', '342190473@mail.ntu.edu.tw', 'b460957245d4cbf0e5d5afc950720433dc5e5222', '0975654326'),
(29, '韋士奕', '23ew2ew', '0122', '343789037@mail.ntu.edu.tw', '244505e4f1bf54491c6ac92f9a0b8813dc4aad0d', '0967354554'),
(30, '吳三桂', 'w13gway', '0608', 'w13gway@gmail.com', '949b3b8d469f960f2ba00e0d70fb26e6336b51bc', '0976554243');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
