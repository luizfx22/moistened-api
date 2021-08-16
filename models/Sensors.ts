import mongoose, { Schema } from "mongoose";

const sensorsSchema = new Schema({
	owner: String,
	mac_address: String
});

export default mongoose.models.sensors || mongoose.model('sensors', sensorsSchema);