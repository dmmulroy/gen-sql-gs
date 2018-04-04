const fs = require('fs');

const uuid = require('uuid').v4;

const roleSeedData = require('./data/roles.json');

const createSQL = ({ id, name, description }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.role (
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
  const roles = roleSeedData.map(role => ({
    ...role,
    id: uuid()
  }));

  const sql = roles.map(createSQL).join('');

  fs.writeFileSync('sql/roles.sql', sql);
  fs.writeFileSync('json/roles.json', JSON.stringify(roles, null, 2));
})();
