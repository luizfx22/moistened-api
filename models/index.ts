import mongoose from 'mongoose';
// import Sensors from "./Sensors";
import SoilData from './SoilData';

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export {
  SoilData,
};
