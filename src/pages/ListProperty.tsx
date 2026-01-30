import { useState } from "react";
import { API_BASE_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  Home
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      let imageUrl = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop";
      
      if (formData.photos.length > 0) {
        const file = formData.photos[0];
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

      const response = await fetch(`${API_BASE_URL}/api/properties`, {
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
        title: "Listing Failed",
        description: "Could not save to database. Is the server running?",
        variant: "destructive"
      });
    }
  };

  const steps = [
    { number: 1, title: "Type", icon: Building },
    { number: 2, title: "Details", icon: MapPin },
    { number: 3, title: "Pricing", icon: IndianRupee },
    { number: 4, title: "Photos", icon: Camera },
    { number: 5, title: "Contact", icon: User },
  ];

  const canProceed = () => {
    switch (step) {
      case 1: return formData.propertyType && formData.listingType;
      case 2: return formData.title && formData.city && formData.location;
      case 3: return formData.price && formData.availableFrom;
      case 4: return true; 
      case 5: return formData.ownerName && formData.ownerPhone;
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceed()) setStep(s => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">List Your Property</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Reach thousands of potential tenants and buyers. Simple, fast, and free.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side: Progress Stepper (Desktop) */}
          <div className="w-full lg:w-1/4 hidden lg:block sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div key={s.number} className="relative flex items-center gap-4 group">
                    {/* Connecting Line */}
                    {i !== steps.length - 1 && (
                      <div 
                        className={`absolute left-5 top-10 w-0.5 h-10 -ml-px ${
                          step > s.number ? "bg-green-500" : "bg-gray-200"
                        }`} 
                      />
                    )}
                    
                    <div 
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step > s.number 
                          ? "bg-green-500 text-white shadow-md shadow-green-200" 
                          : step === s.number 
                            ? "bg-brand text-white shadow-md shadow-red-200 scale-110" 
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step > s.number ? <CheckCircle className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold transition-colors ${
                        step === s.number ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {s.title}
                      </span>
                      {step === s.number && (
                        <span className="text-xs text-brand font-medium animate-pulse">In Progress</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Stepper */}
          <div className="w-full lg:hidden mb-6">
             <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                {steps.map((s) => (
                   <div key={s.number} className={`flex flex-col items-center gap-1 ${step === s.number ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s.number ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {step > s.number ? <CheckCircle className="h-4 w-4" /> : s.number}
                      </div>
                      <span className="text-[10px] font-medium">{s.title}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="w-full lg:w-3/4">
            <motion.div 
              layout
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative"
            >
              {/* Decorative gradient top bar */}
              <div className="h-2 bg-gradient-to-r from-brand to-orange-500 w-full" />

              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[400px]"
                  >
                    
                    {/* Step 1: Type */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">What kind of property is it?</h2>
                          <p className="text-gray-500 mt-1">Select the most accurate category.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Listing Type */}
                          <div className="space-y-4">
                            <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">I want to</Label>
                            <div className="grid grid-cols-2 gap-4">
                              {['rent', 'sale'].map((type) => (
                                <div 
                                  key={type}
                                  onClick={() => updateFormData("listingType", type)}
                                  className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 hover:border-brand/50 ${
                                    formData.listingType === type 
                                      ? "border-brand bg-red-50 text-brand" 
                                      : "border-gray-100 bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  {type === 'rent' ? <Home className="h-6 w-6" /> : <Building className="h-6 w-6" />}
                                  <span className="font-bold capitalize">{type === 'rent' ? 'Rent Out' : 'Sell'}</span>
                                  {formData.listingType === type && (
                                    <div className="absolute top-2 right-2 text-brand">
                                      <CheckCircle className="h-4 w-4" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Property Type */}
                          <div className="space-y-4">
                            <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Property Type</Label>
                            <div className="grid grid-cols-2 gap-3">
                              {propertyTypes.map((type) => (
                                <button
                                  key={type.value}
                                  onClick={() => updateFormData("propertyType", type.value)}
                                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                                    formData.propertyType === type.value
                                      ? "border-brand bg-brand text-white shadow-md"
                                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                  }`}
                                >
                                  {type.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                      <div className="space-y-6">
                         <div>
                          <h2 className="text-2xl font-bold text-gray-900">Tell us the details</h2>
                          <p className="text-gray-500 mt-1">Help buyers understand your property better.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                           <div>
                              <Label className="text-gray-700 font-medium mb-1.5 block">Property Title</Label>
                              <Input 
                                placeholder="e.g. Spacious 3BHK with Garden View" 
                                value={formData.title}
                                onChange={(e) => updateFormData("title", e.target.value)}
                                className="h-12 border-gray-300 focus:border-brand focus:ring-brand/20"
                              />
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-gray-700 font-medium mb-1.5 block">City</Label>
                                <Select value={formData.city} onValueChange={(v) => updateFormData("city", v)}>
                                  <SelectTrigger className="h-12 border-gray-300">
                                    <SelectValue placeholder="Select City" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-gray-700 font-medium mb-1.5 block">Locality / Area</Label>
                                <Input 
                                  placeholder="e.g. Indiranagar" 
                                  value={formData.location}
                                  onChange={(e) => updateFormData("location", e.target.value)}
                                  className="h-12 border-gray-300"
                                />
                              </div>
                           </div>

                           <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label className="text-gray-700 font-medium mb-1.5 block">Bedrooms</Label>
                                <Select value={formData.bedrooms} onValueChange={(v) => updateFormData("bedrooms", v)}>
                                  <SelectTrigger className="h-12 border-gray-300"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {[1,2,3,4,5,6].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-gray-700 font-medium mb-1.5 block">Bathrooms</Label>
                                <Select value={formData.bathrooms} onValueChange={(v) => updateFormData("bathrooms", v)}>
                                  <SelectTrigger className="h-12 border-gray-300"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {[1,2,3,4].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-gray-700 font-medium mb-1.5 block">Area (sqft)</Label>
                                <Input 
                                  type="number" 
                                  placeholder="1200" 
                                  value={formData.area}
                                  onChange={(e) => updateFormData("area", e.target.value)}
                                  className="h-12 border-gray-300"
                                />
                              </div>
                           </div>

                           <div>
                              <Label className="text-gray-700 font-medium mb-1.5 block">Description</Label>
                              <Textarea 
                                placeholder="Highlight key features, nearby landmarks, etc." 
                                value={formData.description}
                                onChange={(e) => updateFormData("description", e.target.value)}
                                className="min-h-[100px] border-gray-300 resize-none"
                              />
                           </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Pricing */}
                    {step === 3 && (
                      <div className="space-y-8">
                         <div>
                          <h2 className="text-2xl font-bold text-gray-900">Pricing & Amenities</h2>
                          <p className="text-gray-500 mt-1">Set the value and highlight features.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                           <Label className="text-gray-700 font-bold mb-3 block text-lg">
                             {formData.listingType === 'rent' ? 'Monthly Rent' : 'Selling Price'}
                           </Label>
                           <div className="relative">
                             <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                             <Input 
                               type="number"
                               placeholder={formData.listingType === 'rent' ? "25000" : "7500000"}
                               value={formData.price}
                               onChange={(e) => updateFormData("price", e.target.value)}
                               className="pl-12 h-14 text-xl font-bold border-gray-300 bg-white"
                             />
                           </div>
                        </div>

                        <div>
                           <Label className="text-gray-700 font-medium mb-3 block">Available From</Label>
                           <Input 
                             type="date"
                             value={formData.availableFrom}
                             onChange={(e) => updateFormData("availableFrom", e.target.value)}
                             className="h-12 border-gray-300 w-full md:w-1/2"
                           />
                        </div>

                        <div>
                          <Label className="text-gray-700 font-medium mb-4 block">Select Amenities</Label>
                          <div className="flex flex-wrap gap-2">
                            {amenitiesList.map(amenity => (
                              <Badge
                                key={amenity}
                                onClick={() => toggleAmenity(amenity)}
                                className={`px-4 py-2 rounded-full cursor-pointer text-sm font-normal transition-all ${
                                  formData.amenities.includes(amenity)
                                    ? "bg-brand hover:bg-brand/90 text-white shadow-sm scale-105"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand/30 hover:bg-red-50"
                                }`}
                              >
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Photos */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Visual Appeal</h2>
                          <p className="text-gray-500 mt-1">Properties with photos get 5x more inquiries.</p>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-10 text-center hover:bg-white hover:border-brand/50 transition-all cursor-pointer group relative">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                          />
                          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                             <Upload className="h-8 w-8 text-brand" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Click to upload or drag and drop</h3>
                          <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 10 photos)</p>
                        </div>

                        {formData.photos.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {formData.photos.map((photo, i) => (
                              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group shadow-sm border border-gray-100">
                                <img 
                                  src={URL.createObjectURL(photo)} 
                                  alt="preview" 
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => removePhoto(i)}
                                  className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 5: Contact */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Final Step</h2>
                          <p className="text-gray-500 mt-1">How can tenants contact you?</p>
                        </div>

                        <div className="space-y-4 max-w-md">
                           <div>
                             <Label className="text-gray-700 font-medium mb-1.5 block">Your Name</Label>
                             <Input 
                               placeholder="John Doe"
                               value={formData.ownerName}
                               onChange={(e) => updateFormData("ownerName", e.target.value)}
                               className="h-12 border-gray-300"
                             />
                           </div>
                           <div>
                             <Label className="text-gray-700 font-medium mb-1.5 block">Phone Number</Label>
                             <Input 
                               placeholder="+91 98765 43210"
                               value={formData.ownerPhone}
                               onChange={(e) => updateFormData("ownerPhone", e.target.value)}
                               className="h-12 border-gray-300"
                             />
                           </div>
                           <div>
                             <Label className="text-gray-700 font-medium mb-1.5 block">Email Address (Optional)</Label>
                             <Input 
                               placeholder="john@example.com"
                               value={formData.ownerEmail}
                               onChange={(e) => updateFormData("ownerEmail", e.target.value)}
                               className="h-12 border-gray-300"
                             />
                           </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start mt-6">
                           <div className="p-1.5 bg-blue-100 rounded-full text-blue-600 shrink-0 mt-0.5">
                             <CheckCircle className="h-4 w-4" />
                           </div>
                           <div>
                             <h4 className="font-semibold text-blue-900 text-sm">Safe & Secure</h4>
                             <p className="text-xs text-blue-700 mt-1">Your contact details are only shared with verified tenants. We never spam.</p>
                           </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex justify-between items-center">
                 <Button 
                   variant="outline" 
                   onClick={prevStep}
                   disabled={step === 1}
                   className="border-gray-300 hover:bg-white text-gray-600"
                 >
                   <ArrowLeft className="h-4 w-4 mr-2" /> Back
                 </Button>

                 {step < 5 ? (
                   <Button 
                     onClick={nextStep}
                     disabled={!canProceed()}
                     className={`px-8 h-11 text-base transition-all ${
                       canProceed() 
                         ? "bg-brand hover:bg-brand/90 text-white shadow-lg shadow-brand/20" 
                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
                     }`}
                   >
                     Continue <ArrowRight className="h-4 w-4 ml-2" />
                   </Button>
                 ) : (
                   <Button 
                     onClick={handleSubmit}
                     disabled={!canProceed()}
                     className="px-8 h-11 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-600/20 text-base"
                   >
                     Publish Listing
                   </Button>
                 )}
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
