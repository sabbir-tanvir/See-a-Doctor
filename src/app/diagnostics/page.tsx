
"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { hospitalsData } from "@/data/hospitalsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DiagnosticsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedService, setSelectedService] = useState<string>(
    categoryParam || "CT Scan"
  );
  const [sortBy, setSortBy] = useState<"price" | "rating">("price");

  const diagnosticServices = [
    "CT Scan",
    "Blood Tests",
    "Endoscopy",
    "Ultrasound",
    "X-Ray",
    "Microbiology",
  ];

  // Filter hospitals that offer the selected service
  const filteredHospitals = hospitalsData
    .filter(
      (hospital) =>
        hospital.diagnosticPrices &&
        hospital.diagnosticPrices[selectedService as keyof typeof hospital.diagnosticPrices]
    )
    .sort((a, b) => {
      if (sortBy === "price") {
        const priceA =
          a.diagnosticPrices?.[selectedService as keyof typeof a.diagnosticPrices] || 0;
        const priceB =
          b.diagnosticPrices?.[selectedService as keyof typeof b.diagnosticPrices] || 0;
        return priceA - priceB;
      } else {
        return b.rating - a.rating;
      }
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Diagnostic Services Price Comparison
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Diagnostic Service</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedService}
              onValueChange={(value) => setSelectedService(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {diagnosticServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sort By</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button
                variant={sortBy === "price" ? "default" : "outline"}
                onClick={() => setSortBy("price")}
              >
                Price (Low to High)
              </Button>
              <Button
                variant={sortBy === "rating" ? "default" : "outline"}
                onClick={() => setSortBy("rating")}
              >
                Rating (High to Low)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About {selectedService}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Compare prices for {selectedService} across various hospitals in
              Dhaka. Prices may vary based on specific tests and procedures.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hospital</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Price (BDT)</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={hospital.image}
                      alt={hospital.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{hospital.name}</TableCell>
                <TableCell>{hospital.location}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-amber-500 mr-1">★</span>
                    {hospital.rating} ({hospital.reviews} reviews)
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ৳
                  {hospital.diagnosticPrices?.[selectedService as keyof typeof hospital.diagnosticPrices]?.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Book Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-10 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Important Information</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Prices may vary based on specific requirements and complexity.</li>
          <li>Additional charges may apply for emergency services.</li>
          <li>
            Always consult with the hospital before booking for the most
            up-to-date pricing.
          </li>
          <li>Some services may require a doctor's prescription.</li>
        </ul>
      </div>
    </div>
  );
}
