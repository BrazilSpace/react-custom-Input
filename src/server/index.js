
const express = require('express');
const expressJWT = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const apiRouter = require('./router/apiRouter');
const database = require('./initializers/database');

// express application
const app = express();
const envPath = process.env.NODE_ENV === 'development' ? './config/.env.development' : './config/.env.production';
const dotenvConfig = dotenv.config({ path: envPath });
const { SERVER_PORT } = dotenvConfig.parsed;

// set cors
app.use(cors());

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  inflate: true,
  limit: '500mb'
}));
app.use(cookieParser());

// fill routes for express application
app.use(express.static('public'));
app.use(express.static('dist'));

// Middleware
// app.use(expressJWT({
//   secret: 'secret12345' // 簽名密鑰 或 PublicKey
// }).unless({
//   path: ['/api/login'] // 指定路径不經過 Token 解析
// }));

// apiRouter
app.use('/api', apiRouter());


async function run(_app) {
  try {
    // await database(dotenvConfig.parsed);
    _app.listen(SERVER_PORT, () => console.log(`[Express]Listening on port ${SERVER_PORT}!`));
  } catch (err) {
    console.log(`[Express]start failed: ${err}`);
  }
}
run(app);
