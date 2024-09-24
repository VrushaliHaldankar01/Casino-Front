const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/configdb');
require('dotenv').config();
const User = require('./models/user'); // Import your User model
const userRouter = require('./router/user');

//admin Routes
const adminRouter = require('./router/admin');

const PORT = process.env.PORT;
const uri = process.env.URI;
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Sync the model with the database
sequelize
  .sync({ force: false }) // 'force: false' will not drop and recreate the table if it already exists
  .then(() => {
    console.log('User model synchronized with the PostgreSQL database.');
  })
  .catch((err) => {
    console.error('Error syncing the User model with the database:', err);
  });
// User routes
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('connected to server');
});

app.listen(4000, () => {
  console.log('server running on port 4000');
});
