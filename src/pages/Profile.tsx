import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Edit2, LogOut, Shield, Heart, Home } from "lucide-react";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.displayName || "User",
    email: currentUser?.email || "user@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    bio: "Looking for a peaceful place to stay near my workplace.",
    preferences: ["Non-smoker", "Vegetarian", "Early Riser"]
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile updated:", profileData);
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
                <Avatar className="h-24 w-24 absolute -top-12 border-4 border-white shadow-md">
                  <AvatarImage src={currentUser?.photoURL || ""} />
                  <AvatarFallback className="bg-[#FACC15] text-[#A61B1B] text-2xl font-bold">
                    {profileData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="pt-16 pb-6">
                   <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                   <p className="text-gray-500 flex items-center gap-1 mt-1">
                     <MapPin className="h-4 w-4" /> {profileData.location}
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
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-[#A61B1B]" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
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
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <Shield className="h-4 w-4" /> Phone Verified
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
                        variant="ghost" 
                        size="sm" 
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={isEditing ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
                    >
                        {isEditing ? "Save Changes" : <><Edit2 className="h-4 w-4 mr-2" /> Edit Profile</>}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={profileData.name} 
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={profileData.email} 
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={profileData.phone} 
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input 
                                disabled={!isEditing} 
                                value={profileData.location} 
                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Bio</Label>
                        <Input 
                            disabled={!isEditing} 
                            value={profileData.bio} 
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="mb-2 block">Lifestyle Preferences</Label>
                        <div className="flex flex-wrap gap-2">
                            {profileData.preferences.map((pref, i) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-700">
                                    {pref}
                                </Badge>
                            ))}
                            {isEditing && (
                                <Button variant="outline" size="sm" className="h-7 text-xs border-dashed">+ Add Tag</Button>
                            )}
                        </div>
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
