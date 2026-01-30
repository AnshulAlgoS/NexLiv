
export const propertyTypes = [
  { value: "room", label: "Room" },
  { value: "pg", label: "PG" },
  { value: "hostel", label: "Hostel" },
  { value: "flat", label: "Flat" },
  { value: "home", label: "Home" },
];

export const cities = [
  "Noida",
  "Ghaziabad",
  "Bangalore",
  "Delhi",
  "Gurgaon",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Chennai"
];

export const amenitiesList = [
  "WiFi",
  "AC",
  "TV",
  "Power Backup",
  "Geyser",
  "Parking",
  "Security",
  "Gym",
  "Swimming Pool",
  "Laundry",
  "Lift",
  "CCTV",
  "Housekeeping",
  "Food Available"
];

export interface LivingProfile {
  purpose: "rent" | "buy" | "sell";
  propertyType: "room" | "pg" | "hostel" | "flat" | "home";
  budgetRange: [number, number];
  preferredCity: string;
  location: { lat: number; lng: number };
  maxCommuteTime: number; // mins
  safetyImportance: number; // 1-5
  crowdTolerance: "low" | "medium" | "high";
  preferences: string[];
}

export interface Locality {
  id: string;
  name: string;
  city: string;
  matchScore?: number;
  matchReason?: string;
  stats: {
    avgRent: number;
    avgSalePrice: number; // in Lakhs
    safetyScore: number;
    connectivityScore: number;
    lifestyleScore: number;
  };
  tags: string[];
  description: string;
  coordinates: [number, number]; // [lat, lng]
}

export const MOCK_LOCALITIES: Locality[] = [
  {
    id: "loc1",
    name: "Sector 62",
    city: "Noida",
    stats: {
      avgRent: 18000,
      avgSalePrice: 85,
      safetyScore: 91,
      connectivityScore: 95,
      lifestyleScore: 88
    },
    tags: ["IT Hub", "Metro Connected", "Student Friendly"],
    description: "A bustling IT hub with excellent metro connectivity and vibrant student life.",
    coordinates: [28.6208, 77.3639]
  },
  {
    id: "loc2",
    name: "Indirapuram",
    city: "Ghaziabad",
    stats: {
      avgRent: 15000,
      avgSalePrice: 75,
      safetyScore: 87,
      connectivityScore: 82,
      lifestyleScore: 92
    },
    tags: ["Family Friendly", "Parks", "Shopping Malls"],
    description: "A premium residential area perfect for families with great schools and malls.",
    coordinates: [28.6415, 77.3714]
  },
  {
    id: "loc3",
    name: "Vaishali",
    city: "Ghaziabad",
    stats: {
      avgRent: 16000,
      avgSalePrice: 80,
      safetyScore: 82,
      connectivityScore: 90,
      lifestyleScore: 85
    },
    tags: ["Metro Access", "Affordable", "Market Access"],
    description: "Well-connected locality with direct metro access to Delhi and affordable rentals.",
    coordinates: [28.6496, 77.3396]
  },
  {
    id: "loc4",
    name: "Koramangala",
    city: "Bangalore",
    stats: {
      avgRent: 25000,
      avgSalePrice: 150,
      safetyScore: 88,
      connectivityScore: 85,
      lifestyleScore: 98
    },
    tags: ["Nightlife", "Startups", "Premium"],
    description: "The heart of Bangalore's nightlife and startup ecosystem.",
    coordinates: [12.9352, 77.6245]
  },
  {
    id: "loc5",
    name: "HSR Layout",
    city: "Bangalore",
    stats: {
      avgRent: 22000,
      avgSalePrice: 130,
      safetyScore: 92,
      connectivityScore: 88,
      lifestyleScore: 90
    },
    tags: ["Spacious", "Green", "Tech Hub"],
    description: "Planned layout with wide roads, parks, and a peaceful environment.",
    coordinates: [12.9141, 77.6411]
  }
];

export interface Property {
  id: string;
  title: string;
  type: "room" | "pg" | "hostel" | "flat" | "home";
  purpose: "rent" | "sale" | "buy" | "sell";
  price: number | string;
  location: string;
  localityId: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFeatured?: boolean;
  isVerified?: boolean;
  aiScore?: number;
  priceUnit?: string;
  city?: string;
  areaUnit?: string;
  aiReason?: string;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Luxury 2BHK with City View",
    type: "flat",
    purpose: "rent",
    price: 22000,
    location: "Sector 62, Noida",
    localityId: "loc1",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    isFeatured: true,
    isVerified: true,
    aiScore: 95,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    aiReason: "Perfect match for your budget and commute preference."
  },
  {
    id: "p2",
    title: "Cozy Studio for Students",
    type: "room",
    purpose: "rent",
    price: 8000,
    location: "Sector 62, Noida",
    localityId: "loc1",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 300,
    aiScore: 88,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    aiReason: "Great value and close to student hubs."
  },
  {
    id: "p3",
    title: "Premium Villa in Indirapuram",
    type: "home",
    purpose: "sale",
    price: "1.5 Cr",
    location: "Indirapuram, Ghaziabad",
    localityId: "loc2",
    image: "https://images.unsplash.com/photo-1600596542815-22b5c1221b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=2344&q=80",
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    isFeatured: true,
    city: "Ghaziabad",
    areaUnit: "sqft",
    aiScore: 92,
    aiReason: "High appreciation potential in this area."
  },
  {
    id: "p4",
    title: "Modern 3BHK Apartment",
    type: "flat",
    purpose: "rent",
    price: 16500,
    location: "Vaishali, Ghaziabad",
    localityId: "loc3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    priceUnit: "/mo",
    city: "Ghaziabad",
    areaUnit: "sqft",
    aiScore: 85,
    aiReason: "Spacious and well-connected to metro."
  },
  {
    id: "p5",
    title: "Luxury Penthouse",
    type: "flat",
    purpose: "rent",
    price: 45000,
    location: "Koramangala, Bangalore",
    localityId: "loc4",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    isFeatured: true,
    isVerified: true,
    priceUnit: "/mo",
    city: "Bangalore",
    areaUnit: "sqft",
    aiScore: 98,
    aiReason: "Top-tier lifestyle with premium amenities."
  },
  {
    id: "p6",
    title: "Startup Co-living Space",
    type: "pg",
    purpose: "rent",
    price: 12000,
    location: "Koramangala, Bangalore",
    localityId: "loc4",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2338&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    priceUnit: "/mo",
    city: "Bangalore",
    areaUnit: "sqft",
    aiScore: 90,
    aiReason: "Vibrant community for startup founders."
  },
  {
    id: "p7",
    title: "Green View Apartment",
    type: "flat",
    purpose: "rent",
    price: 24000,
    location: "HSR Layout, Bangalore",
    localityId: "loc5",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    priceUnit: "/mo",
    city: "Bangalore",
    areaUnit: "sqft",
    aiScore: 89,
    aiReason: "Peaceful environment with great connectivity."
  }
];
