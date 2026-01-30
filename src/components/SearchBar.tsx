import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, Sparkles } from "lucide-react";
import { propertyTypes, cities } from "@/lib/data";

interface SearchBarProps {
  variant?: "hero" | "compact";
}

const SearchBar = ({ variant = "hero" }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (propertyType) params.set("type", propertyType);
    if (city) params.set("city", city);
    navigate(`/explore?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <div className="flex gap-2 p-2 bg-card rounded-xl shadow-card">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9 border-0 bg-secondary"
          />
        </div>
        <Button onClick={handleSearch} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl shadow-card-hover p-2 md:p-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
          {/* Location Input */}
          <div className="relative md:col-span-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter area or locality"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12 border-0 bg-secondary rounded-xl"
            />
          </div>

          {/* City Select */}
          <div className="md:col-span-1">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12 border-0 bg-secondary rounded-xl">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type Select */}
          <div className="md:col-span-1">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12 border-0 bg-secondary rounded-xl">
                <Home className="h-5 w-5 text-muted-foreground mr-2" />
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            size="lg"
            variant="hero"
            className="h-12 rounded-xl gap-2"
          >
            <Sparkles className="h-5 w-5" />
            AI Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
