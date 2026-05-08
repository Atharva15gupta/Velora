const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect().then(() => client.query('SELECT * FROM "User"')).then(res => {
  console.log('USERS:', res.rows);
  return client.query('SELECT * FROM "Workspace"');
}).then(res => {
  console.log('WORKSPACES:', res.rows);
}).catch(console.error).finally(() => client.end());
