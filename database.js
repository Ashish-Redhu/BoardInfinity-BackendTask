const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure environment variables are loaded

let sequelize;

// Use DATABASE_URL for production or development
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Disable SQL logs
    dialectOptions: {
      ssl: {
        require: true, // SSL is required for hosted databases like Render or Heroku
        rejectUnauthorized: false, // Disable SSL certificate verification (optional)
      },
    },
  });
} else {
  // Fallback to local development configuration (optional)
  sequelize = new Sequelize(
    process.env.DB_NAME, // local DB name
    process.env.DB_USER, // local DB user
    process.env.DB_PASSWORD, // local DB password
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
    }
  );
}

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
