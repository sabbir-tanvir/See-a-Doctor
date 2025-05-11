# Data Import Scripts

This directory contains scripts to import data from the frontend dummy data into the MongoDB database.

## Prerequisites

1. Make sure MongoDB is running and accessible
2. Ensure the MongoDB connection details are properly configured in `backend/config/config.env` with the `MONGO_URI` environment variable
3. Make sure all required Node.js packages are installed by running `npm install` in the backend directory

## Available Scripts

### 1. Import Doctors

This script imports all doctor data from the frontend dummy data file (`frontend/src/data/doctorsData.ts`) into the MongoDB database.

It will:
- Create user accounts for each doctor with a generated email
- Create doctor profiles linked to these user accounts
- Set up all doctor details including specialization, fees, location, etc.

```bash
node scripts/importDoctors.js
```

### 2. Import Specializations

This script imports all specialization data from the frontend telemedicine page into the MongoDB database.

```bash
node scripts/importSpecializations.js
```

## Using in Production

These scripts are intended for development and staging environments only. For production:

1. Create a more secure way to import data with proper validation
2. Set up a secure password generation mechanism instead of using a fixed password
3. Consider adding more robust error handling and logging

## Password for Imported Doctors

All imported doctor accounts will have the same password: `password123`

These accounts can be used for testing purposes. 