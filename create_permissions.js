const fs = require('fs');

const uuid = require('uuid').v4;

const permissionSeedData = require('./data/permissions.json');

const createSQL = ({ id, name, description }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.permission (
  id,
  name,
  description
) VALUES (
  '${id}',
  '${name}',
  '${description}'
);
`;

(() => {
  const permissions = permissionSeedData.map(permission => ({
    ...permission,
    id: uuid()
  }));

  const sql = permissions.map(createSQL).join('');

  fs.writeFileSync('sql/permissions.sql', sql);
  fs.writeFileSync(
    'json/permissions.json',
    JSON.stringify(permissions, null, 2)
  );
})();
