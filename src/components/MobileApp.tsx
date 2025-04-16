import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MobileApp() {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Get all the benefits of Sasthyaseba through our mobile app
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <p className="font-medium">Book Appointment Online</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <p className="font-medium">Video Call With Doctor</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <p className="font-medium">Get Prescription Instantly</p>
              </div>
            </div>

            {/* Download Links */}
            <div className="pt-4 space-y-4">
              <p className="font-medium">Get the link to download mobile app</p>

              <div className="flex items-center gap-3">
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
                  className="max-w-xs"
                />
                <Button className="bg-secondary text-primary hover:bg-secondary/90">
                  Send
                </Button>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href="https://play.google.com/store/apps/details?id=com.sasthyaseba.patient" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://ext.same-assets.com/174619264/2204253838.webp"
                    alt="Google Play"
                    width={120}
                    height={36}
                    className="h-10 w-auto"
                  />
                </Link>
                <Link href="https://apps.apple.com/app/sasthya-seba/id6447047717" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://ext.same-assets.com/174619264/2204253839.webp"
                    alt="App Store"
                    width={120}
                    height={36}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile App Screenshot */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative h-[400px] w-[300px]">
              <Image
                src="https://ext.same-assets.com/174619264/2376547901.webp"
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
