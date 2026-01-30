import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROPERTIES, MOCK_LOCALITIES } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { 
  ArrowLeft, MapPin, Bed, Bath, Maximize, Calendar, Phone, MessageCircle,
  Heart, Share2, CheckCircle, Sparkles, Clock, User, ChevronLeft, ChevronRight,
  Shield, Users, Zap, Star, Map as MapIcon, Info
} from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const PropertyDetail = () => {
  const { id } = useParams();
  const rawProperty = MOCK_PROPERTIES.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const property = rawProperty ? {
    ...rawProperty,
    images: [
      rawProperty.image,
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
    ],
    listingType: rawProperty.purpose,
    description: `Experience premium living in this ${rawProperty.title}. Located in ${rawProperty.location}, this property offers modern amenities and excellent connectivity. Perfect for those looking for a blend of comfort and convenience. The neighborhood is vibrant and safe, making it an ideal choice for families and professionals alike.`,
    amenities: ["Power Backup", "24x7 Security", "Gym", "Swimming Pool", "Club House", "Jogging Track", "Lift", "Car Parking"],
    availableFrom: "Immediately",
    postedOn: "2 days ago",
    ownerName: "NEXLIV Verified Partner",
    aiScore: rawProperty.aiScore || 85,
    city: rawProperty.city || "Noida",
    priceUnit: rawProperty.priceUnit || "",
    areaUnit: rawProperty.areaUnit || "sqft",
    aiReason: rawProperty.aiReason || "Great property match based on your preferences.",
    crowdRating: rawProperty.crowdRating || 4.5,
    safetyRating: rawProperty.safetyRating || 4.5
  } : null;

  const locality = property ? MOCK_LOCALITIES.find(l => l.id === property.localityId) : null;

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
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

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      
      <div className="flex-1 pb-16">
        {/* Breadcrumb & Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container py-3 flex items-center justify-between">
            <Link 
              to="/explore" 
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to listings
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                {isLiked ? "Saved" : "Save"}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>

        <div className="container py-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200 group shadow-md">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-brand font-bold shadow-sm text-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {property.aiScore}% Match
                </div>
              </div>

              {/* Title & Key Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                   <Badge className="bg-brand text-white hover:bg-brand/90 rounded-md px-2 py-0.5 text-xs font-medium uppercase tracking-wider">{property.type}</Badge>
                   {property.isVerified && (
                     <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 rounded-md gap-1">
                       <CheckCircle className="h-3 w-3" /> Verified Property
                     </Badge>
                   )}
                   <span className="text-sm text-gray-500">• Posted {property.postedOn}</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}, {property.city}</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100">
                    <Bed className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-lg font-bold text-gray-900">{property.bedrooms}</span>
                    <span className="text-xs text-gray-500 uppercase">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100">
                    <Bath className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-lg font-bold text-gray-900">{property.bathrooms}</span>
                    <span className="text-xs text-gray-500 uppercase">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Maximize className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-lg font-bold text-gray-900">{property.area}</span>
                    <span className="text-xs text-gray-500 uppercase">{property.areaUnit}</span>
                  </div>
                </div>
              </div>

              {/* AI Insight Card */}
              <div className="bg-gradient-to-br from-brand/5 to-purple-50 rounded-xl border border-brand/10 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-brand">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Why this matches you</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {property.aiReason} The property aligns with your preference for high safety ratings and proximity to lifestyle hubs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Locality Insights - The "USP" */}
              {locality && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <MapIcon className="h-5 w-5 text-gray-400" />
                      Locality Insights
                    </h2>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {locality.name}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Crowd Rating */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <Users className="h-4 w-4 text-brand" /> Crowd Quality
                        </span>
                        <span className="text-lg font-bold text-gray-900">{locality.stats.crowdRating}/5</span>
                      </div>
                      <Progress value={locality.stats.crowdRating * 20} className="h-2 bg-gray-200" indicatorClassName="bg-brand" />
                      <p className="text-xs text-gray-500 mt-2">Based on verified resident reviews</p>
                    </div>

                    {/* Safety Rating */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" /> Safety Score
                        </span>
                        <span className="text-lg font-bold text-gray-900">{locality.stats.safetyScore}%</span>
                      </div>
                      <Progress value={locality.stats.safetyScore} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                      <p className="text-xs text-gray-500 mt-2">High safety index for late hours</p>
                    </div>

                    {/* Nightlife */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-purple-500" /> Lifestyle & Nightlife
                        </span>
                        <span className="text-lg font-bold text-gray-900">{locality.stats.nightlifeRating}/5</span>
                      </div>
                      <Progress value={locality.stats.nightlifeRating * 20} className="h-2 bg-gray-200" indicatorClassName="bg-purple-500" />
                      <p className="text-xs text-gray-500 mt-2">Vibrant area with many cafes & pubs</p>
                    </div>

                    {/* Avg Rent */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col justify-center">
                      <span className="text-sm font-medium text-gray-600 mb-1">Average Rent in Area</span>
                      <span className="text-2xl font-bold text-gray-900">₹{locality.stats.avgRent.toLocaleString()}</span>
                      <p className="text-xs text-gray-500 mt-1">Properties range from ₹15k - ₹60k</p>
                    </div>
                  </div>

                  {/* Reviews Snippet */}
                  {locality.reviews.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">What locals say</h4>
                      <div className="space-y-4">
                        {locality.reviews.slice(0, 2).map((review, idx) => (
                           <div key={idx} className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">
                               {review.user[0]}
                             </div>
                             <div>
                               <div className="flex items-center gap-2">
                                 <span className="font-medium text-sm text-gray-900">{review.user}</span>
                                 <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-3 w-3 ${i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />)}</div>
                               </div>
                               <p className="text-sm text-gray-600 mt-1">"{review.comment}"</p>
                             </div>
                           </div>
                        ))}
                      </div>
                      <Button variant="link" className="text-brand p-0 h-auto mt-4 text-sm" onClick={() => setShowReviewForm(!showReviewForm)}>
                        + Add your review for this area
                      </Button>
                      
                      {showReviewForm && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in slide-in-from-top">
                           <h5 className="font-bold text-sm mb-2">Write a Review</h5>
                           <textarea className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2" rows={3} placeholder="Share your experience about this locality..."></textarea>
                           <div className="flex justify-end gap-2">
                             <Button variant="ghost" size="sm" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                             <Button size="sm" className="bg-brand text-white">Submit Review</Button>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">About this property</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-brand" />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar (Price & Contact) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Price Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">{property.listingType === "rent" ? "Monthly Rent" : "Price"}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-gray-900">{formatPrice(property.price)}</span>
                      <span className="text-lg text-gray-500 mb-1">{property.priceUnit}</span>
                    </div>
                    {property.listingType === "rent" && (
                      <p className="text-xs text-gray-400 mt-1">+ maintenance charges</p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                      <span className="text-gray-500 flex items-center gap-2"><Calendar className="h-4 w-4" /> Available</span>
                      <span className="font-medium text-gray-900">{property.availableFrom}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                      <span className="text-gray-500 flex items-center gap-2"><Info className="h-4 w-4" /> Deposit</span>
                      <span className="font-medium text-gray-900">2 Months</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-gray-500 flex items-center gap-2"><Clock className="h-4 w-4" /> Posted</span>
                      <span className="font-medium text-gray-900">{property.postedOn}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full gap-2 bg-brand text-white hover:bg-brand/90 h-12 text-base font-semibold shadow-sm">
                      <Phone className="h-4 w-4" />
                      Call Owner
                    </Button>
                    <Button variant="outline" className="w-full gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 h-12">
                      <MessageCircle className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Owner Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20">
                    <User className="h-6 w-6 text-brand" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{property.ownerName}</p>
                    <p className="text-xs text-gray-500">Property Owner</p>
                  </div>
                  {property.isVerified && (
                     <Shield className="h-5 w-5 text-green-500" />
                  )}
                </div>

                {/* Safety Tips */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Safe Renting Tips</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Never transfer money before visiting. Verify the owner's identity. Read the agreement carefully.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
                <Link to="/explore" className="text-brand font-medium hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} showAiScore />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
