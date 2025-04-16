"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Faiyaz-A-Chowdhury",
      text: "Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of doctors visited.",
      initials: "FC"
    },
    {
      id: 2,
      name: "Israt-Mou",
      text: "Dear Fatema, Thank you so much for your diligent follow up and especially for calling me back. It is very rare that someone from customer support for any company ever reverts. Reaffirms my faith in Sasthya Seba",
      initials: "IM"
    },
    {
      id: 3,
      name: "Labby Ahsan",
      text: "The service of Sasthya Seba is praiseworthy. When my grandmother was at critical moment, we were all worried to have a vehicle in that late night.",
      initials: "LA"
    },
    {
      id: 4,
      name: "Mashrur Enan",
      text: "Very easy to book, maintain history. Hassle free from older versions of booking appointments via telephone.. Thanks Sasthya Seba for making it simple.",
      initials: "ME"
    },
    {
      id: 5,
      name: "Md Saiful Islam",
      text: "Very easy & Hassle free to make an appointment and maintain history. Even if you are out of the Internet",
      initials: "MSI"
    },
    {
      id: 6,
      name: "Ruksana Sharmin",
      text: "Really Appreciate your help on the issue and your quick and prompt resolution of the issue. Not only were you patient enough to listen and understand the problem but also provide a quick resolution for the same. Really appreciate it and Thank you once again for your help and support.",
      initials: "RS"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const testsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testsPerPage);

  const handleNextClick = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToTop();
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * testsPerPage,
    (currentIndex + 1) * testsPerPage
  );

  return (
    <section className="py-16 bg-gray-50" ref={scrollRef}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Why people love Sasthya Seba
          </h2>
          <p className="text-gray-600">
            We continuously improve our services based on the opinion of our users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-gray-600 mb-6 italic flex-grow">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3 bg-secondary">
                    <AvatarFallback className="bg-secondary text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-primary">{testimonial.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevClick}
              disabled={currentIndex === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={index === currentIndex ? "default" : "outline"}
                size="icon"
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToTop();
                }}
                className="h-8 w-8"
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextClick}
              disabled={currentIndex === totalPages - 1}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
