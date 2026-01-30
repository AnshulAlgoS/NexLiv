
export const propertyTypes = [
  { value: "room", label: "Room" },
  { value: "pg", label: "PG" },
  { value: "hostel", label: "Hostel" },
  { value: "flat", label: "Flat" },
  { value: "home", label: "Home" },
];

export const cities = [
  "Noida",
  "Delhi",
  "Gurgaon",
  "Ghaziabad",
  "Lucknow",
  "Varanasi",
  "Kanpur",
  "Agra",
  "Bangalore",
  "Mumbai"
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

export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
    tags: string[];
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
    safetyScore: number; // 0-100
    connectivityScore: number;
    lifestyleScore: number;
    crowdRating: number; // 1-5 stars
    nightlifeRating: number; // 1-5 stars
  };
  tags: string[];
  description: string;
  coordinates: [number, number]; // [lat, lng]
  reviews: Review[];
}

export const MOCK_LOCALITIES: Locality[] = [
  // DELHI
  {
    id: "loc_del_1",
    name: "Hauz Khas",
    city: "Delhi",
    stats: { avgRent: 35000, avgSalePrice: 350, safetyScore: 88, connectivityScore: 90, lifestyleScore: 98, crowdRating: 4.8, nightlifeRating: 5.0 },
    tags: ["Nightlife", "Premium", "Historic", "Young Crowd"],
    description: "The party capital of Delhi, blending historic ruins with modern cafes and boutiques.",
    coordinates: [28.5494, 77.2001],
    reviews: [
        { id: "r1", user: "Rohan", rating: 5, comment: "Best place for weekends!", date: "2024-01-15", tags: ["Nightlife"] },
        { id: "r2", user: "Sara", rating: 4, comment: "Bit crowded but safe.", date: "2024-02-01", tags: ["Safety"] }
    ]
  },
  {
    id: "loc_del_2",
    name: "Dwarka",
    city: "Delhi",
    stats: { avgRent: 20000, avgSalePrice: 120, safetyScore: 85, connectivityScore: 92, lifestyleScore: 80, crowdRating: 4.0, nightlifeRating: 3.5 },
    tags: ["Residential", "Metro Connected", "Parks"],
    description: "Well-planned sub-city with wide roads, parks, and excellent metro connectivity.",
    coordinates: [28.5921, 77.0460],
    reviews: [
        { id: "r3", user: "Amit", rating: 4.5, comment: "Very peaceful for families.", date: "2024-01-20", tags: ["Family"] }
    ]
  },
  {
    id: "loc_del_3",
    name: "Connaught Place",
    city: "Delhi",
    stats: { avgRent: 45000, avgSalePrice: 500, safetyScore: 90, connectivityScore: 98, lifestyleScore: 95, crowdRating: 4.5, nightlifeRating: 4.8 },
    tags: ["Business Hub", "Shopping", "Central"],
    description: "The heart of Delhi, iconic colonial architecture, shopping, and business.",
    coordinates: [28.6304, 77.2177],
    reviews: []
  },

  // NOIDA & UP
  {
    id: "loc_noi_1",
    name: "Sector 62",
    city: "Noida",
    stats: { avgRent: 18000, avgSalePrice: 85, safetyScore: 91, connectivityScore: 95, lifestyleScore: 88, crowdRating: 4.2, nightlifeRating: 3.0 },
    tags: ["IT Hub", "Student Friendly", "Metro"],
    description: "A bustling IT hub with excellent metro connectivity and vibrant student life.",
    coordinates: [28.6208, 77.3639],
    reviews: []
  },
  {
    id: "loc_noi_2",
    name: "Sector 18",
    city: "Noida",
    stats: { avgRent: 25000, avgSalePrice: 150, safetyScore: 88, connectivityScore: 95, lifestyleScore: 94, crowdRating: 4.6, nightlifeRating: 4.5 },
    tags: ["Shopping", "Nightlife", "Malls"],
    description: "The entertainment hub of Noida with huge malls and great restaurants.",
    coordinates: [28.5708, 77.3271],
    reviews: []
  },
  {
    id: "loc_lko_1",
    name: "Hazratganj",
    city: "Lucknow",
    stats: { avgRent: 15000, avgSalePrice: 90, safetyScore: 89, connectivityScore: 88, lifestyleScore: 92, crowdRating: 4.7, nightlifeRating: 4.0 },
    tags: ["Historic", "Shopping", "Heart of City"],
    description: "The Victorian-style shopping area in the heart of Lucknow.",
    coordinates: [26.8467, 80.9462],
    reviews: []
  },
  {
    id: "loc_lko_2",
    name: "Gomti Nagar",
    city: "Lucknow",
    stats: { avgRent: 18000, avgSalePrice: 110, safetyScore: 92, connectivityScore: 85, lifestyleScore: 95, crowdRating: 4.5, nightlifeRating: 4.2 },
    tags: ["Planned", "Posh", "Parks"],
    description: "A planned, posh residential and commercial extension of Lucknow.",
    coordinates: [26.8500, 81.0000],
    reviews: []
  },
  {
    id: "loc_vns_1",
    name: "Assi Ghat",
    city: "Varanasi",
    stats: { avgRent: 12000, avgSalePrice: 70, safetyScore: 85, connectivityScore: 80, lifestyleScore: 90, crowdRating: 4.9, nightlifeRating: 3.5 },
    tags: ["Cultural", "River View", "Tourists"],
    description: "The southernmost ghat in Varanasi, popular for recreation and festivals.",
    coordinates: [25.2916, 83.0049],
    reviews: []
  },

  // GURGAON
  {
    id: "loc_ggn_1",
    name: "Cyber Hub",
    city: "Gurgaon",
    stats: { avgRent: 40000, avgSalePrice: 250, safetyScore: 88, connectivityScore: 92, lifestyleScore: 99, crowdRating: 4.9, nightlifeRating: 5.0 },
    tags: ["Corporate", "Premium Dining", "Nightlife"],
    description: "India's first integrated food and entertainment destination.",
    coordinates: [28.4952, 77.0891],
    reviews: []
  },

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
  crowdRating?: number; // 1-5
  safetyRating?: number; // 1-5
}

