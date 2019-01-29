import mongoose from 'mongoose';

const onError = error => {
  console.error(`Mongo connection error: ${error}`);
  process.exit(1);
}

const connect = uri => {
  mongoose.connection.on('error', onError);
  return mongoose.connect(uri)
    .then(() => {
      console.log(`Mongo connected to ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.db.databaseName}`);
    });
}

export default { connect };