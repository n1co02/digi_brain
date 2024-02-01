//Author Nicolas Ostermann

import {config} from 'dotenv';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

config();

function getMongoDbConnectionString(): string {
  switch (process.env.MODE) {
    case 'development':
      return '';
    case 'docker-network':
      return 'mongodb://digibrain-mongodb-1:27017';
    case 'production':
      return 'mongodb://digibrain-mongodb-1:27017';
    default:
      return 'mongodb://digibrain-mongodb-1:27017';
  }
}

async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(getMongoDbConnectionString(), {
      autoCreate: false,
    });
    console.log('MongoDB connected to:', getMongoDbConnectionString());
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDb;
