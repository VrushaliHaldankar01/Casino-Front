const express = require('express');
const userService = require('../service/user');
const app = express();
const router = express.Router();

router.post(
  '/register',

  userService.createUser
);
module.exports = router;
