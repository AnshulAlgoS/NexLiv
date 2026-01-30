import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_PROPERTIES } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  Phone, 
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Sparkles,
  Clock,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const rawProperty = MOCK_PROPERTIES.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = rawProperty ? {
    ...rawProperty,
    images: [
      rawProperty.image,
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
    ],
    listingType: rawProperty.purpose,
    description: `Experience premium living in this ${rawProperty.title}. Located in ${rawProperty.location}, this property offers modern amenities and excellent connectivity. Perfect for those looking for a blend of comfort and convenience.`,
    amenities: ["Power Backup", "24x7 Security", "Gym", "Swimming Pool", "Club House"],
    availableFrom: "Immediately",
    postedOn: "2 days ago",
    ownerName: "NEXLIV Verified Partner",
    aiScore: rawProperty.aiScore || 85,
    city: rawProperty.city || "Noida",
    priceUnit: rawProperty.priceUnit || "",
    areaUnit: rawProperty.areaUnit || "sqft",
    aiReason: rawProperty.aiReason || "Great property match."
  } : null;

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
            <Link to="/explore">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similarProperties = MOCK_PROPERTIES
    .filter(p => p.id !== property.id && p.type === property.type)
    .slice(0, 3);

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="bg-red-950/80 border-b border-white/10">
          <div className="container py-4">
            <Link 
              to="/explore" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to listings
            </Link>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative rounded-none overflow-hidden aspect-video bg-black/50 border border-white/10 card-3d">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-none bg-black/50 backdrop-blur-sm hover:bg-black/70 border border-white/10 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-none bg-black/50 backdrop-blur-sm hover:bg-black/70 border border-white/10 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-none transition-colors ${
                            index === currentImageIndex ? "bg-primary" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-none bg-primary text-black font-bold border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="h-4 w-4" />
                  {property.aiScore}% AI Match
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-3 rounded-none bg-black/50 backdrop-blur-sm hover:bg-black/70 border border-white/10 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-primary text-primary" : "text-white"}`} />
                  </button>
                  <button className="p-3 rounded-none bg-black/50 backdrop-blur-sm hover:bg-black/70 border border-white/10 transition-colors">
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <Badge className="capitalize rounded-none bg-white/10 hover:bg-white/20 text-white border-white/10">{property.type}</Badge>
                  <Badge variant="outline" className="capitalize rounded-none text-gray-300 border-white/20">For {property.listingType}</Badge>
                  {property.isFeatured && <Badge className="bg-primary text-black rounded-none hover:bg-primary/90">Featured</Badge>}
                  {property.isVerified && (
                    <Badge variant="outline" className="text-primary border-primary rounded-none">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{property.location}, {property.city}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-red-950/30 rounded-none border border-white/10 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-white mb-1">
                      <Bed className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">{property.bedrooms}</span>
                    </div>
                    <p className="text-sm text-gray-400">Bedrooms</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <div className="flex items-center justify-center gap-2 text-white mb-1">
                      <Bath className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">{property.bathrooms}</span>
                    </div>
                    <p className="text-sm text-gray-400">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-white mb-1">
                      <Maximize className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">{property.area}</span>
                    </div>
                    <p className="text-sm text-gray-400">{property.areaUnit}</p>
                  </div>
                </div>

                <div className="p-4 rounded-none bg-primary/10 border border-primary/20 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-none bg-primary border border-primary">
                      <Sparkles className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Why We Recommend This</p>
                      <p className="text-sm text-gray-300">{property.aiReason}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-white/10" />

                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">About This Property</h2>
                  <p className="text-gray-400 leading-relaxed">{property.description}</p>
                </div>

                <Separator className="my-6 bg-white/10" />

                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-none bg-white/5 border border-white/5"
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-gray-300">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="bg-red-950/50 rounded-none border border-white/10 p-6 card-3d">
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-white">
                      {formatPrice(property.price)}
                      <span className="text-lg font-normal text-gray-400">{property.priceUnit}</span>
                    </p>
                    {property.listingType === "rent" && (
                      <p className="text-sm text-gray-500 mt-1">+ maintenance charges</p>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-gray-400">Available:</span>
                      <span className="font-medium text-white">{property.availableFrom}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-gray-400">Posted:</span>
                      <span className="font-medium text-white">{property.postedOn}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full gap-2 rounded-none bg-primary text-black hover:bg-primary/90 btn-3d font-bold" size="lg">
                      <Phone className="h-4 w-4" />
                      Call Owner
                    </Button>
                    <Button variant="outline" className="w-full gap-2 rounded-none border-white/20 text-white hover:bg-white/10 hover:text-white" size="lg">
                      <MessageCircle className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>

                <div className="bg-red-950/30 rounded-none border border-white/10 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-none bg-primary/10 flex items-center justify-center border border-primary/20">
                      <User className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{property.ownerName}</p>
                      <p className="text-sm text-gray-400">Property Owner</p>
                    </div>
                    {property.isVerified && (
                      <Badge variant="outline" className="ml-auto text-primary border-primary rounded-none">
                        <CheckCircle className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    Contact the owner directly for property visits, negotiations, and more details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} showAiScore />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
