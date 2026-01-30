import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MOCK_LOCALITIES, MOCK_PROPERTIES, Property } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, Map as MapIcon, List, Shield, 
  Wifi, Users, Zap, Star, Maximize2, Minimize2, MapPin
} from "lucide-react";

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Explore = () => {
  const navigate = useNavigate();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocalityId, setSelectedLocalityId] = useState<string | null>(null);
  const [dbProperties, setDbProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setDbProperties(data))
      .catch(err => console.log("Backend not reachable, displaying mock data only"));
  }, []);

  // Normalize DB properties to match Mock Property interface
  const normalizedDbProperties: Property[] = useMemo(() => {
    return dbProperties.map(p => ({
      id: p._id,
      title: p.title,
      type: p.propertyType,
      purpose: p.listingType,
      price: p.price,
      location: p.location,
      city: p.city,
      localityId: MOCK_LOCALITIES.find(l => 
        p.location.toLowerCase().includes(l.name.toLowerCase()) || 
        p.location.toLowerCase().includes(l.id)
      )?.id || "other",
      image: p.images && p.images.length > 0 ? p.images[0] : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      priceUnit: "", 
      areaUnit: "sqft",
      aiScore: p.aiScore || Math.floor(Math.random() * (98 - 75) + 75),
      crowdRating: p.crowdRating || Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      safetyRating: p.safetyRating || Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      aiReason: p.aiReason || "Matches your preferences for location and budget."
    }));
  }, [dbProperties]);

  const allProperties = [...MOCK_PROPERTIES, ...normalizedDbProperties];

  const filteredLocalities = useMemo(() => {
    return MOCK_LOCALITIES.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const displayedProperties = useMemo(() => {
    let props = allProperties;
    
    // Filter by search
    if (searchQuery) {
      props = props.filter(p => 
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected locality
    if (selectedLocalityId) {
      props = props.filter(p => p.localityId === selectedLocalityId);
    }

    return props;
  }, [allProperties, searchQuery, selectedLocalityId]);

  const selectedLocality = MOCK_LOCALITIES.find(l => l.id === selectedLocalityId);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Control Bar */}
      <div className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between gap-4 z-20 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search localities (e.g. Hauz Khas, Noida Sector 62)..." 
            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-brand focus-visible:border-brand rounded-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 hidden md:flex border-gray-200 hover:bg-gray-50 text-gray-700 rounded-none">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          
          <Button 
            variant={isMapExpanded ? "default" : "outline"}
            size="sm"
            className={`gap-2 rounded-none ${isMapExpanded ? "bg-brand text-white hover:bg-brand/90" : "border-gray-200"}`}
            onClick={() => setIsMapExpanded(!isMapExpanded)}
          >
            {isMapExpanded ? <List className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
            {isMapExpanded ? "Show List" : "Full Map"}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Main Content Area (List + Insights) */}
        <div className={`
          flex-1 flex flex-col h-full overflow-y-auto transition-all duration-300
          ${isMapExpanded ? "w-0 hidden" : "w-full"}
        `}>
          
          {/* Locality Insights Banner */}
          {selectedLocality && (
            <div className="bg-white border-b border-gray-200 p-6 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {selectedLocality.name}, {selectedLocality.city}
                    <Badge variant="outline" className="text-xs font-normal bg-gray-50 rounded-none">
                      {selectedLocality.tags[0]}
                    </Badge>
                  </h2>
                  <p className="text-gray-500 mt-1 max-w-2xl">{selectedLocality.description}</p>
                  
                  <div className="flex gap-4 mt-4">
                     <div className="flex items-center gap-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 px-3 py-1 border border-yellow-200 rounded-none">
                        <Users className="h-4 w-4 text-yellow-600" />
                        Crowd: {selectedLocality.stats.crowdRating}/5
                     </div>
                     <div className="flex items-center gap-1.5 text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 border border-purple-200 rounded-none">
                        <Zap className="h-4 w-4 text-purple-600" />
                        Nightlife: {selectedLocality.stats.nightlifeRating}/5
                     </div>
                     <div className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1 border border-green-200 rounded-none">
                        <Shield className="h-4 w-4 text-green-600" />
                        Safety: {selectedLocality.stats.safetyScore}%
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="text-center px-4 border-l border-gray-100">
                    <div className="text-2xl font-bold text-brand">₹{selectedLocality.stats.avgRent/1000}k</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Rent</div>
                  </div>
                  <div className="text-center px-4 border-l border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{selectedLocality.reviews.length}+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Reviews</div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              {selectedLocality.reviews.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    What people say about {selectedLocality.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedLocality.reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 p-3 rounded-none border border-gray-100">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-gray-900">{review.user}</span>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(review.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                        <div className="flex gap-2 mt-2">
                          {review.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 text-gray-500 uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Property Grid */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedLocality ? `Properties in ${selectedLocality.name}` : "Recommended For You"}
                <span className="ml-2 text-sm font-normal text-gray-500">({displayedProperties.length} found)</span>
              </h3>
              {!selectedLocality && (
                <div className="text-sm text-gray-500">
                  Try searching for "Noida", "Delhi", or "Hauz Khas"
                </div>
              )}
            </div>

            {displayedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {displayedProperties.map(property => (
                  <div key={property.id} className="h-full">
                    <PropertyCard property={property} showAiScore={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No properties found</h3>
                <p className="text-gray-500 max-w-sm mt-2">
                  We couldn't find any properties matching your search. Try adjusting your filters or search for a different locality.
                </p>
                <Button 
                  className="mt-6 bg-brand text-white rounded-none hover:bg-brand/90"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocalityId(null);
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Map Sidebar / Full View */}
        <div className={`
          relative bg-gray-100 transition-all duration-300 border-l border-gray-200
          ${isMapExpanded ? "w-full absolute inset-0 z-30" : "w-[400px] hidden lg:block"}
        `}>
          {isMapExpanded && (
            <Button 
              className="absolute top-4 left-4 z-[500] bg-white text-black hover:bg-gray-100 shadow-md rounded-none gap-2"
              onClick={() => setIsMapExpanded(false)}
            >
              <List className="h-4 w-4" /> Back to List
            </Button>
          )}

          <MapContainer 
             center={[28.6208, 77.3639]} 
             zoom={11} 
             style={{ height: "100%", width: "100%", background: "#f3f4f6" }}
             className="z-0"
           >
             <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
               url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
             />
             
             {/* Locality Circles */}
             {filteredLocalities.map((loc) => (
               <Circle 
                  key={`circle-${loc.id}`}
                  center={loc.coordinates}
                  pathOptions={{ 
                    fillColor: loc.stats.safetyScore > 85 ? '#10b981' : '#f59e0b', 
                    color: loc.stats.safetyScore > 85 ? '#10b981' : '#f59e0b',
                    opacity: 0.6,
                    fillOpacity: selectedLocalityId === loc.id ? 0.3 : 0.1,
                    weight: selectedLocalityId === loc.id ? 2 : 1
                  }}
                  radius={1200}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocalityId(loc.id);
                      if (isMapExpanded) setIsMapExpanded(false); // Auto switch to list on selection? Maybe not, user might want to explore map.
                    }
                  }}
                >
                  <Popup className="custom-popup">
                     <div className="p-2 min-w-[200px]">
                       <h3 className="font-bold text-lg text-gray-900">{loc.name}</h3>
                       <p className="text-sm text-gray-500 mb-2">{loc.city}</p>
                       <div className="flex gap-2 text-sm mb-3">
                         <span className="text-green-600 font-bold">{loc.stats.safetyScore}% Safe</span>
                         <span className="text-blue-600 font-bold">₹{loc.stats.avgRent} avg</span>
                       </div>
                       <Button 
                        size="sm" 
                        className="w-full rounded-none bg-brand text-white hover:bg-brand/90"
                        onClick={() => {
                          setSelectedLocalityId(loc.id);
                          setIsMapExpanded(false);
                        }}
                      >
                        View {MOCK_PROPERTIES.filter(p => p.localityId === loc.id).length} Properties
                      </Button>
                     </div>
                   </Popup>
                </Circle>
             ))}

             {/* Property Markers */}
             {displayedProperties.map((prop) => {
                // Find coords based on locality (mock)
                const loc = MOCK_LOCALITIES.find(l => l.id === prop.localityId);
                if (!loc) return null;
                
                // Jitter coordinates slightly so they don't overlap perfectly
                const lat = loc.coordinates[0] + (Math.random() - 0.5) * 0.01;
                const lng = loc.coordinates[1] + (Math.random() - 0.5) * 0.01;

                return (
                  <Marker 
                    key={prop.id} 
                    position={[lat, lng]} 
                    icon={DefaultIcon}
                  >
                    <Popup>
                      <div className="w-[200px] p-1">
                        <img src={prop.image} className="w-full h-24 object-cover mb-2 rounded-sm" />
                        <h4 className="font-bold text-sm line-clamp-1">{prop.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-bold text-brand">₹{prop.price}</span>
                          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">{prop.type}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full mt-2 h-7 text-xs border-brand text-brand hover:bg-brand hover:text-white"
                          onClick={() => navigate(`/property/${prop.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                );
             })}
           </MapContainer>
           
           {/* Map Overlay Info (when not full screen) */}
           {!isMapExpanded && (
             <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 text-xs border border-gray-200 shadow-lg z-[400]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
                  <span>High Safety (&gt;85%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
                  <span>Moderate Safety</span>
                </div>
                <Button 
                  size="sm" 
                  variant="link" 
                  className="w-full mt-2 text-brand p-0 h-auto"
                  onClick={() => setIsMapExpanded(true)}
                >
                  Expand Map <Maximize2 className="h-3 w-3 ml-1" />
                </Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Explore;