const fs = require('fs');

const uuid = require('uuid').v4;
const faker = require('faker');

const orgsSeedData = require('./data/orgs.json');

const createSQL = ({ id, name, description }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.organization (
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
  const orgs = orgsSeedData.map(org => ({ ...org, id: uuid() }));

  const sql = orgs.map(createSQL).join('');

  fs.writeFileSync('sql/orgs.sql', sql);
  fs.writeFileSync('json/orgs.json', JSON.stringify(orgs, null, 2));
})();
