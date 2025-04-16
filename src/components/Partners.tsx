import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Partners() {
  const partners = [
    {
      name: "Popular Diagnostic",
      logo: "https://ext.same-assets.com/174619264/1782439561.webp",
      link: "https://www.populardiagnostic.com/"
    },
    {
      name: "Bangladesh Fertility Hospital",
      logo: "https://ext.same-assets.com/174619264/2364981753.webp",
      link: "https://www.bdfertilityhospital.com/"
    },
    {
      name: "FCH Limited",
      logo: "https://ext.same-assets.com/174619264/3579164283.webp",
      link: "https://www.facebook.com/FCHLimited"
    },
    {
      name: "Ashoka Rescue",
      logo: "https://ext.same-assets.com/174619264/4715928364.webp",
      link: "https://www.ashokarescue.com/"
    },
    {
      name: "Manipal Hospitals",
      logo: "https://ext.same-assets.com/174619264/1526394872.webp",
      link: "https://www.manipalhospitalsglobal.com/"
    },
    {
      name: "Rushmono",
      logo: "https://ext.same-assets.com/174619264/2918743652.webp",
      link: "http://rushmono.com/"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Our partners
            </h2>
            <p className="text-gray-600">
              We pride in ourselves for some of our partners
            </p>
          </div>
          <Link href="/our-partners" className="text-primary hover:text-secondary mt-4 md:mt-0 font-medium">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all h-40"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
