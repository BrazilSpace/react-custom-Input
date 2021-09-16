const mongoose = require('mongoose');

const database = (env) => {
  console.log('[database] connecting...');
  const {
    MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST_PORT,
    MONGO_NAME, MONGO_DBPOOL,
  } = env;

  mongoose.Promise = Promise;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    poolSize: MONGO_DBPOOL,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    bufferMaxEntries: 0
  };
  const url = `mongodb://${MONGO_HOST_PORT.toString()}/${MONGO_NAME}`;
  mongoose.connect(url, options);
  const db = mongoose.connection;
  db.once('open', () => console.log(`[database] success. url: ${url}`));
  db.on('error', (err) => {
    console.log(`[database] failed. ${err}`);
    process.exit();
    return err;
  });
};

module.exports = database;
module.exports.mongo = mongoose;
