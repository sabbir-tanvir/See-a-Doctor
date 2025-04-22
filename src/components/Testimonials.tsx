"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Faiyaz A. Chowdhury",
      position: "Software Engineer",
      text: "Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of doctors visited.",
      initials: "FC",
      rating: 5,
      image: "/testimonials/person1.jpg"
    },
    {
      id: 2,
      name: "Israt Mou",
      position: "Teacher",
      text: "Dear Fatema, Thank you so much for your diligent follow up and especially for calling me back. It is very rare that someone from customer support for any company ever reverts. Reaffirms my faith in Sasthya Seba",
      initials: "IM",
      rating: 5, 
      image: "/testimonials/person2.jpg"
    },
    {
      id: 3,
      name: "Labby Ahsan",
      position: "Business Owner",
      text: "The service of Sasthya Seba is praiseworthy. When my grandmother was at critical moment, we were all worried to have a vehicle in that late night.",
      initials: "LA",
      rating: 4,
      image: "/testimonials/person3.jpg"
    },
    {
      id: 4,
      name: "Mashrur Enan",
      position: "Marketing Executive",
      text: "Very easy to book, maintain history. Hassle free from older versions of booking appointments via telephone.. Thanks Sasthya Seba for making it simple.",
      initials: "ME",
      rating: 5,
      image: "/testimonials/person4.jpg"
    },
    {
      id: 5,
      name: "Md Saiful Islam",
      position: "Banker",
      text: "Very easy & Hassle free to make an appointment and maintain history. Even if you are out of the Internet",
      initials: "MSI",
      rating: 4,
      image: "/testimonials/person5.jpg"
    },
    {
      id: 6,
      name: "Ruksana Sharmin",
      position: "Student",
      text: "Really Appreciate your help on the issue and your quick and prompt resolution of the issue. Not only were you patient enough to listen and understand the problem but also provide a quick resolution for the same. Really appreciate it and Thank you once again for your help and support.",
      initials: "RS",
      rating: 5,
      image: "/testimonials/person6.jpg"
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
    <section className="py-24 bg-gradient-to-b from-white to-secondary/5 relative overflow-hidden" ref={scrollRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/5 -translate-x-1/3 translate-y-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Why People <span className="text-primary">Love</span> Sasthya Seba
          </h2>
          <p className="text-lg text-gray-600">
            We continuously improve our services based on the valuable feedback from our users
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-8 -left-8 text-primary/10">
            <Quote size={80} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {visibleTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="h-full border-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex mb-6">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <Avatar className="h-12 w-12 mr-4 ring-2 ring-gray-100">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.position}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
                className="h-10 w-10 rounded-full border-gray-200 hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNextClick}
                disabled={currentIndex === totalPages - 1}
                className="h-10 w-10 rounded-full border-gray-200 hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 ml-0 sm:ml-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentIndex(index);
                    scrollToTop();
                  }}
                  className={`w-8 h-8 rounded-full p-0 transition-colors ${
                    index === currentIndex 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
