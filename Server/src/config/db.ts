import { connect } from 'mongoose';
//import { SettingsModel } from '../models/settingsModel';
//import { createSid } from '../services/settings.service';



import mongoose from 'mongoose';
import seed from './seed';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://betzinbal:IGAWmYxQRcF4fGRM@tic-tac-toe.2qidf.mongodb.net/tic-tac-toe?retryWrites=true&w=majority&appName=tic-tac-toe");
    console.log('[database] mongo successfully connected');
    await seed()
  } catch (error) {
    console.log(`${error}`);
  }
};

export default connectDB;
