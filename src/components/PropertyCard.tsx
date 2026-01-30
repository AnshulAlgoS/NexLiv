import { Link } from "react-router-dom";
import { Property } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Maximize, Sparkles, CheckCircle } from "lucide-react";
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
    house: "bg-rose-100 text-rose-700",
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block bg-red-950/20 rounded-none overflow-hidden border border-white/10 card-3d hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`${typeColors[property.type]} border-0 capitalize rounded-none`}>
            {property.type}
          </Badge>
          {property.isFeatured && (
            <Badge className="bg-primary text-black border-0 rounded-none font-bold">
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
          className="absolute top-3 right-3 p-2 rounded-none bg-black/50 backdrop-blur-sm hover:bg-black/70 border border-white/10 transition-colors"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-primary text-primary" : "text-white"
            }`}
          />
        </button>

        {/* AI Score Badge */}
        {showAiScore && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-primary text-black text-sm font-bold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="h-4 w-4" />
            {property.aiScore}% Match
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="text-xl font-bold text-white">
            {formatPrice(property.price)}
            <span className="text-sm font-normal opacity-80 text-gray-300 ml-1">{property.priceUnit}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-red-950/20">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          {property.isVerified && (
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-1 mt-1 text-gray-400">
          <MapPin className="h-4 w-4" />
          <span className="text-sm line-clamp-1">{property.location}, {property.city}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-primary" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-primary" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-primary" />
            <span>{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {/* AI Reason */}
        {showAiScore && (
          <div className="mt-3 p-2 rounded-none bg-primary/10 border border-primary/20">
            <p className="text-xs text-primary flex items-center gap-1 font-medium">
              <Sparkles className="h-3 w-3" />
              {property.aiReason}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;
