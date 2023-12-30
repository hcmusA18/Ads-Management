import mongoose from 'mongoose';

const OfficerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
  },
  position: {
    type: Number,
    required: true
  },
  districtID: {
    type: String,
    ref: 'districts'
  },
  wardID: {
    type: String,
    ref: 'wards'
  }
});

// presave
OfficerSchema.pre('save', async function (next) {
  const officer = this;
  console.log(officer);
  next();
});

const Officer = mongoose.model('officers', OfficerSchema);
export default Officer;
