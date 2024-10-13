const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const User = require('./models/user');
const Counter = require('./models/counter');
const Vault = require('./models/vault');
const Transaction = require('./models/transaction');
const CounterBalance = require('./models/counterBalance');
const Customer = require('./models/customer');

const sequelize = require('./utils/configdb');
require('dotenv').config();
const userRouter = require('./router/user');
const gamedayRouter = require('./router/gameday');

//admin Routes
// const adminRouter = require('./router/admin');

const PORT = process.env.PORT;
const uri = process.env.URI;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

app.use(limiter); // Apply to all requests

// Sync the model with the database
const syncModels = async () => {
  try {
      await sequelize.sync({ force: false }); // Change to 'force: true' for dropping tables
      console.log('Models synchronized with the PostgreSQL database.');
  } catch (err) {
      console.error('Error syncing models with the database:', err);
  }
};

syncModels();
// User routes
app.use('/user', userRouter);
app.use('/gameday', gamedayRouter);
app.get('/', (req, res) => {
  res.send('connected to server');
});

app.listen(4000, () => {
  console.log('server running on port 4000');
});
