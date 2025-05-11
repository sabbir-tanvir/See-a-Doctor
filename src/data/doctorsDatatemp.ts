export type Doctor = {
  id: number;
  name: string;
  specialization: string;
  education: string;
  experience: string;
  hospital: string;
  location: string;
  rating: number;
  reviews: number;
  fee: number;
  available: boolean;
  image: string;
};

// Export the doctors data
export const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Anika Rahman",
    specialization: "Gynecologist & Obstetrician",
    education: "MBBS, FCPS (Gynecology & Obstetrics)",
    experience: "12 years",
    hospital: "Popular Medical College Hospital",
    location: "Dhanmondi, Dhaka",
    rating: 4.8,
    reviews: 124,
    fee: 1200,
    available: true,
    image: "https://ext.same-assets.com/174619264/3871928465.webp"
  },
  {
    id: 2,
    name: "Dr. Mahmudul Hassan",
    specialization: "Medicine Specialist",
    education: "MBBS, MD (Medicine)",
    experience: "15 years",
    hospital: "Square Hospital",
    location: "Panthapath, Dhaka",
    rating: 4.9,
    reviews: 210,
    fee: 1500,
    available: true,
    image: "https://ext.same-assets.com/174619264/1294756382.webp"
  }
]