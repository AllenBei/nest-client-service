-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `unionid` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT 'username',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT 'username',
  `password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'password',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'email',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'status normal 1, forbid 0',
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT 'user avatar',
  `admin` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'admin normal 0, admin 1',
  `create_at` int(11) UNSIGNED NOT NULL COMMENT 'create time',
  `update_at` int(11) UNSIGNED NOT NULL COMMENT 'update time',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_username`(`username`) USING BTREE,
  UNIQUE INDEX `uk_email`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`(
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'role id',
    `name` VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'role name',
    `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT 'role description',
    `create_at` int(11) UNSIGNED NOT NULL COMMENT 'create time',
    `update_at` int(11) UNSIGNED NOT NULL COMMENT 'update time',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `uk_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
    `user_id` int(11) UNSIGNED NOT NULL COMMENT 'user id',
    `role_id` int(11) UNSIGNED NOT NULL COMMENT 'role id',
    PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for access_category
-- ----------------------------
DROP TABLE IF EXISTS `access_category`;
CREATE TABLE `access_category` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'access category id',
    `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'access category name',
    `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'access category description',
    `create_at` int(11) UNSIGNED NOT NULL COMMENT 'create time',
    `update_at` int(11) UNSIGNED NOT NULL COMMENT 'update time',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `uk_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'access id',
    `access_category_id` int(10) UNSIGNED NOT NULL COMMENT 'access category id',
    `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'access name',
    `router_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT 'router name',
    `type` tinyint(1) UNSIGNED NOT NULL COMMENT 'access type 0 action 1 menu',
    `action` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'access action get post put delete ...',
    `router_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'router url',
    `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'access description',
    `create_at` int(11) UNSIGNED NOT NULL COMMENT 'create time',
    `update_at` int(11) UNSIGNED NOT NULL COMMENT 'update time',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `idx_name`(`name`) USING BTREE,
    INDEX `idx_action`(`action`) USING BTREE,
    INDEX `idx_router_url`(`router_url`) USING BTREE,
    UNIQUE INDEX `uk_type_action_router_url`(`type`, `action`, `router_url`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for role_access
-- ----------------------------
DROP TABLE IF EXISTS `role_access`;
CREATE TABLE `role_access` (
    `role_id` int(10) UNSIGNED NOT NULL COMMENT 'role id',
    `access_id` int(10) UNSIGNED NOT NULL COMMENT 'access id',
    PRIMARY KEY (`role_id`, `access_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
