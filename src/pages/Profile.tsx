import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Mail, Phone, MapPin, Edit2, LogOut, Shield, Heart, Home,  
  ArrowRight, Camera, X, Plus, Save, Loader2 
} from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const { currentUser, logout, userRole, userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Local state for form data
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    specificNeeds: "",
    preferences: [] as string[]
  });

  const [newPreference, setNewPreference] = useState("");

  // Sync with userProfile when it loads
  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || currentUser?.displayName || "",
        email: userProfile.email || currentUser?.email || "",
        phone: userProfile.phone || "",
        location: userProfile.location || "",
        bio: userProfile.bio || "",
        specificNeeds: userProfile.specificNeeds || "",
        preferences: userProfile.preferences || []
      });
    }
  }, [userProfile, currentUser]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was a problem saving your profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image under 5MB.",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Create a reference to 'profile_images/uid'
      const storageRef = ref(storage, `profile_images/${currentUser.uid}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update profile with new photoURL
      await updateUserProfile({ photoURL: downloadURL });
      
      toast({
        title: "Photo Updated",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const addPreference = () => {
    if (newPreference.trim() && !formData.preferences.includes(newPreference.trim())) {
      setFormData(prev => ({
        ...prev,
        preferences: [...prev.preferences, newPreference.trim()]
      }));
      setNewPreference("");
    }
  };

  const removePreference = (prefToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.filter(p => p !== prefToRemove)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPreference();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="card-3d border-gray-200 overflow-hidden">
              <div className="h-32 bg-brand-gradient"></div>
              <div className="px-6 relative">
                <div className="relative inline-block -top-12">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src={currentUser?.photoURL || ""} className="object-cover" />
                    <AvatarFallback className="bg-[#FACC15] text-[#A61B1B] text-2xl font-bold">
                      {formData.displayName.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                
                <div className="pt-0 pb-6">
                   <h2 className="text-2xl font-bold text-gray-900">{formData.displayName || "User"}</h2>
                   <p className="text-gray-500 flex items-center gap-1 mt-1">
                     <MapPin className="h-4 w-4" /> {formData.location || "Location not set"}
                   </p>
                   <div className="mt-4 flex flex-wrap gap-2">
                     <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">Verified User</Badge>
                     <Badge variant="outline" className="border-[#FACC15] text-yellow-700">Premium</Badge>
                   </div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5 text-[#A61B1B]" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-[#A61B1B]" />
                  <span className="text-sm">{formData.phone || "No phone added"}</span>
                </div>
                
                <Button 
                    className="w-full mt-6 bg-gradient-to-r from-[#800020] to-[#A61B1B] text-white hover:opacity-90"
                    onClick={() => navigate(userRole === 'owner' ? '/list-property' : '/explore')}
                >
                    {userRole === 'owner' ? 'List Your Property' : 'Start Exploring'} 
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <Button 
                    variant="outline" 
                    className="w-full mt-4 border-[#A61B1B] text-[#A61B1B] hover:bg-red-50"
                    onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </Card>

            <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Trust Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Profile Completion</span>
                        <span className="font-bold text-[#A61B1B]">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#A61B1B] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <Shield className="h-4 w-4" /> Email Verified
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Shield className="h-4 w-4" /> Phone Verified (Pending)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Shield className="h-4 w-4" /> Govt ID (Pending)
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent p-0 mb-6">
                <TabsTrigger 
                    value="details" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-[#A61B1B] data-[state=active]:text-[#A61B1B] data-[state=active]:bg-transparent"
                >
                    Profile Details
                </TabsTrigger>
                <TabsTrigger 
                    value="saved" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-[#A61B1B] data-[state=active]:text-[#A61B1B] data-[state=active]:bg-transparent"
                >
                    Saved Properties
                </TabsTrigger>
                <TabsTrigger 
                    value="settings" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-[#A61B1B] data-[state=active]:text-[#A61B1B] data-[state=active]:bg-transparent"
                >
                    Account Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details and preferences.</CardDescription>
                    </div>
                    <Button 
                        variant={isEditing ? "default" : "ghost"}
                        size="sm" 
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        disabled={isSaving}
                        className={isEditing ? "bg-green-600 hover:bg-green-700 text-white" : "text-[#A61B1B] hover:bg-red-50"}
                    >
                        {isSaving ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
                        ) : isEditing ? (
                          <><Save className="h-4 w-4 mr-2" /> Save Changes</>
                        ) : (
                          <><Edit2 className="h-4 w-4 mr-2" /> Edit Profile</>
                        )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={formData.displayName} 
                                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input 
                                disabled={true} // Email usually not editable directly
                                value={formData.email} 
                                className="bg-gray-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={formData.location} 
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder="e.g. Bangalore, India"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Bio</Label>
                        <Textarea 
                            disabled={!isEditing} 
                            value={formData.bio} 
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="Tell us a bit about yourself..."
                            className="resize-none h-24"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="mb-2 block">Lifestyle Preferences</Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.preferences.map((pref, i) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-700 flex items-center gap-1">
                                    {pref}
                                    {isEditing && (
                                      <button onClick={() => removePreference(pref)} className="ml-1 hover:text-red-500">
                                        <X className="h-3 w-3" />
                                      </button>
                                    )}
                                </Badge>
                            ))}
                            {formData.preferences.length === 0 && !isEditing && (
                              <span className="text-sm text-gray-400 italic">No preferences added yet.</span>
                            )}
                        </div>
                        
                        {isEditing && (
                          <div className="flex gap-2 max-w-sm">
                            <Input 
                              value={newPreference}
                              onChange={(e) => setNewPreference(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Add a tag (e.g. Non-smoker)"
                              className="h-9"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={addPreference}
                              className="shrink-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Specific Needs / Requirements</Label>
                        <Textarea 
                            disabled={!isEditing} 
                            value={formData.specificNeeds} 
                            onChange={(e) => setFormData({...formData, specificNeeds: e.target.value})}
                            placeholder="Do you have any specific requirements? e.g. Wheelchair access, Pet friendly..."
                            className="resize-none h-24"
                        />
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop" 
                                alt="Property"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500">
                                <Heart className="h-4 w-4 fill-current" />
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-gray-900 truncate">Modern 2BHK in Indiranagar</h3>
                            <p className="text-sm text-gray-500 mb-2">Indiranagar, Bangalore</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[#A61B1B] font-bold">₹25,000/mo</span>
                                <Button size="sm" variant="outline" className="h-8">View</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 flex items-center justify-center p-8 border-dashed bg-gray-50/50">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                                <Home className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium text-gray-900">No more saved properties</h3>
                            <p className="text-sm text-gray-500">Start exploring to save your favorites.</p>
                            <Button variant="link" className="text-[#A61B1B]">Browse Properties</Button>
                        </div>
                    </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
