const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');

// Connect to DB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

// Create sample appointments
const createAppointments = async () => {
  try {
    await connectDB();

    const doctorId = '682092711945b560b1c825bd'; // The doctor ID provided
    
    // First check if the doctor exists
    let doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      console.log(`Doctor with ID ${doctorId} not found in Doctor collection. Creating entry...`);
      
      // We need to find or create a hospital first since hospital should be an ObjectId
      let hospital = await Hospital.findOne();
      
      if (!hospital) {
        console.log('No hospital found. Creating a sample hospital...');
        hospital = await Hospital.create({
          name: "City Hospital",
          address: "123 Medical Street, Dhaka",
          phone: "01777357613",
          email: "city.hospital@example.com",
          website: "https://cityhospital.example.com",
          description: "A leading hospital in the city",
          image: "hospital.jpg",
          location: {
            type: "Point",
            coordinates: [90.3742, 23.7461]
          },
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Medicine"],
          facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Cafeteria"],
          founded: "1990"
        });
        console.log('Sample hospital created'.green);
      }
      
      // Now create the doctor with the hospital's _id
      const doctorData = {
        _id: doctorId,
        name: "Dr. Sabbir",
        specialization: "Medicine Specialist",
        hospital: hospital._id, // Use the hospital ObjectId
        location: "Dhaka, Bangladesh",
        experience: "2 years",
        fee: 1200,
        rating: 4.2,
        reviews: 15,
        gender: "Male", // Capitalized to match enum
        available: true,
        bmdc_registration: "DMC-12345",
        education: ["MBBBS", "FCPS"],
        services: ["General Checkup", "Prescription", "Follow-up"],
        about: "Dr. Sabbir is a highly qualified Medicine Specialist with 2 years of experience in treating various medical conditions.",
        chamber: [
          {
            name: "City Hospital Chamber",
            address: "123 Medical Street, Dhaka",
            contact: "01777357613",
            availability: "Sun, Tue, Thu: 6:00 PM - 9:00 PM"
          }
        ],
        work_experience: [
          {
            title: "Senior Physician",
            institution: "City Hospital"
          }
        ]
      };
      
      doctor = await Doctor.create(doctorData);
      console.log('Doctor profile created successfully.'.green);
    } else {
      console.log(`Doctor found: ${doctor.name}`.green);
    }

    // Delete existing appointments for this doctor (to avoid duplicates)
    await Appointment.deleteMany({ doctor: doctorId });
    console.log('Cleared existing appointments for this doctor.'.yellow);

    // Create sample appointment data
    const appointmentsData = [
      {
        name: "Abdul Karim",
        phone: "01712345678",
        doctor: doctorId,
        chamber: "City Hospital Chamber",
        consultationType: "Face to Face",
        appointmentType: "New Patient",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        status: "Pending"
      },
      {
        name: "Fatima Ahmed",
        phone: "01812345678",
        doctor: doctorId,
        chamber: "City Hospital Chamber",
        consultationType: "Face to Face",
        appointmentType: "Follow Up",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        status: "Confirmed"
      },
      {
        name: "Mohammed Hossain",
        phone: "01912345678",
        doctor: doctorId,
        chamber: "City Hospital Chamber",
        consultationType: "Video",
        appointmentType: "Regular Checkup",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: "Pending"
      },
      {
        name: "Ruksana Begum",
        phone: "01612345678",
        doctor: doctorId,
        chamber: "City Hospital Chamber",
        consultationType: "Face to Face",
        appointmentType: "Emergency",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: "Completed"
      },
      {
        name: "Kamal Uddin",
        phone: "01512345678",
        doctor: doctorId,
        chamber: "City Hospital Chamber", 
        consultationType: "Phone",
        appointmentType: "New Patient",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        status: "No Show"
      }
    ];

    // Insert the appointments
    const appointments = await Appointment.create(appointmentsData);
    
    console.log(`Created ${appointments.length} sample appointments`.green.inverse);
    console.log('Sample appointments:');
    appointments.forEach((apt, index) => {
      console.log(
        `${index + 1}. ${apt.name} - ${apt.appointmentType} - ${apt.status} - ${apt.date.toLocaleDateString()}`
      );
    });

    // Exit process
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run the function
createAppointments(); 