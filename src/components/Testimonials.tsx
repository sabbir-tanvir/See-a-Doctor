import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Testimonials() {
  const testimonials = [
    {
      id: "testimonial-1",
      quote: "Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of doctors visited.",
      author: "Faiyaz-A-Chowdhury"
    },
    {
      id: "testimonial-2",
      quote: "Dear Fatema, Thank you so much for your diligent follow up and especially for calling me back. It is very rare that someone from customer support for any company ever reverts. Reaffirms my faith in Sasthya Seba",
      author: "Israt-Mou"
    },
    {
      id: "testimonial-3",
      quote: "The service of Sasthya Seba is praiseworthy. When my grandmother was at critical moment, we were all worried to have a vehicle in that late night.",
      author: "Labby Ahsan"
    },
    {
      id: "testimonial-4",
      quote: "Very easy to book, maintain history. Hassle free from older versions of booking appointments via telephone.. Thanks Sasthya Seba for making it simple.",
      author: "Mashrur Enan"
    },
    {
      id: "testimonial-5",
      quote: "Very easy & Hassle free to make an appointment and maintain history. Even if you are out of the Internet",
      author: "Md Saiful Islam"
    },
    {
      id: "testimonial-6",
      quote: "Really Appreciate your help on the issue and your quick and prompt resolution of the issue. Not only were you patient enough to listen and understand the problem but also provide a quick resolution for the same. Really appreciate it and Thank you once again for your help and support.",
      author: "Ruksana Sharmin"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-3">
          Why people love Sasthya Seba
        </h2>
        <p className="text-gray-600 text-center mb-10">
          We continuously improve our services based on the opinion of our users
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <blockquote className="text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="text-primary font-semibold">
                  {testimonial.author}
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Tabs for Smaller Screens */}
        <div className="mt-8 md:hidden">
          <Tabs defaultValue="testimonial-1" className="w-full">
            <TabsList className="grid grid-cols-6 w-full">
              {testimonials.map((testimonial) => (
                <TabsTrigger
                  key={testimonial.id}
                  value={testimonial.id}
                  className="px-2"
                >
                  {testimonials.findIndex(t => t.id === testimonial.id) + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {testimonials.map((testimonial) => (
              <TabsContent key={testimonial.id} value={testimonial.id}>
                <Card className="bg-gray-50 border-0 shadow-sm">
                  <CardContent className="p-6">
                    <blockquote className="text-gray-700 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <footer className="text-primary font-semibold">
                      {testimonial.author}
                    </footer>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Second Row of Testimonials (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {testimonials.slice(3, 6).map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <blockquote className="text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="text-primary font-semibold">
                  {testimonial.author}
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
