const fs = require('fs');

const uuid = require('uuid').v4;
const faker = require('faker');

const createSQL = ({
  id,
  name,
  description
}) => `INSERT INTO ${process.env.GS_DB_NAME}.organization (
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
  const orgs = [];
  for (let iter = 0; iter < 20; iter++) {
    orgs.push({
      id: uuid(),
      name: faker.company.companyName().replace(/'/g, "\\'"),
      description: faker.lorem.sentence().replace(/'/g, "\\'")
    });
  }
  const sql = orgs.map(createSQL).join('');

  fs.writeFileSync('sql/orgs.sql', sql);
  fs.writeFileSync('json/orgs.json', JSON.stringify(orgs, null, 2));
})();
