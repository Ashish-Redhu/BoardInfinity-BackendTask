const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const managerRoutes = require('./routes/managers');
const employeeRoutes = require('./routes/employees');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/employees', employeeRoutes);

// Start server

app.get("/", (req, res)=>{
  res.send("Backend applications is live. You can test APIs with the help of services like Postman, Hoppscotch etc.")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Sync database
  await sequelize.sync({ alter: true });
});
