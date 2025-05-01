import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  designation: String
});

export default mongoose.model('Contact', contactSchema);
