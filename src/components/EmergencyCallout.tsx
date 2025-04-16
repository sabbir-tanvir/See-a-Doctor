import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmergencyCallout() {
  return (
    <section className="py-10 bg-primary">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Image Section */}
          <div className="w-full md:w-1/3 relative">
            <div className="relative h-64 w-full">
              <Image
                src="https://ext.same-assets.com/174619264/2204253837.webp"
                alt="Doctor Home Visit"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Need a Doctor to Visit your Loved One at Home? Dial - 09611 530 530
            </h2>
            <p className="mb-6">
              Sasthya Seba Limited has introduced a brand-new health program in Bangladesh called "Home-Centric Primary Care",
              where a doctor and a paramedic will visit patients at home with necessary medical equipments four days a month.
            </p>
            <Link href="/on-call-doctor">
              <Button
                className="bg-secondary text-primary hover:bg-secondary/90 font-medium"
              >
                Request
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
