"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConsultationRequestFormProps {
  formType?: 'doctor' | 'ambulance' | 'telemedicine' | 'general';
  className?: string;
  inCard?: boolean;
  helpText?: string;
}

export function ConsultationRequestForm({
  formType = 'general',
  className = '',
  inCard = false,
  helpText = 'Please fill out this quick form and we\'ll get back to you within few hours!'
}: ConsultationRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    from: '',
    destination: '',
    date: '',
    ambulanceType: '',
    roundTrip: false,
    promoCode: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit this data to an API
    console.log('Form submitted with data:', formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        from: '',
        destination: '',
        date: '',
        ambulanceType: '',
        roundTrip: false,
        promoCode: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  // Render different forms based on formType
  const renderFormFields = () => {
    if (formType === 'ambulance') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="Example: Dhaka"
                className="bg-white text-primary border-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Example: Chittagong"
                className="bg-white text-primary border-gray-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ambulance Type</label>
              <Select onValueChange={(value) => handleSelectChange('ambulanceType', value)}>
                <SelectTrigger className="bg-white text-primary border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ac">AC Ambulance</SelectItem>
                    <SelectItem value="non-ac">Non-AC Ambulance</SelectItem>
                    <SelectItem value="icu">ICU Ambulance</SelectItem>
                    <SelectItem value="freezing">Freezing Ambulance</SelectItem>
                    <SelectItem value="air">Air Ambulance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white text-primary border-gray-300"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="roundTrip"
              name="roundTrip"
              checked={formData.roundTrip}
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              className="rounded border-gray-300"
            />
            <label htmlFor="roundTrip" className="text-sm">I need a round trip</label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-white text-primary border-gray-300"
              required
            />
          </div>

          <div className="flex items-center gap-2">
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-white text-primary border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Promo Code</label>
            <Input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
              placeholder="Promo Code (if any)"
              className="bg-white text-primary border-gray-300"
            />
          </div>
        </>
      );
    }

    // Default form fields for general consultation
    return (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-white text-primary border-gray-300"
            required
          />
        </div>

        <div className="flex items-center gap-2">
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="bg-white text-primary border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="bg-white text-primary border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your health issue in brief"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-primary ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 resize-none"
            required
          ></textarea>
        </div>
      </>
    );
  };

  // If this is a standalone section (not in a card)
  if (!inCard) {
    return (
      <section className={`py-16 bg-primary text-white ${className}`}>
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
              <p className="text-sm">{helpText}</p>
            </div>

            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {renderFormFields()}
                <Button
                  type="submit"
                  className="w-full bg-secondary text-primary hover:bg-secondary/90"
                  disabled={submitted}
                >
                  {submitted ? "Request Submitted!" : `Request a ${formType === 'ambulance' ? 'Ambulance' : 'Call Back'}`}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // In-card version of the form
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {renderFormFields()}

      {helpText && <p className="text-sm text-gray-500">{helpText}</p>}

      <Button
        type="submit"
        className="w-full bg-secondary text-primary hover:bg-secondary/90"
        disabled={submitted}
      >
        {submitted ? "Request Submitted!" : `Send ${formType === 'ambulance' ? 'Ambulance Request' : 'Request'}`}
      </Button>
    </form>
  );
}
