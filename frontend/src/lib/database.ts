import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@blood.2guzy.mongodb.net/hams?retryWrites=true&w=majority&appName=blood';

/**
 * Global variable to track the connection state
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

// Define Doctor schema for reference
export const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  hospital: { type: mongoose.Schema.Types.Mixed },
  experience: { type: mongoose.Schema.Types.Mixed },
  fee: { type: Number },
  rating: { type: Number },
  gender: { type: String },
  image: { type: String },
  location: { type: String },
  available: { type: Boolean },
  education: { type: mongoose.Schema.Types.Mixed },
  work_experience: { type: [Object] },
  services: { type: [String] },
  chamber: { type: [Object] },
  bmdc_registration: { type: String }
}); 