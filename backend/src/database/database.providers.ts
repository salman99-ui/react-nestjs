import * as mysql from 'mysql2/promise';

export const databaseProviders = [
  {
    provide: 'MYSQL_POOL',
    useFactory: async () => {
      const connection = mysql.createPool({
        host: 'db',
        port : 3306,
        user: 'my_user',
        password: 'root_pass',
        database: 'exam',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      return connection;
    },
  },
];
