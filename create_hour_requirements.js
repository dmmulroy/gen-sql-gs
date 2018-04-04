const fs = require('fs');

const users = require('./json/users.json');

const createSQL = ({
  required_hours,
  user_id,
  organization_id
}) => `INSERT INTO ${process.env.GS_DB_NAME}.hour_requirement (
  user_id,
  organization_id
  required_hours
) VALUES (
  '${user_id}'
  '${organization_id}',
  '${required_hours}',
);
`;

(() => {
  const hourRequirements = [];

  users.forEach(({ id: user_id, default_organization_id: organization_id }) => {
    hourRequirements.push({
      user_id,
      organization_id,
      required_hours: Math.round(Math.random() * 10) + 1
    });
  });

  const sql = hourRequirements.map(createSQL).join('');

  fs.writeFileSync('sql/hour_requirements.sql', sql);
  fs.writeFileSync(
    'json/hour_requirements.json',
    JSON.stringify(hourRequirements, null, 2)
  );
})();
