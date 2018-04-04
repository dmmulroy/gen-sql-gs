const fs = require('fs');

const users = require('./json/users.json');

const createSQL = ({ user_id, semester, gpa }) => `INSERT INTO ${
  process.env.GS_DB_NAME
}.user_gpa (
  user_id,
  semester,
  gpa
) VALUES (
  '${user_id}',
  '${semester}',
  ${gpa}
);
`;

(() => {
  const userGpas = [];

  users.forEach(({ id: user_id }) => {
    let faGPA = Number(Math.abs(Math.random() * 10 - 5).toFixed(2));
    faGPA = faGPA > 4 ? Math.floor(faGPA) : faGPA;

    let wiGPA = Number(Math.abs(Math.random() * 10 - 5).toFixed(2));
    wiGPA = wiGPA > 4 ? Math.floor(wiGPA) : wiGPA;

    userGpas.push({
      user_id,
      semester: 'fa17',
      gpa: faGPA
    });

    userGpas.push({
      user_id,
      semester: 'wi17',
      gpa: wiGPA
    });
  });

  const sql = userGpas.map(createSQL).join('');

  fs.writeFileSync('sql/user_gpa.sql', sql);
  fs.writeFileSync('json/user_gpa.json', JSON.stringify(userGpas, null, 2));
})();
