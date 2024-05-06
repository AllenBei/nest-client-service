-- 初始化角色的权限的类别
INSERT INTO `access_category` (`id`, `name`, `description`, `create_at`, `update_at`)
VALUES
(1, '系统管理', '负责系统管理的权限模块', UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));


-- 初始化用户相关的权限
INSERT INTO `access` (`id`,`access_category_id`, `name`, `router_name`, `type`, `action`, `router_url`, `description`, `create_at`, `update_at`)
VALUES
(1, 1, '权限列表', '', 0, 'GET', '/access-manage/category-list', '获取可配置的权限列表', UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(2, 1, '添加权限类别', '', 0, 'POST', '/access-manage/access-category', '添加权限类别',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(3, 1, '修改权限类别', '', 0, 'PUT', '/access-manage/access-category', '修改权限类别',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(4, 1, '删除权限类别', '', 0, 'DELETE', '/access-manage/access-category', '删除权限类别',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(5, 1, '新增权限', '', 0, 'POST', '/access-manage/access', '新增权限',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(6, 1, '修改权限', '', 0, 'PUT', '/access-manage/access', '修改权限',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(7, 1, '删除权限', '', 0, 'DELETE', '/access-manage/access', '删除权限',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(8, 1, '角色列表', '', 0, 'GET', '/role-manage/list', '获取所有的角色列表',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(9, 1, '新增角色', '', 0, 'POST', '/role-manage', '新增角色',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(10, 1, '修改角色', '', 0, 'PUT', '/role-manage', '修改角色',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(11, 1, '删除角色', '', 0, 'DELETE', '/role-manage', '删除角色',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(12, 1, '分配角色权限', '', 0, 'POST', '/role-manage/assign-access', '给角色分配权限',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(13, 1, '用户列表', '', 0, 'GET', '/user-manage/list', '获取所有用户列表',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(14, 1, '分配角色', '', 0, 'POST', '/user-manage/assign-roles', '给指定用户分配角色',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(15, 1, '修改用户状态', '', 0, 'PUT', '/user-manage/status-set', '修改用户的状态',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())),
(16, 1, '删除用户', '', 0, 'DELETE', '/user-manage/delete', '删除用户',UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));
