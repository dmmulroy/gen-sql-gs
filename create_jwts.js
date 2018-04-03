const fs = require('fs');

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const createSQL = ({ value, expired }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.jwt (
  value,
  expired
) VALUES (
  '${value}',
  ${expired}
);
`;

(() => {
  const jwts = [];

  for (let iter = 0; iter < 100; iter++) {
    jwts.push({
      value: jwt.sign(uuid(), 'secret'),
      expired: Math.round(Math.random())
    });
  }

  const sql = jwts.map(createSQL).join('');

  fs.writeFileSync('sql/jwts.sql', sql);
  fs.writeFileSync('json/jwts.json', JSON.stringify(jwts, null, 2));
})();
