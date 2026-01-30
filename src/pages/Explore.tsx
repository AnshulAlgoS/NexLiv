
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MOCK_LOCALITIES, MOCK_PROPERTIES } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Map as MapIcon, List, Filter, ArrowUpRight, Shield, Wifi, Users, Bed, Bath, Square, ArrowLeft, MapPin } from "lucide-react";

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

interface Property {
  _id: string;
  title: string;
  propertyType: string;
  price: number;
  location: string;
  city: string;
  images?: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  listingType: string;
}

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
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);
  const [showProperties, setShowProperties] = useState(false);
  const [dbProperties, setDbProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('http://localhost:5002/api/properties')
      .then(res => res.json())
      .then(data => setDbProperties(data))
      .catch(err => console.log("Backend not reachable, displaying mock data only"));
  }, []);

  // Combine mock and DB properties
  // We try to match DB properties to localities by checking if the location string contains the locality name/id
  const allProperties = [...MOCK_PROPERTIES, ...dbProperties.map(p => ({
    id: p._id,
    title: p.title,
    type: p.propertyType,
    price: p.price,
    location: p.location,
    city: p.city,
    image: p.images && p.images.length > 0 ? p.images[0] : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    purpose: p.listingType,
    // Attempt to map to a mock locality ID for demo purposes
    localityId: MOCK_LOCALITIES.find(l => 
      p.location.toLowerCase().includes(l.name.toLowerCase()) || 
      p.location.toLowerCase().includes(l.id)
    )?.id || "other"
  }))];

  // Reset showProperties when locality changes
  useEffect(() => {
    setShowProperties(false);
  }, [selectedLocality]);

  const filteredLocalities = MOCK_LOCALITIES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const localityProperties = selectedLocality 
    ? allProperties.filter(p => p.localityId === selectedLocality)
    : [];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Control Bar */}
      <div className="h-16 border-b border-border bg-white/95 backdrop-blur px-6 flex items-center justify-between gap-4 z-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by locality or city..." 
            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-brand focus-visible:border-brand"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 hidden md:flex border-gray-200 hover:bg-gray-50 text-gray-700">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <div className="border-l border-gray-200 h-6 mx-2 hidden md:block"></div>
          <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200 md:hidden">
            <button 
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-md transition-all ${viewMode === "map" ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              <MapIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar List (always visible on large screens if needed, or toggled) */}
        <div className={`
          absolute md:relative z-20 w-full md:w-[500px] bg-white md:bg-white border-r border-gray-200 h-full overflow-y-auto transition-transform duration-300
          ${viewMode === "map" ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        `}>
          {/* Sidebar / Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold px-4 pt-4">Recent Listings</h2>
            <div className="px-4 space-y-3 pb-4 border-b border-gray-100">
               {dbProperties.length === 0 && <p className="text-sm text-gray-400 italic">No recent listings found.</p>}
               {dbProperties.map((p) => (
                 <Card key={p._id} className="card-3d border-l-4 border-l-[#FACC15] cursor-pointer" onClick={() => {
                    const loc = MOCK_LOCALITIES.find(l => p.location.toLowerCase().includes(l.name.toLowerCase()));
                    if (loc) setSelectedLocality(loc.id);
                    setShowProperties(true);
                 }}>
                   <CardContent className="p-3 flex gap-3">
                      <img src={p.images && p.images.length > 0 ? p.images[0] : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1">{p.title}</h4>
                        <p className="text-xs text-gray-500">{p.location}</p>
                        <p className="text-sm font-bold text-[#A61B1B]">₹{p.price}</p>
                      </div>
                   </CardContent>
                 </Card>
               ))}
            </div>

            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4">
              {filteredLocalities.length} Localities Found
            </h2>
            
            {filteredLocalities.map((loc) => (
              <Card 
                key={loc.id} 
                className={`cursor-pointer transition-all rounded-none card-3d ${selectedLocality === loc.id ? "border-brand bg-red-50" : "bg-white border-gray-200"}`}
                onClick={() => setSelectedLocality(loc.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-gray-900">{loc.name}</CardTitle>
                      <p className="text-sm text-gray-500">{loc.city}</p>
                    </div>
                    {loc.stats.safetyScore > 90 && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-none">
                        Safe
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-gray-50 p-2 rounded-none border border-gray-200">
                      <div className="text-xs text-gray-500">Rent</div>
                      <div className="font-bold text-gray-900">₹{loc.stats.avgRent/1000}k</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-none border border-gray-200">
                      <div className="text-xs text-gray-500">Safety</div>
                      <div className="font-bold text-green-600">{loc.stats.safetyScore}%</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-none border border-gray-200">
                      <div className="text-xs text-gray-500">Conn.</div>
                      <div className="font-bold text-blue-600">{loc.stats.connectivityScore}%</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {loc.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded-none bg-white border border-gray-200 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className="flex-1 relative bg-gray-50">
           <MapContainer 
             center={[28.6208, 77.3639]} 
             zoom={12} 
             style={{ height: "100%", width: "100%", background: "transparent" }}
             className="z-0"
           >
             <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
               url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
             />
             
             {filteredLocalities.map((loc) => (
               <Marker 
                 key={loc.id} 
                 position={loc.coordinates} 
                 icon={DefaultIcon}
                 eventHandlers={{
                   click: () => setSelectedLocality(loc.id),
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
                     <Button size="sm" className="w-full rounded-none bg-brand text-white hover:bg-brand/90">View Details</Button>
                   </div>
                 </Popup>
               </Marker>
             ))}

             {filteredLocalities.map((loc) => (
                <Circle 
                  key={`circle-${loc.id}`}
                  center={loc.coordinates}
                  pathOptions={{ 
                    fillColor: loc.stats.safetyScore > 85 ? '#10b981' : '#f59e0b', 
                    color: loc.stats.safetyScore > 85 ? '#10b981' : '#f59e0b',
                    opacity: 0.4,
                    fillOpacity: 0.1 
                  }}
                  radius={800}
                />
             ))}
           </MapContainer>

           {/* Floating Info Panel for Selected Locality */}
           {selectedLocality && (
             <div className="absolute top-4 right-4 w-96 max-h-[calc(100vh-120px)] overflow-y-auto bg-white/95 backdrop-blur border border-gray-200 rounded-none p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] z-[400] animate-in slide-in-from-right">
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                   {showProperties && (
                     <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2 rounded-none hover:bg-gray-100" onClick={() => setShowProperties(false)}>
                       <ArrowLeft className="h-4 w-4 text-gray-700" />
                     </Button>
                   )}
                   <h3 className="text-xl font-bold text-gray-900">
                     {showProperties ? "Available Properties" : MOCK_LOCALITIES.find(l => l.id === selectedLocality)?.name}
                   </h3>
                 </div>
                 <button onClick={() => setSelectedLocality(null)} className="text-gray-400 hover:text-gray-900">✕</button>
               </div>
               
               {!showProperties ? (
                 <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-3">
                     <div className="bg-gray-50 p-3 rounded-none border border-gray-200 flex flex-col gap-1">
                       <Shield className="w-4 h-4 text-green-600" />
                       <span className="text-xs text-gray-500">Safety Index</span>
                       <span className="font-bold text-lg text-gray-900">91/100</span>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-none border border-gray-200 flex flex-col gap-1">
                       <Wifi className="w-4 h-4 text-blue-600" />
                       <span className="text-xs text-gray-500">Connectivity</span>
                       <span className="font-bold text-lg text-gray-900">Excellent</span>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-none border border-gray-200 flex flex-col gap-1">
                       <Users className="w-4 h-4 text-yellow-600" />
                       <span className="text-xs text-gray-500">Crowd</span>
                       <span className="font-bold text-lg text-gray-900">Students</span>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-none border border-gray-200 flex flex-col gap-1">
                       <ArrowUpRight className="w-4 h-4 text-purple-600" />
                       <span className="text-xs text-gray-500">Appreciation</span>
                       <span className="font-bold text-lg text-gray-900">+12%</span>
                     </div>
                   </div>
                   
                   <Button 
                    className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-black font-bold rounded-none btn-3d"
                    onClick={() => setShowProperties(true)}
                   >
                     View {localityProperties.length} Available Properties
                   </Button>
                 </div>
               ) : (
                 <div className="space-y-3">
                   {localityProperties.length > 0 ? (
                     localityProperties.map(property => (
                       <Card key={property.id} onClick={() => navigate(`/property/${property.id}`)} className="bg-white border-gray-200 overflow-hidden hover:border-brand/50 transition-all cursor-pointer group rounded-none card-3d mb-4">
                         <div className="relative h-48 w-full">
                           <img 
                             src={property.image} 
                             alt={property.title} 
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                           <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-none text-sm font-bold text-gray-900 shadow-sm border border-gray-200">
                            {property.purpose === 'rent' ? `₹${property.price}/mo` : `₹${property.price}`}
                           </div>
                           <Badge className="absolute top-2 left-2 bg-[#FACC15] text-black hover:bg-[#FACC15]/90 text-[10px] uppercase rounded-none font-bold shadow-md">
                             {property.type}
                           </Badge>
                           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10">
                              <span className="text-white text-xs font-bold flex items-center gap-1">
                                <Shield className="w-3 h-3 text-green-400" /> NEXLIV Verified
                              </span>
                           </div>
                         </div>
                         <div className="p-4">
                           <h4 className="font-bold text-lg truncate text-gray-900 mb-1">{property.title}</h4>
                           <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-brand" /> {property.location}, {property.city}
                           </p>
                           <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                             <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4 text-gray-400" /> <span className="font-medium text-gray-700">{property.bedrooms} Bed</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4 text-gray-400" /> <span className="font-medium text-gray-700">{property.bathrooms} Bath</span>
                            </div>
                             <div className="flex items-center gap-1">
                               <Square className="h-4 w-4 text-gray-400" /> <span className="font-medium text-gray-700">{property.area} sqft</span>
                             </div>
                           </div>
                         </div>
                       </Card>
                     ))
                   ) : (
                     <div className="text-center py-8 text-gray-400">
                       <p>No properties listed in this locality yet.</p>
                       <Button variant="link" className="text-brand" onClick={() => setShowProperties(false)}>Go back</Button>
                     </div>
                   )}
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
