/**
 * Script to create specializations based on the doctor specialties in the MongoDB database
 * 
 * Usage: node importSpecializations.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

// Define Specialization model - adjust the schema as needed
const specializationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Specialization = mongoose.model('Specialization', specializationSchema);

// Import Doctor model
const Doctor = require('../models/Doctor');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Helper to create slug from title
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
    .replace(/\-\-+/g, '-')    // Replace multiple - with single -
    .replace(/^-+/, '')        // Trim - from start of text
    .replace(/-+$/, '');       // Trim - from end of text
};

// Function to import specializations
const importSpecializations = async () => {
  try {
    // Get all unique specializations from doctors
    const uniqueSpecializations = await Doctor.distinct('specialization');
    
    console.log(`Found ${uniqueSpecializations.length} unique specializations from doctors`);
    
    // Clear existing specializations
    console.log('Clearing existing specializations...');
    await Specialization.deleteMany({});
    
    // Prepare specialization data with descriptions
    const specializations = uniqueSpecializations.map(title => {
      const slug = slugify(title);
      
      // Generate a generic description based on the specialization name
      let description = `${title} specialists focus on diagnosing and treating conditions related to ${title.toLowerCase()}.`;
      
      // Add specific descriptions for common specialties
      if (title.includes('Cardiologist') || title.includes('CardioVascular')) {
        description = 'Cardiologists specialize in diagnosing and treating diseases of the heart and blood vessels.';
      } else if (title.includes('Gynecologist') || title.includes('Obstetrician')) {
        description = 'Gynecologists and Obstetricians specialize in female reproductive health, pregnancy, and childbirth.';
      } else if (title.includes('Neurologist') || title.includes('NeuroPhysician')) {
        description = 'Neurologists specialize in disorders of the nervous system, including the brain, spinal cord, and nerves.';
      } else if (title.includes('Orthopedic')) {
        description = 'Orthopedic surgeons specialize in conditions affecting the musculoskeletal system, including bones, joints, and muscles.';
      } else if (title.includes('Pediatrician')) {
        description = 'Pediatricians specialize in the physical, emotional, and social health of infants, children, and adolescents.';
      } else if (title.includes('Dentist')) {
        description = 'Dentists specialize in oral health, including the diagnosis, prevention, and treatment of diseases and conditions of the oral cavity.';
      } else if (title === 'General Physician' || title.includes('GP')) {
        description = 'General Physicians provide primary care and manage a wide range of health issues for patients of all ages.';
      } else if (title.includes('Dermatologist')) {
        description = 'Dermatologists specialize in conditions affecting the skin, hair, and nails.';
      } else if (title.includes('ENT') || title.includes('Otolaryngologist')) {
        description = 'ENT specialists (Otolaryngologists) focus on disorders of the ear, nose, throat, and related structures of the head and neck.';
      } else if (title.includes('Ophthalmologist')) {
        description = 'Ophthalmologists specialize in eye and vision care, including the diagnosis and treatment of eye disorders and diseases.';
      }
      
      return {
        title,
        slug,
        description,
        icon: ''
      };
    });
    
    // Insert specializations into MongoDB
    console.log('Inserting specializations into MongoDB...');
    
    const createdSpecializations = await Specialization.insertMany(specializations);
    
    console.log(`Successfully imported ${createdSpecializations.length} specializations.`);
    
    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing specializations:', error);
    process.exit(1);
  }
};

// Run the import function
importSpecializations(); 