/*
 Navicat Premium Data Transfer
 
 Source Server         : 192.168.3.131-6520
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : 192.168.3.131:6520
 Source Schema         : db01
 
 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001
 
 Date: 08/02/2021 13:39:44
 */
SET
    NAMES utf8mb4;

SET
    FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_demo
-- ----------------------------
DROP TABLE IF EXISTS `tb_demo`;

CREATE TABLE `tb_demo` (
    `id` int NOT NULL,
    `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_demo
-- ----------------------------
INSERT INTO `tb_demo` VALUES (1, '1', '1');

SET
    FOREIGN_KEY_CHECKS = 1;