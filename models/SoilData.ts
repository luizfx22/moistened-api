import mongoose, { Schema } from 'mongoose';

const soilData = new Schema({
  air_temperature: Number,
  air_humidity: Number,
  soil_humidity: Number,
  readed_by: String,
  readed_at: Date,
});

export default mongoose.model('soil_data', soilData);
