/**
 * Script to bulk import doctors from the frontend dummy data into the MongoDB database
 * 
 * Usage: node importDoctors.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

// Import Doctor model
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Hospital = require('../models/Hospital');

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

// Function to import doctors from frontend dummy data
const importDoctors = async () => {
  try {
    // Path to the frontend dummy data
    const frontendDummyDataPath = path.resolve(__dirname, '../../frontend/src/data/doctorsData.ts');
    
    if (!fs.existsSync(frontendDummyDataPath)) {
      console.error('Frontend dummy data file not found:', frontendDummyDataPath);
      process.exit(1);
    }
    
    // Read the file content
    const fileContent = fs.readFileSync(frontendDummyDataPath, 'utf8');
    
    // Extract the doctorsData array using regex
    const doctorsDataArrayMatch = fileContent.match(/export const doctorsData: Doctor\[\] = \[([\s\S]*)\];/);
    
    if (!doctorsDataArrayMatch) {
      console.error('Failed to extract doctors data from file');
      process.exit(1);
    }
    
    // Parse the array content
    const doctorsDataContent = doctorsDataArrayMatch[1];
    
    // Split into individual doctor objects
    const doctorObjectsStrings = doctorsDataContent.split('},');
    
    // Process each doctor object
    const doctors = [];
    
    for (let i = 0; i < doctorObjectsStrings.length - 1; i++) {
      const doctorObjectString = doctorObjectsStrings[i] + '}';
      
      // Extract properties using regex
      const idMatch = doctorObjectString.match(/id: (\d+)/);
      const nameMatch = doctorObjectString.match(/name: "([^"]+)"/);
      const specializationMatch = doctorObjectString.match(/specialization: "([^"]+)"/);
      const educationMatch = doctorObjectString.match(/education: "([^"]+)"/);
      const experienceMatch = doctorObjectString.match(/experience: "([^"]+)"/);
      const hospitalMatch = doctorObjectString.match(/hospital: "([^"]+)"/);
      const locationMatch = doctorObjectString.match(/location: "([^"]+)"/);
      const ratingMatch = doctorObjectString.match(/rating: ([\d\.]+)/);
      const reviewsMatch = doctorObjectString.match(/reviews: (\d+)/);
      const feeMatch = doctorObjectString.match(/fee: (\d+)/);
      const availableMatch = doctorObjectString.match(/available: (true|false)/);
      const imageMatch = doctorObjectString.match(/image: "([^"]+)"/);
      
      if (nameMatch && specializationMatch) {
        // Determine gender based on name prefix
        const nameValue = nameMatch[1];
        let gender = "Male"; // Default
        if (nameValue.includes('Ms.') || nameValue.includes('Mrs.') || nameValue.includes('Miss')) {
          gender = "Female";
        }
        
        const doctorObject = {
          name: nameValue,
          specialization: specializationMatch[1],
          education: educationMatch ? [educationMatch[1]] : ['MBBS'], // Convert to array
          experience: experienceMatch ? experienceMatch[1] : '5 years',
          hospital: null, // Will be set later
          hospitalName: hospitalMatch ? hospitalMatch[1] : 'General Hospital',
          location: locationMatch ? locationMatch[1] : 'Dhaka, Bangladesh',
          fee: feeMatch ? parseInt(feeMatch[1]) : 500,
          rating: ratingMatch ? parseFloat(ratingMatch[1]) : 4.5,
          reviews: reviewsMatch ? parseInt(reviewsMatch[1]) : 0,
          available: availableMatch ? availableMatch[1] === 'true' : true,
          image: imageMatch ? imageMatch[1] : '',
          gender: gender,
          bmdc_registration: `BMDC-${Math.floor(10000 + Math.random() * 90000)}`,
          about: `Dr. ${nameValue.replace(/^Dr\.\s+/, '')} is a highly qualified ${specializationMatch[1]} with extensive experience in the field.`,
          services: [`${specializationMatch[1]} Consultation`, 'General Check-up', 'Follow-up Visit'],
        };
        
        doctors.push(doctorObject);
      }
    }
    
    console.log(`Parsed ${doctors.length} doctors from frontend dummy data`);
    
    // Clear existing doctors
    console.log('Clearing existing doctors...');
    await Doctor.deleteMany({});
    
    // Create a default hospital if none exists
    let defaultHospital = await Hospital.findOne({ name: 'General Hospital' });
    if (!defaultHospital) {
      defaultHospital = await Hospital.create({
        name: 'General Hospital',
        location: 'Dhaka, Bangladesh',
        specialty: 'General',
        beds: 500,
      });
      console.log('Created default hospital');
    }
    
    // Insert doctors into MongoDB
    console.log('Inserting doctors into MongoDB...');
    
    const createdDoctors = [];
    
    // First, create user accounts for doctors
    for (const doctor of doctors) {
      // Create a username from the doctor's name
      const username = doctor.name
        .replace(/^Dr\.\s+/, '') // Remove "Dr. " prefix
        .toLowerCase()
        .replace(/\s+/g, '.'); // Replace spaces with dots
        
      // Create email
      const email = `${username}@example.com`;
      
      // Check if user exists
      let user = await User.findOne({ email });
      
      if (!user) {
        // Create a new user with role 'doctor'
        user = await User.create({
          name: doctor.name,
          email,
          password: '$2a$10$yjvxJBZBFKQkOB6VwKInReZw83vFQI5ClUjnmxEeyRaB9yaTPYlGu', // Hashed password for 'password123'
          role: 'doctor',
        });
        
        console.log(`Created user account for ${doctor.name} with email ${email}`);
      }
      
      // Find or create hospital for the doctor
      let hospital = await Hospital.findOne({ 
        name: { $regex: new RegExp(doctor.hospitalName, 'i') } 
      });
      
      if (!hospital) {
        // Use default hospital
        hospital = defaultHospital;
      }
      
      // Create doctor profile linked to user
      const doctorData = {
        user: user._id,
        ...doctor,
        hospital: hospital._id // Set the hospital ID
      };
      
      // Remove the hospitalName field as it's not in the schema
      delete doctorData.hospitalName;
      
      // Add chamber information
      doctorData.chamber = [{
        name: `${doctor.name}'s Chamber`,
        address: doctor.location,
        contact: `+880 1${Math.floor(700000000 + Math.random() * 99999999)}`,
        availability: 'Saturday to Thursday, 6 PM - 9 PM'
      }];
      
      try {
        const createdDoctor = await Doctor.create(doctorData);
        createdDoctors.push(createdDoctor);
        console.log(`Imported doctor: ${doctor.name}`);
      } catch (error) {
        console.error(`Error importing doctor ${doctor.name}:`, error.message);
      }
    }
    
    console.log(`Successfully imported ${createdDoctors.length} doctors.`);
    
    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing doctors:', error);
    process.exit(1);
  }
};

// Run the import function
importDoctors(); 