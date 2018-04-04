const fs = require('fs');

const faker = require('faker');

const roles = require('./json/roles.json');
const users = require('./json/users.json');

const createSQL = ({ role_id, user_id, organization_id }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.user_role (
  role_id,
  user_id,
  organization_id
) VALUES (
  '${role_id}',
  '${user_id}',
  '${organization_id}'
);
`;

(() => {
  const userRoles = [];

  users.forEach(({ id: user_id, default_organization_id: organization_id }) => {
    userRoles.push({
      user_id,
      organization_id,
      role_id: faker.random.arrayElement(roles).id
    });
  });

  const sql = userRoles.map(createSQL).join('');

  fs.writeFileSync('sql/user_roles.sql', sql);
  fs.writeFileSync('json/user_roles.json', JSON.stringify(userRoles, null, 2));
})();
