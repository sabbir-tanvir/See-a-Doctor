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
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    id: 2,
    name: "United Hospital",
    location: "Gulshan, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 450,
    rating: 4.7,
    reviews: 290,
    image: "https://ext.same-assets.com/174619264/1758392046.webp"
  },
  {
    id: 3,
    name: "Labaid Specialized Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 300,
    rating: 4.6,
    reviews: 260,
    image: "https://ext.same-assets.com/174619264/3976203418.webp"
  },
  {
    id: 4,
    name: "Popular Medical College Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 250,
    rating: 4.5,
    reviews: 230,
    image: "https://ext.same-assets.com/174619264/1293475806.webp"
  },
  {
    id: 5,
    name: "Apollo Hospitals Dhaka",
    location: "Bashundhara, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 400,
    rating: 4.7,
    reviews: 280,
    image: "https://example.com/apollo.jpg"
  },
  {
    id: 6,
    name: "Dhaka Medical College Hospital",
    location: "Dhaka",
    specialty: "Public hospital",
    beds: 800,
    rating: 4.3,
    reviews: 190,
    image: "https://example.com/dmch.jpg"
  },
  {
    id: 7,
    name: "Bangladesh Eye Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Eye care",
    beds: 150,
    rating: 4.5,
    reviews: 210,
    image: "https://example.com/eye.jpg"
  },
  {
    id: 8,
    name: "National Institute of Neurosciences",
    location: "Agargaon, Dhaka",
    specialty: "Neurology",
    beds: 200,
    rating: 4.6,
    reviews: 240,
    image: "https://example.com/neuro.jpg"
  },
  {
    id: 9,
    name: "Mind Aid Hospital",
    location: "Mirpur, Dhaka",
    specialty: "Psychiatry",
    beds: 100,
    rating: 4.4,
    reviews: 180,
    image: "https://example.com/mindaid.jpg"
  },
  {
    id: 10,
    name: "BIRDEM General Hospital",
    location: "Shahbag, Dhaka",
    specialty: "Diabetes and endocrinology",
    beds: 500,
    rating: 4.8,
    reviews: 350,
    image: "https://example.com/birdem.jpg"
  },
  {
    id: 11,
    name: "Ibn Sina Medical College Hospital",
    location: "Kallyanpur, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 320,
    rating: 4.5,
    reviews: 220,
    image: "https://example.com/ibnsina.jpg"
  },
  {
    id: 12,
    name: "CMH Dhaka",
    location: "Dhaka Cantonment",
    specialty: "Military hospital",
    beds: 400,
    rating: 4.7,
    reviews: 270,
    image: "https://example.com/cmh.jpg"
  },
  {
    id: 13,
    name: "Kidney Foundation Hospital",
    location: "Mirpur, Dhaka",
    specialty: "Nephrology",
    beds: 180,
    rating: 4.4,
    reviews: 200,
    image: "https://example.com/kidney.jpg"
  },
  {
    id: 14,
    name: "National Institute of Diseases of the Chest and Hospital",
    location: "Mohakhali, Dhaka",
    specialty: "Pulmonology",
    beds: 250,
    rating: 4.6,
    reviews: 250,
    image: "https://example.com/chest.jpg"
  },
  {
    id: 15,
    name: "Bangabandhu Sheikh Mujib Medical University",
    location: "Shahbag, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 700,
    rating: 4.7,
    reviews: 300,
    image: "https://example.com/bsmmu.jpg"
  },
  {
    id: 16,
    name: "Ahsania Mission Cancer Hospital",
    location: "Uttara, Dhaka",
    specialty: "Oncology",
    beds: 220,
    rating: 4.5,
    reviews: 230,
    image: "https://example.com/ahsania.jpg"
  },
  {
    id: 17,
    name: "National Institute of Cancer Research & Hospital",
    location: "Mohakhali, Dhaka",
    specialty: "Oncology",
    beds: 300,
    rating: 4.8,
    reviews: 330,
    image: "https://example.com/nicrh.jpg"
  },
  {
    id: 18,
    name: "ICDDR,B",
    location: "Mohakhali, Dhaka",
    specialty: "Diarrheal disease research",
    beds: 150,
    rating: 4.6,
    reviews: 260,
    image: "https://example.com/icddrb.jpg"
  },
  {
    id: 19,
    name: "CRP",
    location: "Savar, Dhaka",
    specialty: "Rehabilitation",
    beds: 200,
    rating: 4.5,
    reviews: 240,
    image: "https://example.com/crp.jpg"
  },
  {
    id: 20,
    name: "Shaheed Suhrawardy Medical College Hospital",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 650,
    rating: 4.4,
    reviews: 195,
    image: "https://example.com/suhrawardy.jpg"
  },
  {
    id: 21,
    name: "Kurmitola General Hospital",
    location: "Dhaka Cantonment, Dhaka",
    specialty: "General Hospital",
    beds: 500,
    rating: 4.3,
    reviews: 180,
    image: "https://example.com/kurmitola.jpg"
  },
  {
    id: 22,
    name: " সম্মিলিত সামরিক হাসপাতাল",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 480,
    rating: 4.2,
    reviews: 170,
    image: "https://example.com/cmh2.jpg"
  },
  {
    id: 23,
    name: "সিকদার মেডিকেল কলেজ",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 470,
    rating: 4.6,
    reviews: 220,
    image: "https://example.com/sikder.jpg"
  },
  {
    id: 24,
    name: "ডেল্টা মেডিকেল কলেজ",
    location: "Dhaka",
    specialty: "General Hospital",
    beds: 460,
    rating: 4.5,
    reviews: 210,
    image: "https://example.com/delta.jpg"
  }
];
