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
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/5 bg-gray-50 p-4 flex flex-col items-center justify-center border-r border-gray-100">
            <div className="relative h-32 w-32 mb-2">
              {doctor.image ? (
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="text-2xl">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{doctor.rating || 0}</span>
              <span className="text-sm text-gray-500">({doctor.reviews || 0})</span>
            </div>
          </div>

          <div className="md:w-3/5 p-6">
            <h2 className="text-xl font-bold text-primary mb-1">{doctor.name}</h2>
            <p className="text-secondary font-medium mb-3">{doctor.specialization}</p>
            <p className="text-gray-700 mb-1">
              {Array.isArray(doctor.education) 
                ? doctor.education.map((edu, index) => (
                    <span key={index}>
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
            <p className="text-gray-700 mb-4">{doctor.experience} experience</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{typeof doctor.hospital === 'object' ? doctor.hospital.name || 'General Hospital' : doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{doctor.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{doctor.available ? 'Available Today' : 'Not Available'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm">
              <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">
                Fee: ৳{doctor.fee}
              </span>
              <span className="text-gray-500">
                {doctor.available ? 'Appointment available for today' : 'No appointments available'}
              </span>
            </div>
          </div>

          <div className="md:w-1/5 bg-gray-50 p-4 flex flex-col gap-3 border-l border-gray-100 justify-center">
            <Link href={`/doctor/${doctor._id}/appointment`} className="w-full">
              <Button className="w-full flex items-center gap-2" disabled={!doctor.available}>
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Video Consultation
            </Button>
            <Link href={`/doctor/${doctor._id}`} className="text-primary hover:text-secondary text-sm text-center">
              View Profile
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 