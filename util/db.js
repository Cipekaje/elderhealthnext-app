import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  socketPath: '/run/mysqld/mysqld.sock', // Replace with your database host
  user: 'admin', // Replace with your database username
  password: 'rlkscpvp', // Replace with your database password
  database: 'tempDB', // Replace with your database name
});

export default pool;