import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HealthSuggestion() {
  return (
    <section className="py-12 bg-primary">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-3/4 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Do you need any expert suggestion about your health condition?
            </h2>
            <p className="mb-6">
              We have a dedicated team of experienced doctors to give you suggestion when you are at a critical
              health condition or you are confused.
            </p>
          </div>
          <div className="w-full md:w-1/4 flex justify-end">
            <Link href="/request-suggestion">
              <Button
                className="bg-secondary text-primary hover:bg-secondary/90 font-medium px-6"
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
