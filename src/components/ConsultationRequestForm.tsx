"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";

export function ConsultationRequestForm() {
  const [consultationType, setConsultationType] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading("Submitting your consultation request...");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: Implement API call to handle form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success(
        "Your consultation request has been submitted successfully!",
        {
          duration: 4000,
          icon: "🎉",
        }
      );
      e.currentTarget.reset();
      setConsultationType("general");
    } catch (error) {
      // toast.error("Failed to submit consultation request. Please try again.", {
      //   duration: 4000,
      // });
    } finally {
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <Label>Consultation Type</Label>
          <input
            type="hidden"
            name="consultationType"
            value={consultationType}
          />
          <RadioGroup
            defaultValue="general"
            value={consultationType}
            onValueChange={setConsultationType}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general">General Consultation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specialist" id="specialist" />
              <Label htmlFor="specialist">Specialist Consultation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="emergency" id="emergency" />
              <Label htmlFor="emergency">Emergency Consultation</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="symptoms">Describe Your Symptoms or Concerns</Label>
          <Textarea
            id="symptoms"
            name="symptoms"
            required
            placeholder="Please describe your symptoms or health concerns in detail..."
            className="h-32"
          />
        </div>

        <div>
          <Label htmlFor="medicalHistory">
            Relevant Medical History (Optional)
          </Label>
          <Textarea
            id="medicalHistory"
            name="medicalHistory"
            placeholder="Any relevant medical history, current medications, or allergies..."
            className="h-24"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
