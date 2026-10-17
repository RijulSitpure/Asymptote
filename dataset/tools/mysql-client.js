import mysql from 'mysql2/promise';

async function main() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = parseInt(process.env.MYSQL_PORT || '3306', 10);
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || 'root';

  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const sql = Buffer.concat(chunks).toString('utf8');

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
    dateStrings: true
  });

  try {
    const [results] = await connection.query(sql);
    let selectResult = null;
    if (Array.isArray(results)) {
      for (const res of results) {
        if (Array.isArray(res)) {
          selectResult = res;
        }
      }
    }
    if (selectResult && selectResult.length > 0) {
      const headers = Object.keys(selectResult[0]);
      console.log(headers.join('\t'));
      for (const row of selectResult) {
        console.log(headers.map(h => row[h] === null ? 'NULL' : String(row[h])).join('\t'));
      }
    }
  } finally {
    await connection.end();
  }
}

main().catch(err => {
  console.error(err.message || String(err));
  process.exit(1);
});
