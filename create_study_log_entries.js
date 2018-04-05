const fs = require('fs');

const faker = require('faker');
const { DateTime } = require('luxon');

const users = require('./json/users.json');
const locations = [
  'Library',
  'Engineering Building',
  'Dorm Room',
  'Coffee Shop',
  'Academic Building'
];

const createSQL = ({
  organization_id,
  user_id,
  entry_date,
  start_time,
  end_time,
  location
}) => `INSERT INTO is521sp1b21.study_log_entry (
  organization_id,
  user_id,
  entry_date,
  start_time,
  end_time,
  location
) VALUES (
  '${organization_id}',
  '${user_id}',
  ${entry_date},
  ${start_time},
  ${end_time},
  '${location}'
);
`;

(() => {
  const studyLogEntries = [];

  users.forEach(({ id: user_id, default_organization_id: organization_id }) => {
    const entries = Math.floor(Math.abs(Math.random() * 10 - 4));

    for (let iter = 0; iter < entries; iter++) {
      const entry_date = DateTime.fromISO(
        faker.date
          .between(DateTime.local(2018, 3, 25), DateTime.local(2018, 3, 31))
          .toISOString()
      );

      let hoursStudied = Math.floor(Math.abs(Math.random() * 10 - 4));
      hoursStudied = hoursStudied === 0 ? hoursStudied + 1 : hoursStudied;

      studyLogEntries.push({
        organization_id,
        user_id,
        entry_date: `TO_DATE('${entry_date.toSQLDate()}', 'YYYY-MM-DD')`,
        start_time: new Date(entry_date).getTime(),
        end_time: new Date(entry_date.plus({ hours: hoursStudied })).getTime(),
        location: faker.random.arrayElement(locations)
      });
    }
  });

  const sql = studyLogEntries.map(createSQL).join('');

  fs.writeFileSync('sql/study_log_entries.sql', sql);
  fs.writeFileSync(
    'json/study_log_entries.json',
    JSON.stringify(studyLogEntries, null, 2)
  );
})();
