export interface Review {
  _id: string;
  user: string; // User ID
  doctor?: string; // Doctor ID (optional)
  hospital?: string; // Hospital ID (optional)
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
} 