export const MOCK_PROPERTIES: Property[] = [
  // DELHI - HAUZ KHAS
  {
    id: "p_del_1",
    title: "Bohemian Studio with Lake View",
    type: "flat",
    purpose: "rent",
    price: 38000,
    location: "Hauz Khas Village, Delhi",
    localityId: "loc_del_1",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    isVerified: true,
    aiScore: 96,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.8,
    safetyRating: 4.5,
    aiReason: "Perfect for creatives who love nightlife."
  },
  {
    id: "p_del_2",
    title: "3BHK Designer Apartment",
    type: "flat",
    purpose: "rent",
    price: 65000,
    location: "Hauz Khas Enclave, Delhi",
    localityId: "loc_del_1",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    isFeatured: true,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.7,
    safetyRating: 4.8
  },
  
  // DELHI - DWARKA
  {
    id: "p_del_3",
    title: "Spacious 2BHK near Metro",
    type: "flat",
    purpose: "rent",
    price: 22000,
    location: "Sector 10, Dwarka, Delhi",
    localityId: "loc_del_2",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.0,
    safetyRating: 4.5
  },
  {
    id: "p_del_4",
    title: "Affordable PG for Students",
    type: "pg",
    purpose: "rent",
    price: 8000,
    location: "Sector 7, Dwarka, Delhi",
    localityId: "loc_del_2",
    image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 150,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 3.8,
    safetyRating: 4.2
  },

  // NOIDA - SECTOR 62
  {
    id: "p_noi_1",
    title: "Luxury 2BHK with City View",
    type: "flat",
    purpose: "rent",
    price: 22000,
    location: "Sector 62, Noida",
    localityId: "loc_noi_1",
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
    crowdRating: 4.3,
    safetyRating: 4.6
  },
  {
    id: "p_noi_2",
    title: "Cozy Studio for Students",
    type: "room",
    purpose: "rent",
    price: 8000,
    location: "Sector 62, Noida",
    localityId: "loc_noi_1",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 300,
    aiScore: 88,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 4.1,
    safetyRating: 4.4
  },
  
  // NOIDA - SECTOR 18
  {
    id: "p_noi_3",
    title: "Premium Apartment near Mall",
    type: "flat",
    purpose: "rent",
    price: 28000,
    location: "Sector 18, Noida",
    localityId: "loc_noi_2",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    isFeatured: true,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 4.6,
    safetyRating: 4.2
  },

  // LUCKNOW - GOMTI NAGAR
  {
    id: "p_lko_1",
    title: "Independent Floor in Gomti Nagar",
    type: "home",
    purpose: "rent",
    price: 18000,
    location: "Vibhuti Khand, Gomti Nagar",
    localityId: "loc_lko_2",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    priceUnit: "/mo",
    city: "Lucknow",
    areaUnit: "sqft",
    crowdRating: 4.4,
    safetyRating: 4.7
  },
  {
    id: "p_lko_2",
    title: "Furnished Flat for Professionals",
    type: "flat",
    purpose: "rent",
    price: 20000,
    location: "Gomti Nagar Extension",
    localityId: "loc_lko_2",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    priceUnit: "/mo",
    city: "Lucknow",
    areaUnit: "sqft",
    crowdRating: 4.5,
    safetyRating: 4.6
  },
  
  // VARANASI
  {
    id: "p_vns_1",
    title: "Heritage Home Stay",
    type: "home",
    purpose: "rent",
    price: 15000,
    location: "Near Assi Ghat, Varanasi",
    localityId: "loc_vns_1",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    priceUnit: "/mo",
    city: "Varanasi",
    areaUnit: "sqft",
    crowdRating: 4.8,
    safetyRating: 4.3
  },
  {
    id: "p_vns_2",
    title: "Modern Flat near BHU",
    type: "flat",
    purpose: "rent",
    price: 12000,
    location: "Lanka, Varanasi",
    localityId: "loc_vns_1",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    priceUnit: "/mo",
    city: "Varanasi",
    areaUnit: "sqft",
    crowdRating: 4.5,
    safetyRating: 4.4
  },

  // GURGAON
  {
    id: "p_ggn_1",
    title: "High-Rise Luxury Apartment",
    type: "flat",
    purpose: "rent",
    price: 55000,
    location: "DLF Phase 3, Gurgaon",
    localityId: "loc_ggn_1",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    isVerified: true,
    priceUnit: "/mo",
    city: "Gurgaon",
    areaUnit: "sqft",
    crowdRating: 4.9,
    safetyRating: 4.6
  },
  
  // MORE NOIDA
  {
    id: "p_noi_4",
    title: "Budget PG for Men",
    type: "pg",
    purpose: "rent",
    price: 7000,
    location: "Mamura, Sector 66, Noida",
    localityId: "loc_noi_1",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2338&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 150,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 3.5,
    safetyRating: 3.8
  },
  {
    id: "p_noi_5",
    title: "Fully Furnished Studio",
    type: "room",
    purpose: "rent",
    price: 14000,
    location: "Sector 62, Noida",
    localityId: "loc_noi_1",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 400,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 4.2,
    safetyRating: 4.5
  },
  {
    id: "p_noi_6",
    title: "Independent House Floor",
    type: "home",
    purpose: "rent",
    price: 26000,
    location: "Sector 55, Noida",
    localityId: "loc_noi_1",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 4.0,
    safetyRating: 4.7
  },

  // MORE LUCKNOW
  {
    id: "p_lko_3",
    title: "Girls Hostel near University",
    type: "hostel",
    purpose: "rent",
    price: 6000,
    location: "Hazratganj, Lucknow",
    localityId: "loc_lko_1",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2338&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    priceUnit: "/mo",
    city: "Lucknow",
    areaUnit: "sqft",
    crowdRating: 4.6,
    safetyRating: 4.8
  },
  {
    id: "p_lko_4",
    title: "Commercial Space / Office",
    type: "flat",
    purpose: "rent",
    price: 45000,
    location: "Hazratganj Main Road",
    localityId: "loc_lko_1",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 0,
    bathrooms: 1,
    area: 800,
    priceUnit: "/mo",
    city: "Lucknow",
    areaUnit: "sqft",
    crowdRating: 4.9,
    safetyRating: 4.8
  },

  // MORE DELHI
  {
    id: "p_del_5",
    title: "Premium 4BHK with Servant Room",
    type: "flat",
    purpose: "sale",
    price: "4.5 Cr",
    location: "Greater Kailash 1, Delhi",
    localityId: "loc_del_1",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 4,
    bathrooms: 5,
    area: 3200,
    isVerified: true,
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.9,
    safetyRating: 4.9
  },
  {
    id: "p_del_6",
    title: "Shared Flat for Working Professionals",
    type: "flat",
    purpose: "rent",
    price: 18000,
    location: "Malviya Nagar, Delhi",
    localityId: "loc_del_1",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.7,
    safetyRating: 4.6
  },

  // DELHI - CONNAUGHT PLACE
  {
    id: "p_del_cp_1",
    title: "Modern Office Studio",
    type: "flat",
    purpose: "rent",
    price: 45000,
    location: "Connaught Place, Delhi",
    localityId: "loc_del_3",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.5,
    safetyRating: 4.8
  },
  {
    id: "p_del_cp_2",
    title: "Heritage Apartment",
    type: "flat",
    purpose: "rent",
    price: 85000,
    location: "Connaught Place, Inner Circle",
    localityId: "loc_del_3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    isFeatured: true,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.7,
    safetyRating: 4.9
  },

  // NOIDA - SECTOR 18
  {
    id: "p_noi_7",
    title: "Commercial Shop / Office",
    type: "flat",
    purpose: "rent",
    price: 60000,
    location: "Sector 18, Noida",
    localityId: "loc_noi_2",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 0,
    bathrooms: 1,
    area: 800,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 4.8,
    safetyRating: 4.5
  },
  {
    id: "p_noi_8",
    title: "Luxury 3BHK Apartment",
    type: "flat",
    purpose: "rent",
    price: 40000,
    location: "Sector 18, Noida",
    localityId: "loc_noi_2",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    priceUnit: "/mo",
    city: "Noida",
    areaUnit: "sqft",
    crowdRating: 4.5,
    safetyRating: 4.6
  },

  // LUCKNOW - HAZRATGANJ
  {
    id: "p_lko_5",
    title: "Vintage Bungalow",
    type: "home",
    purpose: "sale",
    price: "3.5 Cr",
    location: "Hazratganj, Lucknow",
    localityId: "loc_lko_1",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    isVerified: true,
    city: "Lucknow",
    areaUnit: "sqft",
    crowdRating: 4.8,
    safetyRating: 4.8
  },
  
  // VARANASI
  {
    id: "p_vns_3",
    title: "Guest House near Ghat",
    type: "hostel",
    purpose: "rent",
    price: 10000,
    location: "Assi Ghat, Varanasi",
    localityId: "loc_vns_1",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2338&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    priceUnit: "/mo",
    city: "Varanasi",
    areaUnit: "sqft",
    crowdRating: 4.9,
    safetyRating: 4.2
  },

  // DELHI - HAUZ KHAS
  {
    id: "p_del_7",
    title: "Artist Loft",
    type: "flat",
    purpose: "rent",
    price: 42000,
    location: "Hauz Khas Village",
    localityId: "loc_del_1",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bedrooms: 1,
    bathrooms: 1,
    area: 700,
    priceUnit: "/mo",
    city: "Delhi",
    areaUnit: "sqft",
    crowdRating: 4.6,
    safetyRating: 4.4
  }
];
