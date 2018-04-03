const fs = require('fs');

const uuid = require('uuid').v4;
const faker = require('faker');

const jwts = require('./json/jwts.json');
const orgs = require('./json/orgs.json');

const createSQL = ({
  id,
  first_name,
  last_name,
  email,
  password,
  jwt,
  default_organization_id
}) => `INSERT INTO ${process.env.GS_DB_NAME}.study_table_user (
  id,
  first_name,
  last_name,
  email,
  password,
  jwt,
  default_organization_id
) VALUES (
  '${id}',
  '${first_name}',
  '${last_name}',
  '${email}',
  '${password}',
  '${jwt}',
  '${default_organization_id}'
);
`;

(() => {
  const users = [];
  for (let orgIdx = 0; orgIdx < orgs.length; orgIdx++) {
    // five users per org
    for (let iter = 0; iter < 5; iter++) {
      users.push({
        id: uuid(),
        first_name: faker.name.firstName().replace(/'/g, "\\'"),
        last_name: faker.name.lastName().replace(/'/g, "\\'"),
        email: faker.internet.email(),
        password: faker.internet.password(),
        jwt: jwts[orgIdx].value,
        default_organization_id: orgs[orgIdx].id
      });
    }
  }

  const sql = users.map(createSQL).join('');

  fs.writeFileSync('sql/users.sql', sql);
  fs.writeFileSync('json/users.json', JSON.stringify(users, null, 2));
})();
