import { Link } from "react-router-dom";
import { Property } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Maximize, Sparkles, CheckCircle, Shield } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  showAiScore?: boolean;
}

const PropertyCard = ({ property, showAiScore = false }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number | string) => {
    if (typeof price === "string") return price;
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const typeColors: Record<string, string> = {
    room: "bg-blue-100 text-blue-700",
    pg: "bg-purple-100 text-purple-700",
    hostel: "bg-orange-100 text-orange-700",
    flat: "bg-green-100 text-green-700",
    home: "bg-rose-100 text-rose-700",
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block bg-white rounded-none overflow-hidden border border-gray-200 card-3d hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`${typeColors[property.type] || "bg-gray-100 text-gray-700"} border-0 capitalize rounded-none shadow-sm`}>
            {property.type}
          </Badge>
          {property.isFeatured && (
            <Badge className="bg-[#FACC15] text-black border-0 rounded-none font-bold shadow-sm">
              Featured
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* AI Score Badge */}
        {showAiScore && property.aiScore && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-brand text-white text-sm font-bold shadow-md">
            <Sparkles className="h-4 w-4" />
            {property.aiScore}% Match
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="text-xl font-bold text-white drop-shadow-md">
            {formatPrice(property.price)}
            <span className="text-sm font-normal opacity-90 text-gray-200 ml-1">{property.priceUnit}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-brand transition-colors">
            {property.title}
          </h3>
          {property.isVerified && (
            <div title="Verified Property">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mb-3 text-gray-500">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm line-clamp-1">{property.location}, {property.city}</span>
        </div>

        {/* Ratings - NEW */}
        {(property.crowdRating || property.safetyRating) && (
          <div className="flex gap-3 mb-3 text-xs font-medium">
             {property.crowdRating && (
               <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 border border-yellow-100 rounded-sm text-yellow-700">
                 <span className="text-yellow-500">★</span> Crowd {property.crowdRating}
               </div>
             )}
             {property.safetyRating && (
               <div className="flex items-center gap-1 bg-green-50 px-2 py-1 border border-green-100 rounded-sm text-green-700">
                 <Shield className="w-3 h-3" /> Safety {property.safetyRating}
               </div>
             )}
          </div>
        )}

        {/* Property Details */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-gray-400" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gray-400" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-gray-400" />
            <span>{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {/* AI Reason */}
        {showAiScore && property.aiReason && (
          <div className="mt-3 p-2 rounded-none bg-yellow-50 border border-yellow-100">
            <p className="text-xs text-yellow-800 flex items-start gap-1.5 font-medium">
              <Sparkles className="h-3 w-3 mt-0.5 text-yellow-600 flex-shrink-0" />
              {property.aiReason}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;
