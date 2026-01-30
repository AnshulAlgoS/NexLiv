import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import AiRecommendationCard from "@/components/AiRecommendationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROPERTIES as properties } from "@/lib/data";
import heroImage from "@/assets/hero-apartment.jpg";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Building, 
  Users, 
  Star, 
  Shield,
  Sparkles,
  Home,
  Building2,
  Bed
} from "lucide-react";

const Index = () => {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3);
  const aiRecommendedProperties = [...properties].sort((a, b) => b.aiScore - a.aiScore).slice(0, 4);

  const stats = [
    { icon: Building, value: "50,000+", label: "Properties Listed" },
    { icon: Users, value: "100,000+", label: "Happy Users" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Shield, value: "100%", label: "Verified Owners" },
  ];

  const propertyTypeCards = [
    { type: "room", icon: Bed, label: "Rooms", count: "12,000+" },
    { type: "pg", icon: Users, label: "PG & Hostels", count: "8,500+" },
    { type: "flat", icon: Building2, label: "Flats", count: "25,000+" },
    { type: "house", icon: Home, label: "Houses", count: "4,500+" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Modern living space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Property Discovery
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight animate-fade-up">
              Find Your Perfect<br />
              <span className="text-accent">Home, Smarter</span>
            </h1>
            
            <p className="text-lg md:text-xl text-background/80 mb-10 max-w-xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Our AI understands your lifestyle, budget, and preferences to recommend properties that truly match what you're looking for.
            </p>

            {/* Search Bar */}
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <SearchBar variant="hero" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20">
                  <stat.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-background">{stat.value}</p>
                  <p className="text-xs text-background/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Property Type
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking for a cozy room, a shared PG, or a spacious family home—we've got options for every need.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {propertyTypeCards.map((item, index) => (
              <Link
                key={index}
                to={`/explore?type=${item.type}`}
                className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.count} listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">AI Recommendations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Picked Just For You
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Properties our AI thinks you'll love based on your preferences and search history.
              </p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiRecommendedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} showAiScore />
            ))}
          </div>

          {/* AI Feature Card */}
          <div className="mt-12">
            <AiRecommendationCard />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-2">
                Hand-picked properties with verified owners and great reviews.
              </p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="gap-2">
                Browse All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to List Your Property?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Reach thousands of potential tenants and buyers. Our AI helps match your property with the right people.
          </p>
          <Link to="/list-property">
            <Button variant="hero" size="xl" className="gap-2">
              <Building className="h-5 w-5" />
              List Your Property Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
