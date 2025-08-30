import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
import bedroom from '@/assets/bedroom.jpeg'
import heroImage from '@/assets/heroImage.jpg'


// import heroImage from "@/assets/hero-image.jpg";
// import flatInterior from "@/assets/flat-interior-1.jpg";
// import bedroom from "@/assets/bedroom-1.jpg";
import { 
  GraduationCap, 
  MapPin, 
  Clock, 
  Shield, 
  Star,
  Bed,
  Bath,
  Wifi
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/listings?city=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  const featuredProperties = [
    {
      id: 1,
      title: "Modern 2BHK near MMU",
      location: "Manchester",
      price: 485,
      image: bedroom,
      bedrooms: 2,
      bathrooms: 1,
      available: true
    },
    {
      id: 2,
      title: "Cozy Studio - King's College",
      location: "London",
      price: 650,
      image: bedroom,
      bedrooms: 1,
      bathrooms: 1,
      available: true
    }
  ];

  const stats = [
    { label: "Properties Available", value: "500+", icon: MapPin },
    { label: "Happy Students", value: "2,000+", icon: GraduationCap },
    { label: "Universities Covered", value: "50+", icon: Star },
    { label: "Response Time", value: "< 2hrs", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div  className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-accent">Student Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover comfortable, affordable student accommodation near top UK universities
          </p>
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
            <p className="text-muted-foreground mt-4">
  {searchQuery && `Showing results for: "${searchQuery}"`}
</p>
          </div>

          <div className="flex flex-wrap  justify-center gap-4 text-sm">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Verified Properties
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Quick Response
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              Student Focused
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent-light/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked student accommodations from our most trusted landlords
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/90 text-foreground font-bold">
                      £{property.price}/mo
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms} bath
                    </div>
                    <div className="flex items-center">
                      <Wifi className="w-4 h-4 mr-1" />
                      Wi-Fi
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate('/listings')}>
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to find your perfect student home</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Search",
                description: "Enter your university city or postcode to find nearby properties"
              },
              {
                step: "2",
                title: "Filter",
                description: "Use our filters to find properties that match your budget and preferences"
              },
              {
                step: "3",
                title: "Contact",
                description: "Get in touch with verified landlords directly through our platform"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-full text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Student Home?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of students who found their perfect accommodation through us
          </p>
          <Button size="xl" variant="accent" onClick={() => navigate('/listings')}>
            Start Your Search
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;