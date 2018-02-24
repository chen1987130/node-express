DROP TABLE IF EXISTS `base_module`;
DROP TABLE IF EXISTS `base_user`;

CREATE TABLE `base_module` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(50) NOT NULL DEFAULT '',
  `module_code` varchar(20) NOT NULL DEFAULT '',
  `module_url` varchar(200) NOT NULL DEFAULT '',
  `module_desc` varchar(200) NOT NULL DEFAULT '',
  `module_pid` bigint(18) NOT NULL DEFAULT '0',
  `module_sort` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `base_user` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL DEFAULT '',
  `username` varchar(100) NOT NULL DEFAULT '',
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


INSERT INTO `base_module` VALUES ('1', '系统管理', '001', '', '', '0', '99');
INSERT INTO `base_module` VALUES ('2', '用户管理', '001001', '/user/list', '', '1', '1');
INSERT INTO `base_module` VALUES ('4', '个人工具', '002', '', '', '0', '1');
#INSERT INTO `base_module` VALUES ('5', '定时任务', '002001', '', '', '4', '1');
#INSERT INTO `base_module` VALUES ('6', '定时任务服务器', '002001001', '/httpAlias/list', '', '5', '2');
#INSERT INTO `base_module` VALUES ('7', '定时任务', '002001002', '', '', '5', '3');
#INSERT INTO `base_module` VALUES ('8', '定时任务', '002001003', '', '', '5', '1');


INSERT INTO `base_user` VALUES ('1', 'chensheng', 'e10adc3949ba59abbe56e057f20f883e', '陈晟', '0');
