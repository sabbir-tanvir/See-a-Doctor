import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmergencyCallout() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image Column */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full w-full">
                <Image
                  src="https://ext.same-assets.com/174619264/2204253837.webp"
                  alt="Doctor at home service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="md:w-1/2 p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need a Doctor to Visit your Loved One at Home? Dial - 09611 530 530
              </h2>
              <p className="mb-6">
                Sasthya Seba Limited has introduced a brand-new health program in Bangladesh called "Home-Centric Primary Care",
                where a doctor and a paramedic will visit patients at home with necessary medical equipments four days a month.
              </p>
              <Link href="/on-call-doctor">
                <Button className="bg-white text-primary hover:bg-gray-100 transition-colors">
                  Request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
