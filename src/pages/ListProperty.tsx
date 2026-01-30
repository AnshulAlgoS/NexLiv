import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { propertyTypes, cities, amenitiesList } from "@/lib/data";
import { 
  Building, 
  MapPin, 
  IndianRupee, 
  Camera, 
  User, 
  Phone, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ListProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    listingType: "rent",
    propertyType: "",
    title: "",
    description: "",
    city: "",
    location: "",
    address: "",
    bedrooms: "1",
    bathrooms: "1",
    area: "",
    price: "",
    amenities: [] as string[],
    availableFrom: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    photos: [] as File[],
  });

  const updateFormData = (key: string, value: string | number | string[] | File[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 10)
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const toggleAmenity = (amenity: string) => {
    const current = formData.amenities;
    if (current.includes(amenity)) {
      updateFormData("amenities", current.filter(a => a !== amenity));
    } else {
      updateFormData("amenities", [...current, amenity]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Convert first photo to base64 if available to mock upload
      let imageUrl = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop";
      
      if (formData.photos.length > 0) {
        const file = formData.photos[0];
        // Simple promise to read file as data URL
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        listingType: formData.listingType,
        propertyType: formData.propertyType,
        price: Number(formData.price) || 0,
        city: formData.city,
        location: formData.location,
        address: formData.address,
        images: [imageUrl], 
        amenities: formData.amenities,
        bedrooms: Number(formData.bedrooms) || 1,
        bathrooms: Number(formData.bathrooms) || 1,
        area: Number(formData.area) || 0,
        availableFrom: formData.availableFrom,
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        ownerEmail: formData.ownerEmail
      };

      const response = await fetch('http://localhost:5002/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast({
          title: "Property Listed Successfully!",
          description: "Your property is now live and visible on the Explore map.",
        });
        navigate("/explore");
      } else {
        throw new Error('Backend failed');
      }
    } catch (error) {
      console.error("Listing failed:", error);
      toast({
        title: "Listing Failed (Backend Offline?)",
        description: "Could not save to database. Is the server running? (npm start in server/)",
        variant: "destructive"
      });
      // Optional: navigate anyway for demo? No, let user know.
    }
  };

  const steps = [
    { number: 1, title: "Property Type", icon: Building },
    { number: 2, title: "Details", icon: MapPin },
    { number: 3, title: "Pricing", icon: IndianRupee },
    { number: 4, title: "Photos", icon: Camera },
    { number: 5, title: "Contact", icon: User },
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.propertyType && formData.listingType;
      case 2:
        return formData.title && formData.city && formData.location;
      case 3:
        return formData.price && formData.availableFrom;
      case 4:
        return true; // Photos optional for now
      case 5:
        return formData.ownerName && formData.ownerPhone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
              <div 
                className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((s) => (
                <div 
                  key={s.number}
                  className={`relative z-10 flex flex-col items-center ${
                    s.number <= step ? "text-primary" : "text-gray-500"
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-none border-2 flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      s.number < step 
                        ? "bg-primary text-black border-primary" 
                        : s.number === step 
                          ? "bg-primary text-black border-primary" 
                          : "bg-black text-gray-500 border-gray-700"
                    }`}
                  >
                    {s.number < step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <s.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs mt-2 font-bold uppercase hidden sm:block">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-red-950/20 backdrop-blur-sm rounded-none border border-white/10 p-6 md:p-8 card-3d">
            {/* Step 1: Property Type */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">What are you listing?</h2>
                  <p className="text-gray-400">Tell us about your property</p>
                </div>

                {/* Listing Type */}
                <div>
                  <Label className="text-base font-bold text-white mb-4 block uppercase tracking-wider">Listing Type</Label>
                  <RadioGroup 
                    value={formData.listingType} 
                    onValueChange={(v) => updateFormData("listingType", v)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="rent" id="rent" className="peer sr-only" />
                      <Label 
                        htmlFor="rent"
                        className="flex flex-col items-center justify-center rounded-none border-2 border-white/10 bg-black/30 p-6 hover:bg-white/5 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary cursor-pointer transition-all card-3d"
                      >
                        <span className="text-lg font-bold uppercase">For Rent</span>
                        <span className="text-sm text-gray-400">Monthly rental</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="sale" id="sale" className="peer sr-only" />
                      <Label 
                        htmlFor="sale"
                        className="flex flex-col items-center justify-center rounded-none border-2 border-white/10 bg-black/30 p-6 hover:bg-white/5 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary cursor-pointer transition-all card-3d"
                      >
                        <span className="text-lg font-bold uppercase">For Sale</span>
                        <span className="text-sm text-gray-400">One-time purchase</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Property Type */}
                <div>
                  <Label className="text-base font-bold text-white mb-4 block uppercase tracking-wider">Property Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => updateFormData("propertyType", type.value)}
                        className={`p-4 rounded-none border-2 text-center transition-all font-bold uppercase text-sm ${
                          formData.propertyType === type.value
                            ? "border-primary bg-primary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -translate-y-1"
                            : "border-white/10 bg-black/30 text-gray-300 hover:border-primary/50 hover:text-white"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Property Details</h2>
                  <p className="text-gray-400">Describe your property</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Property Title</Label>
                    <Input 
                      id="title"
                      placeholder="e.g., Cozy 2BHK Apartment in Koramangala"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Describe your property in detail..."
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      className="mt-1 min-h-[120px] bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">City</Label>
                      <Select value={formData.city} onValueChange={(v) => updateFormData("city", v)}>
                        <SelectTrigger className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:ring-primary">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="bg-red-950 border-white/10 text-white">
                          {cities.map((city) => (
                            <SelectItem key={city} value={city} className="focus:bg-primary/20 focus:text-white">{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-white">Locality/Area</Label>
                      <Input 
                        id="location"
                        placeholder="e.g., Koramangala 5th Block"
                        value={formData.location}
                        onChange={(e) => updateFormData("location", e.target.value)}
                        className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">Bedrooms</Label>
                      <Select value={formData.bedrooms} onValueChange={(v) => updateFormData("bedrooms", v)}>
                        <SelectTrigger className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-red-950 border-white/10 text-white">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={n.toString()} className="focus:bg-primary/20 focus:text-white">{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white">Bathrooms</Label>
                      <Select value={formData.bathrooms} onValueChange={(v) => updateFormData("bathrooms", v)}>
                        <SelectTrigger className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-red-950 border-white/10 text-white">
                          {[1, 2, 3, 4].map((n) => (
                            <SelectItem key={n} value={n.toString()} className="focus:bg-primary/20 focus:text-white">{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="area" className="text-white">Area (sq.ft)</Label>
                      <Input 
                        id="area"
                        type="number"
                        placeholder="500"
                        value={formData.area}
                        onChange={(e) => updateFormData("area", e.target.value)}
                        className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Availability */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Pricing & Availability</h2>
                  <p className="text-gray-400">Set your price and availability</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price" className="text-white">
                      {formData.listingType === "rent" ? "Monthly Rent (₹)" : "Sale Price (₹)"}
                    </Label>
                    <div className="relative mt-1">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="price"
                        type="number"
                        placeholder={formData.listingType === "rent" ? "15000" : "5000000"}
                        value={formData.price}
                        onChange={(e) => updateFormData("price", e.target.value)}
                        className="pl-9 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availableFrom" className="text-white">Available From</Label>
                    <Input 
                      id="availableFrom"
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => updateFormData("availableFrom", e.target.value)}
                      className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:border-primary accent-primary"
                    />
                  </div>

                  <div>
                    <Label className="mb-3 block text-white">Amenities</Label>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesList.map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="outline"
                          className={`cursor-pointer transition-all rounded-none px-3 py-1 border ${
                            formData.amenities.includes(amenity) 
                              ? "bg-primary text-black border-primary font-bold" 
                              : "bg-transparent text-gray-300 border-white/20 hover:border-primary/50"
                          }`}
                          onClick={() => toggleAmenity(amenity)}
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Add Photos</h2>
                  <p className="text-gray-400">Upload photos of your property</p>
                </div>

                <div className="border-2 border-dashed border-white/10 bg-black/20 rounded-none p-12 text-center hover:border-primary/50 transition-colors cursor-pointer group relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <Camera className="h-12 w-12 text-gray-500 mx-auto mb-4 group-hover:text-primary transition-colors" />
                  <p className="text-lg font-bold text-white mb-2">Upload Photos</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Drag and drop or click to upload. Max 10 photos.
                  </p>
                  <Button variant="outline" className="rounded-none border-white/20 text-white hover:bg-white/10 pointer-events-none">Choose Files</Button>
                </div>

                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-none border border-white/10"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-none bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Pro Tip</p>
                      <p className="text-sm text-gray-400">
                        Properties with high-quality photos get 3x more inquiries. Make sure to capture all rooms, amenities, and the neighborhood.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contact Details */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Contact Details</h2>
                  <p className="text-gray-400">How should tenants reach you?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ownerName" className="text-white">Your Name</Label>
                    <Input 
                      id="ownerName"
                      placeholder="Enter your name"
                      value={formData.ownerName}
                      onChange={(e) => updateFormData("ownerName", e.target.value)}
                      className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ownerPhone" className="text-white">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="ownerPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.ownerPhone}
                        onChange={(e) => updateFormData("ownerPhone", e.target.value)}
                        className="pl-9 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ownerEmail" className="text-white">Email (Optional)</Label>
                    <Input 
                      id="ownerEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.ownerEmail}
                      onChange={(e) => updateFormData("ownerEmail", e.target.value)}
                      className="mt-1 bg-black/30 border-white/10 text-white rounded-none focus:border-primary"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-none bg-black/30 border border-white/10">
                    <Checkbox id="terms" className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:text-black rounded-none" />
                    <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                      I agree to the Terms of Service and confirm that all information provided is accurate. I authorize NestAI to display my listing to potential tenants/buyers.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2 rounded-none border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <Button 
                  onClick={() => setStep(step + 1)} 
                  disabled={!canProceed()}
                  className="gap-2 rounded-none bg-primary text-black hover:bg-primary/90 btn-3d font-bold"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="gap-2 rounded-none bg-primary text-black hover:bg-primary/90 btn-3d font-bold"
                >
                  <CheckCircle className="h-4 w-4" />
                  Publish Listing
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListProperty;
