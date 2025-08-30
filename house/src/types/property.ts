export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  billsIncluded: boolean;
  available: boolean;
  images: string[];
  description: string;
  amenities: string[];
  university: string;
  walkingDistance: string;
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface PropertyFilter {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  billsIncluded?: boolean;
  available?: boolean;
}