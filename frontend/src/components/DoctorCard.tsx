import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Doctor } from '@/types/doctor';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Building2, MapPin, Clock, Calendar, MessageSquare } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onClick?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Doctor Image Section */}
          <div className="md:w-1/4 bg-gray-50 p-5 flex flex-col items-center justify-center border-r border-gray-100">
            <div className="relative h-36 w-36 mb-3">
              {doctor.image ? (
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover rounded-full border-2 border-primary/10"
                />
              ) : (
                <Avatar className="h-36 w-36 border-2 border-primary/10">
                  <AvatarFallback className="text-3xl bg-primary/5 text-primary">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex items-center gap-1 mb-2 bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{doctor.rating || 0}</span>
              <span className="text-sm text-gray-500">({doctor.reviews || 0})</span>
            </div>
          </div>

          {/* Doctor Details Section */}
          <div className="md:w-2/4 p-6">
            <h2 className="text-xl font-bold text-primary mb-1">{doctor.name}</h2>
            <p className="text-secondary font-medium mb-3 inline-block bg-secondary/5 px-2 py-1 rounded">
              {doctor.specialization}
            </p>
            
            <div className="space-y-3 mt-4">
              <p className="text-gray-700 font-medium">
                {Array.isArray(doctor.education) 
                  ? doctor.education.map((edu, index) => (
                      <span key={index} className="inline-block">
                        {typeof edu === 'string' 
                          ? edu 
                          : edu.degree && edu.institution 
                            ? `${edu.degree}, ${edu.institution}`
                            : 'Education details'
                        }
                        {index < doctor.education.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : doctor.education
                }
              </p>
              <p className="text-gray-700 mb-2 flex items-center gap-1">
                <span className="text-primary">{doctor.experience}</span> experience
              </p>

              <div className="grid sm:grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{typeof doctor.hospital === 'object' ? doctor.hospital.name || 'General Hospital' : doctor.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{doctor.available ? 'Available Today' : 'Not Available'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full font-medium">
                    Fee: ৳{doctor.fee}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="md:w-1/4 bg-gray-50 p-5 flex flex-col gap-4 border-l border-gray-100 justify-center">
            <span className="text-sm text-center font-medium text-primary/80 bg-primary/5 py-1 px-2 rounded-full mx-auto">
              {doctor.available ? 'Appointment available for today' : 'No appointments available'}
            </span>
            
            <Link href={`/doctor/${doctor._id}/appointment`} className="w-full">
              <Button className="w-full flex items-center gap-2 py-5" disabled={!doctor.available}>
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full flex items-center gap-2 py-5">
              <MessageSquare className="h-4 w-4" />
              Video Consultation
            </Button>
            
            <Link href={`/doctor/${doctor._id}`} className="bg-gray-100 hover:bg-gray-200 text-primary py-2 rounded-md font-medium hover:text-secondary text-sm text-center transition-colors">
              View Profile
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 