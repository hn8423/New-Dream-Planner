-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: planner-db.cn1pjvtbvqct.us-east-1.rds.amazonaws.com    Database: planner_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
-- SET @@SESSION.SQL_LOG_BIN= 0;

-- --
-- -- GTID state at the beginning of the backup 
-- --

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  `access_token` text COLLATE utf8mb4_unicode_ci,
  `expires_at` int DEFAULT NULL,
  `token_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` text COLLATE utf8mb4_unicode_ci,
  `session_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token_expires_in` int DEFAULT NULL,
  `oauth_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oauth_token_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_userId_key` (`userId`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
INSERT INTO `Account` VALUES ('cl6smr6kk08171xp3b79wll2n','cl6smr5vy08101xp32ggd0n82','oauth','kakao','2387799020','qzkRC-pWd_ZCIqcKd3HdDIR0FAUitiu8AJdokK06CisNIAAAAYKZ5roK','0nxc6s0XrHzfuWSqHmddkx9GyZQfBJfq4FA2dEYsCisNIAAAAYKZ5roL',1660461010,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7jfhx14631xp3a4t8g9fn','cl6t7jeoq14551xp3s8i70o18','oauth','kakao','2388478412','c8vI8nk6hU0-ce4GK9Us0QzlpgDeh8BNoX-79sQ_Cj11WwAAAYKb-2RI','wlBYIW9rzUJioMJyRM3QRp8UgNqVcfhVDczsGFgpCj11WwAAAYKb-2RK',1660495919,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7jmxu14931xp31gx9uelb','cl6t7jmee14851xp3wai8b8rd','oauth','kakao','2388478626','XueB0Eb5evBk22NyraQ9eMfirT_Xg8YM3JSyQpebCj11WwAAAYKb-5Bt','-MWAz-tr5JJBKD9D9mdXOtMyMLJrz9VeAvgymmenCj11WwAAAYKb-5Bu',1660495930,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7jpgk15221xp3h6suxteo','cl6t7joni15101xp3ih65scfp','oauth','kakao','2388478658','JDpugKAeOPKdyWCrsGzzJCDUTvyY8nc0DqYOpEuyCj102QAAAYKb-5cL','_9heAdNu95qEx2nNcPTf1FpAehN3UOUA_zRLVNkKCj102QAAAYKb-5cM',1660495932,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7k0so15661xp3ehppjffm','cl6t7k09715581xp3d9p0qx20','oauth','kakao','2388478977','nMEtivhQB_M_n_8WruqgVXpMYNlW_4_JLXXMHkKiCilwUQAAAYKb-9Yl','Kw2D1yT-KYn1JG_fECtzdkfvfycAG9gu8Zu36MAWCilwUQAAAYKb-9Ym',1660495948,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7kbgz16561xp36mhi3k6p','cl6t7kaxk16481xp35sv9ag3w','oauth','kakao','2388479261','3JWHwfal9vCRM77jjMRXEnIVim9tNfw2r0CAuXpCCilwngAAAYKb_A3B','Y7gqJWed4XckYEzy5K5dxa7zMg5hCRDMqIpvn28QCilwngAAAYKb_A3C',1660495962,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7kgd417141xp3o1m503qu','cl6t7kftq17061xp3dad53ymd','oauth','kakao','2388479381','DpMe-q8bm_MO1l9PB1mI4UMNO4Kq1AmMYPj6uHTsCilvuAAAAYKb_CZ3','AekG0x-akmbZe_hqoHuvT8_o6jlECiFnBKAx-0eCCilvuAAAAYKb_CZ4',1660495968,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7kjq617561xp37f3jxulj','cl6t7kj6s17431xp3kgtcmec1','oauth','kakao','2388479460','wLo2ZxlNgeXyCYCl_oqWcnzPFM6BLGONF5WEJ5-hCisNHwAAAYKb_DeQ','PjhBHYnf2RTgtDfog1dXNSaqCb-VKH-dTdIhHlGmCisNHwAAAYKb_DeR',1660495973,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7lmme19321xp39vt59lrj','cl6t7lm2u19241xp37g8in4oh','oauth','kakao','2388480394','3-ZhaRTMKG22zWbxruX7FIkHJtrKugxhDtuN6QPgCinI2AAAAYKb_PvG','fGx97hC-r-TMiuPvP-4B7JvI50EUNNLcJ_lTql2eCinI2AAAAYKb_PvH',1660496023,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7tmfe23631xp3w8a5fbre','cl6t7tlvy23561xp3rwlhlj1l','oauth','kakao','2388487661','kcm4uidNuVz8U-6LDQX5Z3frDUM_PBsDdqa74uRYCj1zmgAAAYKcAqyF','RS25mq9H8AAN9wGfVVCItElDO6coDg5E9pWOYFEyCj1zmgAAAYKcAqyH',1660496396,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7tuku24311xp3ds8bkmrp','cl6t7tu1c24231xp3wibgl0sp','oauth','kakao','2388487870','KoB-urFeQGvIQ6AQVOueY0uUVG2iZcV8Rrh6IVaXCj1zFwAAAYKcAtZq','wZRVjL_C3mOHb-lk6bLHQhL-BXJx-zxuEAweBRlGCj1zFwAAAYKcAtZs',1660496406,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7u0sm24821xp3894lmg03','cl6t7u09524741xp3zzf0du87','oauth','kakao','2388488032','Qw8Pb75qO8KvQJuxSGH-KK4xr2Sva34U5-Ct_N8OCilvuAAAAYKcAvV6','pKrcJ3pDXdlUyY7ZapdRnUARQFdf1yaAt8Lmgkk1CilvuAAAAYKcAvV7',1660496414,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7u5q825191xp3z76o7m1r','cl6t7u56t25041xp3ffb5le87','oauth','kakao','2388488160','JkvPuW67XHJC8rEJGT59HlSxudG_YaTZGCeeda6kCinI2QAAAYKcAw8i','PjUwoVUeDSmhmb0D2L2Cp5QRiYcGD5ElDKBhZzxoCinI2QAAAYKcAw8j',1660496421,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7ub5s25931xp3dbf6ufzw','cl6t7uamc25851xp3hr25zrof','oauth','kakao','2388488317','Gj2vqgEiHsqsRcAHPaxodcHeL_xfHuU3A7kegEglCilvVAAAAYKcAynR','dXOhrcYm0Bj7L4IFjnoTs5Bm7HTitVU3MOY03079CilvVAAAAYKcAynS',1660496428,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7uhi227301xp34avd7fbs','cl6t7ugtt27181xp3uvg1pvbx','oauth','kakao','2388488483','p5wcdWiIqXci5xxLOlL6NIQXj5RLBHKGRvb2NpAZCj1ylwAAAYKcA0jt','YxAhEUuN26NtQaoBANVJNh13muia0jdr78ynXcIVCj1ylwAAAYKcA0jv',1660496436,'bearer',NULL,NULL,NULL,5183999,NULL,NULL),('cl6t7umim27741xp3c961cx34','cl6t7ulz827611xp3ayxnugqt','oauth','kakao','2388488628','_LBYhsxsoIkp8e7CjXD9I-kHH8YYGIWXiiyytR2LCj1zFwAAAYKcA2Lm','yZeAiT6AC_yDbNsle6t_AzXhvK7AsQ2EO8QzWdIhCj1zFwAAAYKcA2Lo',1660496442,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7uq7728451xp3t1qds6in','cl6t7upnt28251xp3qyaa42ow','oauth','kakao','2388488729','Y3Fetk9XDYLXOhqbDaUJRBHzrUqp9iIbQoGtd3aKCj11WgAAAYKcA3Wp','lROMwEK3-MfXQqcfBblR-ibMoFNnGyOOFUiXeqGXCj11WgAAAYKcA3Wq',1660496447,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7urxu28781xp3z9ulfguf','cl6t7uref28701xp3169m6rd3','oauth','kakao','2388488770','4qo5Uu_-I4UTkvensJOPthTCGNSIGObj8vy8YG3fCj10lwAAAYKcA355','01N0vT6v_n8JIFXLFOXa9r33epUF8EBZQP-szFXACj10lwAAAYKcA357',1660496450,'bearer',NULL,NULL,NULL,5183999,NULL,NULL),('cl6t7vee929641xp30iox8a9y','cl6t7vduu29571xp3twofs6bn','oauth','kakao','2388489332','0TBNpflmadbxoF0STlY3yKQR35ObZKNf_jrnVwELCilwngAAAYKcA_Bn','TSfJFBU6jEZCkMXJ4raMZkiUDRPrXaEQsebWhGz1CilwngAAAYKcA_Bo',1660496479,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7vluk30151xp35zume5t1','cl6t7vlb430071xp327ufyuyc','oauth','kakao','2388489529','t5PxnPK3nPGW4ytQXnTAjDcZ3ssUMCWE8yipWoJkCj11GwAAAYKcBBa0','0wCafRAdciyrJqselYptYgaWt-hsehboFCuEhTM1Cj11GwAAAYKcBBa1',1660496488,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t7y36b32351xp3fq8tmtg4','cl6t7y2mw32281xp3k3fhprzf','oauth','kakao','2388491825','sVINZ5hVky8h0ZjOm8r3GPYt-BLFmMCTIjOI7W9uCisM0gAAAYKcBdqV','RzRq3NhNE3F4r1g6Uf6aSZj9eA0MqWHBtR5CtvgQCisM0gAAAYKcBdqW',1660496604,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t8b2md35021xp3uu57lae0','cl6t8b1xt34941xp3vrsp4q12','oauth','kakao','2388503701','URyYcwGQE2HKSZUlPABJN5bRha8Z-hDf0oPmJ2wVCinJXgAAAYKcDxap','oHLsGrfMRBeXwHA_zivkDlHzm_Cl4ZLwXZJK_a47CinJXgAAAYKcDxaq',1660497209,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t8gida36621xp3ybso5duc','cl6t8ghte36541xp3lud79s8b','oauth','kakao','2388508416','0JYzK_3AdvVy1gJ1TrZ7XZwKvLd3F9H_mVdZ3reXCj1zmwAAAYKcEvhN','LnC7UnD4hUgFdNVC8Fr_IyGcQ44q4Maf3Aes27TiCj1zmwAAAYKcEvhP',1660497464,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6t8p9eo39541xp3xul24ymh','cl6t8p8v039461xp3za737h4r','oauth','kakao','2388516187','Se9ccqGPofIA-eVOmpvkUYbnEm-0A8DqHfNu1QveCj102wAAAYKcGTMs','5ArVDrVaFo3JycnIr5eNPxqCGiKdvC7Xy8QevxXeCj102wAAAYKcGTMt',1660497872,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6u3vs041140r4p3egtgnuth','cl6u3vrb51119r4p389w6num1','oauth','kakao','2389083673','lweGQDuSlGirfUbgZODrd1FG9eqabKHBqRd2nkjYCj11WgAAAYKfOFRg','ccn7k6o3zbGQ_-1hLfVdfYXnQ2EjU-o7HmP_syFuCj11WgAAAYKfOFRi',1660550244,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6u4kym20280mvjzizvfhw6w','cl6u4kxum0272mvjz1l180kzh','oauth','kakao','2341551569','PKeaPLtGouQhmFKsaDUaMpJV9o1lPkwp216EmToxCinJXgAAAYKfSkED','mE7dwnrR4txW5wt_LlC1JRTqsVbpiwFN7xEWwC1ZCinJXgAAAYKfSkEE',1660551418,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl6u5l0k50664m8p3kmvegukz','cl6u5kzvj0657m8p3cnt5bskx','oauth','google','112575996094070073447',NULL,'ya29.A0AVA9y1ukbc-nq_QS5Vou7_IBMEcNH2k5GCcbqOHJpJlkLSLu-VGGq7C15IDvQGJhOtERSYxBkzBqGrhyhW7AGRqmLm2G_7Fp2jD8oYU2fqaA4pnH6wvJ0WCDSUgok1YeA0W3Lq4VbrUz2L3c4gO871LF_yxopwaCgYKATASATASFQE65dr8vpLCLTLqLKJcnTfICjJ7Ug0165',1660535100,'Bearer','https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid','eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI1NzU5OTYwOTQwNzAwNzM0NDciLCJoZCI6InJuZGFzaWEuY28ua3IiLCJlbWFpbCI6InJvbGVuY2hlQHJuZGFzaWEuY28ua3IiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZtbWFRckxyY19DazhqMXhRM1JsVGciLCJuYW1lIjoi6rmA7ZiE7J24IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FJdGJ2bW5KWDNrTkpFdjFmSlRiOWw0MnVjd0ZiNzFJU2wxYzE4eVJheDQ9czk2LWMiLCJnaXZlbl9uYW1lIjoi7ZiE7J24IiwiZmFtaWx5X25hbWUiOiLquYAiLCJsb2NhbGUiOiJrbyIsImlhdCI6MTY2MDUzMTUwMSwiZXhwIjoxNjYwNTM1MTAxfQ.p6KnYpLJUpqYq7C47tXacYzf2JBfybvqoKgs1ooGZs3Sm5qMkBvsbI997afMq3EyyR4YpkebROGn3pDRio6bjSxNXrdlWwg_FheC4OS5y1vMWwK91Pmq1WjZp3VOG5ehU5WVRDOi9Qmi_gWTZkgDplb2XpoWwNUFnjuywqS04ZiQK7xar_2YzAv_DFxn4JjAQE8Kjo9MvRYcjHFlT915Fk_c1BniNrbNYa6J6Zwv3nITM6m_g-pluoZxGeePiNfNfpn6xTT0DM56SpjMcZCGp9-PUGt43JbOSapB8UYi2VIRQ067acu7Gj-CCnctByu1gXLEvI37nXEPuXxep7OEzg',NULL,NULL,NULL,NULL),('cl6u5pq4h0838m8p3j26o8e53','cl6u5ppko0830m8p30rvproal','oauth','google','109649263380954498034',NULL,'ya29.A0AVA9y1vfBpRIcbyGIBc0SjkJIGi5SlS9XeQDEJhRewKswcDmsMUD1Q0jiXqsiveshpjhVpJLaM6VDmPJ8Kcur1vKR2po2ThUbXWYFRird-5KVUi74oeMilqnNFuAxhI29lHKy4C_-wgp3jxDVt-U-fW86glSaCgYKATASATASFQE65dr86A-gogetdlNKJnzxZKlBMw0163',1660535321,'Bearer','https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid','eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk2NDkyNjMzODA5NTQ0OTgwMzQiLCJlbWFpbCI6ImV1aXlvdW5nNDAyMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImNUMEhBQ0FuTFR1MkZoOVc1VlF0YkEiLCJuYW1lIjoiSmFjb2JleSBXb28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FGZFp1Y3JsbWpOTmtPVXdrZWowZHgwOTZtTWdFd3UwdWFfM3g5Y2xHRU1sNXc9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmFjb2JleSIsImZhbWlseV9uYW1lIjoiV29vIiwibG9jYWxlIjoia28iLCJpYXQiOjE2NjA1MzE3MjIsImV4cCI6MTY2MDUzNTMyMn0.u2lFG5xyQtrUDa8x8bbIUIG-g2oTYCsevyvmVM4pNq53doF534p08UL020K0BfeUxMfXTxh20UPpZEFLmOlbVVIUF-Teec-fyiOrg2H9iWeuMQpmp_atMWF31lyfncfC6WpRe-RNdZ1o31vxg_HO0fMKFPdvvirN2-OaYsGpSujVo5kM6nHuBrmhdA9nQIooKjAoqtGAhIaMnepqZ0kpJ16R7YsxlqX1Ws5OvZj97PyEP6F5VnYm2zpyAhBVFjG3UA09QY4k90OU5Oal4XoBNr0IPrGzKWlD5N0AcstWml7bZJtDBTBvszvCo29rYyBcvPKAUtEWgpWcLTr7OWiIMQ',NULL,NULL,NULL,NULL),('cl6yuwcnu0213erp3c8z4vwm6','cl6yuwbzt0205erp3u5aom3xd','oauth','google','105114896891451674795',NULL,'ya29.A0AVA9y1ve0_j96wJaV_vn_POy5JvygrH1T_xsJCf3dNIRkrpJOpDVcMD8A2rqucWKGyzwaTt05x-wnN6cML2zux8rS7Mi5HuynvyILt73cdJW5esZX7wISWvzwRkQBU1vOPLHbdDL52WMukWMS4ni09W5G7CmaCgYKATASATASFQE65dr8Qv_bprCPdziCWwaZwU6zbA0163',1660819484,'Bearer','openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile','eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUxMTQ4OTY4OTE0NTE2NzQ3OTUiLCJlbWFpbCI6InJvbGVuY2hlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiY0tEel84QkxvZGxtVWdOWnBuc1EyUSIsIm5hbWUiOiLquYDtmITsnbgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbW03MVRsclktZE1FTUM0ZS11cTlVeUV3X1hZVWVSYTZ4YmVfNVo9czk2LWMiLCJnaXZlbl9uYW1lIjoi6rmA7ZiE7J24IiwibG9jYWxlIjoia28iLCJpYXQiOjE2NjA4MTU4ODUsImV4cCI6MTY2MDgxOTQ4NX0.daJwuvLsyWllUSqw6yNBFff8dxVWPIUnltpzR4XfA_Zn7T55IcOr0J2SugKCWvKpG_xYyH6DFs2wO2SsbZHXrmGeQgPEQaHONJei-8NP_BbbDvmqhFzxPvYGMXulkvLBCJUUgWWuKzFlF89EyIuZ6oxqTtDq5oRfKyKeMdipABQMrPHEZM9MYPClEQ99dho3mY7tvQpcRqmGysI13QfzKeQWy1QgLwV-AsWiOLshGfj291ekkChHFhAH-yh_NN0YEZlap8mQ8TKF8M3PGDJQTofQfjjgKmN8K9dCELtFk2E6AH44lFVLfqZgG47zJ0cvYukKJ4a3JYGJ-jLdk0W1Hg',NULL,NULL,NULL,NULL),('cl6zsjjoo0330chp30rv34uge','cl6zsjiv60323chp3rtko59dp','oauth','kakao','2394483147','lqBaAmJKNP-Uqcvi26dihLLaSsxacGxqawleSSIdCj11nAAAAYKztYaj','F_jXlvKPyy_kQnxaM9fVguQoFZr_0EguuMPwcNKbCj11nAAAAYKztYak',1660893993,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl72uaa652967chp3flz7swli','cl72ua9hw2960chp3ogztgsaq','oauth','kakao','2397164110','zSG4Bm3QTVsBbJ1HVV3u1GdxA3k6co2DZgrUBDn1CilwFAAAAYK-siGe','gXU8QJ2nHY0N_xGs100E2d7hF88C5gTJT5_3SXSOCilwFAAAAYK-siGf',1661078320,'bearer','profile_nickname',NULL,NULL,5183999,NULL,NULL),('cl733hu0b4990chp34cdhd1n4','cl733ht6w4982chp3ccbe7nou','oauth','google','103763437631596042140',NULL,'ya29.A0AVA9y1tAczaobcez6ohxd3l20VAGxQ4Ts6YxVF6q1BGpEQqyTJR7cIcUv7UXhfKYhYm54TQ3XA_-jrSN_uehBqRI9Nx6U00bd2k8ePivCPG-Yc4cFgBhRnJeW7JFU7NqBSBnbcqMldwxMw-Hd-IheymZGwWSaCgYKATASATASFQE65dr87fc8g_udxIuKYfGu11BDng0163',1661075787,'Bearer','openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile','eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzQzNzU0NzYyMzQtZGFzZm1haGJuaTYxbWx2dGlkMW5ocGtja2d1ZDZ0dnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3NjM0Mzc2MzE1OTYwNDIxNDAiLCJlbWFpbCI6ImEwMTA2NDczNjg4NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjBERVBOSUNSQ3lwVm00LWF4NUxMWnciLCJuYW1lIjoi7YWQ7YWQIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNxaDhITHJrbklSRFZBTE82YXNZT0owb1RNQnRiS1hXaXdlY1hNS2p3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iu2FkCIsImZhbWlseV9uYW1lIjoi7YWQIiwibG9jYWxlIjoia28iLCJpYXQiOjE2NjEwNzIxODgsImV4cCI6MTY2MTA3NTc4OH0.WAytHEz152eapvaKlT1Q3tuaUFSEt7oTzl29by_frUiakjSiUr5f_g4JhJJAquOAJ-hiGhAIddKmq_ipLGaueMEhl-II8fr_PQuZZId_CEu-NtGxA5h9slsuIkDnvwgX7QY4TvErZ6iSb6isq_5rw8yu3il-9fQKSg8UozpwPv1PJIFY2nxx_DiYyTmmaCwubEg4K6JDqA0Q5j_IfPYigga7bGJ-jFVOXLLiR-Unbhu-G08Yvbpi2HxYF0KRPKF77AbdJoVAIhv8ANxnrH2Iu0j2ky3HeiI5-x9po-8Ku7dJBRbhqEHRwyAWmyxVUrB3rMZGjluCD-tfQWlFvjzbmg',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DailyLookInside`
--

DROP TABLE IF EXISTS `DailyLookInside`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DailyLookInside` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `month` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `week` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lookInsideFri` text COLLATE utf8mb4_unicode_ci,
  `lookInsideMon` text COLLATE utf8mb4_unicode_ci,
  `lookInsideSat` text COLLATE utf8mb4_unicode_ci,
  `lookInsideSun` text COLLATE utf8mb4_unicode_ci,
  `lookInsideThu` text COLLATE utf8mb4_unicode_ci,
  `lookInsideTue` text COLLATE utf8mb4_unicode_ci,
  `lookInsideWed` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DailyLookInside_year_month_week_userId_key` (`year`,`month`,`week`,`userId`),
  CONSTRAINT `DailyLookInside_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DailyLookInside`
--

LOCK TABLES `DailyLookInside` WRITE;
/*!40000 ALTER TABLE `DailyLookInside` DISABLE KEYS */;
INSERT INTO `DailyLookInside` VALUES ('cl72k6sya0136ykjzqxmtyb1g','cl6yuwbzt0205erp3u5aom3xd','2022','8','3','','','','','','','a'),('cl74deblf0251mmjzxmo6fug7','cl6u5kzvj0657m8p3cnt5bskx','2022','8','3','','112','','','','','');
/*!40000 ALTER TABLE `DailyLookInside` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mission`
--

DROP TABLE IF EXISTS `Mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mission` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity` text COLLATE utf8mb4_unicode_ci,
  `hurt` text COLLATE utf8mb4_unicode_ci,
  `experience` text COLLATE utf8mb4_unicode_ci,
  `myMission` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Mission_userId_key` (`userId`),
  CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mission`
--

LOCK TABLES `Mission` WRITE;
/*!40000 ALTER TABLE `Mission` DISABLE KEYS */;
INSERT INTO `Mission` VALUES ('cl6smui9m09971xp3ppwzlwww','cl6smr5vy08101xp32ggd0n82','','','','사명사람을 세우고 변화시켜서 민족과 열방을 일으킨다'),('cl6t7ofvh22541xp33kwxf4vw','cl6t7kaxk16481xp35sv9ag3w','','잘못된 사상과 문화에 점철된 사람들 (잘못된 이데올로기) ','디자인, 대표, 극기',''),('cl6t7wsqt31321xp3ns1erepw','cl6t7kj6s17431xp3kgtcmec1','주의 사랑하는 딸, 주를 경배하는자','','공연, 관계, 상담, 도전','주를 오해하는 자들에게 주님의 사랑을 비춰보이는 자'),('cl6t8aq2n34671xp3xqi7173g','cl6t7tu1c24231xp3wibgl0sp','가정의 경제적 안정을 추구하는 나, 돈을 우상으로 섬기지 않기','','',''),('cl6t8ynex40561xp3jqsc3boz','cl6t7k09715581xp3d9p0qx20','세상적인 성공 /돈과 부귀영화를 꿈꾸던 나\n주님을 만나서 세상에 빛과 소금의 역할하고 싶은 나','돈과 권력이 없어서 바닥인생을 살 수 밖에 없는 사람이 많아서 ','부정적인 것을 보거나 부당함에 넘어지지 않고 싸웠던 경험/ 멘토가 없어서 진로가 틀어지는 경험',''),('cl6t9gh5y42741xp3n186zm4m','cl6t7joni15101xp3ih65scfp','','','','교회의 기둥을 새우고  나의 사업이 진정한 주님의 사업이 되게하여 주님의 사랑을 실천하며 살아가는 주의 자녀 되게 하소서~'),('cl6t9i19g43491xp3wkx93w6s','cl6t7u09524741xp3zzf0du87','','가난함','',''),('cl6t9ifxk43781xp33sqjafnp','cl6t7kftq17061xp3dad53ymd','경제적 어려움 극복,,\n ,지인과의  회복 관계 , 하나님과의  신뢰관계 (순수한 믿음)','','',''),('cl6ta4xj646981xp36w9ov90j','cl6t7upnt28251xp3qyaa42ow','  나는 그리스도의 보혈로 거듭난 참 신앙인','장애우를  키우는 가족들의  절실한  마음과  장애우들의  처우개선의 미흡함(치료센타)','주변사람들이 모여있으면 항상 그안에 내가 있다   누군가에게   베푸는 상황을 즐기고있다','소통과 경청을통한 사귐속에서  아픔을 나누며\n복음을 전하는  그리스도인  '),('cl6taavil47811xp3430c8rsx','cl6t7uamc25851xp3hr25zrof','기독교인으로써 살아가야하큰 옳은 길을 너무 잘 알지만, 깨끗하고 숭고하게 살아가는 삶을 살고싶지않은 반항아','하고싶은걸 하며 자유롭게 살고싶은 나를 옥죄는 세상','초등학교때 친구따라 가게된 교회\n고등학교때 알게된 누나의 성경공부\n대학교때 기독교대학으로 진학후 채플\n군대때 주말마다 기독교 종교활동\n전역후 가은이와 만나게되며 꾸준한 교회참석','하느님이라는 바다에 빠져 감화되는 삶'),('cl6taivu648481xp30spm79n8','cl6t7ugtt27181xp3uvg1pvbx','','','','ㅎ'),('cl6taj9gk48921xp3zdi97g1a','cl6t7lm2u19241xp37g8in4oh','','','','하나님 안에서 회복하기'),('cl6taky1t49251xp3p5a9p9o3','cl6t7jmee14851xp3wai8b8rd','전:의심 후:베푸려는 모습','코로나 또는 사건으로 인해 교회가 비판되는것','음악에 대한 열정 찬양사역의 연속된 경험','비판이 넘쳐나는 세상속으로 나아가 \n작은 빛과 소금이 되어 세상을 변화시키자'),('cl6u42jmg1846r4p3u2t6f8de','cl6t8p8v039461xp3za737h4r','','','','1)어머니께서 물려주신 가정의 신앙회복을\n위한 메신저 역할을 감당할 것.\n2)새꿈교회 청년 사역에 도움이 될 밑가지의\n소명!'),('cl6u4al8r2286r4p36maq5edy','cl6t7ulz827611xp3ayxnugqt','ㆍ','ㆍ','ㆍ','ㆍ'),('cl6u4bsxe2363r4p3gouxjtie','cl6t8ghte36541xp3lud79s8b','','','','사명'),('cl6u4lc4e0316mvjzgp99r0y0','cl6u4kxum0272mvjz1l180kzh','.','.','.','.'),('cl6u5lhvt0708m8p3db9kpjvn','cl6u5kzvj0657m8p3cnt5bskx','ㅇ','ㄴ','ㄴ','ㄴ'),('cl6u5q9980869m8p3xjfecx63','cl6u5ppko0830m8p30rvproal','ㅁ','ㅌ','ㅌ','ㅌ'),('cl6yuxuol0256erp37t9uuax8','cl6yuwbzt0205erp3u5aom3xd','억눌리고 갇힌자','영적싸움','영적싸움','사단의 영향력을 없애고, 하나님의 영향력을 넓히는자'),('cl71hw9t01686chp30m5r9kad','cl6t7u56t25041xp3ffb5le87','주의 가치관을  전하는 자','잘못 믿고있는데 잘 믿고있다고 생각하게 하는 사단의 세계','주어진 환경(식사준비&모임 준비)','세상적 가치관과  싸우는 자가 되리라'),('cl72u98he2908chp33xm24rum','cl6t7vduu29571xp3twofs6bn','나는 사랑받는 사람이다.','하나님의 사랑을 모르고 사랑을 받을 수 없는 존재라고 생각하는 자존감 낮은 사람들을 보면 마음이 아프다.','하나님의 사랑을 느끼며 인생을 살아온 것.','나는 하나님께 사랑받고, 하나님을 사랑하는, 하나님의 사랑을 전하는 사람 이가영이다.'),('cl72ub07f3018chp34dzk2qpo','cl6t7vlb430071xp327ufyuyc','죄 많지만 하나님의 자녀','이기적인 사람들','교육','겸손을 잃지 않으며 제게 주시는 것들과 사랑을 나누겠습니다'),('cl72ubq8j3077chp3ei29jjsk','cl72ua9hw2960chp3ogztgsaq','하나님의 기업을 세우는 자','무기력하게 살아가는 아가들','선교단체 간사, 교회 간사, 고깃집','하나님의 기업을 세우는 사람입니다.');
/*!40000 ALTER TABLE `Mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Schedule`
--

DROP TABLE IF EXISTS `Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedule` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `repeatDay` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repeatLastDay` datetime(3) DEFAULT NULL,
  `isrepeat` tinyint(1) NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isComplete` tinyint(1) DEFAULT NULL,
  `isRepeatComplete` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Schedule_userId_fkey` (`userId`),
  CONSTRAINT `Schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedule`
--

LOCK TABLES `Schedule` WRITE;
/*!40000 ALTER TABLE `Schedule` DISABLE KEYS */;
INSERT INTO `Schedule` VALUES ('cl6txv8g3058432p33fryo8vy','cl6smr5vy08101xp32ggd0n82','2022-08-15 08:08:00.000','2022-08-15 09:00:00.000','ㆍ','#B00020',NULL,NULL,0,'A',0,NULL),('cl6ysaukt0054nhjzxb2hsc7l','cl6u5kzvj0657m8p3cnt5bskx','2022-08-15 07:00:00.000','2022-08-15 08:00:00.000','새벽기도','#EE7A48','12345','2022-08-19 00:00:00.000',1,'B',NULL,'00000'),('cl6yskfwo0141nhjztz5cdjml','cl6u5kzvj0657m8p3cnt5bskx','2022-08-16 15:00:00.000','2022-08-17 15:00:00.000','영어 성경 읽기','#EE7A48','2345','2022-08-20 00:00:00.000',1,'B',NULL,'0000'),('cl6ysm9ri0187nhjz301xqjg2','cl6u5kzvj0657m8p3cnt5bskx','2022-08-16 21:00:00.000','2022-08-16 22:00:00.000','저녁기도','#EE7A48','2345','2022-08-20 00:00:00.000',1,'B',NULL,'0000'),('cl6ysvaq10258nhjzgsvu1ork','cl6u5kzvj0657m8p3cnt5bskx','2022-08-14 15:00:00.000','2022-08-15 15:00:00.000','look inside','#EE7A48','0123456','2022-08-20 00:00:00.000',1,'B',NULL,'0000000'),('cl6ysxi3m0322nhjzlqrrhil4','cl6u5kzvj0657m8p3cnt5bskx','2022-08-19 17:49:00.000','2022-08-19 18:30:00.000','1','#B00020',NULL,NULL,0,'A',0,NULL),('cl6yt5r4o0448nhjzid9515jg','cl6u5kzvj0657m8p3cnt5bskx','2022-08-20 15:00:00.000','2022-08-21 15:00:00.000','2','#4880EE',NULL,NULL,0,'C',0,NULL),('cl6ytfeod0576nhjz6fodfa7i','cl6u5kzvj0657m8p3cnt5bskx','2022-08-14 15:00:00.000','2022-08-15 15:00:00.000','s','#F6C55B','01245','2022-08-20 00:00:00.000',1,'S',NULL,'00000'),('cl6yu15im0131erp3ogvjctbs','cl6u4kxum0272mvjz1l180kzh','2022-08-18 15:00:00.000','2022-08-19 15:00:00.000','ㄸ','#B00020',NULL,NULL,0,'A',0,NULL),('cl6yv0dmm0320erp3cdg107tc','cl6yuwbzt0205erp3u5aom3xd','2022-08-14 15:00:00.000','2022-08-15 15:00:00.000','상민이 연락. 플래너로 꼬시기','#F6C55B','5','2022-08-20 00:00:00.000',1,'S',NULL,'1'),('cl6yv3kvw0380erp3111kuhbc','cl6yuwbzt0205erp3u5aom3xd','2022-08-18 07:00:00.000','2022-08-18 08:00:00.000','새벽기도','#EE7A48','12345','2022-08-31 00:00:00.000',1,'B',NULL,'00111'),('cl6yxb8bf0592erp35lfiihle','cl6u4kxum0272mvjz1l180kzh','2022-08-25 15:00:00.000','2022-08-26 15:00:00.000','가스비 내기','#5BC184',NULL,NULL,0,'D',0,NULL),('cl6yxd0tl0623erp38mp17uis','cl6u4kxum0272mvjz1l180kzh','2022-08-25 15:00:00.000','2022-08-26 15:00:00.000','스카이라이프 내기 문자 확인','#5BC184',NULL,NULL,0,'D',0,NULL),('cl6yxfkp30697erp3jzlnphwv','cl6yuwbzt0205erp3u5aom3xd','2022-08-25 15:00:00.000','2022-08-26 15:00:00.000','가스비 내기 문자 확인','#5BC184',NULL,NULL,0,'D',0,NULL),('cl6yxg9o00724erp3s7c1nluc','cl6yuwbzt0205erp3u5aom3xd','2022-08-25 15:00:00.000','2022-08-26 15:00:00.000','스카이라이프 내기 문자확인','#5BC184',NULL,NULL,0,'D',0,NULL),('cl6yxh7340751erp37tmevrrh','cl6yuwbzt0205erp3u5aom3xd','2022-08-18 15:00:00.000','2022-08-19 15:00:00.000','영어성경 읽기','#EE7A48','12345','2022-08-31 00:00:00.000',1,'B',NULL,'00010'),('cl6yxi1nb0777erp3y97wxh91','cl6yuwbzt0205erp3u5aom3xd','2022-08-18 21:00:00.000','2022-08-18 22:00:00.000','저녁 기도','#EE7A48','12345','2022-08-31 00:00:00.000',1,'B',NULL,'00011'),('cl6yxiutk0804erp33zy3labi','cl6yuwbzt0205erp3u5aom3xd','2022-08-18 15:00:00.000','2022-08-19 15:00:00.000','운동','#EE7A48','0123456','2022-08-25 00:00:00.000',1,'B',NULL,'0000100'),('cl6yxkhol0835erp3snnv67zw','cl6yuwbzt0205erp3u5aom3xd','2022-08-18 15:00:00.000','2022-08-19 15:00:00.000','Look inside','#EE7A48','0123456','2022-08-31 00:00:00.000',1,'B',NULL,'0000110'),('cl6yxsbhk1000erp3ffvadp30','cl6yuwbzt0205erp3u5aom3xd','2022-08-19 15:00:00.000','2022-08-20 15:00:00.000','청년 적금 10만원대 알아보기','#4880EE',NULL,NULL,0,'C',0,NULL),('cl6yy0ucz1164erp3w4p9m5d1','cl6yuwbzt0205erp3u5aom3xd','2022-08-19 19:30:00.000','2022-08-19 20:30:00.000','이력서 준비','#B00020',NULL,NULL,0,'A',0,NULL),('cl6yyoauc1208erp3ip0ie7co','cl6yuwbzt0205erp3u5aom3xd','2022-08-19 15:00:00.000','2022-08-20 15:00:00.000','29일 연차내기','#B00020',NULL,NULL,0,'A',1,NULL),('cl6yyprm01236erp399o7ohba','cl6yuwbzt0205erp3u5aom3xd','2022-08-19 15:00:00.000','2022-08-20 15:00:00.000','청와대 예약','#5BC184',NULL,NULL,0,'D',1,NULL),('cl6yz4u9v1530erp3xeey09v7','cl6yuwbzt0205erp3u5aom3xd','2022-08-20 15:00:00.000','2022-08-21 15:00:00.000','주간 늘리기 다른주도 볼수 있도록 리팩토링','#B00020',NULL,NULL,0,'A',0,NULL),('cl6yz5cxl1577erp32v4bm9nd','cl6yuwbzt0205erp3u5aom3xd','2022-08-20 15:00:00.000','2022-08-21 15:00:00.000','생활영역 생성','#B00020',NULL,NULL,0,'A',0,NULL),('cl6zni45u1921erp3nrqhiys2','cl6yuwbzt0205erp3u5aom3xd','2022-08-25 15:00:00.000','2022-08-26 15:00:00.000','바디워시 스크럽 사기','#4880EE',NULL,NULL,0,'C',0,NULL),('cl6znlin81953erp3la5b58k7','cl6yuwbzt0205erp3u5aom3xd','2022-08-21 15:00:00.000','2022-08-22 15:00:00.000','엄마 전화 쌀 이불 챙기기','#B00020',NULL,NULL,0,'A',0,NULL),('cl6zqkrgh0808nhjzmmd7d5zh','cl6yuwbzt0205erp3u5aom3xd','2022-08-14 15:00:00.000','2022-08-15 15:00:00.000','상민이 전도','#F6C55B','5','2022-08-20 00:00:00.000',1,'S',NULL,'1'),('cl71hkhn00835chp3vse67mdn','cl6smr5vy08101xp32ggd0n82','2022-08-14 15:00:00.000','2022-08-15 15:00:00.000','ㆍ','#F6C55B','3','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71hpex61261chp3h5cfwqf5','cl6smr5vy08101xp32ggd0n82','2022-08-14 13:30:00.000','2022-08-14 14:57:00.000','오영옥씨 전화','#F6C55B','1','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71hu5nt1513chp3l2l0zs09','cl6smr5vy08101xp32ggd0n82','2022-08-14 14:00:00.000','2022-08-14 15:02:00.000','이찬이 연락','#F6C55B','4','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71hvh8t1600chp3awzgq4lp','cl6smr5vy08101xp32ggd0n82','2022-08-14 13:00:00.000','2022-08-14 15:03:00.000','김정하 집사 연락','#F6C55B','1','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71hvi3e1614chp3xk0yqn34','cl6smr5vy08101xp32ggd0n82','2022-08-14 13:00:00.000','2022-08-14 15:03:00.000','김정하 집사 연락','#F6C55B','1','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71i52vp1870chp3tk1f6mk1','cl6yuwbzt0205erp3u5aom3xd','2022-08-14 15:08:00.000','2022-08-14 18:00:00.000','기도하는 시간 가지기','#F6C55B','0','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71i5pol1897chp3mpj214wj','cl6yuwbzt0205erp3u5aom3xd','2022-08-14 15:00:00.000','2022-08-15 15:00:00.000','기도플랜 후 전도 접근','#F6C55B','0','2022-08-20 00:00:00.000',1,'S',NULL,'0'),('cl71u4j9m07579bjzyq0vizks','cl6yuwbzt0205erp3u5aom3xd','2022-08-20 15:00:00.000','2022-08-21 15:00:00.000','fdsaljkj;fsdajo;fjasdoi;fjois;dfjoa;sdjfo;asdjfoi;asdj;g;jsa;ogiha;so.dmfa.sdfijlasd;fjo;ajsdof;jasd;ofj','#B00020',NULL,NULL,0,'A',0,NULL),('cl71u4mqy07729bjz6hs1qsoc','cl6yuwbzt0205erp3u5aom3xd','2022-08-20 15:00:00.000','2022-08-21 15:00:00.000','fdsaljkj;fsdajo;fjasdoi;fjois;dfjoa;sdjfo;asdjfoi;asdj;g;jsa;ogiha;so.dmfa.sdfijlasd;fjo;ajsdof;jasd;ofj','#B00020',NULL,NULL,0,'A',0,NULL),('cl72tvpwm2419chp31lu9gcal','cl6yuwbzt0205erp3u5aom3xd','2022-08-21 15:00:00.000','2022-08-22 15:00:00.000','용욱이 사명','#B00020',NULL,NULL,0,'A',0,NULL),('cl72uc5om3161chp3sihv5kg1','cl6smr5vy08101xp32ggd0n82','2022-08-21 12:30:00.000','2022-08-21 13:39:00.000','오영옥씨 연락','#F6C55B','0','2022-08-27 00:00:00.000',1,'S',NULL,'0'),('cl72udaby3331chp36t37ysfd','cl6smr5vy08101xp32ggd0n82','2022-08-21 13:00:00.000','2022-08-21 13:40:00.000','이찬이 연락','#F6C55B','1','2022-08-27 00:00:00.000',1,'S',NULL,'0'),('cl72ug8kt3470chp3rnmi1sk7','cl6t7vlb430071xp327ufyuyc','2022-08-21 23:00:00.000','2022-08-21 23:30:00.000','매일 밤 기도의 시간','#F6C55B','0123456','2022-08-27 00:00:00.000',1,'S',NULL,'0000000'),('cl72ug91b3482chp3ah0m7ord','cl6t7vlb430071xp327ufyuyc','2022-08-21 23:00:00.000','2022-08-21 23:30:00.000','매일 밤 기도의 시간','#F6C55B','0123456','2022-08-27 00:00:00.000',1,'S',NULL,'0000000'),('cl72uiu3o3614chp3x978x2os','cl6t7ulz827611xp3ayxnugqt','2022-08-22 15:00:00.000','2022-08-23 15:00:00.000','전도대상자를 준비하기위해 아침마다 그 제목으로 기도하는 것','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72uiz7r3683chp38n0u0h07','cl72ua9hw2960chp3ogztgsaq','2022-08-21 07:00:00.000','2022-08-21 08:00:00.000','아침 기도회 하루라도 참석하기','#F6C55B','123456','2022-08-27 00:00:00.000',1,'S',NULL,'000000'),('cl72uj0qr3698chp3bbne4g82','cl6t7vduu29571xp3twofs6bn','2022-08-21 21:00:00.000','2022-08-21 22:00:00.000','저녁기도회','#F6C55B','1234','2022-08-27 00:00:00.000',1,'S',NULL,'0000'),('cl72uj8cv3811chp3qcwxghwr','cl6t7vlb430071xp327ufyuyc','2022-08-22 12:00:00.000','2022-08-22 13:00:00.000','양희락에게 손을 잡아주며 기도','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72uj9a73826chp31bdtguyl','cl6t7vlb430071xp327ufyuyc','2022-08-22 12:00:00.000','2022-08-22 13:00:00.000','양희락에게 기도','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72ul0ve3973chp39ee7w785','cl6t7ulz827611xp3ayxnugqt','2022-08-23 15:00:00.000','2022-08-24 15:00:00.000','전도대상자를 준비하기위해 아침마다 그 제목으로 기도하는 것','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72uldf74001chp3f715afsm','cl6t7lm2u19241xp37g8in4oh','2022-08-21 21:00:00.000','2022-08-21 22:00:00.000','저녁기도','#F6C55B','12345','2022-08-27 00:00:00.000',1,'S',NULL,'00000'),('cl72ulh8j4029chp3svz7rob1','cl6t7vlb430071xp327ufyuyc','2022-08-23 13:00:00.000','2022-08-23 14:00:00.000','김태성과 소통','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72uli0t4055chp39mmnd3ko','cl6t7vlb430071xp327ufyuyc','2022-08-23 13:00:00.000','2022-08-23 14:00:00.000','김태성과 소통','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72uljee4072chp34hxnmsqw','cl6t7ulz827611xp3ayxnugqt','2022-08-24 15:00:00.000','2022-08-25 15:00:00.000','전도대상자를 준비하기위해 아침마다 그 제목으로 기도하는 것','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72ullt54114chp3j2yfytga','cl6t8ghte36541xp3lud79s8b','2022-08-21 21:00:00.000','2022-08-21 21:30:00.000','저녁기도','#F6C55B','12345','2022-08-27 00:00:00.000',1,'S',NULL,'00000'),('cl72umkmj4166chp3l21eu8m9','cl6t7vduu29571xp3twofs6bn','2022-08-22 15:00:00.000','2022-08-22 15:30:00.000','나연이한테 연락하기','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72vb7tr4451chp384cgdkuk','cl72ua9hw2960chp3ogztgsaq','2022-08-22 01:00:00.000','2022-08-22 01:30:00.000','저녁 30분 기도하기(전도대상자 + 조원)','#EE7A48','123456','2022-08-28 00:00:00.000',1,'B',NULL,'000000'),('cl72vdfp44650chp3pir6wokj','cl6yuwbzt0205erp3u5aom3xd','2022-08-21 20:30:00.000','2022-08-21 21:00:00.000','용욱 전화 형석이형 카톡','#F6C55B','12345','2022-08-27 00:00:00.000',1,'S',NULL,'00000'),('cl72vifmc4834chp3zln0lb2j','cl6t7vlb430071xp327ufyuyc','2022-08-26 13:00:00.000','2022-08-26 14:12:00.000','오에스더 직접 만나 신앙상담','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72vig7k4846chp36l1jcgt7','cl6t7vlb430071xp327ufyuyc','2022-08-26 13:00:00.000','2022-08-26 14:12:00.000','오에스더 직접 만나 신앙상담','#EE7A48',NULL,NULL,0,'B',0,NULL),('cl72vj80o4877chp3hu7xqgmf','cl6t7ulz827611xp3ayxnugqt','2022-08-21 15:00:00.000','2022-08-22 15:00:00.000','1.어머니를 위해 기도하기 2. 어머니가 바쁘지 않게 될 수있도록 3. 어머니한테 신뢰감을 주기','#EE7A48',NULL,NULL,0,'B',0,NULL);
/*!40000 ALTER TABLE `Schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cl6smr5vy08101xp32ggd0n82','이빌립',NULL,NULL,NULL),('cl6t7jeoq14551xp3s8i70o18','나연',NULL,NULL,NULL),('cl6t7jmee14851xp3wai8b8rd','보혁',NULL,NULL,NULL),('cl6t7joni15101xp3ih65scfp','주님의 동행자~♡',NULL,NULL,NULL),('cl6t7k09715581xp3d9p0qx20','김민규샬롬',NULL,NULL,NULL),('cl6t7kaxk16481xp35sv9ag3w','Yoo',NULL,NULL,NULL),('cl6t7kftq17061xp3dad53ymd','홍순화',NULL,NULL,NULL),('cl6t7kj6s17431xp3kgtcmec1','서연♥',NULL,NULL,NULL),('cl6t7lm2u19241xp37g8in4oh','ㅇ',NULL,NULL,NULL),('cl6t7tlvy23561xp3rwlhlj1l','이가은',NULL,NULL,NULL),('cl6t7tnxb23801xp32cdwodle','이가은',NULL,NULL,NULL),('cl6t7tu1c24231xp3wibgl0sp','?육국지?',NULL,NULL,NULL),('cl6t7u09524741xp3zzf0du87','이준희',NULL,NULL,NULL),('cl6t7u56t25041xp3ffb5le87','sunny(a5)',NULL,NULL,NULL),('cl6t7uamc25851xp3hr25zrof','정범기',NULL,NULL,NULL),('cl6t7ugtt27181xp3uvg1pvbx',NULL,NULL,NULL,NULL),('cl6t7ulz827611xp3ayxnugqt','김영택',NULL,NULL,NULL),('cl6t7upnt28251xp3qyaa42ow','전영희',NULL,NULL,NULL),('cl6t7uref28701xp3169m6rd3',NULL,NULL,NULL,NULL),('cl6t7vduu29571xp3twofs6bn','이가영',NULL,NULL,NULL),('cl6t7vlb430071xp327ufyuyc','Martin 서화목',NULL,NULL,NULL),('cl6t7y2mw32281xp3k3fhprzf','태우',NULL,NULL,NULL),('cl6t8b1xt34941xp3vrsp4q12','♡만권여사♡',NULL,NULL,NULL),('cl6t8ghte36541xp3lud79s8b','김용욱',NULL,NULL,NULL),('cl6t8p8v039461xp3za737h4r','김기진',NULL,NULL,NULL),('cl6u3vrb51119r4p389w6num1','J Park',NULL,NULL,NULL),('cl6u4kxum0272mvjz1l180kzh','김현인',NULL,NULL,NULL),('cl6u5kzvj0657m8p3cnt5bskx','김현인','rolenche@rndasia.co.kr',NULL,'https://lh3.googleusercontent.com/a/AItbvmnJX3kNJEv1fJTb9l42ucwFb71ISl1c18yRax4=s96-c'),('cl6u5ppko0830m8p30rvproal','Jacobey Woo','euiyoung4020@gmail.com',NULL,'https://lh3.googleusercontent.com/a-/AFdZucrlmjNNkOUwkej0dx096mMgEwu0ua_3x9clGEMl5w=s96-c'),('cl6yuwbzt0205erp3u5aom3xd','김현인','rolenche@gmail.com',NULL,'https://lh3.googleusercontent.com/a/AItbvmmm71TlrY-dMEMC4e-uq9UyEw_XYUeRa6xbe_5Z=s96-c'),('cl6zsjiv60323chp3rtko59dp','이상민',NULL,NULL,NULL),('cl72ua9hw2960chp3ogztgsaq','&',NULL,NULL,NULL),('cl733ht6w4982chp3ccbe7nou','텐텐','a01064736886@gmail.com',NULL,'https://lh3.googleusercontent.com/a-/AFdZucqh8HLrknIRDVALO6asYOJ0oTMBtbKXWiwecXMKjw=s96-c');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationToken`
--

LOCK TABLES `VerificationToken` WRITE;
/*!40000 ALTER TABLE `VerificationToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `VerificationToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WeeklyAnalysis`
--

DROP TABLE IF EXISTS `WeeklyAnalysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WeeklyAnalysis` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `month` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `week` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coreMission` text COLLATE utf8mb4_unicode_ci,
  `lookInside` text COLLATE utf8mb4_unicode_ci,
  `mainFocus` text COLLATE utf8mb4_unicode_ci,
  `lifeCoreMission` text COLLATE utf8mb4_unicode_ci,
  `lifeLookInside` text COLLATE utf8mb4_unicode_ci,
  `lifeMainFocus` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `WeeklyAnalysis_year_month_week_userId_key` (`year`,`month`,`week`,`userId`),
  CONSTRAINT `WeeklyAnalysis_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WeeklyAnalysis`
--

LOCK TABLES `WeeklyAnalysis` WRITE;
/*!40000 ALTER TABLE `WeeklyAnalysis` DISABLE KEYS */;
INSERT INTO `WeeklyAnalysis` VALUES ('cl6u5ny5p0736mvjzilp3kte1','cl6u4kxum0272mvjz1l180kzh','2022','8','2','e','s','s',NULL,NULL,NULL),('cl6vtzd31014298jz38qsfhje','cl6u5kzvj0657m8p3cnt5bskx','2022','8','2','l','l','l',NULL,NULL,NULL),('cl6yuzn0k0284erp3q35v8kt4','cl6yuwbzt0205erp3u5aom3xd','2022','8','2','전도집회','더 적극적으로 전도하지 못하고 있다','새롭게 연락을 해서라도 한사람이라도 전도하자',NULL,NULL,NULL),('cl71hjo7u0786chp3z08ywnak','cl6t7upnt28251xp3qyaa42ow','2022','8','2','전도집회','소통의부재  로 그동안   사귐이 뜸했다','만나서 일대일로   초대하기\n오늘 저녁에 만나기로함',NULL,NULL,NULL),('cl71hs2xz1455chp3ohi2bw1s','cl6smr5vy08101xp32ggd0n82','2022','8','2','전도 집회 준비','안 믿는 사람이 없다','이전에 온 사람들 창기기',NULL,NULL,NULL),('cl71hznc91799chp38zgcke45','cl6t7u56t25041xp3ffb5le87','2022','8','2','전도집회','환경-만남이 제한적인   환경\n내가 미리 포기함','확신\n난 전하고 뒷 책임   주님이 책임',NULL,NULL,NULL),('cl72u83gt2802chp3nr4z3gsy','cl6t7ulz827611xp3ayxnugqt','2022','8','3','전도대상자 준비하기','','어머니를 전도하기',NULL,NULL,NULL),('cl72uczxx3230chp33nbht8q5','cl6t7vlb430071xp327ufyuyc','2022','8','3','사람들 전도하기','가득찬 스케줄','기도의 시간 분리',NULL,NULL,NULL),('cl72ufhg43413chp3vj2yslxw','cl72ua9hw2960chp3ogztgsaq','2022','8','3','맡기신 영혼부터 케어하기.','기도시간 확보 못함','토요리더모임 참여하기',NULL,NULL,NULL),('cl72uj5243778chp33od7yp8b','cl6t8ghte36541xp3lud79s8b','2022','8','3','전도하기','그리스도인 으로써 너무 부족하다','기도회 들어가기',NULL,NULL,NULL),('cl72ujeef3869chp32ja9q2t1','cl6t7lm2u19241xp37g8in4oh','2022','8','3','전도집회, 전도하기','주변에 사람이 없다 / 구조적 시간의 문제','저녁 기도회 참여, 김반장님 전화하기',NULL,NULL,NULL),('cl72ulljl4105chp304y5d6zt','cl6t7vduu29571xp3twofs6bn','2022','8','3','8.28 전도집회에 친구들 데려오기','전도를 하고싶지 않음. 한 사람 한 사람 신경쓰고 싶지않은 마음이 든다.','주변 불신자가 누구있나 생각해보고 매일 기도하고 연락하기.',NULL,NULL,NULL);
/*!40000 ALTER TABLE `WeeklyAnalysis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

--
-- Dumping data for table `_prisma_migrations`
--

-- SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-22 17:43:01
