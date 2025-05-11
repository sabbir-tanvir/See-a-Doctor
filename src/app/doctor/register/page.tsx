"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { registerDoctorEmail } from '@/lib/doctorUtils';

// List of specializations
const specializations = [
  "Gynecologist & Obstetrician",
  "Medicine Specialist",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "ENT Specialist",
  "Ophthalmologist",
  "Dentist",
  "Urologist",
  "Gastroenterologist",
  "Endocrinologist",
  "Pulmonologist",
  "Rheumatologist",
  "Oncologist",
  "Nephrologist"
];

export default function DoctorRegisterPage() {  const router = useRouter();
  const { signUp, updateUserProfile, setIsDoctor } = useAuth();
  
  // Basic auth info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Doctor-specific info
  const [specialization, setSpecialization] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [hospital, setHospital] = useState('');
  const [location, setLocation] = useState('');
  const [fee, setFee] = useState('');
  const [image, setImage] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate first step fields
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all required fields');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      setError('');
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate second step fields
    if (!specialization || !education || !experience || !hospital || !location || !fee) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);

    try {      // Create the user account
      const result = await signUp(email, password);
      
      // Update the user profile with name
      await updateUserProfile(name);
      
      // Set user as doctor
      setIsDoctor(true);
      
      // Register this email as a doctor email
      registerDoctorEmail(email);
      
      // TODO: Store additional doctor information in a database
      // This would typically involve an API call to store the doctor's info
      // For now, we'll simulate this with a console log
      console.log('Doctor info to be stored:', {
        name,
        email,
        specialization,
        education,
        experience,
        hospital,
        location,
        fee: parseFloat(fee),
        image: image || 'https://ext.same-assets.com/174619264/3871928465.webp', // Default image
      });
      
      // Redirect to doctor dashboard after successful registration
      router.push('/doctor/dashboard'); 
    } catch (err: any) {
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container-custom py-10 min-h-[calc(100vh-300px)]">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <Image
                  src="https://ext.same-assets.com/690263052/697087813.svg"
                  alt="Doctor Registration"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Doctor Registration</CardTitle>
              <CardDescription className="text-center">
                {currentStep === 1 ? 'Create your doctor account' : 'Complete your professional profile'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {currentStep === 1 ? (
                // Step 1: Basic Account Information
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name*</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email*</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password*</label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password*</label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="button" 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-600">
                    Already have a doctor account?{' '}
                    <Link href="/doctor/login" className="text-secondary hover:underline">
                      Login here
                    </Link>
                  </p>
                </form>
              ) : (
                // Step 2: Professional Information
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="specialization" className="text-sm font-medium">Specialization*</label>
                    <select 
                      id="specialization"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      required
                    >
                      <option value="">Select your specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="education" className="text-sm font-medium">Education & Qualifications*</label>
                    <Textarea
                      id="education"
                      placeholder="e.g. MBBS, FCPS (Gynecology & Obstetrics)"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">Years of Experience*</label>
                    <Input
                      id="experience"
                      type="text"
                      placeholder="e.g. 12 years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="hospital" className="text-sm font-medium">Hospital/Clinic*</label>
                    <Input
                      id="hospital"
                      type="text"
                      placeholder="e.g. Popular Medical College Hospital"
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">Location*</label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g. Dhanmondi, Dhaka"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="fee" className="text-sm font-medium">Consultation Fee (BDT)*</label>
                    <Input
                      id="fee"
                      type="number"
                      placeholder="e.g. 1200"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">Profile Image URL</label>
                    <Input
                      id="image"
                      type="text"
                      placeholder="URL to your profile image (optional)"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Complete Registration'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
