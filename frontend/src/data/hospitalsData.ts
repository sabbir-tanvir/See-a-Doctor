// Define the Hospital type for better type safety
export type Hospital = {
  id: number;
  name: string;
  location: string;
  specialty: string;
  beds: number;
  rating: number;
  reviews: number;
  image: string;
  diagnosticPrices?: {
    'CT Scan'?: number;
    'Blood Tests'?: number;
    'Endoscopy'?: number;
    'Ultrasound'?: number;
    'X-Ray'?: number;
    'Microbiology'?: number;
  };
};

// Export the hospitals data
export const hospitalsData: Hospital[] = [
  {
    id: 1,
    name: "Square Hospital",
    location: "Panthapath, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 350,
    rating: 4.8,
    reviews: 320,
    image: "https://ext.same-assets.com/174619264/2749310568.webp",
    diagnosticPrices: {
      'CT Scan': 12000,
      'Blood Tests': 1500,
      'Endoscopy': 8000,
      'Ultrasound': 3500,
      'X-Ray': 1200,
      'Microbiology': 2000
    }
  },
  {
    id: 2,
    name: "United Hospital",
    location: "Gulshan, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 450,
    rating: 4.7,
    reviews: 290,
    image: "https://ext.same-assets.com/174619264/1758392046.webp",
    diagnosticPrices: {
      'CT Scan': 11000,
      'Blood Tests': 1400,
      'Endoscopy': 7500,
      'Ultrasound': 3300,
      'X-Ray': 1100,
      'Microbiology': 1900
    }
  },
  {
    id: 3,
    name: "Labaid Specialized Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 300,
    rating: 4.6,
    reviews: 260,
    image: "https://ext.same-assets.com/174619264/3976203418.webp",
    diagnosticPrices: {
      'CT Scan': 11500,
      'Blood Tests': 1600,
      'Endoscopy': 7800,
      'Ultrasound': 3400,
      'X-Ray': 1150,
      'Microbiology': 2100
    }
  },
  {
    id: 4,
    name: "Popular Medical College Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 250,
    rating: 4.5,
    reviews: 230,
    image: "https://ext.same-assets.com/174619264/1293475806.webp",
    diagnosticPrices: {
      'CT Scan': 10000,
      'Blood Tests': 1300,
      'Endoscopy': 7000,
      'Ultrasound': 3200,
      'X-Ray': 1050,
      'Microbiology': 1800
    }
  },
  {
    id: 5,
    name: "Apollo Hospitals Dhaka",
    location: "Bashundhara, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 400,
    rating: 4.7,
    reviews: 280,
    image: "https://example.com/apollo.jpg",
    diagnosticPrices: {
      'CT Scan': 12500,
      'Blood Tests': 1700,
      'Endoscopy': 8200,
      'Ultrasound': 3600,
      'X-Ray': 1250,
      'Microbiology': 2200
    }
  },
  {
    id: 6,
    name: "Dhaka Medical College Hospital",
    location: "Dhaka",
    specialty: "Public hospital",
    beds: 800,
    rating: 4.3,
    reviews: 190,
    image: "https://example.com/dmch.jpg",
    diagnosticPrices: {
      'CT Scan': 9000,
      'Blood Tests': 1200,
      'Endoscopy': 6500,
      'Ultrasound': 3100,
      'X-Ray': 950,
      'Microbiology': 1700
    }
  },
  {
    id: 7,
    name: "Bangladesh Eye Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Eye care",
    beds: 150,
    rating: 4.5,
    reviews: 210,
    image: "https://example.com/eye.jpg",
    diagnosticPrices: {
      'CT Scan': 13000,
      'Blood Tests': 1800,
      'Endoscopy': 8400,
      'Ultrasound': 3700,
      'X-Ray': 1300,
      'Microbiology': 2300
    }
  },
  {
    id: 8,
    name: "National Institute of Neurosciences",
    location: "Agargaon, Dhaka",
    specialty: "Neurology",
    beds: 200,
    rating: 4.6,
    reviews: 240,
    image: "https://example.com/neuro.jpg",
    diagnosticPrices: {
      'CT Scan': 13500,
      'Blood Tests': 1900,
      'Endoscopy': 8600,
      'Ultrasound': 3800,
      'X-Ray': 1350,
      'Microbiology': 2400
    }
  },
  {
    id: 9,
    name: "Mind Aid Hospital",
    location: "Mirpur, Dhaka",
    specialty: "Psychiatry",
    beds: 100,
    rating: 4.4,
    reviews: 180,
    image: "https://example.com/mindaid.jpg",
    diagnosticPrices: {
      'CT Scan': 8000,
      'Blood Tests': 1100,
      'Endoscopy': 6000,
      'Ultrasound': 2900,
      'X-Ray': 900,
      'Microbiology': 1600
    }
  },
  {
    id: 10,
    name: "BIRDEM General Hospital",
    location: "Shahbag, Dhaka",
    specialty: "Diabetes and endocrinology",
    beds: 500,
    rating: 4.8,
    reviews: 350,
    image: "https://example.com/birdem.jpg",
    diagnosticPrices: {
      'CT Scan': 14000,
      'Blood Tests': 2000,
      'Endoscopy': 8800,
      'Ultrasound': 3900,
      'X-Ray': 1400,
      'Microbiology': 2500
    }
  },
  {
    id: 11,
    name: "Ibn Sina Medical College Hospital",
    location: "Kallyanpur, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 320,
    rating: 4.5,
    reviews: 220,
    image: "https://example.com/ibnsina.jpg",
    diagnosticPrices: {
      'CT Scan': 11000,
      'Blood Tests': 1500,
      'Endoscopy': 8000,
      'Ultrasound': 3500,
      'X-Ray': 1200,
      'Microbiology': 2000
    }
  },
  {
    id: 12,
    name: "CMH Dhaka",
    location: "Dhaka Cantonment",
    specialty: "Military hospital",
    beds: 400,
    rating: 4.7,
    reviews: 270,
    image: "https://example.com/cmh.jpg",
    diagnosticPrices: {
      'CT Scan': 12500,
      'Blood Tests': 1700,
      'Endoscopy': 8200,
      'Ultrasound': 3600,
      'X-Ray': 1250,
      'Microbiology': 2200
    }
  },
  {
    id: 13,
    name: "Kidney Foundation Hospital",
    location: "Mirpur, Dhaka",
    specialty: "Nephrology",
    beds: 180,
    rating: 4.4,
    reviews: 200,
    image: "https://example.com/kidney.jpg",
    diagnosticPrices: {
      'CT Scan': 9000,
      'Blood Tests': 1200,
      'Endoscopy': 6500,
      'Ultrasound': 3100,
      'X-Ray': 950,
      'Microbiology': 1700
    }
  },
  {
    id: 14,
    name: "National Institute of Diseases of the Chest and Hospital",
    location: "Mohakhali, Dhaka",
    specialty: "Pulmonology",
    beds: 250,
    rating: 4.6,
    reviews: 250,
    image: "https://example.com/chest.jpg",
    diagnosticPrices: {
      'CT Scan': 11500,
      'Blood Tests': 1600,
      'Endoscopy': 7800,
      'Ultrasound': 3400,
      'X-Ray': 1150,
      'Microbiology': 2100
    }
  },
  {
    id: 15,
    name: "Bangabandhu Sheikh Mujib Medical University",
    location: "Shahbag, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 700,
    rating: 4.7,
    reviews: 300,
    image: "https://example.com/bsmmu.jpg",
    diagnosticPrices: {
      'CT Scan': 13000,
      'Blood Tests': 1800,
      'Endoscopy': 8400,
      'Ultrasound': 3700,
      'X-Ray': 1300,
      'Microbiology': 2300
    }
  },
  {
    id: 16,
    name: "Ahsania Mission Cancer Hospital",
    location: "Uttara, Dhaka",
    specialty: "Oncology",
    beds: 220,
    rating: 4.5,
    reviews: 230,
    image: "https://example.com/ahsania.jpg",
    diagnosticPrices: {
      'CT Scan': 14000,
      'Blood Tests': 1900,
      'Endoscopy': 8600,
      'Ultrasound': 3800,
      'X-Ray': 1350,
      'Microbiology': 2400
    }
  },
  {
    id: 17,
    name: "National Institute of Cancer Research & Hospital",
    location: "Mohakhali, Dhaka",
    specialty: "Oncology",
    beds: 300,
    rating: 4.8,
    reviews: 330,
    image: "https://example.com/nicrh.jpg",
    diagnosticPrices: {
      'CT Scan': 15000,
      'Blood Tests': 2000,
      'Endoscopy': 9000,
      'Ultrasound': 4000,
      'X-Ray': 1500,
      'Microbiology': 2500
    }
  },
  {
    id: 18,
    name: "ICDDR,B",
    location: "Mohakhali, Dhaka",
    specialty: "Diarrheal disease research",
    beds: 150,
    rating: 4.6,
    reviews: 260,
    image: "https://example.com/icddrb.jpg",
    diagnosticPrices: {
      'CT Scan': 9000,
      'Blood Tests': 1200,
      'Endoscopy': 6500,
      'Ultrasound': 3100,
      'X-Ray': 950,
      'Microbiology': 1700
    }
  },
  {
    id: 19,
    name: "CRP",
    location: "Savar, Dhaka",
    specialty: "Rehabilitation",
    beds: 200,
    rating: 4.5,
    reviews: 240,
    image: "https://example.com/crp.jpg",
    diagnosticPrices: {
      'CT Scan': 9500,
      'Blood Tests': 1250,
      'Endoscopy': 6700,
      'Ultrasound': 3150,
      'X-Ray': 980,
      'Microbiology': 1750
    }
  },
  {
    id: 20,
    name: "Shaheed Suhrawardy Medical College Hospital",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 650,
    rating: 4.4,
    reviews: 195,
    image: "https://example.com/suhrawardy.jpg",
    diagnosticPrices: {
      'CT Scan': 10500,
      'Blood Tests': 1350,
      'Endoscopy': 7200,
      'Ultrasound': 3250,
      'X-Ray': 1020,
      'Microbiology': 1850
    }
  },
  {
    id: 21,
    name: "Kurmitola General Hospital",
    location: "Dhaka Cantonment, Dhaka",
    specialty: "General Hospital",
    beds: 500,
    rating: 4.3,
    reviews: 180,
    image: "https://example.com/kurmitola.jpg",
    diagnosticPrices: {
      'CT Scan': 9500,
      'Blood Tests': 1250,
      'Endoscopy': 6700,
      'Ultrasound': 3150,
      'X-Ray': 980,
      'Microbiology': 1750
    }
  },
  {
    id: 22,
    name: " সম্মিলিত সামরিক হাসপাতাল",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 480,
    rating: 4.2,
    reviews: 170,
    image: "https://example.com/cmh2.jpg",
    diagnosticPrices: {
      'CT Scan': 9000,
      'Blood Tests': 1200,
      'Endoscopy': 6500,
      'Ultrasound': 3100,
      'X-Ray': 950,
      'Microbiology': 1700
    }
  },
  {
    id: 23,
    name: "সিকদার মেডিকেল কলেজ",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 470,
    rating: 4.6,
    reviews: 220,
    image: "https://example.com/sikder.jpg",
    diagnosticPrices: {
      'CT Scan': 10500,
      'Blood Tests': 1350,
      'Endoscopy': 7200,
      'Ultrasound': 3250,
      'X-Ray': 1020,
      'Microbiology': 1850
    }
  },
  {
    id: 24,
    name: "ডেল্টা মেডিকেল কলেজ",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 460,
    rating: 4.5,
    reviews: 210,
    image: "https://example.com/delta.jpg",
    diagnosticPrices: {
      'CT Scan': 11000,
      'Blood Tests': 1500,
      'Endoscopy': 8000,
      'Ultrasound': 3500,
      'X-Ray': 1200,
      'Microbiology': 2000
    }
  }
];
