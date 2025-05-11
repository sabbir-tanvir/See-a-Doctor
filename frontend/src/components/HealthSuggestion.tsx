import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HealthSuggestion() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Changed to lighter background colors */}
        <div className="bg-gradient-to-r from-blue-100 to-sky-200 rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image Column */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  // Changed image source
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Health suggestion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Column - Changed to lighter theme with dark text */}
            <div className="md:w-1/2 p-8 relative">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                  Do you need any expert suggestion about your health condition?
                </h2>
                <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                  We have a dedicated team of experienced doctors to give you suggestion when you are at a critical health condition or you are confused.
                </p>
                <Link href="/request-suggestion">
                  <Button className="bg-primary text-white hover:bg-primary/90 font-medium transition-colors shadow-md">
                    Request Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
