"use client";

import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";

export default function RequestSuggestionPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Request Medical Consultation
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <ConsultationRequestForm />
        </div>
      </div>
    </div>
  );
}