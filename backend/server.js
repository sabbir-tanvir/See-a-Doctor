const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

//// Route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const doctors = require("./routes/doctors");
const hospitals = require("./routes/hospitals");
const appointments = require("./routes/appointment");
const reviews = require("./routes/reviews");
const specialties = require("./routes/specialties");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/auth", auth);
app.use("/users", users);
app.use("/doctors", doctors);
app.use("/hospitals", hospitals);
app.use("/appointments", appointments);
app.use("/reviews", reviews);
app.use("/specialties", specialties);

// Add API prefix routes for frontend compatibility
app.use("/api/doctors", doctors);
app.use("/api/hospitals", hospitals);
app.use("/api/appointments", appointments);
app.use("/api/reviews", reviews);
app.use("/api/specialties", specialties);
app.use("/api/auth", auth);
app.use("/api/users", users);

// Also add /api/v1 prefix for compatibility with common API patterns
app.use("/api/v1/doctors", doctors);
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/appointments", appointments);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/specialties", specialties);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

app.get("/", (req, res) => {
  res.send("Welcome to Doctor hospital appointment API");
});

// Error middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
