const fs = require('fs');

const uuid = require('uuid').v4;

const roles = require('./json/roles.json');
const permissions = require('./json/permissions.json');
const rolePermissionMap = require('./data/role_permissions.json');

const createSQL = ({ role_id, permission_id }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.role_permission (
  role_id,
  permission_id,
) VALUES (
  '${role_id}',
  '${permission_id}'
);
`;

(() => {
  const rolePermisisons = [];
  Object.entries(rolePermissionMap).forEach(([roleName, permissionNames]) => {
    const { id: role_id } = roles.find(role => role.name === roleName);
    permissionNames.forEach(permissionName => {
      rolePermisisons.push({
        role_id,
        permission_id: permissions.find(
          permission => permission.name === permissionName
        ).id
      });
    });
  });

  const sql = rolePermisisons.map(createSQL).join('');

  fs.writeFileSync('sql/role_permissions.sql', sql);
  fs.writeFileSync(
    'json/role_permissions.json',
    JSON.stringify(rolePermisisons, null, 2)
  );
})();
