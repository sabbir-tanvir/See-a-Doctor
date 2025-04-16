import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MobileApp() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Get all the benefits of Sasthyaseba through our mobile app
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <p className="font-medium">Book Appointment Online</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <p className="font-medium">Video Call With Doctor</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <p className="font-medium">Get Prescription Instantly</p>
              </div>
            </div>

            {/* SMS Form */}
            <div>
              <p className="mb-3">Get the link to download mobile app</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 flex-grow">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://ext.same-assets.com/174619264/2251459532.svg"
                      alt="Bangladesh"
                      width={20}
                      height={15}
                    />
                  </div>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-white text-primary border-0"
                  />
                </div>
                <Button className="bg-secondary text-primary hover:bg-secondary/90">
                  Send Link
                </Button>
              </div>
            </div>

            {/* App Store Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="https://play.google.com/store/apps/details?id=com.sasthyaseba.patient" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://ext.same-assets.com/174619264/2489753146.webp"
                  alt="Google Play"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="https://apps.apple.com/app/sasthya-seba/id6447047717" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://ext.same-assets.com/174619264/3457891245.webp"
                  alt="App Store"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Mobile App Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative h-[400px] w-64">
              <Image
                src="https://ext.same-assets.com/174619264/1764982543.webp"
                alt="Sasthya Seba Mobile App"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
