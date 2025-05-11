import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";

export function EmergencyCallout() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-white via-primary/20 to-primary/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-2xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Image Column */}
            <div className="md:w-1/2 relative">
              <div className="relative h-80 md:h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/5 z-10 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
                <Image
                  src="https://ext.same-assets.com/174619264/2204253837.webp"
                  alt="Doctor at home service"
                  fill
                  className="object-cover rounded-t-2xl md:rounded-r-none md:rounded-l-2xl transition-transform hover:scale-105 duration-700"
                  priority
                />
                
                {/* Feature badges overlay */}
                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full py-2 px-4 flex items-center space-x-2 shadow-lg">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-gray-800">24/7 Service</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full py-2 px-4 flex items-center space-x-2 shadow-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-gray-800">Nationwide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:w-1/2 p-8 md:p-12 text-gray-900 flex flex-col justify-center bg-white/80">
              <div className="space-y-7 max-w-lg">
                <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold backdrop-blur-sm mb-2 border border-primary/20 text-primary">
                  Home Medical Service
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-primary">
                  Need a Doctor to Visit your Loved One at Home?
                </h2>
                
                {/* Phone number with enhanced styling */}
                <div className="flex items-center space-x-3 py-3 px-5 bg-primary/5 backdrop-blur-md rounded-xl border border-primary/20 shadow-inner hover:bg-primary/10 transition-colors">
                  <div className="bg-primary rounded-full p-2">
                    <Phone className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Call now for immediate assistance</p>
                    <span className="font-bold text-xl text-primary">09611 530 530</span>
                  </div>
                </div>
                
                <p className="text-gray-800 text-lg leading-relaxed">
                  See a Doctor Limited has introduced a brand-new health program in Bangladesh called 
                  <span className="font-semibold text-primary"> "Home-Centric Primary Care"</span>, 
                  where a doctor and a paramedic will visit patients at home with necessary medical equipment four days a month.
                </p>
                
                {/* CTA section with enhanced button */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/on-call-doctor" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 font-medium px-8 py-6 text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                      Request a Home Visit
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/services" className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/70 transition-colors text-sm sm:text-base">
                    Learn about our services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
