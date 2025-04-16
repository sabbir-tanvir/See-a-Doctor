import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ConsultationRequestForm() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Need some advice from our experts?
            </h2>
            <p className="font-medium text-lg">Request a call back now!</p>
            <p className="text-sm">
              The quickest way to get in contact is to telephone: 09611 530 530, 01405 600 700
            </p>
            <p className="text-sm">
              Please fill out this quick form and we'll get back to you within few hours!
            </p>
          </div>

          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
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
                  placeholder="Phone Number *"
                  className="bg-white text-primary"
                  required
                />
              </div>

              <Input
                type="text"
                placeholder="Full Name *"
                className="bg-white text-primary"
                required
              />

              <Input
                type="email"
                placeholder="Email Address *"
                className="bg-white text-primary"
                required
              />

              <textarea
                placeholder="Please describe your health issue in brief *"
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-primary ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 resize-none"
                required
              ></textarea>

              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                Request a Call Back
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
